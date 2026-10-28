/**
 * Bruna Valois Joias - Repositório de Pedidos & Controle de Idempotência
 * Camada de persistência desacoplada para gerenciar o ciclo de vida dos pedidos
 * e assegurar o tratamento estritamente idempotente de notificações de webhook.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '../../data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const EVENTS_FILE = path.join(DATA_DIR, 'webhook_events.json');

// Garante que o diretório de dados exista
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class OrderRepository {
  constructor() {
    this.orders = new Map();
    this.processedEvents = new Set();
    this._load();
  }

  /**
   * Carrega os dados persistidos do disco
   */
  _load() {
    try {
      if (fs.existsSync(ORDERS_FILE)) {
        const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
        const list = JSON.parse(raw);
        if (Array.isArray(list)) {
          list.forEach(order => this.orders.set(order.id, order));
        }
      }
    } catch (err) {
      console.error('[OrderRepository] Erro ao carregar pedidos:', err.message);
    }

    try {
      if (fs.existsSync(EVENTS_FILE)) {
        const raw = fs.readFileSync(EVENTS_FILE, 'utf-8');
        const list = JSON.parse(raw);
        if (Array.isArray(list)) {
          list.forEach(eventId => this.processedEvents.add(eventId));
        }
      }
    } catch (err) {
      console.error('[OrderRepository] Erro ao carregar eventos:', err.message);
    }
  }

  /**
   * Salva os dados em disco de forma segura
   */
  _save() {
    try {
      const ordersList = Array.from(this.orders.values());
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(ordersList, null, 2), 'utf-8');

      const eventsList = Array.from(this.processedEvents);
      fs.writeFileSync(EVENTS_FILE, JSON.stringify(eventsList, null, 2), 'utf-8');
    } catch (err) {
      console.error('[OrderRepository] Erro ao persistir dados:', err.message);
    }
  }

  /**
   * Cria um novo pedido no sistema
   */
  createOrder(data) {
    const orderId = data.id || `BV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const now = new Date().toISOString();

    const order = {
      id: orderId,
      external_reference: data.external_reference || orderId,
      items: data.items || [],
      subtotal: Number(data.subtotal) || Number(data.total) || 0,
      discount: Number(data.discount) || 0,
      shipping_price: Number(data.shipping_price) || 0,
      total: Number(data.total) || 0,
      currency: 'BRL',
      status: data.status || 'pending', // pending, approved, in_process, rejected, cancelled
      status_detail: data.status_detail || 'waiting_payment',
      shipping_status: data.shipping_status || (data.status === 'approved' ? 'SEPARATING' : 'PENDING_PAYMENT'), // PENDING_PAYMENT, PAID, SEPARATING, SHIPPED, DELIVERED
      tracking_code: data.tracking_code || null,
      payment_method: data.payment_method || null, // checkout_pro, pix, credit_card
      payment_id: data.payment_id || null,
      preference_id: data.preference_id || null,
      customer: data.customer || data.payer || {},
      payer: data.payer || data.customer || {},
      shipping: data.shipping || {},
      metadata: data.metadata || {},
      pix: data.pix || null, // { qr_code, qr_code_base64, ticket_url }
      created_at: now,
      updated_at: now
    };


    this.orders.set(orderId, order);
    this._save();
    console.log(`[OrderRepository] Pedido registrado: ${orderId} | Total: R$ ${order.total.toFixed(2)} | Status: ${order.status}`);
    return order;
  }

  /**
   * Busca um pedido por ID interno
   */
  getOrderById(id) {
    return this.orders.get(id) || null;
  }

  /**
   * Busca um pedido por external_reference
   */
  getOrderByExternalReference(ref) {
    if (!ref) return null;
    for (const order of this.orders.values()) {
      if (order.external_reference === ref || order.id === ref) {
        return order;
      }
    }
    return null;
  }

  /**
   * Busca um pedido por preference_id do Mercado Pago
   */
  getOrderByPreferenceId(prefId) {
    if (!prefId) return null;
    for (const order of this.orders.values()) {
      if (order.preference_id === prefId) {
        return order;
      }
    }
    return null;
  }

  /**
   * Busca um pedido pelo payment_id do Mercado Pago
   */
  getOrderByPaymentId(paymentId) {
    if (!paymentId) return null;
    const pId = String(paymentId);
    for (const order of this.orders.values()) {
      if (String(order.payment_id) === pId) {
        return order;
      }
    }
    return null;
  }

  /**
   * Atualiza o status do pedido de forma idempotente
   */
  updateOrderStatus(orderId, newStatus, details = {}) {
    const order = this.orders.get(orderId);
    if (!order) {
      console.warn(`[OrderRepository] Tentativa de atualizar pedido inexistente: ${orderId}`);
      return null;
    }

    const previousStatus = order.status;
    order.status = newStatus;
    if (details.status_detail) order.status_detail = details.status_detail;
    if (details.payment_id) order.payment_id = details.payment_id;
    if (details.payment_method) order.payment_method = details.payment_method;
    if (details.paid_amount) order.paid_amount = Number(details.paid_amount);
    if (details.metadata) order.metadata = { ...order.metadata, ...details.metadata };
    order.updated_at = new Date().toISOString();

    this.orders.set(orderId, order);
    this._save();

    console.log(`[OrderRepository] Pedido ${orderId} atualizado: ${previousStatus} -> ${newStatus} (${order.status_detail || 'ok'})`);
    return order;
  }

  /**
   * Verifica se um evento de webhook já foi processado (Idempotência)
   */
  isEventProcessed(eventId) {
    if (!eventId) return false;
    return this.processedEvents.has(String(eventId));
  }

  /**
   * Registra um evento de webhook como concluído
   */
  markEventProcessed(eventId) {
    if (!eventId) return;
    this.processedEvents.add(String(eventId));
    this._save();
  }

  /**
   * Consulta pedidos por ID, e-mail, CPF ou telefone (Lookup de Rastreio)
   */
  lookupOrders(rawQuery) {
    if (!rawQuery) return [];
    const query = String(rawQuery).trim();
    const upper = query.toUpperCase();
    const cleanDigits = query.replace(/\D/g, '');
    const isEmail = query.includes('@');
    const lowerEmail = query.toLowerCase();

    const matches = [];

    for (const order of this.orders.values()) {
      // 1. Busca por ID direto ou External Reference
      if (order.id.toUpperCase() === upper || (order.external_reference && order.external_reference.toUpperCase() === upper)) {
        matches.push(order);
        continue;
      }

      // Se a query for apenas o número após BV- (ex: digitou 123456)
      if (order.id.toUpperCase().replace(/\D/g, '').endsWith(cleanDigits) && cleanDigits.length >= 4) {
        matches.push(order);
        continue;
      }

      // 2. Busca por E-mail
      if (isEmail) {
        const cEmail = (order.customer?.email || order.payer?.email || '').toLowerCase();
        if (cEmail === lowerEmail || cEmail.includes(lowerEmail)) {
          matches.push(order);
          continue;
        }
      }

      // 3. Busca por CPF ou Telefone (apenas números)
      if (cleanDigits.length >= 7) {
        const cCpf = (order.customer?.cpf || order.payer?.cpf || '').replace(/\D/g, '');
        const cPhone = (order.customer?.phone || order.payer?.phone || '').replace(/\D/g, '');

        if (cCpf && (cCpf.includes(cleanDigits) || cleanDigits.includes(cCpf))) {
          matches.push(order);
          continue;
        }

        if (cPhone && (cPhone.includes(cleanDigits) || cleanDigits.includes(cPhone))) {
          matches.push(order);
          continue;
        }
      }
    }

    // Ordena do mais recente para o mais antigo
    matches.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return matches;
  }

  /**
   * Atualiza o status de entrega / expedição do pedido
   */
  updateShippingStatus(orderId, shippingStatus, trackingCode = null) {
    const order = this.orders.get(orderId);
    if (!order) return null;

    order.shipping_status = shippingStatus;
    if (trackingCode) order.tracking_code = String(trackingCode).trim().toUpperCase();
    order.updated_at = new Date().toISOString();

    this.orders.set(orderId, order);
    this._save();
    console.log(`[OrderRepository] Expedição do pedido ${orderId}: ${shippingStatus} | Rastreio: ${order.tracking_code || 'N/A'}`);
    return order;
  }

  /**
   * Retorna os pedidos mais recentes para consulta
   */
  listRecentOrders(limit = 20) {
    const all = Array.from(this.orders.values());
    all.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return all.slice(0, limit);
  }
}


// Singleton
module.exports = new OrderRepository();
