/**
 * Bruna Valois Joias - Camada de Serviço de Pagamentos (PaymentService)
 * Módulo desacoplado com responsabilidade única de orquestrar transações financeiras
 * via Checkout Pro e API Transparente (Pix / Cartão de Crédito) do Mercado Pago.
 */

const mpClient = require('./MercadoPagoClient');
const config = require('../config/mercadopago.config');
const orderRepository = require('../storage/OrderRepository');

class PaymentService {
  /**
   * Cria uma preferência de pagamento no Mercado Pago (Checkout Pro)
   *
   * @param {Object} params
   * @param {Array} params.items - Itens da compra [{ id, title, unit_price, quantity, currency_id }]
   * @param {Object} [params.payer] - Dados do pagador { name, email, phone, identification }
   * @param {Object} [params.metadata] - Metadados customizados { order_id, user_id, ... }
   * @param {Object} [params.backUrls] - URLs de retorno customizadas
   * @param {String} [params.externalReference] - Referência externa única do pedido
   * @returns {Promise<Object>} Dados da preferência criada (id, init_point, sandbox_init_point, checkout_url)
   */
  async createPreference(params) {
    const {
      items = [],
      payer = {},
      metadata = {},
      backUrls = {},
      externalReference
    } = params;

    if (!items || items.length === 0) {
      throw new Error('Ao menos um item é obrigatório para criar a preferência de pagamento.');
    }

    const orderId = externalReference || metadata.order_id || `BV-${Date.now()}`;
    const tag = `[PaymentService] [${config.env.toUpperCase()}]`;

    console.log(`${tag} Criando Preferência Checkout Pro para o Pedido: ${orderId}...`);

    // Normalização e validação dos itens
    const formattedItems = items.map((item, index) => {
      const price = Number(item.unit_price || item.price);
      if (isNaN(price) || price <= 0) {
        throw new Error(`Preço inválido para o item "${item.title || item.name || index}": ${price}`);
      }
      return {
        id: String(item.id || `item-${index + 1}`),
        title: String(item.title || item.name || 'Joia Bruna Valois'),
        description: item.description || 'Alta Joalheria & Semijoias Finas',
        quantity: parseInt(item.quantity, 10) || 1,
        currency_id: 'BRL',
        unit_price: price,
        picture_url: item.image || item.picture_url || undefined
      };
    });

    const totalAmount = formattedItems.reduce((acc, it) => acc + (it.unit_price * it.quantity), 0);

    // Constrói as back_urls com fallback
    const resolvedBackUrls = {
      success: backUrls.success || `${config.appBaseUrl}/checkout/success?order_id=${encodeURIComponent(orderId)}`,
      failure: backUrls.failure || `${config.appBaseUrl}/checkout/failure?order_id=${encodeURIComponent(orderId)}`,
      pending: backUrls.pending || `${config.appBaseUrl}/checkout/pending?order_id=${encodeURIComponent(orderId)}`
    };

    // Monta o payload oficial da Preference
    const preferencePayload = {
      items: formattedItems,
      payer: {
        name: payer.name || payer.first_name || 'Cliente',
        surname: payer.surname || payer.last_name || 'Valois',
        email: payer.email || 'atendimento@brunavalois.com.br',
        phone: payer.phone ? { number: payer.phone } : undefined,
        identification: payer.identification || undefined
      },
      back_urls: resolvedBackUrls,
      auto_return: 'approved',
      notification_url: config.webhookNotificationUrl,
      external_reference: orderId,
      statement_descriptor: 'BRUNA VALOIS',
      expires: true,
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
      metadata: {
        order_id: orderId,
        user_id: metadata.user_id || 'guest',
        environment: config.env,
        total_amount: totalAmount,
        ...metadata
      }
    };

    try {
      const preferenceApi = mpClient.getPreferenceApi();
      const response = await preferenceApi.create({ body: preferencePayload });

      const checkoutUrl = config.getCheckoutUrl(response);

      console.log(`${tag} ✅ Preferência criada com sucesso! ID: ${response.id}`);
      console.log(`${tag} 🔗 URL de Checkout: ${checkoutUrl}`);

      // Registra/atualiza pedido no repositório
      orderRepository.createOrder({
        id: orderId,
        external_reference: orderId,
        items: formattedItems,
        total: totalAmount,
        status: 'pending',
        status_detail: 'waiting_checkout_pro',
        payment_method: 'checkout_pro',
        preference_id: response.id,
        payer,
        metadata: preferencePayload.metadata
      });

      return {
        id: response.id,
        order_id: orderId,
        init_point: response.init_point,
        sandbox_init_point: response.sandbox_init_point,
        checkout_url: checkoutUrl,
        environment: config.env,
        total: totalAmount
      };
    } catch (err) {
      console.error(`${tag} ❌ Falha na criação de preferência Mercado Pago:`, err.message);
      if (err.cause) {
        console.error(`${tag} Detalhes do erro:`, JSON.stringify(err.cause, null, 2));
      }
      throw new Error(`Erro na API do Mercado Pago ao criar preferência: ${err.message}`);
    }
  }

