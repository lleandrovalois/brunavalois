/**
 * Bruna Valois Joias - Configuração do Mercado Pago
 * Módulo desacoplado para gerenciamento de credenciais e alternância de ambientes.
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const rawEnv = (process.env.MERCADO_PAGO_ENV || 'sandbox').trim().toLowerCase();
const isSandbox = rawEnv !== 'production';
const environment = isSandbox ? 'sandbox' : 'production';

// Normaliza a URL base (sem barra final)
const rawBaseUrl = process.env.APP_BASE_URL || 'https://brunavalois.klynner.com.br';
const appBaseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

const config = {
  // Ambiente de execução
  env: environment,
  isSandbox,
  isProduction: !isSandbox,

  // Credenciais do Mercado Pago
  publicKey: (process.env.MERCADO_PAGO_PUBLIC_KEY || '').trim(),
  accessToken: (process.env.MERCADO_PAGO_ACCESS_TOKEN || '').trim(),
  webhookSecret: (process.env.MERCADO_PAGO_WEBHOOK_SECRET || '').trim(),

  // URLs da aplicação
  appBaseUrl,
  port: parseInt(process.env.PORT, 10) || 80,

  // URLs de retorno padrão para o Checkout Pro
  backUrls: {
    success: `${appBaseUrl}/checkout/success`,
    failure: `${appBaseUrl}/checkout/failure`,
    pending: `${appBaseUrl}/checkout/pending`
  },

  // URL padrão de notificação de webhook
  webhookNotificationUrl: `${appBaseUrl}/api/webhooks/mercadopago`,

  // Verifica se o Access Token foi configurado
  get isConfigured() {
    return Boolean(this.accessToken && this.accessToken.length > 10);
  },

  // Retorna a URL de checkout adequada de acordo com o ambiente (sandbox vs produção)
  getCheckoutUrl(preference) {
    if (!preference) return null;
    return this.isSandbox && preference.sandbox_init_point
      ? preference.sandbox_init_point
      : preference.init_point;
  },

  // Retorna resumo seguro para logs sem expor credenciais
  getSanitizedSummary() {
    const mask = (str) => {
      if (!str || str.length < 8) return '*** (não configurado)';
      return `${str.substring(0, 6)}...${str.substring(str.length - 4)}`;
    };

    return {
      environment: this.env,
      isSandbox: this.isSandbox,
      isConfigured: this.isConfigured,
      publicKey: mask(this.publicKey),
      accessToken: mask(this.accessToken),
      hasWebhookSecret: Boolean(this.webhookSecret),
      appBaseUrl: this.appBaseUrl
    };
  }
};

module.exports = config;
