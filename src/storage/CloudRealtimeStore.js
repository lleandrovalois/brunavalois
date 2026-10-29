/**
 * Bruna Valois Joias - Repositório Central em Nuvem & Broker de Sincronização em Tempo Real
 * Implementa topologia Firestore-compatible (/artifacts/{appId}/public/data/{collection}/{docId})
 * com persistência atômica em disco e transmissão reativa multi-dispositivo (SSE / Realtime Push).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.resolve(__dirname, '../../data');
const CLOUD_STORE_FILE = path.join(DATA_DIR, 'cloud_store.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DEFAULT_APP_ID = 'bruna-valois-joias';

const DEFAULT_SITE_CONFIG = {
  theme: {
    preset: 'classic',
    colorPrimary: '#1C1917',
    colorAccent: '#C5A059',
    colorBg: '#FAF9F6',
    colorCardBg: '#FFFFFF',
    colorText: '#1C1917',
    fontFamily: 'playfair'
  },
  content: {
    topAnnouncement: '✨ Frete Grátis com Seguro em compras acima de R$ 450 | Certificado de Garantia Eterna',
    heroTitle: 'O Brilho da Perfeição em Cada Detalhe',
    heroSubtitle: 'Criações autorais em Ouro 18k, diamantes e gemas raras forjadas para eternizar os momentos mais sublimes da sua vida.',
    heroImage: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1600&q=85',
    aboutBrand: 'Fundada com a vocação de redefinir o conceito de elegância e manufatura de joias finas, a Bruna Valois combina técnicas ancestrais da ourivesaria clássica com a sofisticação do design contemporâneo. Cada peça é criada para refletir autenticidade, poder e requinte.',
    whatsappNumber: '5511999999999'
  },
  payment: {
    checkoutUrl: '',
    publicKey: 'APP_USR-13f63464-940d-4c81-81b7-a908294bfdea',
    accessToken: '',
    environment: 'sandbox',
    maxInstallmentsWithoutInterest: 10,
    pixKey: '45.892.102/0001-44'
  },
  initialSeedCompleted: true,
  updatedAt: new Date().toISOString()
};

const INITIAL_PRODUCTS = [
  {
    id: 'bv-001',
    name: 'Anel Solitário Étoile Ouro Branco 18k com Diamante 1.2ct',
    category: 'Anéis',
    price: 8900.00,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    tag: 'Alta Joalheria',
    material: 'Ouro Branco 18k (750) com Diamante Natural Brilhante',
    description: 'Lapidação brilhante com garra sutil em Ouro Branco maciço 18k. Design atemporal para noivados e celebrações inesquecíveis.',
    createdAt: '2026-10-28T10:00:01.000Z'
  },
  {
    id: 'bv-002',
    name: 'Colar Riviera Serena com Esmeraldas Colombianas e Brilhantes',
    category: 'Colares',
    price: 14500.00,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    tag: 'Edição Limitada',
    material: 'Ouro Amarelo 18k e Esmeraldas Naturais de Muzo',
    description: 'Rara seleção de esmeraldas colombianas lapidadas à mão, intercaladas por microdiamantes com fecho gaveta e trava dupla de segurança.',
    createdAt: '2026-10-28T10:00:02.000Z'
  },
  {
    id: 'bv-003',
    name: 'Brincos Cascata de Pérolas Barrocas e Topázio Imperial',
    category: 'Brincos',
    price: 1850.00,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    tag: 'Lançamento',
    material: 'Prata 925 com Banho Ouro 18k (20 milésimos)',
    description: 'Pérolas barrocas naturais dos mares do sul com movimento orgânico gracioso e gemas de topázio imperial lapidadas.',
    createdAt: '2026-10-28T10:00:03.000Z'
  },
  {
    id: 'bv-004',
    name: 'Aliança Eternidade Royale Cravejada de Moissanite Flawless',
    category: 'Anéis',
    price: 3200.00,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
    tag: 'Best Seller',
    material: 'Ouro Amarelo 18k com Moissanites D-Color VVS1',
    description: 'Cravação em canaleta circular contínua simbolizando amor eterno. Moissanites com fogo e brilho ótico superior ao diamante.',
    createdAt: '2026-10-28T10:00:04.000Z'
  },
  {
    id: 'bv-005',
    name: 'Gargantilha Choker Trançada Ouro Amarelo 18k Maciço',
    category: 'Colares',
    price: 6780.00,
    image: 'https://images.unsplash.com/photo-1611591475152-47354c8d0a45?auto=format&fit=crop&w=800&q=80',
    tag: 'Coleção Ouro 18k',
    material: 'Ouro Amarelo 18k (750) Maciço Italiano',
    description: 'Malha trançada de ourivesaria florentina com caimento anatômico suave no colo e acabamento espelhado de alto polimento.',
    createdAt: '2026-10-28T10:00:05.000Z'
  },
  {
    id: 'bv-006',
    name: 'Pulseira Tênis Lumière Diamantes Zircônia Premium AAA+',
    category: 'Pulseiras',
    price: 890.00,
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
    tag: 'Semijoia Fina',
    material: 'Semijoia Alta Fusão com Banho Ouro 18k',
    description: 'A clássica pulseira tênis com pedras selecionadas de zircônia cúbica AAA+ lapidação brilhante. Fecho de joalheria com duas travas.',
    createdAt: '2026-10-28T10:00:06.000Z'
  },
  {
    id: 'bv-007',
    name: 'Brincos Ear Cuff Constellation com Safiras Azuis e Diamantes',
    category: 'Brincos',
    price: 2490.00,
    image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80',
    tag: 'Alta Joalheria',
    material: 'Ouro Branco 18k e Safiras Azuis Naturais',
    description: 'Design escultural que acompanha o contorno da orelha com gradiente de safiras azuis celestes e diamantes estelares.',
    createdAt: '2026-10-28T10:00:07.000Z'
  },
  {
    id: 'bv-008',
    name: 'Bracelete Rígido Imperial com Fecho Joia e Mola Oculta',
    category: 'Pulseiras',
    price: 5450.00,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    tag: 'Coleção Ouro 18k',
    material: 'Ouro Rosé 18k (750)',
    description: 'Bracelete rígido anatômico em Ouro Rosé 18k. Design minimalista com proporção imponente e fecho de encaixe invisível.',
    createdAt: '2026-10-28T10:00:08.000Z'
  }
];

const INITIAL_CUSTOM_ORDERS = [
  {
    id: 'AT-8912',
    nome: 'Mariana Mendonça',
    whatsapp: '(11) 98765-4321',
    tipo: 'Anel Solitário',
    metal: 'Ouro 18k Amarelo (750)',
    gema: 'Diamante Natural Certificado',
    aro: 'Aro 15',
    orcamento: 'R$ 6.000 a R$ 15.000',
    prazo: '2026-11-20',
    descricao: 'Anel de noivado para pedido surpresa em Paris. Preferência por aro fino acetinado e diamante de 0.8ct redondo.',
    link: 'https://pinterest.com/pin/example1',
    status: 'Orçamento Enviado',
    data: '27/10/2026 15:40',
    createdAt: '2026-10-27T15:40:00.000Z'
  },
  {
    id: 'AT-8913',
    nome: 'Rodrigo Alcantara',
    whatsapp: '(21) 99123-8877',
    tipo: 'Alianças de Casamento',
    metal: 'Ouro 18k Branco (750)',
    gema: 'Sem Pedras (Apenas Metal)',
    aro: 'Aros 18 e 24',
    orcamento: 'R$ 2.500 a R$ 6.000',
    prazo: '2026-12-10',
    descricao: 'Alianças abauladas confortáveis com gravação interna da constelação do dia do primeiro encontro.',
    link: '',
    status: 'Em Produção',
    data: '26/10/2026 11:15',
    createdAt: '2026-10-26T11:15:00.000Z'
  }
];

class CloudRealtimeStore {
  constructor() {
    // Estrutura: { collections: { "/artifacts/bruna-valois-joias/public/data/products": { "bv-001": { ... } } } }
    this.collections = {};
    this.sessions = new Map();
    this.clients = new Map(); // clientId -> { id, appId, res }
    this._load();
    this._startHeartbeat();
  }

  /**
   * Normaliza um caminho de coleção ou documento (ex: artifacts/appId/public/data/products)
   */
  _normalizePath(rawPath) {
    if (!rawPath) return '';
    const cleaned = String(rawPath)
      .trim()
      .replace(/\\/g, '/')
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
      .replace(/\/+/g, '/');
    return `/${cleaned}`;
  }

  /**
   * Divide um caminho de documento em { collectionPath, docId, appId, collectionName }
   */
  _parseDocPath(rawDocPath) {
    const normalized = this._normalizePath(rawDocPath);
    const segments = normalized.split('/').filter(Boolean);
    if (segments.length < 2 || segments.length % 2 !== 0) {
      throw new Error(`Caminho de documento inválido (deve ter número par de segmentos): ${normalized}`);
    }
    const docId = segments[segments.length - 1];
    const collectionName = segments[segments.length - 2];
    const collectionPath = '/' + segments.slice(0, -1).join('/');
    const appId = segments[0] === 'artifacts' && segments[1] ? segments[1] : DEFAULT_APP_ID;
    return { normalized, collectionPath, docId, collectionName, appId };
  }

  /**
   * Analisa um caminho de coleção em { collectionPath, collectionName, appId }
   */
  _parseCollectionPath(rawColPath) {
    const normalized = this._normalizePath(rawColPath);
    const segments = normalized.split('/').filter(Boolean);
    if (segments.length === 0 || segments.length % 2 === 0) {
      throw new Error(`Caminho de coleção inválido (deve ter número ímpar de segmentos): ${normalized}`);
    }
    const collectionName = segments[segments.length - 1];
    const appId = segments[0] === 'artifacts' && segments[1] ? segments[1] : DEFAULT_APP_ID;
    return { collectionPath: normalized, collectionName, appId };
  }

  /**
   * Carrega o banco de dados em nuvem persistido no disco
   */
  _load() {
    try {
      if (fs.existsSync(CLOUD_STORE_FILE)) {
        const raw = fs.readFileSync(CLOUD_STORE_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.collections === 'object') {
          this.collections = parsed.collections;
          console.log('[CloudRealtimeStore] ☁️ Estado global carregado do disco com sucesso.');
          return;
        }
      }
    } catch (err) {
      console.error('[CloudRealtimeStore] Erro ao carregar cloud_store.json:', err.message);
    }

    // Se o arquivo ainda não existir, inicializa estrutura vazia (o seed determinístico cuidará da população inicial)
    this.collections = {};
    this.ensureDeterministicSeed(DEFAULT_APP_ID);
  }

  /**
   * Persiste imediatamente no disco
   */
  _save() {
    try {
      const payload = {
        updatedAt: new Date().toISOString(),
        collections: this.collections
      };
      fs.writeFileSync(CLOUD_STORE_FILE, JSON.stringify(payload, null, 2), 'utf-8');
    } catch (err) {
      console.error('[CloudRealtimeStore] Erro ao salvar cloud_store.json:', err.message);
    }
  }

  /**
   * Seeding Global Determinístico para um appId caso ainda não inicializado
   */
  ensureDeterministicSeed(appId = DEFAULT_APP_ID) {
    let modified = false;
    const base = `/artifacts/${appId}/public/data`;
    const configColPath = `${base}/site_config`;
    const productsColPath = `${base}/products`;
    const ordersColPath = `${base}/custom_orders`;

    const existingMain = this.collections[configColPath] && this.collections[configColPath]['main'];
    const alreadySeeded = Boolean(existingMain && existingMain.initialSeedCompleted);

    if (!existingMain) {
      if (!this.collections[configColPath]) this.collections[configColPath] = {};
      this.collections[configColPath]['main'] = JSON.parse(JSON.stringify(DEFAULT_SITE_CONFIG));
      modified = true;
    } else if (!existingMain.initialSeedCompleted) {
      existingMain.initialSeedCompleted = true;
      modified = true;
    }

    if (!alreadySeeded && (!this.collections[productsColPath] || Object.keys(this.collections[productsColPath]).length === 0)) {
      this.collections[productsColPath] = {};
      for (const prod of INITIAL_PRODUCTS) {
        this.collections[productsColPath][prod.id] = { ...prod };
      }
      modified = true;
    } else if (!this.collections[productsColPath]) {
      this.collections[productsColPath] = {};
      modified = true;
    }

    if (!alreadySeeded && !this.collections[ordersColPath]) {
      this.collections[ordersColPath] = {};
      for (const order of INITIAL_CUSTOM_ORDERS) {
        this.collections[ordersColPath][order.id] = { ...order };
      }
      modified = true;
    } else if (!this.collections[ordersColPath]) {
      this.collections[ordersColPath] = {};
      modified = true;
    }

    if (modified) {
      this._save();
      console.log(`[CloudRealtimeStore] 🌱 Seeding global determinístico verificado para namespace: ${appId}`);
    }
  }

  /**
   * Autenticação de Sessão (Custom Token ou Anônima)
   */
  createSession(mode = 'anonymous', customToken = null) {
    const uid = mode === 'custom' && customToken
      ? `bv-admin-${crypto.createHash('sha256').update(String(customToken)).digest('hex').slice(0, 12)}`
      : `bv-anon-${crypto.randomBytes(8).toString('hex')}`;
    const token = `bvt_${crypto.randomBytes(24).toString('hex')}`;
    const session = {
      uid,
      token,
      isAnonymous: mode !== 'custom',
      createdAt: new Date().toISOString()
    };
    this.sessions.set(token, session);
    return session;
  }

  /**
   * Valida token de autenticação
   */
  verifySession(token) {
    if (!token) return null;
    // Aceita tokens emitidos na sessão atual ou tokens com prefixo canônico bvt_ (caso o container tenha reiniciado)
    if (this.sessions.has(token)) {
      return this.sessions.get(token);
    }
    if (String(token).startsWith('bvt_') && String(token).length >= 20) {
      const recovered = {
        uid: `bv-recovered-${String(token).slice(4, 12)}`,
        token,
        isAnonymous: true,
        createdAt: new Date().toISOString()
      };
      this.sessions.set(token, recovered);
      return recovered;
    }
    return null;
  }

  /**
   * Lê um documento único (getDoc)
   */
  getDoc(rawDocPath) {
    const { collectionPath, docId } = this._parseDocPath(rawDocPath);
    const col = this.collections[collectionPath] || {};
    const docData = col[docId];
    return {
      exists: Boolean(docData),
      id: docId,
      path: `${collectionPath}/${docId}`,
      data: docData ? JSON.parse(JSON.stringify(docData)) : null
    };
  }

  /**
   * Lê todos os documentos de uma coleção (getDocs)
   */
  getDocs(rawColPath) {
    const { collectionPath } = this._parseCollectionPath(rawColPath);
    const col = this.collections[collectionPath] || {};
    const docs = Object.entries(col).map(([id, data]) => ({
      id,
      data: JSON.parse(JSON.stringify(data))
    }));
    return {
      empty: docs.length === 0,
      size: docs.length,
      path: collectionPath,
      docs
    };
  }

  /**
   * Cria ou sobrescreve/mescla um documento (setDoc)
   */
  setDoc(rawDocPath, payload, options = { merge: false }) {
    const { collectionPath, docId, appId, collectionName } = this._parseDocPath(rawDocPath);
    if (!this.collections[collectionPath]) {
      this.collections[collectionPath] = {};
    }

    const existing = this.collections[collectionPath][docId];
    const now = new Date().toISOString();

    let nextData;
    if (options && options.merge && existing && typeof existing === 'object') {
      nextData = this._deepMerge(existing, payload);
    } else {
      nextData = { ...payload };
    }

    nextData.id = nextData.id || docId;
    nextData.updatedAt = now;
    if (!nextData.createdAt) {
      nextData.createdAt = existing?.createdAt || now;
    }

    this.collections[collectionPath][docId] = nextData;
    this._save();

    // Dispara notificação em tempo real para todos os clientes conectados
    this._broadcastChange(appId, collectionPath, collectionName, docId);

    return {
      id: docId,
      path: `${collectionPath}/${docId}`,
      data: JSON.parse(JSON.stringify(nextData))
    };
  }

  /**
   * Atualiza campos parciais de um documento existente (updateDoc)
   */
  updateDoc(rawDocPath, partialPayload) {
    const { collectionPath, docId, appId, collectionName } = this._parseDocPath(rawDocPath);
    if (!this.collections[collectionPath] || !this.collections[collectionPath][docId]) {
      const err = new Error(`Documento não encontrado para atualização: ${collectionPath}/${docId}`);
      err.code = 'not-found';
      throw err;
    }

    const existing = this.collections[collectionPath][docId];
    const updated = this._deepMerge(existing, partialPayload);
    updated.updatedAt = new Date().toISOString();

    this.collections[collectionPath][docId] = updated;
    this._save();

    this._broadcastChange(appId, collectionPath, collectionName, docId);

    return {
      id: docId,
      path: `${collectionPath}/${docId}`,
      data: JSON.parse(JSON.stringify(updated))
    };
  }

  /**
   * Remove um documento da nuvem (deleteDoc)
   */
  deleteDoc(rawDocPath) {
    const { collectionPath, docId, appId, collectionName } = this._parseDocPath(rawDocPath);
    if (this.collections[collectionPath] && this.collections[collectionPath][docId]) {
      delete this.collections[collectionPath][docId];
      this._save();
      this._broadcastChange(appId, collectionPath, collectionName, docId);
    }
    return {
      deleted: true,
      id: docId,
      path: `${collectionPath}/${docId}`
    };
  }

  /**
   * Restaura padrões de fábrica para um appId e transmite a todos os dispositivos
   */
  resetToDefaults(appId = DEFAULT_APP_ID) {
    const base = `/artifacts/${appId}/public/data`;
    const configColPath = `${base}/site_config`;
    const productsColPath = `${base}/products`;
    const ordersColPath = `${base}/custom_orders`;

    this.collections[configColPath] = {
      main: JSON.parse(JSON.stringify(DEFAULT_SITE_CONFIG))
    };

    this.collections[productsColPath] = {};
    for (const prod of INITIAL_PRODUCTS) {
      this.collections[productsColPath][prod.id] = { ...prod };
    }

    this.collections[ordersColPath] = {};
    for (const order of INITIAL_CUSTOM_ORDERS) {
      this.collections[ordersColPath][order.id] = { ...order };
    }

    this._save();

    this._broadcastChange(appId, configColPath, 'site_config', 'main');
    this._broadcastChange(appId, productsColPath, 'products', null);
    this._broadcastChange(appId, ordersColPath, 'custom_orders', null);

    return { success: true };
  }

  /**
   * Registra um cliente SSE para escuta em tempo real (onSnapshot)
   */
  registerRealtimeClient(appId, res) {
    const clientId = `client_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const resolvedAppId = appId || DEFAULT_APP_ID;

    this.clients.set(clientId, {
      id: clientId,
      appId: resolvedAppId,
      res
    });

    // Envia pacote inicial de estado para hidratação imediata
    this._sendInitialSnapshotsToClient(clientId, resolvedAppId);

    return clientId;
  }

  removeRealtimeClient(clientId) {
    this.clients.delete(clientId);
  }

  _sendInitialSnapshotsToClient(clientId, appId) {
    const client = this.clients.get(clientId);
    if (!client) return;

    const base = `/artifacts/${appId}/public/data`;
    const configDoc = this.getDoc(`${base}/site_config/main`);
    const productsCol = this.getDocs(`${base}/products`);
    const ordersCol = this.getDocs(`${base}/custom_orders`);

    this._writeSseEvent(client.res, 'snapshot', {
      kind: 'doc',
      path: `${base}/site_config/main`,
      id: 'main',
      exists: configDoc.exists,
      data: configDoc.data,
      timestamp: Date.now()
    });

    this._writeSseEvent(client.res, 'snapshot', {
      kind: 'collection',
      path: `${base}/products`,
      empty: productsCol.empty,
      size: productsCol.size,
      docs: productsCol.docs,
      timestamp: Date.now()
    });

    this._writeSseEvent(client.res, 'snapshot', {
      kind: 'collection',
      path: `${base}/custom_orders`,
      empty: ordersCol.empty,
      size: ordersCol.size,
      docs: ordersCol.docs,
      timestamp: Date.now()
    });
  }

  _broadcastChange(appId, collectionPath, collectionName, docId) {
    const colSnap = this.getDocs(collectionPath);
    const docSnap = docId ? this.getDoc(`${collectionPath}/${docId}`) : null;

    for (const [clientId, client] of this.clients.entries()) {
      if (client.appId !== appId) continue;
      try {
        if (docSnap) {
          this._writeSseEvent(client.res, 'snapshot', {
            kind: 'doc',
            path: `${collectionPath}/${docId}`,
            id: docId,
            exists: docSnap.exists,
            data: docSnap.data,
            timestamp: Date.now()
          });
        }

        this._writeSseEvent(client.res, 'snapshot', {
          kind: 'collection',
          path: collectionPath,
          collectionName,
          empty: colSnap.empty,
          size: colSnap.size,
          docs: colSnap.docs,
          timestamp: Date.now()
        });
      } catch (err) {
        this.clients.delete(clientId);
      }
    }
  }

  _writeSseEvent(res, eventName, payload) {
    res.write(`event: ${eventName}\n`);
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  }

  _startHeartbeat() {
    setInterval(() => {
      for (const [clientId, client] of this.clients.entries()) {
        try {
          client.res.write(`: heartbeat ${Date.now()}\n\n`);
        } catch {
          this.clients.delete(clientId);
        }
      }
    }, 15000);
  }

  _deepMerge(target, source) {
    const output = { ...target };
    if (source && typeof source === 'object') {
      Object.keys(source).forEach((key) => {
        if (
          source[key] &&
          typeof source[key] === 'object' &&
          !Array.isArray(source[key]) &&
          target[key] &&
          typeof target[key] === 'object' &&
          !Array.isArray(target[key])
        ) {
          output[key] = this._deepMerge(target[key], source[key]);
        } else {
          output[key] = source[key];
        }
      });
    }
    return output;
  }
}

module.exports = new CloudRealtimeStore();

