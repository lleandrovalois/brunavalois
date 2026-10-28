/**
 * Bruna Valois Joias - Cliente Oficial Mercado Pago SDK
 * Responsabilidade Única: Inicialização e injeção de dependências do SDK oficial.
 */

const { MercadoPagoConfig, Preference, Payment, WebhookSignatureValidator } = require('mercadopago');
const config = require('../config/mercadopago.config');

class MercadoPagoClient {
  constructor() {
    this.client = null;
    this.preferenceApi = null;
    this.paymentApi = null;
    this._initialize();
  }

  /**
   * Inicializa a configuração do Mercado Pago utilizando o Access Token
   */
  _initialize() {
    if (!config.isConfigured) {
      console.warn(`[MercadoPagoClient] ⚠️ Access Token não configurado. Ambiente: ${config.env.toUpperCase()}`);
      return;
    }

    try {
      this.client = new MercadoPagoConfig({
        accessToken: config.accessToken,
        options: {
          timeout: 10000,
          idempotencyKey: undefined
        }
      });

      this.preferenceApi = new Preference(this.client);
      this.paymentApi = new Payment(this.client);

      const summary = config.getSanitizedSummary();
      console.log(`[MercadoPagoClient] ✅ SDK Oficial Inicializado com Sucesso | Modo: ${summary.environment.toUpperCase()} | Token: ${summary.accessToken}`);
    } catch (err) {
      console.error('[MercadoPagoClient] ❌ Falha ao inicializar SDK:', err.message);
      this.client = null;
    }
  }

  /**
   * Recarrega a configuração caso o token mude em tempo de execução
   */
  reload() {
    this._initialize();
  }

  /**
   * Retorna a instância configurada do cliente SDK
   */
  getClient() {
    if (!this.client) {
      this._initialize();
    }
    return this.client;
  }

  /**
   * Retorna a API de Preferences (Checkout Pro)
   */
  getPreferenceApi() {
    if (!this.preferenceApi) {
      this._initialize();
    }
    if (!this.preferenceApi) {
      throw new Error('Mercado Pago SDK não está configurado. Verifique a variável MERCADO_PAGO_ACCESS_TOKEN no .env');
    }
    return this.preferenceApi;
  }

  /**
   * Retorna a API de Pagamentos (Pix, Cartão de Crédito transparente)
   */
  getPaymentApi() {
    if (!this.paymentApi) {
      this._initialize();
    }
    if (!this.paymentApi) {
      throw new Error('Mercado Pago SDK não está configurado. Verifique a variável MERCADO_PAGO_ACCESS_TOKEN no .env');
    }
    return this.paymentApi;
  }

  /**
   * Retorna o validador de assinaturas de webhook
   */
  getSignatureValidator() {
    return WebhookSignatureValidator;
  }
}

// Exporta instância única (Singleton)
module.exports = new MercadoPagoClient();