  /**
   * Cria uma cobrança direta via Pix (API Transparente)
   *
   * @param {Object} params
   * @param {Number} params.transaction_amount - Valor em Reais (BRL)
   * @param {String} [params.description] - Descrição da transação
   * @param {Object} params.payer - Informações do pagador { email, first_name, last_name, cpf }
   * @param {Object} [params.metadata] - Metadados customizados
   * @param {String} [params.externalReference] - ID de referência externa
   * @returns {Promise<Object>} Dados da cobrança Pix (qr_code, qr_code_base64, ticket_url, payment_id, status)
   */
  async createPixPayment(params) {
    const {
      transaction_amount,
      description = 'Bruna Valois Joias - Alta Joalheria',
      payer = {},
      metadata = {},
      externalReference
    } = params;

    const amount = Number(transaction_amount);
    if (isNaN(amount) || amount <= 0) {
      throw new Error(`Valor de transação inválido para Pix: ${transaction_amount}`);
    }

    const orderId = externalReference || metadata.order_id || `BV-PIX-${Date.now()}`;
    const tag = `[PaymentService] [${config.env.toUpperCase()}]`;

    console.log(`${tag} Gerando Cobrança Direta Pix no valor de R$ ${amount.toFixed(2)} para Pedido ${orderId}...`);

    // Validação do pagador para Pix
    const email = payer.email || 'cliente@brunavalois.com.br';
    const cleanCpf = payer.cpf ? String(payer.cpf).replace(/\D/g, '') : '19119119100';

    const paymentPayload = {
      transaction_amount: Number(amount.toFixed(2)),
      description: String(description).substring(0, 100),
      payment_method_id: 'pix',
      payer: {
        email,
        first_name: payer.first_name || payer.name || 'Cliente',
        last_name: payer.last_name || 'Valois',
        identification: {
          type: 'CPF',
          number: cleanCpf.length === 11 ? cleanCpf : '19119119100'
        }
      },
      notification_url: config.webhookNotificationUrl,
      external_reference: orderId,
      metadata: {
        order_id: orderId,
        user_id: metadata.user_id || 'guest',
        environment: config.env,
        ...metadata
      }
    };

    try {
      const paymentApi = mpClient.getPaymentApi();
      const response = await paymentApi.create({ body: paymentPayload });

      const txData = response.point_of_interaction?.transaction_data || {};
      const qrCode = txData.qr_code || '';
      const qrCodeBase64 = txData.qr_code_base64 || '';
      const ticketUrl = txData.ticket_url || '';

      console.log(`${tag} ✅ Cobrança Pix gerada com sucesso! Payment ID: ${response.id} | Status: ${response.status}`);

      // Registra/atualiza o pedido
      orderRepository.createOrder({
        id: orderId,
        external_reference: orderId,
        total: amount,
        status: response.status || 'pending',
        status_detail: response.status_detail || 'waiting_pix_payment',
        payment_method: 'pix',
        payment_id: response.id,
        payer,
        pix: {
          qr_code: qrCode,
          qr_code_base64: qrCodeBase64,
          ticket_url: ticketUrl,
          date_of_expiration: response.date_of_expiration
        },
        metadata: paymentPayload.metadata
      });

      return {
        payment_id: response.id,
        order_id: orderId,
        status: response.status,
        status_detail: response.status_detail,
        transaction_amount: response.transaction_amount,
        qr_code: qrCode,
        qr_code_base64: qrCodeBase64,
        ticket_url: ticketUrl,
        date_of_expiration: response.date_of_expiration,
        environment: config.env
      };
    } catch (err) {
      console.error(`${tag} ❌ Falha na geração do Pix Mercado Pago:`, err.message);
      if (err.cause) {
        console.error(`${tag} Detalhes do erro:`, JSON.stringify(err.cause, null, 2));
      }
      throw new Error(`Erro na API do Mercado Pago ao gerar Pix: ${err.message}`);
    }
  }

  /**
   * Consulta o status real de um pagamento na API do Mercado Pago
   *
   * @param {String|Number} paymentId - ID do pagamento no Mercado Pago
   * @returns {Promise<Object>} Dados atualizados do pagamento
   */
  async getPaymentById(paymentId) {
    if (!paymentId) {
      throw new Error('ID do pagamento é obrigatório para consulta.');
    }

    const tag = `[PaymentService] [${config.env.toUpperCase()}]`;
    console.log(`${tag} Consultando status do pagamento ${paymentId} na API do Mercado Pago...`);

    try {
      const paymentApi = mpClient.getPaymentApi();
      const payment = await paymentApi.get({ id: String(paymentId) });

      console.log(`${tag} Pagamento ${paymentId} consultado: Status = ${payment.status} (${payment.status_detail})`);

      return {
        id: payment.id,
        status: payment.status,
        status_detail: payment.status_detail,
        payment_method_id: payment.payment_method_id,
        payment_type_id: payment.payment_type_id,
        transaction_amount: payment.transaction_amount,
        date_approved: payment.date_approved,
        date_created: payment.date_created,
        external_reference: payment.external_reference,
        payer: payment.payer,
        metadata: payment.metadata
      };
    } catch (err) {
      console.error(`${tag} ❌ Falha ao consultar pagamento ${paymentId}:`, err.message);
      throw new Error(`Erro ao consultar pagamento no Mercado Pago: ${err.message}`);
    }
  }
}

// Singleton
module.exports = new PaymentService();
