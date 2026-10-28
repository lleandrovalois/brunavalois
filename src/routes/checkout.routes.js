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
 * POST /api/checkout/process-order
 * Cria o pedido completo com dados pessoais, endereço de entrega e integra com Mercado Pago
 * Seguindo o modelo de alta conversão do JVMODAS
 */
router.post('/process-order', async (req, res) => {
  try {
    const { customer, shipping, items, couponCode, paymentMethod = 'checkout_pro' } = req.body;

    // 1. Validação de dados do comprador
    if (!customer?.name?.trim() || !customer?.email?.trim() || !customer?.cpf?.trim() || !customer?.phone?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'BadRequest',
        message: 'Por favor, preencha todos os dados pessoais (Nome, E-mail, CPF e WhatsApp/Telefone).'
      });
    }

    const cleanCpf = customer.cpf.replace(/\D/g, '');
    if (cleanCpf.length !== 11) {
      return res.status(400).json({
        success: false,
        error: 'BadRequest',
        message: 'Por favor, informe um CPF válido com 11 dígitos para emissão da nota e certificado.'
      });
    }

    // 2. Validação de endereço
    const isPickup = shipping?.method === 'Retirada no Ateliê';
    const finalShipping = {
      cep: isPickup && !shipping?.cep ? '01001-000' : (shipping?.cep || ''),
      street: isPickup && !shipping?.street ? 'Ateliê Bruna Valois - Showroom Exclusivo' : (shipping?.street || ''),
      number: isPickup && !shipping?.number ? 'Showroom' : (shipping?.number || ''),
      complement: shipping?.complement || '',
      neighborhood: isPickup && !shipping?.neighborhood ? 'Jardins' : (shipping?.neighborhood || ''),
      city: isPickup && !shipping?.city ? 'São Paulo' : (shipping?.city || ''),
      state: isPickup && !shipping?.state ? 'SP' : (shipping?.state || ''),
      method: shipping?.method || 'PAC com Seguro Total',
      price: isPickup ? 0 : (Number(shipping?.price) || 0)
    };

    if (!isPickup) {
      if (!finalShipping.cep || !finalShipping.street || !finalShipping.number || !finalShipping.city || !finalShipping.state) {
        return res.status(400).json({
          success: false,
          error: 'BadRequest',
          message: 'Por favor, preencha todos os dados de entrega (CEP, Rua, Número, Cidade e UF).'
        });
      }
    }

    // 3. Validação de itens
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'BadRequest',
        message: 'Nenhuma joia selecionada na sacola.'
      });
    }

    const subtotal = items.reduce((acc, it) => acc + (Number(it.price || it.unit_price) * (parseInt(it.quantity, 10) || 1)), 0);

    // 4. Cálculo de cupom
    let discount = 0;
    const cleanCoupon = (couponCode || '').trim().toUpperCase();
    if (cleanCoupon === 'BRUNA10' || cleanCoupon === 'VALOIS10') {
      discount = subtotal * 0.10; // 10%
    } else if (cleanCoupon === 'PRIMEIRAJOIA') {
      discount = subtotal * 0.15; // 15%
    }

    // Desconto de 5% no Pix à vista
    let paymentDiscount = 0;
    if (paymentMethod === 'pix') {
      paymentDiscount = (subtotal - discount) * 0.05;
    }

    const total = Math.max(0, subtotal - discount - paymentDiscount + finalShipping.price);
    const orderId = `BV-${Math.floor(100000 + Math.random() * 900000)}`;

    // 5. Integração com o Mercado Pago
    if (paymentMethod === 'pix') {
      // Criação direta de Pix Transparente
      const pixResult = await paymentService.createPixPayment({
        transaction_amount: total,
        description: `Bruna Valois Joias - Pedido ${orderId} (${items.length} itens)`,
        payer: {
          email: customer.email,
          first_name: customer.name.split(' ')[0] || 'Cliente',
          last_name: customer.name.split(' ').slice(1).join(' ') || 'Valois',
          cpf: cleanCpf
        },
        metadata: {
          order_id: orderId,
          customer_name: customer.name,
          customer_phone: customer.phone,
          shipping_method: finalShipping.method,
          shipping_city: finalShipping.city
        },
        externalReference: orderId
      });

      // Atualiza o pedido com os dados de entrega e comprador
      const order = orderRepository.createOrder({
        id: orderId,
        external_reference: orderId,
        items,
        subtotal,
        discount: discount + paymentDiscount,
        shipping_price: finalShipping.price,
        total,
        status: 'pending',
        status_detail: 'waiting_pix_payment',
        shipping_status: 'PENDING_PAYMENT',
        payment_method: 'pix',
        payment_id: pixResult.payment_id,
        customer,
        payer: customer,
        shipping: finalShipping,
        pix: {
          qr_code: pixResult.qr_code,
          qr_code_base64: pixResult.qr_code_base64,
          ticket_url: pixResult.ticket_url,
          date_of_expiration: pixResult.date_of_expiration
        }
      });

      return res.status(201).json({
        success: true,
        orderId,
        paymentMethod: 'pix',
        total,
        order,
        pix: {
          payment_id: pixResult.payment_id,
          qr_code: pixResult.qr_code,
          qr_code_base64: pixResult.qr_code_base64,
          ticket_url: pixResult.ticket_url,
          date_of_expiration: pixResult.date_of_expiration
        }
      });
    }

    // Caso padrão: Checkout Pro Mercado Pago
    const prefResult = await paymentService.createPreference({
      items,
      payer: {
        name: customer.name.split(' ')[0] || 'Cliente',
        surname: customer.name.split(' ').slice(1).join(' ') || 'Valois',
        email: customer.email,
        phone: customer.phone,
        identification: { type: 'CPF', number: cleanCpf }
      },
      backUrls: {
        success: `${config.appBaseUrl}/pedido/${orderId}?status=approved`,
        failure: `${config.appBaseUrl}/checkout?order_id=${orderId}&status=failure`,
        pending: `${config.appBaseUrl}/pedido/${orderId}?status=pending`
      },
      metadata: {
        order_id: orderId,
        customer_name: customer.name,
        customer_phone: customer.phone,
        shipping_method: finalShipping.method,
        shipping_city: finalShipping.city
      },
      externalReference: orderId
    });

    const order = orderRepository.createOrder({
      id: orderId,
      external_reference: orderId,
      items,
      subtotal,
      discount,
      shipping_price: finalShipping.price,
      total,
      status: 'pending',
      status_detail: 'waiting_checkout_pro',
      shipping_status: 'PENDING_PAYMENT',
      payment_method: 'checkout_pro',
      preference_id: prefResult.id,
      customer,
      payer: customer,
      shipping: finalShipping
    });

    return res.status(201).json({
      success: true,
      orderId,
      paymentMethod: 'checkout_pro',
      preferenceId: prefResult.id,
      initPoint: prefResult.init_point,
      sandboxInitPoint: prefResult.sandbox_init_point,
      checkoutUrl: prefResult.checkout_url,
      publicKey: config.publicKey,
      total,
      order
    });
  } catch (err) {
    console.error('[CheckoutRoutes] ❌ Erro ao processar pedido:', err.message);
    res.status(500).json({
      success: false,
      error: 'OrderProcessingError',
      message: err.message
    });
  }
});

