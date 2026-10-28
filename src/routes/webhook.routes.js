/**
 * Bruna Valois Joias - Rotas de Webhook / Notificações IPN Mercado Pago
 * Endpoint para recebimento de notificações com validação de assinatura,
 * consulta de status real na API e atualização assíncrona/idempotente de pedidos.
 */

const express = require('express');
const router = express.Router();
const { validateMercadoPagoWebhook } = require('../middleware/webhookValidator');
const paymentService = require('../services/PaymentService');
const orderRepository = require('../storage/OrderRepository');

/**
 * POST /api/webhooks/mercadopago
 * Endpoint oficial de recepção de notificações do Mercado Pago
 */
router.post('/mercadopago', validateMercadoPagoWebhook, async (req, res) => {
  const requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
  const timestamp = new Date().toISOString();

  // Mercado Pago envia dados via Body (v2) ou via Query params (v1 / IPN)
  const body = req.body || {};
  const query = req.query || {};

  const type = body.type || query.type || query.topic || (body.action ? body.action.split('.')[0] : null);
  const action = body.action || query.action || 'notification';
  const paymentId = body.data?.id || query['data.id'] || query.id || (body.id && !isNaN(body.id) ? body.id : null);

  // Identificador único do evento para garantia estrita de idempotência
  const eventId = String(body.id || `${paymentId}_${action}_${requestId}`);

  console.log(`[Webhook] 📩 Notificação recebida [${timestamp}] | Type: ${type} | Action: ${action} | Payment ID: ${paymentId} | Event ID: ${eventId}`);

  // 1. Verificação de Idempotência
  if (orderRepository.isEventProcessed(eventId)) {
    console.log(`[Webhook] ⏭️ Evento ${eventId} já foi processado anteriormente. Ignorando duplicata (Idempotente).`);
    return res.status(200).json({
      received: true,
      idempotent: true,
      message: 'Evento já processado anteriormente.'
    });
  }

  // Registra o evento de imediato para evitar condições de corrida em envios concorrentes
  orderRepository.markEventProcessed(eventId);

  // 2. Responde imediatamente com HTTP 200 para o Mercado Pago não reenviar a notificação
  // O processamento subsequente ocorre de forma assíncrona
  res.status(200).json({
    received: true,
    payment_id: paymentId,
    event_id: eventId,
    timestamp
  });


  // 3. Processamento Assíncrono do Pagamento
  if (paymentId && (type === 'payment' || action.startsWith('payment.') || !type)) {
    try {
      // Consulta a API do Mercado Pago para obter o status real e seguro da transação
      const paymentData = await paymentService.getPaymentById(paymentId);
      const externalRef = paymentData.external_reference;
      const status = paymentData.status; // approved, pending, rejected, cancelled, etc.
      const statusDetail = paymentData.status_detail;

      console.log(`[Webhook] 🔍 Status Oficial MP: ${status} (${statusDetail}) | Ref: ${externalRef} | Valor: R$ ${paymentData.transaction_amount}`);

      // Localiza o pedido correspondente no banco/repositório
      let order = null;
      if (externalRef) {
        order = orderRepository.getOrderByExternalReference(externalRef);
      }
      if (!order && paymentId) {
        order = orderRepository.getOrderByPaymentId(paymentId);
      }

      if (order) {
        // Atualiza status do pedido existente
        orderRepository.updateOrderStatus(order.id, status, {
          status_detail: statusDetail,
          payment_id: paymentId,
          payment_method: paymentData.payment_method_id,
          paid_amount: paymentData.transaction_amount,
          metadata: {
            mp_date_approved: paymentData.date_approved,
            last_webhook_at: timestamp
          }
        });
        console.log(`[Webhook] 🎉 Pedido ${order.id} sincronizado com status: ${status.toUpperCase()}!`);
      } else {
        // Se o pedido não estava cadastrado previamente, registra para auditoria
        console.log(`[Webhook] ℹ️ Pedido com referência ${externalRef || paymentId} não encontrado localmente. Registrando para auditoria...`);
        orderRepository.createOrder({
          id: externalRef || `MP-${paymentId}`,
          external_reference: externalRef || `MP-${paymentId}`,
          total: paymentData.transaction_amount,
          status,
          status_detail: statusDetail,
          payment_id: paymentId,
          payment_method: paymentData.payment_method_id,
          payer: paymentData.payer,
          metadata: {
            auto_created_from_webhook: true,
            created_via: 'mercadopago_ipn'
          }
        });
      }

      // Registra evento como concluído no controle de idempotência
      orderRepository.markEventProcessed(eventId);
    } catch (err) {
      console.error(`[Webhook] ❌ Erro ao consultar e processar pagamento ${paymentId}:`, err.message);
    }
  } else {
    // Para outros tipos de eventos (ex: merchant_order)
    console.log(`[Webhook] ℹ️ Evento do tipo "${type}" registrado e arquivado.`);
    orderRepository.markEventProcessed(eventId);
  }
});

module.exports = router;
