/**
 * Bruna Valois Joias - Rotas da API de Checkout & Pagamentos
 * Endpoints para criação de Checkout Pro, Pix Transparente e consulta de status.
 */

const express = require('express');
const router = express.Router();
const paymentService = require('../services/PaymentService');
const orderRepository = require('../storage/OrderRepository');
const config = require('../config/mercadopago.config');

/**
 * GET /api/config/public
 * Retorna dados públicos de configuração para o frontend
 */
router.get('/config/public', (req, res) => {
  res.json({
    environment: config.env,
    isSandbox: config.isSandbox,
    isProduction: config.isProduction,
    publicKey: config.publicKey,
    isConfigured: config.isConfigured,
    appBaseUrl: config.appBaseUrl
  });
});

/**
 * POST /api/checkout/preference
 * Cria preferência de Checkout Pro do Mercado Pago
 */
router.post('/preference', async (req, res) => {
  try {
    const { items, payer, metadata, backUrls, externalReference } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'BadRequest',
        message: 'A lista de itens é obrigatória para criar a preferência de pagamento.'
      });
    }

    const result = await paymentService.createPreference({
      items,
      payer,
      metadata,
      backUrls,
      externalReference
    });

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('[CheckoutRoutes] ❌ Erro ao criar preferência:', err.message);
    res.status(500).json({
      success: false,
      error: 'PreferenceError',
      message: err.message
    });
  }
});

/**
 * POST /api/checkout/pix
 * Cria cobrança transparente direta via Pix
 */
router.post('/pix', async (req, res) => {
  try {
    const { transaction_amount, description, payer, metadata, externalReference } = req.body;

    if (!transaction_amount || Number(transaction_amount) <= 0) {
      return res.status(400).json({
        success: false,
        error: 'BadRequest',
        message: 'O campo transaction_amount deve ser um número maior que zero.'
      });
    }

    const result = await paymentService.createPixPayment({
      transaction_amount,
      description,
      payer,
      metadata,
      externalReference
    });

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('[CheckoutRoutes] ❌ Erro ao gerar Pix:', err.message);
    res.status(500).json({
      success: false,
      error: 'PixGenerationError',
      message: err.message
    });
  }
});

/**
 * GET /api/orders/:id
 * Consulta os dados e status em tempo real de um pedido (polling para confirmação Pix)
 */
router.get('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const order = orderRepository.getOrderById(id) || orderRepository.getOrderByExternalReference(id);

  if (!order) {
    return res.status(404).json({
      success: false,
      error: 'NotFound',
      message: `Pedido ${id} não encontrado.`
    });
  }

  // Se o pedido tiver um payment_id e ainda estiver pendente, pode consultar o status atualizado no Mercado Pago
  if (order.payment_id && order.status === 'pending') {
    try {
      const liveData = await paymentService.getPaymentById(order.payment_id);
      if (liveData && liveData.status !== order.status) {
        orderRepository.updateOrderStatus(order.id, liveData.status, {
          status_detail: liveData.status_detail,
          paid_amount: liveData.transaction_amount
        });
      }
    } catch {
      // Ignora erro de consulta em background
    }
  }

  res.json({
    success: true,
    data: orderRepository.getOrderById(order.id) || order
  });
});

/**
 * GET /api/orders
 * Lista pedidos recentes para o painel administrativo/testes
 */
router.get('/orders', (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 20;
  const orders = orderRepository.listRecentOrders(limit);
  res.json({
    success: true,
    count: orders.length,
    data: orders
  });
});

/**
 * POST /api/checkout/simulate-approval/:id
 * Auxiliar exclusivo para testes locais em ambiente Sandbox: Simula aprovação de pagamento
 */
router.post('/simulate-approval/:id', (req, res) => {
  if (!config.isSandbox) {
    return res.status(403).json({
      success: false,
      message: 'Simulação permitida exclusivamente em ambiente sandbox.'
    });
  }

  const { id } = req.params;
  const order = orderRepository.getOrderById(id) || orderRepository.getOrderByExternalReference(id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: `Pedido ${id} não encontrado.`
    });
  }

  const updated = orderRepository.updateOrderStatus(order.id, 'approved', {
    status_detail: 'accredited',
    metadata: { simulated_in_sandbox: true }
  });

  res.json({
    success: true,
    message: `Pedido ${id} aprovado com sucesso via simulação sandbox!`,
    data: updated
  });
});

module.exports = router;
