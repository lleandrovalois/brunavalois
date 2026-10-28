/**
 * Bruna Valois Joias e Semijoias - Servidor Principal de Produção & API
 * Integração Oficial Mercado Pago (Checkout Pro, Pix Transparente, Webhooks e SPA)
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const config = require('./src/config/mercadopago.config');

const app = express();
const PORT = config.port;
const BASE_DIR = path.resolve(__dirname);

// ================= MIDDLEWARES BÁSICOS & SEGURANÇA =================
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Suporte a JSON e URL-Encoded com preservação de rawBody para assinaturas
app.use(express.json({
  limit: '2mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// ================= HEALTH CHECK =================
app.get(['/health', '/healthz'], (req, res) => {
  res.json({
    status: 'ok',
    app: 'bruna-valois-joias',
    environment: config.env,
    isSandbox: config.isSandbox,
    mercadoPagoConfigured: config.isConfigured,
    timestamp: new Date().toISOString()
  });
});

// ================= ROTAS DE API =================
const checkoutRoutes = require('./src/routes/checkout.routes');
const webhookRoutes = require('./src/routes/webhook.routes');

app.use('/api', checkoutRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/webhooks', webhookRoutes);


// ================= ROTAS DE RETORNO DO CHECKOUT =================
app.get('/checkout/success', (req, res) => {
  const orderId = req.query.order_id || req.query.external_reference || '';
  const paymentId = req.query.payment_id || req.query.collection_id || '';
  const status = req.query.status || req.query.collection_status || 'approved';
  if (orderId) {
    res.redirect(`/pedido/${encodeURIComponent(orderId)}?status=${encodeURIComponent(status)}&payment_id=${encodeURIComponent(paymentId)}`);
  } else {
    res.redirect(`/?status=${encodeURIComponent(status)}&payment_id=${encodeURIComponent(paymentId)}`);
  }
});

app.get('/checkout/failure', (req, res) => {
  const orderId = req.query.order_id || req.query.external_reference || '';
  res.redirect(`/checkout?order_id=${encodeURIComponent(orderId)}&status=failure`);
});

app.get('/checkout/pending', (req, res) => {
  const orderId = req.query.order_id || req.query.external_reference || '';
  const paymentId = req.query.payment_id || '';
  if (orderId) {
    res.redirect(`/pedido/${encodeURIComponent(orderId)}?status=pending&payment_id=${encodeURIComponent(paymentId)}`);
  } else {
    res.redirect(`/?status=pending&payment_id=${encodeURIComponent(paymentId)}`);
  }
});

app.get(['/checkout', '/meus-pedidos', '/rastreio', '/pedido/:id', '/order-confirmed/:id'], (req, res) => {
  res.sendFile(path.join(BASE_DIR, 'index.html'));
});


// ================= ARQUIVOS ESTÁTICOS & SPA =================
// Serve arquivos estáticos da raiz com controle de cache
app.use(express.static(BASE_DIR, {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Fallback para qualquer rota não mapeada (SPA)
app.use((req, res) => {
  const indexPath = path.join(BASE_DIR, 'index.html');
  res.sendFile(indexPath);
});

// ================= INICIALIZAÇÃO DO SERVIDOR =================
app.listen(PORT, '0.0.0.0', () => {
  const summary = config.getSanitizedSummary();
  console.log('================================================================');
  console.log(' ✨ BRUNA VALOIS JOIAS & SEMIJOIAS - ALTA JOALHERIA');
  console.log('================================================================');
  console.log(` 🚀 Servidor rodando na porta: ${PORT}`);
  console.log(` 🌐 URL Base: ${summary.appBaseUrl}`);
  console.log(` ⚙️  Ambiente Mercado Pago: ${summary.environment.toUpperCase()} (Sandbox: ${summary.isSandbox ? 'SIM' : 'NÃO'})`);
  console.log(` 🔑 Public Key: ${summary.publicKey}`);
  console.log(` 🔐 Access Token: ${summary.accessToken}`);
  console.log(` 🛡️  Webhook Secret: ${summary.hasWebhookSecret ? 'Configurado' : 'Aguardando configuração'}`);
  console.log(` 💳 Webhook Endpoint: ${config.webhookNotificationUrl}`);
  console.log('================================================================');
});