/**
 * GET /api/orders/lookup?q=...
 * Consulta pedidos para a esteira de acompanhamento por número do pedido, e-mail ou CPF
 */
router.get('/orders/lookup', (req, res) => {
  const query = (req.query.q || req.query.query || '').trim();

  if (!query) {
    return res.status(400).json({
      success: false,
      error: 'BadRequest',
      message: 'Por favor, informe o número do pedido, seu e-mail ou CPF cadastrado.'
    });
  }

  const matches = orderRepository.lookupOrders(query);

  if (matches.length === 0) {
    return res.status(404).json({
      success: false,
      count: 0,
      orders: [],
      message: 'Nenhum pedido encontrado com os dados informados. Verifique se digitou corretamente.'
    });
  }

  res.json({
    success: true,
    count: matches.length,
    orders: matches
  });
});

/**
 * POST /api/orders/:id/update-delivery
 * Atualiza o status da esteira de expedição e código de rastreamento (para o Ateliê/CMS)
 */
router.post('/orders/:id/update-delivery', (req, res) => {
  const { id } = req.params;
  const { shipping_status, tracking_code } = req.body;

  if (!shipping_status) {
    return res.status(400).json({
      success: false,
      message: 'O campo shipping_status é obrigatório (ex: SEPARATING, SHIPPED, DELIVERED).'
    });
  }

  const updated = orderRepository.updateShippingStatus(id, shipping_status, tracking_code);

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: `Pedido ${id} não encontrado.`
    });
  }

  res.json({
    success: true,
    message: 'Status de expedição atualizado com sucesso!',
    data: updated
  });
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
        if (liveData.status === 'approved') {
          orderRepository.updateShippingStatus(order.id, 'SEPARATING');
        }
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
