/**
 * Bruna Valois Joias - Middleware de Validação de Assinatura Webhook
 * Valida a autenticidade das notificações do Mercado Pago via header x-signature e x-request-id.
 */

const crypto = require('crypto');
const { WebhookSignatureValidator, InvalidWebhookSignatureError } = require('mercadopago');
const config = require('../config/mercadopago.config');

function validateMercadoPagoWebhook(req, res, next) {
  const secret = config.webhookSecret;

  // Se o secret não foi definido no .env, alerta nos logs mas permite prosseguir em ambiente de desenvolvimento/teste
  if (!secret) {
    console.warn('[WebhookValidator] ⚠️ MERCADO_PAGO_WEBHOOK_SECRET não configurado no .env. Ignorando validação criptográfica (Modo Desenvolvimento).');
    return next();
  }

  const xSignature = req.headers['x-signature'];
  const xRequestId = req.headers['x-request-id'];

  // Extrai o ID da entidade (pagamento) a partir dos parâmetros de query ou body
  const dataId = (
    req.query['data.id'] ||
    req.body?.data?.id ||
    req.query.id ||
    (req.body?.id ? String(req.body.id) : '')
  );

  if (!xSignature) {
    console.warn(`[WebhookValidator] ❌ Requisição rejeitada: Header x-signature ausente. IP: ${req.ip}`);
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Header x-signature ausente na notificação de webhook.'
    });
  }

  try {
    // 1. Tenta validar utilizando o validador oficial do SDK do Mercado Pago
    if (typeof WebhookSignatureValidator?.validate === 'function') {
      WebhookSignatureValidator.validate({
        xSignature,
        xRequestId,
        dataId: String(dataId || ''),
        secret,
        toleranceSeconds: 600 // 10 minutos de tolerância para prevenir ataques de replay
      });

      console.log(`[WebhookValidator] ✅ Assinatura HMAC SHA-256 válida para o evento (Data ID: ${dataId})`);
      return next();
    }
  } catch (err) {
    if (err instanceof InvalidWebhookSignatureError || err.name === 'InvalidWebhookSignatureError') {
      console.warn(`[WebhookValidator] ❌ Falha na verificação da assinatura: ${err.message} (Data ID: ${dataId})`);
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Assinatura inválida para a notificação de webhook.',
        detail: err.message
      });
    }
    // Se o validador do SDK falhar por formato, testamos a verificação manual fallback
    console.warn(`[WebhookValidator] Validador do SDK gerou aviso (${err.message}). Executando verificação fallback...`);
  }

  // 2. Fallback manual de validação HMAC SHA-256 caso necessário
  try {
    const parts = {};
    xSignature.split(/[,;]/).forEach(part => {
      const [key, val] = part.trim().split('=');
      if (key && val) parts[key.trim()] = val.trim();
    });

    const ts = parts.ts;
    const v1 = parts.v1;

    if (!ts || !v1) {
      console.warn('[WebhookValidator] ❌ Header x-signature malformatado (ts ou v1 ausentes).');
      return res.status(401).json({ error: 'Unauthorized', message: 'Header x-signature malformatado.' });
    }

    // Template oficial de manifesto Mercado Pago: id:[data.id];request-id:[x-request-id];ts:[ts];
    const manifest = `id:${dataId};request-id:${xRequestId || ''};ts:${ts};`;
    const computedHmac = crypto.createHmac('sha256', secret).update(manifest).digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(computedHmac, 'hex'),
      Buffer.from(v1, 'hex')
    );

    if (!isValid) {
      console.warn(`[WebhookValidator] ❌ Assinatura HMAC divergente para evento ${dataId}`);
      return res.status(401).json({ error: 'Unauthorized', message: 'Assinatura inválida.' });
    }

    console.log(`[WebhookValidator] ✅ Assinatura manual validada com sucesso para ${dataId}`);
    return next();
  } catch (err) {
    console.error('[WebhookValidator] ❌ Erro inesperado na verificação da assinatura:', err.message);
    return res.status(401).json({ error: 'Unauthorized', message: 'Falha na validação de segurança.' });
  }
}

module.exports = {
  validateMercadoPagoWebhook
};
