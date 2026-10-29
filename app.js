/**
 * BRUNA VALOIS JOIAS E SEMIJOIAS - APLICAÇÃO DISTRIBUÍDA DE ALTA JOALHERIA
 * Arquitetura Full-Stack com Persistência Global em Nuvem (Single Source of Truth)
 * e Sincronização Bidirecional em Tempo Real Multi-Dispositivo / Multi-Cliente
 * (Firestore Modular SDK v11+ / Cloud Realtime Stream SSE)
 */

// ================= 1. CONFIGURAÇÕES PADRÃO PARA SEEDING GLOBAL DETERMINÍSTICO =================
const DEFAULT_THEME_CONFIG = {
  preset: 'classic',
  colorPrimary: '#1C1917',
  colorAccent: '#C5A059',
  colorBg: '#FAF9F6',
  colorCardBg: '#FFFFFF',
  colorText: '#1C1917',
  fontFamily: 'playfair' // playfair, cormorant, cinzel
};

const THEME_PRESETS = {
  classic: {
    colorPrimary: '#1C1917',
    colorAccent: '#C5A059',
    colorBg: '#FAF9F6',
    colorCardBg: '#FFFFFF',
    colorText: '#1C1917',
    fontFamily: 'playfair'
  },
  rose: {
    colorPrimary: '#2E282A',
    colorAccent: '#C07A76',
    colorBg: '#FFF9F9',
    colorCardBg: '#FFFFFF',
    colorText: '#2E282A',
    fontFamily: 'cormorant'
  },
  emerald: {
    colorPrimary: '#062C22',
    colorAccent: '#D4AF37',
    colorBg: '#F4F9F6',
    colorCardBg: '#FFFFFF',
    colorText: '#062C22',
    fontFamily: 'playfair'
  },
  champagne: {
    colorPrimary: '#0F0F11',
    colorAccent: '#E5C158',
    colorBg: '#18181B',
    colorCardBg: '#27272A',
    colorText: '#F7F6F2',
    fontFamily: 'cormorant'
  }
};

const DEFAULT_CONTENT_CONFIG = {
  topAnnouncement: '✨ Frete Grátis com Seguro em compras acima de R$ 450 | Certificado de Garantia Eterna',
  heroTitle: 'O Brilho da Perfeição em Cada Detalhe',
  heroSubtitle: 'Criações autorais em Ouro 18k, diamantes e gemas raras forjadas para eternizar os momentos mais sublimes da sua vida.',
  heroImage: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1600&q=85',
  aboutBrand: 'Fundada com a vocação de redefinir o conceito de elegância e manufatura de joias finas, a Bruna Valois combina técnicas ancestrais da ourivesaria clássica com a sofisticação do design contemporâneo. Cada peça é criada para refletir autenticidade, poder e requinte.',
  whatsappNumber: '5511999999999'
};

const DEFAULT_PAYMENT_CONFIG = {
  checkoutUrl: '',
  publicKey: 'APP_USR-13f63464-940d-4c81-81b7-a908294bfdea',
  accessToken: '',
  environment: 'sandbox',
  maxInstallmentsWithoutInterest: 10,
  pixKey: '45.892.102/0001-44'
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

const INITIAL_CATEGORIES = [
  {
    id: 'cat-colares',
    name: 'Colares',
    slug: 'colares',
    description: 'Rivieras, gargantilhas, chokers e colares de alta joalheria.',
    isActive: true,
    createdAt: '2026-10-28T09:00:01.000Z'
  },
  {
    id: 'cat-brincos',
    name: 'Brincos',
    slug: 'brincos',
    description: 'Brincos clássicos, ear cuffs e cascatas cravejadas.',
    isActive: true,
    createdAt: '2026-10-28T09:00:02.000Z'
  },
  {
    id: 'cat-aneis',
    name: 'Anéis',
    slug: 'aneis',
    description: 'Solitários, aparadores e anéis autorais em Ouro 18k e gemas naturais.',
    isActive: true,
    createdAt: '2026-10-28T09:00:03.000Z'
  },
  {
    id: 'cat-pulseiras',
    name: 'Pulseiras',
    slug: 'pulseiras',
    description: 'Pulseiras tênis, braceletes rígidos e malhas nobres.',
    isActive: true,
    createdAt: '2026-10-28T09:00:04.000Z'
  },
  {
    id: 'cat-aliancas',
    name: 'Alianças',
    slug: 'aliancas',
    description: 'Alianças de casamento, noivado e bodas sob medida.',
    isActive: true,
    createdAt: '2026-10-28T09:00:05.000Z'
  },
  {
    id: 'cat-ouro-18k',
    name: 'Coleção Ouro 18k',
    slug: 'colecao-ouro-18k',
    description: 'Peças exclusivas confeccionadas em Ouro 18k (750) maciço.',
    isActive: true,
    createdAt: '2026-10-28T09:00:06.000Z'
  }
];

const INITIAL_ATELIE_ORDERS = [
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

// ================= 2. ESTADO REATIVO ORIENTADO À NUVEM (SINGLE SOURCE OF TRUTH) =================
// Proibida qualquer mutação local desvinculada do banco em nuvem.
// As coleções globais abaixo são exclusivamente hidratadas via onSnapshot da nuvem:
const appId = (typeof __app_id !== 'undefined' && __app_id) ? String(__app_id) : 'bruna-valois-joias';

const CloudState = {
  theme: { ...DEFAULT_THEME_CONFIG },
  content: { ...DEFAULT_CONTENT_CONFIG },
  payment: { ...DEFAULT_PAYMENT_CONFIG },
  categories: [],
  products: [],
  customOrders: [],
  isAuthenticated: false,
  isConnected: false,
  currentUser: null
};

// Sacola de compras do cliente (estado local da sessão de compra do visitante)
const Storage = {
  getTheme: () => CloudState.theme,
  getContent: () => CloudState.content,
  getPayment: () => CloudState.payment,
  getCategories: () => CloudState.categories,
  getProducts: () => CloudState.products,
  getAtelieOrders: () => CloudState.customOrders,

  getCart: () => {
    try {
      return JSON.parse(localStorage.getItem('BV_CART')) || [];
    } catch {
      return [];
    }
  },
  setCart: (data) => {
    try {
      localStorage.setItem('BV_CART', JSON.stringify(data));
    } catch {}
  },
  saveCart: (data) => {
    try {
      localStorage.setItem('BV_CART', JSON.stringify(data));
    } catch {}
  }
};

// ================= 3. CAMADA DE PERSISTÊNCIA EM NUVEM & SDK MODULAR (FIRESTORE v11+ / CLOUD REALTIME) =================
/**
 * Provedor Híbrido Unificado:
 * - Quando __firebase_config está presente no ambiente, utiliza o Firebase Modular SDK v11+ oficial
 *   (initializeApp, getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged,
 *    getFirestore, doc, collection, getDoc, getDocs, setDoc, updateDoc, deleteDoc, onSnapshot).
 * - Quando executado no servidor central Node.js/Docker (ex: https://brunavalois.klynner.com.br),
 *   executa a mesma interface modular sobre o motor Realtime Cloud Server (/api/cloud + SSE Stream)
 *   compartilhado entre todos os computadores, celulares e navegadores conectados.
 */
let db = null;
let auth = null;
let firebaseNativeSdk = null;
let sseEventSource = null;
let sseReconnectTimer = null;
const activeListeners = new Map(); // listenerId -> { ref, onNext, onError }
const authStateSubscribers = new Set();

function hasValidFirebaseEnvConfig() {
  try {
    const raw = (typeof __firebase_config !== 'undefined' && __firebase_config)
      ? __firebase_config
      : window.__firebase_config;
    if (!raw) return false;
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return Boolean(parsed && parsed.apiKey && parsed.projectId);
  } catch {
    return false;
  }
}

async function loadFirebaseModularSdkIfConfigured() {
  if (!hasValidFirebaseEnvConfig()) return null;
  try {
    const raw = (typeof __firebase_config !== 'undefined' && __firebase_config)
      ? __firebase_config
      : window.__firebase_config;
    const firebaseConfig = typeof raw === 'string' ? JSON.parse(raw) : raw;

    const [appMod, authMod, firestoreMod] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js')
    ]);

    const firebaseApp = appMod.initializeApp(firebaseConfig);
    const firebaseAuth = authMod.getAuth(firebaseApp);
    const firebaseDb = firestoreMod.getFirestore(firebaseApp);

    return {
      mode: 'firebase-v11',
      app: firebaseApp,
      auth: firebaseAuth,
      db: firebaseDb,
      ...authMod,
      ...firestoreMod
    };
  } catch (err) {
    console.warn('[CloudSDK] Falha ao carregar Firebase externo; utilizando motor Cloud Server central:', err.message);
    return null;
  }
}

// Implementação das primitivas Modulares (compatíveis 1:1 com Firestore Modular SDK v11+)
function doc(database, ...pathSegments) {
  if (firebaseNativeSdk && database === firebaseNativeSdk.db) {
    return firebaseNativeSdk.doc(database, ...pathSegments);
  }
  const normalizedPath = '/' + pathSegments
    .map(s => String(s).replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/');
  const parts = normalizedPath.split('/').filter(Boolean);
  return {
    _type: 'doc',
    id: parts[parts.length - 1],
    path: normalizedPath
  };
}

function collection(database, ...pathSegments) {
  if (firebaseNativeSdk && database === firebaseNativeSdk.db) {
    return firebaseNativeSdk.collection(database, ...pathSegments);
  }
  const normalizedPath = '/' + pathSegments
    .map(s => String(s).replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/');
  const parts = normalizedPath.split('/').filter(Boolean);
  return {
    _type: 'collection',
    id: parts[parts.length - 1],
    path: normalizedPath
  };
}

function ensureCloudAuthenticated() {
  if (!CloudState.isAuthenticated || !CloudState.currentUser) {
    const error = new Error('Operação bloqueada: Handshake de autenticação com o banco em nuvem ainda não foi concluído.');
    error.code = 'permission-denied';
    throw error;
  }
}

async function signInWithCustomToken(authInstance, customToken) {
  if (firebaseNativeSdk && authInstance === firebaseNativeSdk.auth) {
    return await firebaseNativeSdk.signInWithCustomToken(authInstance, customToken);
  }
  const res = await fetch('/api/cloud/auth/custom-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customToken })
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    const err = new Error(json.message || 'Falha na autenticação com token customizado.');
    err.code = json.code || 'auth/invalid-custom-token';
    throw err;
  }
  CloudState.currentUser = json.user;
  CloudState.isAuthenticated = true;
  notifyAuthStateSubscribers(json.user);
  return { user: json.user };
}

async function signInAnonymously(authInstance) {
  if (firebaseNativeSdk && authInstance === firebaseNativeSdk.auth) {
    return await firebaseNativeSdk.signInAnonymously(authInstance);
  }
  const res = await fetch('/api/cloud/auth/anonymous', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    const err = new Error(json.message || 'Falha na autenticação anônima no banco central.');
    err.code = json.code || 'auth/operation-not-allowed';
    throw err;
  }
  CloudState.currentUser = json.user;
  CloudState.isAuthenticated = true;
  notifyAuthStateSubscribers(json.user);
  return { user: json.user };
}

function onAuthStateChanged(authInstance, callback) {
  if (firebaseNativeSdk && authInstance === firebaseNativeSdk.auth) {
    return firebaseNativeSdk.onAuthStateChanged(authInstance, callback);
  }
  authStateSubscribers.add(callback);
  if (CloudState.currentUser) {
    setTimeout(() => callback(CloudState.currentUser), 0);
  }
  return () => authStateSubscribers.delete(callback);
}

function notifyAuthStateSubscribers(user) {
  for (const cb of authStateSubscribers) {
    try {
      cb(user);
    } catch (err) {
      console.error('[CloudAuth] Erro no callback onAuthStateChanged:', err);
    }
  }
}

function getCloudAuthHeaders() {
  ensureCloudAuthenticated();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CloudState.currentUser.token}`
  };
}

async function getDoc(docRef) {
  ensureCloudAuthenticated();
  if (firebaseNativeSdk && !docRef._type) {
    return await firebaseNativeSdk.getDoc(docRef);
  }
  const res = await fetch(`/api/cloud/doc?path=${encodeURIComponent(docRef.path)}&_t=${Date.now()}`, {
    method: 'GET',
    cache: 'no-store',
    headers: getCloudAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    const err = new Error(json.message || 'Erro ao ler documento da nuvem.');
    err.code = json.code || 'permission-denied';
    throw err;
  }
  return {
    id: json.id,
    exists: () => Boolean(json.exists),
    data: () => json.data
  };
}

async function getDocs(colRef) {
  ensureCloudAuthenticated();
  if (firebaseNativeSdk && !colRef._type) {
    return await firebaseNativeSdk.getDocs(colRef);
  }
  const res = await fetch(`/api/cloud/collection?path=${encodeURIComponent(colRef.path)}&_t=${Date.now()}`, {
    method: 'GET',
    cache: 'no-store',
    headers: getCloudAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    const err = new Error(json.message || 'Erro ao ler coleção da nuvem.');
    err.code = json.code || 'permission-denied';
    throw err;
  }
  const docSnapshots = (json.docs || []).map(d => ({
    id: d.id,
    exists: () => true,
    data: () => d.data
  }));
  return {
    empty: Boolean(json.empty),
    size: Number(json.size || docSnapshots.length),
    docs: docSnapshots,
    forEach: (cb) => docSnapshots.forEach(cb)
  };
}

async function refreshActiveListenersForPath(docPath) {
  if (firebaseNativeSdk) return;
  const normalized = '/' + String(docPath || '').replace(/^\/+/, '');
  const segments = normalized.split('/').filter(Boolean);
  const collectionPath = segments.length >= 2 ? '/' + segments.slice(0, -1).join('/') : '';

  for (const [, listener] of activeListeners.entries()) {
    const { ref, onNext } = listener;
    try {
      if (ref._type === 'doc' && ref.path === normalized) {
        const snap = await getDoc(ref);
        onNext(snap);
      } else if (ref._type === 'collection' && ref.path === collectionPath) {
        const snap = await getDocs(ref);
        onNext(snap);
      }
    } catch {}
  }
}

async function setDoc(docRef, payload, options = { merge: false }) {
  ensureCloudAuthenticated();
  if (firebaseNativeSdk && !docRef._type) {
    return await firebaseNativeSdk.setDoc(docRef, payload, options);
  }
  const res = await fetch('/api/cloud/doc', {
    method: 'PUT',
    cache: 'no-store',
    headers: getCloudAuthHeaders(),
    body: JSON.stringify({
      path: docRef.path,
      data: payload,
      options
    })
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    const err = new Error(json.message || 'Falha ao gravar documento no banco em nuvem.');
    err.code = json.code || 'permission-denied';
    throw err;
  }
  await refreshActiveListenersForPath(docRef.path);
  return json;
}

async function updateDoc(docRef, partialData) {
  ensureCloudAuthenticated();
  if (firebaseNativeSdk && !docRef._type) {
    return await firebaseNativeSdk.updateDoc(docRef, partialData);
  }
  const res = await fetch('/api/cloud/doc', {
    method: 'PATCH',
    cache: 'no-store',
    headers: getCloudAuthHeaders(),
    body: JSON.stringify({
      path: docRef.path,
      data: partialData
    })
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    const err = new Error(json.message || 'Falha ao atualizar documento no banco em nuvem.');
    err.code = json.code || 'permission-denied';
    throw err;
  }
  await refreshActiveListenersForPath(docRef.path);
  return json;
}

async function deleteDoc(docRef) {
  ensureCloudAuthenticated();
  if (firebaseNativeSdk && !docRef._type) {
    return await firebaseNativeSdk.deleteDoc(docRef);
  }
  const res = await fetch(`/api/cloud/doc?path=${encodeURIComponent(docRef.path)}`, {
    method: 'DELETE',
    cache: 'no-store',
    headers: getCloudAuthHeaders()
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    const err = new Error(json.message || 'Falha ao excluir documento no banco em nuvem.');
    err.code = json.code || 'permission-denied';
    throw err;
  }
  await refreshActiveListenersForPath(docRef.path);
  return json;
}

function onSnapshot(targetRef, onNext, onError) {
  ensureCloudAuthenticated();
  if (firebaseNativeSdk && !targetRef._type) {
    return firebaseNativeSdk.onSnapshot(targetRef, onNext, onError);
  }

  const listenerId = `lst_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  activeListeners.set(listenerId, {
    ref: targetRef,
    onNext,
    onError
  });

  // Garante que o canal SSE em tempo real esteja conectado
  ensureRealtimeStreamConnected();

  // Hidratação imediata na assinatura do listener
  if (targetRef._type === 'doc') {
    getDoc(targetRef).then(snap => onNext(snap)).catch(err => {
      if (onError) onError(err);
    });
  } else if (targetRef._type === 'collection') {
    getDocs(targetRef).then(snap => onNext(snap)).catch(err => {
      if (onError) onError(err);
    });
  }

  return () => {
    activeListeners.delete(listenerId);
  };
}

function ensureRealtimeStreamConnected() {
  if (firebaseNativeSdk) return;
  if (sseEventSource && sseEventSource.readyState !== EventSource.CLOSED) return;
  if (!CloudState.isAuthenticated || !CloudState.currentUser?.token) return;

  const streamUrl = `/api/cloud/stream?appId=${encodeURIComponent(appId)}&token=${encodeURIComponent(CloudState.currentUser.token)}`;
  sseEventSource = new EventSource(streamUrl);

  sseEventSource.addEventListener('connected', () => {
    updateCloudConnectionStatus('connected');
    hideCloudPermissionError();
  });

  sseEventSource.addEventListener('snapshot', (event) => {
    updateCloudConnectionStatus('connected');
    try {
      const payload = JSON.parse(event.data);
      dispatchRealtimeSnapshotToListeners(payload);
    } catch (err) {
      console.error('[CloudRealtime] Erro ao processar pacote snapshot:', err);
    }
  });

  sseEventSource.onerror = () => {
    updateCloudConnectionStatus('reconnecting');
    if (sseEventSource) {
      sseEventSource.close();
      sseEventSource = null;
    }
    if (sseReconnectTimer) clearTimeout(sseReconnectTimer);
    sseReconnectTimer = setTimeout(() => {
      ensureRealtimeStreamConnected();
    }, 2500);
  };
}

function dispatchRealtimeSnapshotToListeners(payload) {
  for (const [, listener] of activeListeners.entries()) {
    const { ref, onNext } = listener;
    if (payload.kind === 'doc' && ref._type === 'doc' && ref.path === payload.path) {
      const docSnap = {
        id: payload.id,
        exists: () => Boolean(payload.exists),
        data: () => payload.data
      };
      onNext(docSnap);
    } else if (payload.kind === 'collection' && ref._type === 'collection' && ref.path === payload.path) {
      const docSnapshots = (payload.docs || []).map(d => ({
        id: d.id,
        exists: () => true,
        data: () => d.data
      }));
      const colSnap = {
        empty: Boolean(payload.empty),
        size: Number(payload.size || docSnapshots.length),
        docs: docSnapshots,
        forEach: (cb) => docSnapshots.forEach(cb)
      };
      onNext(colSnap);
    }
  }
}

// ================= 4. INDICADOR VISUAL DE CONECTIVIDADE E TRATAMENTO DE ERROS =================
function updateCloudConnectionStatus(status) {
  const isConnected = status === 'connected';
  CloudState.isConnected = isConnected;

  const connectedText = 'Sincronizado na Nuvem (Tempo Real Global)';
  const disconnectedText = 'Tentando restabelecer conexão com o banco central...';
  const labelText = isConnected ? connectedText : disconnectedText;

  // 1. Indicador na Barra Superior
  const badgeTop = document.getElementById('cloudSyncBadgeTop');
  const dotTop = document.getElementById('cloudSyncDotTop');
  const textTop = document.getElementById('cloudSyncTextTop');
  if (badgeTop && dotTop && textTop) {
    textTop.innerText = labelText;
    if (isConnected) {
      badgeTop.className = 'inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] font-semibold tracking-wider transition-all duration-300';
      dotTop.className = 'w-2 h-2 rounded-full bg-emerald-400 pulse-beacon';
    } else {
      badgeTop.className = 'inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-950/90 border border-amber-500/40 text-amber-300 text-[10px] font-semibold tracking-wider transition-all duration-300';
      dotTop.className = 'w-2 h-2 rounded-full bg-amber-400 animate-ping';
    }
  }

  // 2. Indicador Acima da Vitrine
  const badgeVitrine = document.getElementById('cloudSyncBadgeVitrine');
  const dotVitrine = document.getElementById('cloudSyncDotVitrine');
  const textVitrine = document.getElementById('cloudSyncTextVitrine');
  if (badgeVitrine && dotVitrine && textVitrine) {
    textVitrine.innerText = labelText;
    if (isConnected) {
      badgeVitrine.className = 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-semibold mb-4 shadow-sm transition-all duration-300';
      dotVitrine.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 pulse-beacon';
    } else {
      badgeVitrine.className = 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[11px] font-semibold mb-4 shadow-sm transition-all duration-300';
      dotVitrine.className = 'w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping';
    }
  }

  // 3. Indicador no Header do Painel CMS
  const dotCms = document.getElementById('cloudSyncDotCms');
  const textCms = document.getElementById('cloudSyncTextCms');
  if (dotCms && textCms) {
    textCms.innerText = labelText;
    dotCms.className = isConnected
      ? 'w-2 h-2 rounded-full bg-emerald-500 pulse-beacon'
      : 'w-2 h-2 rounded-full bg-amber-500 animate-ping';
  }
}

function showCloudPermissionError(contextLabel, error) {
  console.error(`[CloudSecurity] Erro em "${contextLabel}":`, error);
  updateCloudConnectionStatus('reconnecting');

  const banner = document.getElementById('cloudPermissionAlertBanner');
  const textEl = document.getElementById('cloudPermissionAlertText');
  const msg = `Erro de sincronização na nuvem (${contextLabel}): ${error?.message || 'Permissão negada ou falha de rede'}. Nenhuma mutação local foi realizada.`;

  if (banner && textEl) {
    textEl.innerText = msg;
    banner.classList.remove('hidden');
  }
  showToast(msg, 'fa-exclamation-triangle');
}

function hideCloudPermissionError() {
  const banner = document.getElementById('cloudPermissionAlertBanner');
  if (banner) banner.classList.add('hidden');
}

// ================= 5. SEEDING GLOBAL DETERMINÍSTICO & LISTENERS EM TEMPO REAL =================
let realtimeWatchdogTimer = null;

function clearLegacyLocalStorageKeys() {
  try {
    localStorage.removeItem('BV_PRODUCTS');
    localStorage.removeItem('BV_THEME_CONFIG');
    localStorage.removeItem('BV_CONTENT_CONFIG');
    localStorage.removeItem('BV_PAYMENT_CONFIG');
    localStorage.removeItem('BV_ATELIE_ORDERS');
  } catch {}
}

async function seedInitialCloudData() {
  ensureCloudAuthenticated();
  clearLegacyLocalStorageKeys();

  const configDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'site_config', 'main');
  const categoriesColRef = collection(db, 'artifacts', appId, 'public', 'data', 'categories');
  const productsColRef = collection(db, 'artifacts', appId, 'public', 'data', 'products');
  const ordersColRef = collection(db, 'artifacts', appId, 'public', 'data', 'custom_orders');

  // Executa o seed inicial SOMENTE na primeira criação absoluta do banco (quando site_config/main ainda não existe).
  // Assim, se a administradora excluir todas as joias do catálogo, elas permanecerão excluídas ao recarregar a página.
  const configSnap = await getDoc(configDocRef);

  if (!configSnap.exists()) {
    await setDoc(configDocRef, {
      theme: DEFAULT_THEME_CONFIG,
      content: DEFAULT_CONTENT_CONFIG,
      payment: DEFAULT_PAYMENT_CONFIG,
      initialSeedCompleted: true,
      categoriesSeeded: true,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    const categoriesSnap = await getDocs(categoriesColRef);
    if (categoriesSnap.empty) {
      for (const cat of INITIAL_CATEGORIES) {
        const catDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'categories', cat.id);
        await setDoc(catDocRef, cat, { merge: true });
      }
    }

    const productsSnap = await getDocs(productsColRef);
    if (productsSnap.empty) {
      for (const product of INITIAL_PRODUCTS) {
        const prodDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'products', product.id);
        await setDoc(prodDocRef, product, { merge: true });
      }
    }

    const ordersSnap = await getDocs(ordersColRef);
    if (ordersSnap.empty) {
      for (const order of INITIAL_ATELIE_ORDERS) {
        const orderDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'custom_orders', order.id);
        await setDoc(orderDocRef, order, { merge: true });
      }
    }
  } else if (!configSnap.data()?.categoriesSeeded) {
    // Caso o banco já existisse antes do módulo de categorias, popula as categorias padrões uma única vez
    const categoriesSnap = await getDocs(categoriesColRef);
    if (categoriesSnap.empty) {
      for (const cat of INITIAL_CATEGORIES) {
        const catDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'categories', cat.id);
        await setDoc(catDocRef, cat, { merge: true });
      }
    }
    await setDoc(configDocRef, { categoriesSeeded: true }, { merge: true });
  }
}

function startRealtimeSyncWatchdog() {
  if (firebaseNativeSdk) return;
  if (realtimeWatchdogTimer) clearInterval(realtimeWatchdogTimer);

  realtimeWatchdogTimer = setInterval(async () => {
    if (!CloudState.isAuthenticated || activeListeners.size === 0) return;
    for (const [, listener] of activeListeners.entries()) {
      const { ref, onNext } = listener;
      try {
        if (ref._type === 'doc') {
          const snap = await getDoc(ref);
          onNext(snap);
        } else if (ref._type === 'collection') {
          const snap = await getDocs(ref);
          onNext(snap);
        }
      } catch {}
    }
  }, 3000);
}

function setupRealtimeListeners() {
  ensureCloudAuthenticated();

  const configDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'site_config', 'main');
  const categoriesColRef = collection(db, 'artifacts', appId, 'public', 'data', 'categories');
  const productsColRef = collection(db, 'artifacts', appId, 'public', 'data', 'products');
  const customOrdersColRef = collection(db, 'artifacts', appId, 'public', 'data', 'custom_orders');

  // 1. Ouvinte Contínuo: Documento Mestre de Configuração (site_config/main)
  onSnapshot(
    configDocRef,
    (docSnap) => {
      updateCloudConnectionStatus('connected');
      if (docSnap.exists()) {
        const data = docSnap.data() || {};
        if (data.theme) {
          CloudState.theme = { ...DEFAULT_THEME_CONFIG, ...data.theme };
          applyThemeToDOM(CloudState.theme);
        }
        if (data.content) {
          CloudState.content = { ...DEFAULT_CONTENT_CONFIG, ...data.content };
          applyContentToDOM(CloudState.content);
        }
        if (data.payment) {
          CloudState.payment = { ...DEFAULT_PAYMENT_CONFIG, ...data.payment };
          applyPaymentConfigToDOM(CloudState.payment);
        }
        renderVitrine();
        renderCart();
      }
    },
    (error) => {
      showCloudPermissionError('site_config/main', error);
    }
  );

  // 2. Ouvinte Contínuo: Coleção Global de Categorias (categories)
  onSnapshot(
    categoriesColRef,
    (snapshot) => {
      updateCloudConnectionStatus('connected');
      const remoteCategories = [];
      snapshot.forEach((docSnap) => {
        const cat = docSnap.data();
        if (cat) {
          remoteCategories.push({ ...cat, id: cat.id || docSnap.id });
        }
      });

      remoteCategories.sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR'));

      CloudState.categories = remoteCategories;
      renderVitrineCategoryFilters();
      renderVitrine();
      renderCmsCategoriesTable();
      populateProductCategorySelect();
    },
    (error) => {
      showCloudPermissionError('categories', error);
    }
  );

  // 3. Ouvinte Contínuo: Coleção Global de Produtos (products)
  onSnapshot(
    productsColRef,
    (snapshot) => {
      updateCloudConnectionStatus('connected');
      const remoteProducts = [];
      snapshot.forEach((docSnap) => {
        const item = docSnap.data();
        if (item) {
          remoteProducts.push({ ...item, id: item.id || docSnap.id });
        }
      });

      // Ordena mantendo os mais recentes ou ordem determinística de catálogo
      remoteProducts.sort((a, b) => {
        if (a.createdAt && b.createdAt && a.createdAt !== b.createdAt) {
          return String(b.createdAt).localeCompare(String(a.createdAt));
        }
        return String(a.id).localeCompare(String(b.id));
      });

      CloudState.products = remoteProducts;
      renderVitrine();
      renderCmsProductsTable();
      renderCmsCategoriesTable();
    },
    (error) => {
      showCloudPermissionError('products', error);
    }
  );

  // 4. Ouvinte Contínuo: Coleção Global de Encomendas Sob Medida (custom_orders)
  onSnapshot(
    customOrdersColRef,
    (snapshot) => {
      updateCloudConnectionStatus('connected');
      const remoteOrders = [];
      snapshot.forEach((docSnap) => {
        const order = docSnap.data();
        if (order) {
          remoteOrders.push({ ...order, id: order.id || docSnap.id });
        }
      });

      remoteOrders.sort((a, b) => {
        const tA = a.createdAt || a.updatedAt || '';
        const tB = b.createdAt || b.updatedAt || '';
        return String(tB).localeCompare(String(tA));
      });

      CloudState.customOrders = remoteOrders;
      renderCmsAtelieOrders();
    },
    (error) => {
      showCloudPermissionError('custom_orders', error);
    }
  );
}

/**
 * Ciclo de Autenticação Prévia Garantida:
 * Nenhuma leitura ou escrita no banco é disparada antes da resolução explícita do handshake.
 */
async function initCloudPersistenceEngine() {
  updateCloudConnectionStatus('reconnecting');

  try {
    firebaseNativeSdk = await loadFirebaseModularSdkIfConfigured();
    if (firebaseNativeSdk) {
      db = firebaseNativeSdk.db;
      auth = firebaseNativeSdk.auth;
    } else {
      db = { _engine: 'cloud-realtime-server', appId };
      auth = { _engine: 'cloud-realtime-server', appId };
    }

    // Registra o listener de estado de autenticação antes do handshake
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        CloudState.isAuthenticated = false;
        updateCloudConnectionStatus('reconnecting');
        return;
      }

      CloudState.currentUser = user;
      CloudState.isAuthenticated = true;

      try {
        await seedInitialCloudData();
        setupRealtimeListeners();
        startRealtimeSyncWatchdog();
        updateCloudConnectionStatus('connected');
      } catch (seedErr) {
        showCloudPermissionError('Inicialização/Seeding', seedErr);
      }
    });

    // Handshake explícito via Custom Token ou Sessão Anônima
    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
      await signInWithCustomToken(auth, __initial_auth_token);
    } else {
      await signInAnonymously(auth);
    }
  } catch (authError) {
    showCloudPermissionError('Autenticação na Nuvem', authError);
  }
}

// ================= 6. APLICAÇÃO REATIVA DE TEMAS, CONTEÚDOS E PAGAMENTOS NO DOM =================
function applyThemeToDOM(theme) {
  if (!theme) return;
  const root = document.documentElement;

  // Variáveis CSS root exigidas (--bv-* e --color-*)
  root.style.setProperty('--bv-primary', theme.colorPrimary);
  root.style.setProperty('--bv-accent', theme.colorAccent);
  root.style.setProperty('--bv-bg', theme.colorBg);
  root.style.setProperty('--bv-card-bg', theme.colorCardBg);
  root.style.setProperty('--bv-text', theme.colorText);

  root.style.setProperty('--color-primary', theme.colorPrimary);
  root.style.setProperty('--color-accent', theme.colorAccent);
  root.style.setProperty('--color-bg', theme.colorBg);
  root.style.setProperty('--color-card-bg', theme.colorCardBg);
  root.style.setProperty('--color-text', theme.colorText);

  // Tipografia
  let headingFont = "'Playfair Display', serif";
  let bodyFont = "'Montserrat', sans-serif";

  if (theme.fontFamily === 'cormorant') {
    headingFont = "'Cormorant Garamond', serif";
    bodyFont = "'Inter', sans-serif";
  } else if (theme.fontFamily === 'cinzel') {
    headingFont = "'Cinzel', serif";
    bodyFont = "'Montserrat', sans-serif";
  }

  root.style.setProperty('--bv-font-heading', headingFont);
  root.style.setProperty('--bv-font-body', bodyFont);
  root.style.setProperty('--font-heading', headingFont);
  root.style.setProperty('--font-body', bodyFont);

  // Atualizar inputs do CMS
  const elColorPrimary = document.getElementById('cmsColorPrimary');
  const elColorAccent = document.getElementById('cmsColorAccent');
  const elColorBg = document.getElementById('cmsColorBg');
  const elColorCardBg = document.getElementById('cmsColorCardBg');
  const elColorText = document.getElementById('cmsColorText');
  const elFontSelect = document.getElementById('cmsFontSelect');

  if (elColorPrimary) elColorPrimary.value = theme.colorPrimary;
  if (elColorAccent) elColorAccent.value = theme.colorAccent;
  if (elColorBg) elColorBg.value = theme.colorBg;
  if (elColorCardBg) elColorCardBg.value = theme.colorCardBg;
  if (elColorText) elColorText.value = theme.colorText;
  if (elFontSelect) elFontSelect.value = theme.fontFamily;

  // Atualizar Hex labels
  const hexPrimary = document.getElementById('cmsHexPrimary');
  const hexAccent = document.getElementById('cmsHexAccent');
  const hexBg = document.getElementById('cmsHexBg');
  const hexCardBg = document.getElementById('cmsHexCardBg');
  const hexText = document.getElementById('cmsHexText');

  if (hexPrimary) hexPrimary.innerText = theme.colorPrimary;
  if (hexAccent) hexAccent.innerText = theme.colorAccent;
  if (hexBg) hexBg.innerText = theme.colorBg;
  if (hexCardBg) hexCardBg.innerText = theme.colorCardBg;
  if (hexText) hexText.innerText = theme.colorText;

  // Destacar o botão do preset ativo visualmente
  ['classic', 'rose', 'emerald', 'champagne'].forEach(p => {
    const btn = document.getElementById(`presetBtn-${p}`);
    if (btn) {
      if (theme.preset === p) {
        btn.classList.add('border-[#C5A059]', 'ring-2', 'ring-[#C5A059]/40', 'bg-amber-50/60');
        btn.classList.remove('border-stone-200');
      } else {
        btn.classList.remove('border-[#C5A059]', 'ring-2', 'ring-[#C5A059]/40', 'bg-amber-50/60');
        btn.classList.add('border-stone-200');
      }
    }
  });
}

function applyTheme(theme) {
  applyThemeToDOM(theme);
}

async function applyThemePreset(presetKey) {
  if (!THEME_PRESETS[presetKey]) return;
  const newTheme = { ...THEME_PRESETS[presetKey], preset: presetKey };
  // Preenche os seletores do formulário CMS e publica na nuvem imediatamente
  applyThemeToDOM(newTheme);

  try {
    ensureCloudAuthenticated();
    const configDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'site_config', 'main');
    await setDoc(configDocRef, {
      theme: newTheme,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    showToast(`Preset "${presetKey.toUpperCase()}" publicado globalmente na nuvem!`);
  } catch (err) {
    showCloudPermissionError('Aplicar Preset de Tema', err);
  }
}

function toggleTokenVisibility() {
  const input = document.getElementById('cmsMpAccessToken');
  const icon = document.getElementById('tokenEyeIcon');
  if (!input || !icon) return;

  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash text-[#009EE3]';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye text-stone-400';
  }
}

function applyContentToDOM(content) {
  if (!content) return;
  const elTopAnnouncement = document.getElementById('topAnnouncementText');
  const elHeroTitle = document.getElementById('heroTitle');
  const elHeroSubtitle = document.getElementById('heroSubtitle');
  const elHeroImage = document.getElementById('heroImage');
  const elAboutBrand = document.getElementById('aboutBrandText');
  const elTopWhatsApp = document.getElementById('topWhatsAppLink');
  const elFooterPhone = document.getElementById('footerPhone');

  if (elTopAnnouncement) elTopAnnouncement.innerText = content.topAnnouncement;
  if (elHeroTitle) elHeroTitle.innerText = content.heroTitle;
  if (elHeroSubtitle) elHeroSubtitle.innerText = content.heroSubtitle;
  if (elHeroImage) elHeroImage.src = content.heroImage;
  if (elAboutBrand) elAboutBrand.innerText = content.aboutBrand;

  const cleanPhone = String(content.whatsappNumber || '5511999999999').replace(/\D/g, '');
  if (elTopWhatsApp) elTopWhatsApp.href = `https://wa.me/${cleanPhone}`;
  if (elFooterPhone && cleanPhone.length >= 12) {
    elFooterPhone.innerText = `+${cleanPhone.slice(0, 2)} (${cleanPhone.slice(2, 4)}) ${cleanPhone.slice(4, 9)}-${cleanPhone.slice(9)}`;
  }

  // Atualizar inputs do CMS
  const inpAnn = document.getElementById('cmsInputAnnouncement');
  const inpHeroTitle = document.getElementById('cmsInputHeroTitle');
  const inpHeroSub = document.getElementById('cmsInputHeroSubtitle');
  const inpHeroImg = document.getElementById('cmsInputHeroImg');
  const inpAbout = document.getElementById('cmsInputAboutBrand');
  const inpPhone = document.getElementById('cmsInputWhatsapp');

  if (inpAnn) inpAnn.value = content.topAnnouncement;
  if (inpHeroTitle) inpHeroTitle.value = content.heroTitle;
  if (inpHeroSub) inpHeroSub.value = content.heroSubtitle;
  if (inpHeroImg) inpHeroImg.value = content.heroImage;
  if (inpAbout) inpAbout.value = content.aboutBrand;
  if (inpPhone) inpPhone.value = content.whatsappNumber;
}

function applyContent(content) {
  applyContentToDOM(content);
}

function applyPaymentConfigToDOM(payment) {
  if (!payment) return;
  const elInstallmentBadge = document.getElementById('trustInstallmentText');
  if (elInstallmentBadge) {
    elInstallmentBadge.innerText = `Até ${payment.maxInstallmentsWithoutInterest}x Sem Juros no Mercado Pago`;
  }

  const elCheckoutUrl = document.getElementById('cmsMpCheckoutUrl');
  const elKey = document.getElementById('cmsMpPublicKey');
  const elToken = document.getElementById('cmsMpAccessToken');
  const elEnv = document.getElementById('cmsMpEnvironment');
  const elInst = document.getElementById('cmsMpInstallments');
  const elPix = document.getElementById('cmsPixKey');

  if (elCheckoutUrl) elCheckoutUrl.value = payment.checkoutUrl || '';
  if (elKey) elKey.value = payment.publicKey || '';
  if (elToken) elToken.value = payment.accessToken || '';
  if (elEnv) elEnv.value = payment.environment || 'production';
  if (elInst) elInst.value = payment.maxInstallmentsWithoutInterest || 10;
  if (elPix) elPix.value = payment.pixKey || '';
}

function applyPaymentConfig(payment) {
  applyPaymentConfigToDOM(payment);
}

// ================= 7. VITRINE & CATÁLOGO DINÂMICO =================
let currentCategoryFilter = 'all';
let currentSearchTerm = '';
let currentSortOrder = 'default';

function slugifyCategory(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function normalizeCategoryText(str) {
  return String(str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function renderVitrineCategoryFilters() {
  const container = document.getElementById('categoryFiltersContainer');
  if (!container) return;

  const categories = Storage.getCategories() || [];
  const activeCategories = categories.filter(c => c.isActive !== false);

  // Se a categoria selecionada foi desativada ou removida, volta para 'all'
  if (currentCategoryFilter !== 'all') {
    const stillActive = activeCategories.some(
      c => normalizeCategoryText(c.name) === normalizeCategoryText(currentCategoryFilter) ||
           normalizeCategoryText(c.slug) === normalizeCategoryText(currentCategoryFilter)
    );
    if (!stillActive && activeCategories.length > 0) {
      currentCategoryFilter = 'all';
    }
  }

  const isAllActive = currentCategoryFilter === 'all';
  let html = `
    <button
      type="button"
      onclick="selectVitrineCategory('all')"
      class="category-btn px-4 py-2 rounded-full border transition whitespace-nowrap ${
        isAllActive
          ? 'active bg-stone-900 text-white border-stone-900 shadow-sm'
          : 'bg-white text-stone-700 border-stone-200 hover:border-[#C5A059]'
      }"
      data-category="all"
    >
      Todos os Modelos
    </button>
  `;

  activeCategories.forEach(cat => {
    const isSelected = normalizeCategoryText(currentCategoryFilter) === normalizeCategoryText(cat.name) ||
                       normalizeCategoryText(currentCategoryFilter) === normalizeCategoryText(cat.slug);
    const escapedName = String(cat.name).replace(/'/g, "\\'");
    const isGold18k = normalizeCategoryText(cat.name).includes('18k') || normalizeCategoryText(cat.name).includes('ouro');

    html += `
      <button
        type="button"
        onclick="selectVitrineCategory('${escapedName}')"
        class="category-btn px-4 py-2 rounded-full border transition whitespace-nowrap ${
          isSelected
            ? 'active bg-stone-900 text-white border-stone-900 shadow-sm'
            : 'bg-white text-stone-700 border-stone-200 hover:border-[#C5A059]'
        }"
        data-category="${cat.name}"
      >
        ${isGold18k ? '<i class="fas fa-crown text-amber-500 mr-1"></i>' : ''}${cat.name}
      </button>
    `;
  });

  container.innerHTML = html;
}

function selectVitrineCategory(categoryName) {
  currentCategoryFilter = categoryName || 'all';
  renderVitrineCategoryFilters();
  renderVitrine();
}

function renderVitrine() {
  const grid = document.getElementById('productGrid');
  const emptyState = document.getElementById('emptyCatalogState');
  if (!grid) return;

  const products = Storage.getProducts();
  const categories = Storage.getCategories() || [];
  const paymentConfig = Storage.getPayment();

  // Identifica categorias explicitamente inativas para não exibir produtos de categorias desativadas quando o filtro estiver em 'all' (ou filtra normalmente)
  const inactiveNames = new Set(
    categories.filter(c => c.isActive === false).map(c => normalizeCategoryText(c.name))
  );

  let filtered = products.filter(item => {
    const itemCatNorm = normalizeCategoryText(item.category);
    const filterNorm = normalizeCategoryText(currentCategoryFilter);

    // Oculta produtos cuja categoria está marcada como inativa na loja pública
    if (inactiveNames.has(itemCatNorm)) {
      return false;
    }

    const matchCategory =
      currentCategoryFilter === 'all' ||
      itemCatNorm === filterNorm ||
      slugifyCategory(item.category) === slugifyCategory(currentCategoryFilter);

    const matchSearch = currentSearchTerm === '' ||
      (item.name && item.name.toLowerCase().includes(currentSearchTerm)) ||
      (item.category && item.category.toLowerCase().includes(currentSearchTerm)) ||
      (item.material && item.material.toLowerCase().includes(currentSearchTerm)) ||
      (item.tag && item.tag.toLowerCase().includes(currentSearchTerm)) ||
      (item.description && item.description.toLowerCase().includes(currentSearchTerm));
    return matchCategory && matchSearch;
  });

  if (currentSortOrder === 'price-asc') {
    filtered.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (currentSortOrder === 'price-desc') {
    filtered.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (currentSortOrder === 'name-asc') {
    filtered.sort((a, b) => String(a.name).localeCompare(String(b.name)));
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState?.classList.remove('hidden');
    return;
  }

  emptyState?.classList.add('hidden');

  grid.innerHTML = filtered.map(product => {
    const priceNum = Number(product.price) || 0;
    const maxInst = paymentConfig.maxInstallmentsWithoutInterest || 10;
    const instValue = (priceNum / maxInst).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedPrice = priceNum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return `
      <div class="product-card group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm flex flex-col justify-between" data-id="${product.id}">
        <div class="product-image-container relative aspect-square overflow-hidden bg-stone-100 cursor-pointer" onclick="openProductDetail('${product.id}')">
          <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" loading="lazy">
          ${product.tag ? `
            <span class="absolute top-3 left-3 bg-stone-900/90 text-[#C5A059] border border-[#C5A059]/40 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md">
              ${product.tag}
            </span>
          ` : ''}
          <button class="absolute bottom-3 inset-x-3 py-2 bg-stone-950/80 backdrop-blur-md text-white text-xs uppercase tracking-wider font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5 hover:bg-stone-900">
            <i class="fas fa-eye text-xs text-[#C5A059]"></i> Detalhes da Joia
          </button>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <span class="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">
              ${product.category}
            </span>
            <h3 class="font-heading font-bold text-stone-900 text-base leading-snug line-clamp-2 hover:text-[#C5A059] transition cursor-pointer" onclick="openProductDetail('${product.id}')">
              ${product.name}
            </h3>
            <p class="text-[11px] text-stone-500 line-clamp-1 mt-1">${product.material}</p>
          </div>

          <div class="pt-2 border-t border-stone-100">
            <span class="text-xl font-heading font-bold text-stone-900 block">${formattedPrice}</span>
            <p class="text-[11px] text-stone-500">ou até <strong class="text-stone-700 font-semibold">${maxInst}x de R$ ${instValue}</strong> sem juros</p>
          </div>

          <button onclick="addToCart('${product.id}', true)" class="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2 group-hover:bg-gold-gradient group-hover:text-stone-950 shadow-sm">
            <i class="fas fa-shopping-bag text-xs"></i> Comprar Agora
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function resetFilters() {
  currentCategoryFilter = 'all';
  currentSearchTerm = '';
  currentSortOrder = 'default';

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  document.getElementById('clearSearchBtn')?.classList.add('hidden');

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'default';

  renderVitrineCategoryFilters();
  renderVitrine();
}

// ================= 8. SACOLA DE COMPRAS (DRAWER & REGRAS) =================
let activeCoupon = null;
const FREE_SHIPPING_THRESHOLD = 450.00;

function openCart() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (drawer && backdrop) {
    backdrop.classList.remove('hidden');
    setTimeout(() => {
      backdrop.classList.remove('opacity-0');
      drawer.classList.remove('translate-x-full');
    }, 10);
  }
  renderCart();
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (drawer && backdrop) {
    backdrop.classList.add('opacity-0');
    drawer.classList.add('translate-x-full');
    setTimeout(() => backdrop.classList.add('hidden'), 300);
  }
}

function addToCart(productId, openDrawer = true) {
  const products = Storage.getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cart = Storage.getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  Storage.setCart(cart);
  updateCartBadge();
  showToast(`"${product.name}" adicionado à sacola!`);

  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.classList.add('scale-150');
    setTimeout(() => badge.classList.remove('scale-150'), 250);
  }

  if (openDrawer) openCart();
}

function updateCartQuantity(productId, delta) {
  let cart = Storage.getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  Storage.setCart(cart);
  renderCart();
  updateCartBadge();
}

function removeFromCart(productId) {
  let cart = Storage.getCart();
  cart = cart.filter(i => i.id !== productId);
  Storage.setCart(cart);
  renderCart();
  updateCartBadge();
  showToast('Item removido da sacola.');
}

function updateCartBadge() {
  const cart = Storage.getCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const badge = document.getElementById('cartBadge');
  const drawerCount = document.getElementById('cartDrawerCount');

  if (badge) badge.innerText = totalItems;
  if (drawerCount) drawerCount.innerText = totalItems;
}

function renderCart() {
  const cart = Storage.getCart();
  const cartList = document.getElementById('cartItemsList');
  const emptyView = document.getElementById('emptyCartView');
  const footerView = document.getElementById('cartFooterView');
  const paymentConfig = Storage.getPayment();

  if (!cartList) return;

  if (cart.length === 0) {
    cartList.innerHTML = '';
    emptyView?.classList.remove('hidden');
    footerView?.classList.add('hidden');
    updateFreeShippingBar(0);
    return;
  }

  emptyView?.classList.add('hidden');
  footerView?.classList.remove('hidden');

  let subtotal = 0;

  cartList.innerHTML = cart.map(item => {
    const itemTotal = Number(item.price) * Number(item.quantity);
    subtotal += itemTotal;
    const formattedItemTotal = itemTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return `
      <div class="flex items-center gap-4 p-3 bg-white rounded-xl border border-stone-200 shadow-sm">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover bg-stone-100 border border-stone-200">
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-heading font-bold text-stone-900 truncate">${item.name}</h4>
          <span class="text-[10px] text-stone-500 block truncate">${item.material}</span>
          <span class="text-xs font-bold text-stone-800">${formattedItemTotal}</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
            <button onclick="updateCartQuantity('${item.id}', -1)" class="w-7 h-7 flex items-center justify-center text-xs text-stone-600 hover:bg-stone-200 transition">
              <i class="fas fa-minus text-[10px]"></i>
            </button>
            <span class="w-7 text-center text-xs font-bold text-stone-800">${item.quantity}</span>
            <button onclick="updateCartQuantity('${item.id}', 1)" class="w-7 h-7 flex items-center justify-center text-xs text-stone-600 hover:bg-stone-200 transition">
              <i class="fas fa-plus text-[10px]"></i>
            </button>
          </div>
          <button onclick="removeFromCart('${item.id}')" class="text-stone-400 hover:text-rose-600 text-xs p-1" title="Remover item">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  let discountAmount = 0;
  if (activeCoupon) {
    discountAmount = subtotal * activeCoupon.discount;
    document.getElementById('cartDiscountRow')?.classList.remove('hidden');
    const elDiscount = document.getElementById('cartDiscount');
    if (elDiscount) elDiscount.innerText = `- ${discountAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
  } else {
    document.getElementById('cartDiscountRow')?.classList.add('hidden');
  }

  const grandTotal = Math.max(0, subtotal - discountAmount);
  const maxInst = paymentConfig.maxInstallmentsWithoutInterest || 10;
  const instValue = (grandTotal / maxInst).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  document.getElementById('cartSubtotal').innerText = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.getElementById('cartTotal').innerText = grandTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.getElementById('cartInstallmentNotice').innerText = `ou em até ${maxInst}x de R$ ${instValue} sem juros no Mercado Pago`;

  updateFreeShippingBar(subtotal);
}

function updateFreeShippingBar(subtotal) {
  const percent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const elBar = document.getElementById('freeShippingBar');
  const elLabel = document.getElementById('freeShippingLabel');
  const elPercent = document.getElementById('freeShippingPercent');

  if (elBar) elBar.style.width = `${percent}%`;
  if (elPercent) elPercent.innerText = `${percent}%`;

  if (elLabel) {
    if (remaining === 0) {
      elLabel.innerHTML = `<span class="text-emerald-700 font-bold">✨ Parabéns! Você ganhou Frete Grátis com Seguro!</span>`;
    } else {
      elLabel.innerText = `Faltam R$ ${remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} para Frete Grátis`;
    }
  }
}

function applyCoupon() {
  const input = document.getElementById('couponInput');
  const feedback = document.getElementById('couponAppliedFeedback');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (code === 'BRUNA10' || code === 'OURO10') {
    activeCoupon = { code, discount: 0.10 };
    feedback?.classList.remove('hidden');
    showToast('Cupom de 10% de desconto aplicado com sucesso!');
    renderCart();
  } else {
    showToast('Cupom inválido ou expirado.');
  }
}

// ================= 9. MODAL EMBUTIDO OFICIAL MERCADO PAGO (PIX, CARTÃO & SALDO) =================
let pixCountdownInterval = null;
let lastOrderData = null;

function openMercadoPagoCheckout() {
  const cart = Storage.getCart();
  if (cart.length === 0) {
    showToast('Adicione ao menos uma joia à sacola antes de finalizar.');
    return;
  }

  closeCart();

  const modal = document.getElementById('mercadoPagoModal');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.firstElementChild?.classList.remove('scale-95');
    }, 10);
  }

  const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
  const discount = activeCoupon ? subtotal * activeCoupon.discount : 0;
  const total = Math.max(0, subtotal - discount);

  const formattedTotal = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const elMpPay = document.getElementById('mpPayAmount');
  const elCardBtn = document.getElementById('cardPayBtnText');
  const elBalanceAmt = document.getElementById('mpBalancePayAmount');

  if (elMpPay) elMpPay.innerText = formattedTotal;
  if (elCardBtn) elCardBtn.innerText = `Pagar ${formattedTotal} com Mercado Pago`;
  if (elBalanceAmt) elBalanceAmt.innerText = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  generatePixPayment(total);
  setupCardInstallments(total);
  switchMpTab('pix');
}

function closeMercadoPagoCheckout() {
  const modal = document.getElementById('mercadoPagoModal');
  if (modal) {
    modal.classList.add('opacity-0');
    modal.firstElementChild?.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
  if (pixCountdownInterval) clearInterval(pixCountdownInterval);
}

function switchMpTab(tab) {
  const tabPix = document.getElementById('mpTabPix');
  const tabCard = document.getElementById('mpTabCard');
  const tabBalance = document.getElementById('mpTabBalance');

  const viewPix = document.getElementById('mpViewPix');
  const viewCard = document.getElementById('mpViewCard');
  const viewBalance = document.getElementById('mpViewBalance');

  [tabPix, tabCard, tabBalance].forEach(t => {
    if (!t) return;
    t.classList.remove('border-[#009EE3]', 'text-[#009EE3]', 'font-bold');
    t.classList.add('border-transparent', 'text-stone-600');
  });

  [viewPix, viewCard, viewBalance].forEach(v => v?.classList.add('hidden'));

  if (tab === 'pix') {
    tabPix?.classList.add('border-[#009EE3]', 'text-[#009EE3]', 'font-bold');
    tabPix?.classList.remove('border-transparent', 'text-stone-600');
    viewPix?.classList.remove('hidden');
  } else if (tab === 'card') {
    tabCard?.classList.add('border-[#009EE3]', 'text-[#009EE3]', 'font-bold');
    tabCard?.classList.remove('border-transparent', 'text-stone-600');
    viewCard?.classList.remove('hidden');
  } else if (tab === 'balance') {
    tabBalance?.classList.add('border-[#009EE3]', 'text-[#009EE3]', 'font-bold');
    tabBalance?.classList.remove('border-transparent', 'text-stone-600');
    viewBalance?.classList.remove('hidden');
  }
}

function generatePixPayment(amount) {
  const paymentConfig = Storage.getPayment();
  const pixContainer = document.getElementById('mpPixQrCodeContainer');
  if (!pixContainer) return;

  pixContainer.innerHTML = '';

  const cleanAmount = Number(amount).toFixed(2);
  const pixKey = paymentConfig.pixKey || '45.892.102/0001-44';
  const pixPayload = `00020126580014br.gov.bcb.pix0136${pixKey}520400005303986540${cleanAmount.length}${cleanAmount}5802BR5925BRUNA VALOIS JOIAS6009SAO PAULO62070503***6304`;

  const codeInput = document.getElementById('mpPixCodeInput');
  if (codeInput) codeInput.value = pixPayload;

  try {
    new QRCode(pixContainer, {
      text: pixPayload,
      width: 160,
      height: 160,
      colorDark: '#1C1917',
      colorLight: '#FFFFFF',
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch {
    pixContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(pixPayload)}" alt="QR Code PIX" class="w-40 h-40">`;
  }

  if (pixCountdownInterval) clearInterval(pixCountdownInterval);
  let timeLeft = 15 * 60;
  const timerEl = document.getElementById('pixTimer');
  pixCountdownInterval = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    if (timerEl) {
      timerEl.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    if (timeLeft <= 0) {
      clearInterval(pixCountdownInterval);
      if (timerEl) timerEl.innerText = 'Expirado';
    }
  }, 1000);
}

function copyMpPixCode() {
  const input = document.getElementById('mpPixCodeInput');
  const feedback = document.getElementById('mpPixCopiedFeedback');
  if (!input) return;

  input.select();
  navigator.clipboard.writeText(input.value).then(() => {
    feedback?.classList.remove('hidden');
    showToast('Código PIX Copia e Cola copiado com sucesso!');
    setTimeout(() => feedback?.classList.add('hidden'), 3500);
  });
}

function setupCardInstallments(total) {
  const select = document.getElementById('cardInstallmentsSelect');
  if (!select) return;

  const paymentConfig = Storage.getPayment();
  const maxWithoutInterest = Number(paymentConfig.maxInstallmentsWithoutInterest) || 10;

  select.innerHTML = '';

  for (let i = 1; i <= 12; i++) {
    let installmentValue = 0;
    let label = '';

    if (i <= maxWithoutInterest) {
      installmentValue = total / i;
      label = `${i}x de R$ ${installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} sem juros (Total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`;
    } else {
      const interestRate = 0.0199;
      const totalWithInterest = total * Math.pow(1 + interestRate, i);
      installmentValue = totalWithInterest / i;
      label = `${i}x de R$ ${installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} com juros (Total: ${totalWithInterest.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`;
    }

    const opt = document.createElement('option');
    opt.value = i;
    opt.innerText = label;
    select.appendChild(opt);
  }
}

function handleCardNumberInput(e) {
  let val = e.target.value.replace(/\D/g, '').substring(0, 16);
  let formatted = '';
  for (let i = 0; i < val.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += ' ';
    formatted += val[i];
  }
  e.target.value = formatted;

  const previewNum = document.getElementById('cardPreviewNumber');
  if (previewNum) {
    previewNum.innerText = formatted ? formatted.padEnd(19, '•') : '•••• •••• •••• ••••';
  }
  detectCardBrand(val);
}

function detectCardBrand(num) {
  const icon = document.getElementById('cardBrandIcon');
  const badge = document.getElementById('cardInputBrandBadge');
  if (!icon || !badge) return;

  let brandIconHtml = '<i class="fas fa-credit-card"></i>';
  if (num.startsWith('4')) {
    brandIconHtml = '<i class="fab fa-cc-visa text-blue-400"></i>';
  } else if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)/.test(num)) {
    brandIconHtml = '<i class="fab fa-cc-mastercard text-amber-500"></i>';
  } else if (/^3[47]/.test(num)) {
    brandIconHtml = '<i class="fab fa-cc-amex text-sky-400"></i>';
  } else if (/^(4011|4389|5067|5090)/.test(num)) {
    brandIconHtml = '<span class="font-bold text-xs bg-red-600 text-white px-1.5 py-0.5 rounded">ELO</span>';
  }
  icon.innerHTML = brandIconHtml;
  badge.innerHTML = brandIconHtml;
}

function finalizePurchase(paymentMethodName) {
  const cart = Storage.getCart();
  if (cart.length === 0) return;

  const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
  const discount = activeCoupon ? subtotal * activeCoupon.discount : 0;
  const total = Math.max(0, subtotal - discount);

  const transactionId = `#MP-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  lastOrderData = {
    transactionId,
    dateStr,
    method: paymentMethodName,
    items: [...cart],
    total,
    formattedTotal: total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  };

  closeMercadoPagoCheckout();
  openReceiptModal(lastOrderData);

  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#DFBA73', '#FFFFFF', '#009EE3']
    });
  }

  Storage.setCart([]);
  activeCoupon = null;
  updateCartBadge();
  renderCart();
}

// ================= 10. INTEGRAÇÃO MERCADO PAGO OFICIAL & CHECKOUT COMPLETO =================
let trackingPollingInterval = null;
let currentTrackingOrderId = null;

async function initPublicPaymentConfig() {
  try {
    const res = await fetch('/api/config/public');
    if (!res.ok) return;
    const cfg = await res.json();
    window.MP_CONFIG = cfg;

    const notice = document.getElementById('mpEnvNotice');
    const badge = document.getElementById('mpEnvBadge');
    if (notice && badge) {
      if (cfg.isSandbox) {
        notice.classList.remove('hidden');
        badge.innerText = 'Sandbox (Testes)';
      } else {
        notice.classList.add('hidden');
      }
    }
  } catch (err) {
    console.warn('[MercadoPago] Configuração pública local:', err.message);
  }
}

let currentRoute = 'home';

function navigateToHome(e) {
  if (e && e.preventDefault) e.preventDefault();
  currentRoute = 'home';
  window.history.pushState({ route: 'home' }, 'Bruna Valois | Alta Joalheria', '/');

  document.getElementById('mainStoreContent')?.classList.remove('hidden');
  document.getElementById('checkoutView')?.classList.add('hidden');
  document.getElementById('orderTrackingView')?.classList.add('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToHomeSection(e, sectionId) {
  if (e && e.preventDefault) e.preventDefault();
  if (currentRoute !== 'home') {
    navigateToHome();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  } else {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}

function navigateToCheckout(e) {
  if (e && e.preventDefault) e.preventDefault();

  const cart = Storage.getCart();
  if (cart.length === 0) {
    showToast('Adicione ao menos uma joia à sacola antes de finalizar.', 'fa-shopping-bag');
    openCart();
    return;
  }

  closeCart();
  currentRoute = 'checkout';
  window.history.pushState({ route: 'checkout' }, 'Checkout Seguro | Bruna Valois', '/checkout');

  document.getElementById('mainStoreContent')?.classList.add('hidden');
  document.getElementById('orderTrackingView')?.classList.add('hidden');
  document.getElementById('checkoutView')?.classList.remove('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  loadSavedCustomerData();
  renderCheckoutSummary();
}

function navigateToTracking(e, orderId = null, preloadedOrder = null, pixDetails = null) {
  if (e && e.preventDefault) e.preventDefault();
  closeCart();
  currentRoute = 'tracking';

  const path = orderId ? `/pedido/${encodeURIComponent(orderId)}` : '/meus-pedidos';
  window.history.pushState({ route: 'tracking', orderId }, 'Acompanhar Pedido | Bruna Valois', path);

  document.getElementById('mainStoreContent')?.classList.add('hidden');
  document.getElementById('checkoutView')?.classList.add('hidden');
  document.getElementById('orderTrackingView')?.classList.remove('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (preloadedOrder) {
    const queryInput = document.getElementById('trackingQueryInput');
    if (queryInput) queryInput.value = orderId || preloadedOrder.id;
    renderOrderDetail(preloadedOrder, pixDetails);
  } else if (orderId) {
    const queryInput = document.getElementById('trackingQueryInput');
    if (queryInput) queryInput.value = orderId;
    fetchAndDisplayOrder(orderId);
  } else {
    const lastOrderId = localStorage.getItem('BV_LAST_ORDER_ID');
    if (lastOrderId) {
      const queryInput = document.getElementById('trackingQueryInput');
      if (queryInput && !queryInput.value) {
        queryInput.value = lastOrderId;
      }
    }
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('hidden');
}

function initRouter() {
  window.addEventListener('popstate', () => {
    handleRouteLocation();
  });
  handleRouteLocation();
}

function handleRouteLocation() {
  const path = window.location.pathname.toLowerCase();
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get('status') || urlParams.get('collection_status');
  const externalRef = urlParams.get('external_reference') || urlParams.get('order_id');

  if (path.startsWith('/pedido/')) {
    const orderId = path.replace('/pedido/', '').split('/')[0].split('?')[0];
    if (orderId) {
      navigateToTracking(null, orderId);
      return;
    }
  }

  if (path === '/checkout') {
    navigateToCheckout();
    return;
  }

  if (path === '/meus-pedidos' || path === '/rastreio') {
    const q = urlParams.get('q') || urlParams.get('pedido') || externalRef;
    navigateToTracking(null, q || null);
    return;
  }

  if (status === 'approved' && externalRef) {
    navigateToTracking(null, externalRef);
    return;
  }

  document.getElementById('mainStoreContent')?.classList.remove('hidden');
  document.getElementById('checkoutView')?.classList.add('hidden');
  document.getElementById('orderTrackingView')?.classList.add('hidden');
}

let selectedShippingMethod = 'PAC';
let selectedPaymentMethod = 'checkout_pro';
let checkoutCoupon = null;

function loadSavedCustomerData() {
  try {
    const raw = localStorage.getItem('BV_CUSTOMER_DATA');
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.name) document.getElementById('checkoutName').value = data.name;
    if (data.email) document.getElementById('checkoutEmail').value = data.email;
    if (data.cpf) document.getElementById('checkoutCpf').value = data.cpf;
    if (data.phone) document.getElementById('checkoutPhone').value = data.phone;
    if (data.zip) document.getElementById('checkoutCep').value = data.zip;
    if (data.street) document.getElementById('checkoutStreet').value = data.street;
    if (data.number) document.getElementById('checkoutNumber').value = data.number;
    if (data.complement) document.getElementById('checkoutComplement').value = data.complement;
    if (data.neighborhood) document.getElementById('checkoutNeighborhood').value = data.neighborhood;
    if (data.city) document.getElementById('checkoutCity').value = data.city;
    if (data.state) document.getElementById('checkoutState').value = data.state;
  } catch {}
}

function selectShippingMethod(method) {
  selectedShippingMethod = method;

  ['PAC', 'SEDEX', 'RETIRADA'].forEach(opt => {
    const card = document.getElementById(`shippingCard${opt}`);
    const radio = document.getElementById(`shippingRadio${opt}`);
    if (opt === method) {
      card?.classList.add('border-[#C5A059]', 'bg-amber-50/20');
      card?.classList.remove('border-stone-200', 'bg-white');
      if (radio) radio.checked = true;
    } else {
      card?.classList.remove('border-[#C5A059]', 'bg-amber-50/20');
      card?.classList.add('border-stone-200', 'bg-white');
      if (radio) radio.checked = false;
    }
  });

  const pickupBanner = document.getElementById('checkoutPickupBanner');
  const addressContainer = document.getElementById('checkoutAddressFieldsContainer');
  if (method === 'RETIRADA') {
    pickupBanner?.classList.remove('hidden');
    addressContainer?.classList.add('opacity-60');
  } else {
    pickupBanner?.classList.add('hidden');
    addressContainer?.classList.remove('opacity-60');
  }

  renderCheckoutSummary();
}

function selectPaymentMethod(method) {
  selectedPaymentMethod = method;

  const mpCard = document.getElementById('paymentOptionMp');
  const pixCard = document.getElementById('paymentOptionPix');
  const mpRadio = document.getElementById('payRadioMp');
  const pixRadio = document.getElementById('payRadioPix');
  const submitText = document.getElementById('checkoutSubmitBtnText');

  if (method === 'checkout_pro') {
    mpCard?.classList.add('border-[#C5A059]', 'bg-amber-50/30');
    mpCard?.classList.remove('border-stone-200');
    pixCard?.classList.remove('border-emerald-500', 'bg-emerald-50/20');
    pixCard?.classList.add('border-stone-200');
    if (mpRadio) mpRadio.checked = true;
    if (pixRadio) pixRadio.checked = false;
    if (submitText) submitText.innerText = 'Pagar com Mercado Pago';
  } else {
    pixCard?.classList.add('border-emerald-500', 'bg-emerald-50/20');
    pixCard?.classList.remove('border-stone-200');
    mpCard?.classList.remove('border-[#C5A059]', 'bg-amber-50/30');
    mpCard?.classList.add('border-stone-200');
    if (pixRadio) pixRadio.checked = true;
    if (mpRadio) mpRadio.checked = false;
    if (submitText) submitText.innerText = 'Finalizar com Pix Instantâneo (5% OFF)';
  }

  renderCheckoutSummary();
}

async function handleCepSearch() {
  const input = document.getElementById('checkoutCep');
  const feedback = document.getElementById('checkoutCepFeedback');
  const btn = document.getElementById('checkoutSearchCepBtn');
  if (!input) return;

  const cleanCep = input.value.replace(/\D/g, '');
  if (cleanCep.length !== 8) {
    if (feedback) {
      feedback.className = 'text-xs mt-1.5 font-medium text-rose-600 block';
      feedback.innerText = 'Por favor, digite um CEP válido com 8 dígitos.';
    }
    input.focus();
    return;
  }

  const originalBtn = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  }

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json();
    if (data.erro) {
      if (feedback) {
        feedback.className = 'text-xs mt-1.5 font-medium text-rose-600 block';
        feedback.innerText = 'CEP não encontrado. Preencha manualmente.';
      }
      return;
    }

    if (data.logradouro) document.getElementById('checkoutStreet').value = data.logradouro;
    if (data.bairro) document.getElementById('checkoutNeighborhood').value = data.bairro;
    if (data.localidade) document.getElementById('checkoutCity').value = data.localidade;
    if (data.uf) document.getElementById('checkoutState').value = data.uf;

    if (feedback) {
      feedback.className = 'text-xs mt-1.5 font-medium text-emerald-600 block';
      feedback.innerHTML = `<i class="fas fa-check-circle"></i> ${data.localidade} - ${data.uf} localizada!`;
    }
    document.getElementById('checkoutNumber')?.focus();
  } catch {
    if (feedback) {
      feedback.className = 'text-xs mt-1.5 font-medium text-amber-600 block';
      feedback.innerText = 'Não foi possível consultar o CEP automaticamente.';
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalBtn;
    }
  }
}

function handleCheckoutApplyCoupon() {
  const input = document.getElementById('checkoutCouponInput');
  const feedback = document.getElementById('checkoutCouponFeedback');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (!code) return;

  if (code === 'BRUNA10' || code === 'OURO10') {
    checkoutCoupon = { code, discount: 0.10 };
    if (feedback) {
      feedback.className = 'text-xs mt-1.5 font-medium text-emerald-600 flex items-center gap-1 block';
      feedback.innerHTML = '<i class="fas fa-check-circle"></i> Cupom de 10% aplicado com sucesso!';
    }
    showToast('Cupom de 10% aplicado com sucesso!');
    renderCheckoutSummary();
  } else {
    if (feedback) {
      feedback.className = 'text-xs mt-1.5 font-medium text-rose-600 flex items-center gap-1 block';
      feedback.innerHTML = '<i class="fas fa-times-circle"></i> Cupom inválido ou expirado.';
    }
  }
}

function renderCheckoutSummary() {
  const cart = Storage.getCart();
  const itemsContainer = document.getElementById('checkoutSummaryItemsList');
  const countBadge = document.getElementById('checkoutSummaryItemCount');
  const paymentConfig = Storage.getPayment();

  if (!itemsContainer) return;

  const totalCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  if (countBadge) countBadge.innerText = `${totalCount} ${totalCount === 1 ? 'Joia' : 'Joias'}`;

  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p class="text-xs text-stone-400 py-4 text-center">Nenhum item na sacola.</p>';
    return;
  }

  let subtotal = 0;
  itemsContainer.innerHTML = cart.map(item => {
    const itemTotal = Number(item.price) * Number(item.quantity);
    subtotal += itemTotal;
    return `
      <div class="flex items-center gap-3 p-2.5 rounded-2xl bg-stone-50 border border-stone-200/80">
        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-xl object-cover border border-stone-200">
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-heading font-bold text-stone-900 truncate">${item.name}</h4>
          <span class="text-[10px] text-stone-500">${item.quantity}x ${Number(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        <span class="text-xs font-bold text-stone-900 font-heading">${itemTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </div>
    `;
  }).join('');

  let shippingPrice = 0;
  const pacPriceEl = document.getElementById('checkoutPacPrice');
  const pacBadgeEl = document.getElementById('checkoutPacBadge');

  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    if (pacPriceEl) pacPriceEl.innerText = 'Grátis';
    if (pacBadgeEl) pacBadgeEl.innerText = 'Grátis';
  } else {
    if (pacPriceEl) pacPriceEl.innerText = 'R$ 19,90';
    if (pacBadgeEl) pacBadgeEl.innerText = 'Padrão';
  }

  if (selectedShippingMethod === 'PAC') {
    shippingPrice = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 19.90;
  } else if (selectedShippingMethod === 'SEDEX') {
    shippingPrice = 34.90;
  } else if (selectedShippingMethod === 'RETIRADA') {
    shippingPrice = 0;
  }

  const couponObj = checkoutCoupon || activeCoupon;
  let couponDiscount = 0;
  const couponRow = document.getElementById('checkoutCouponRow');
  const couponText = document.getElementById('checkoutCouponDiscount');

  if (couponObj) {
    couponDiscount = subtotal * couponObj.discount;
    if (couponRow) couponRow.classList.remove('hidden');
    if (couponText) couponText.innerText = `- ${couponDiscount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
  } else {
    if (couponRow) couponRow.classList.add('hidden');
  }

  let pixDiscount = 0;
  const pixRow = document.getElementById('checkoutPixDiscountRow');
  const pixText = document.getElementById('checkoutPixDiscount');

  if (selectedPaymentMethod === 'pix') {
    pixDiscount = (subtotal - couponDiscount) * 0.05;
    if (pixRow) pixRow.classList.remove('hidden');
    if (pixText) pixText.innerText = `- ${pixDiscount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
  } else {
    if (pixRow) pixRow.classList.add('hidden');
  }

  const grandTotal = Math.max(0, subtotal + shippingPrice - couponDiscount - pixDiscount);
  const maxInst = paymentConfig.maxInstallmentsWithoutInterest || 10;
  const instVal = (grandTotal / maxInst).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  document.getElementById('checkoutSubtotal').innerText = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.getElementById('checkoutShippingPrice').innerText = shippingPrice === 0 ? 'Grátis' : shippingPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.getElementById('checkoutFinalTotal').innerText = grandTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.getElementById('checkoutInstallmentsInfo').innerText = `ou em até ${maxInst}x de R$ ${instVal} sem juros no Mercado Pago`;
}

async function processOrderCheckout() {
  const cart = Storage.getCart();
  if (cart.length === 0) {
    showToast('Sua sacola está vazia.');
    return;
  }

  const name = document.getElementById('checkoutName').value.trim();
  const email = document.getElementById('checkoutEmail').value.trim();
  const cpf = document.getElementById('checkoutCpf').value.trim();
  const phone = document.getElementById('checkoutPhone').value.trim();

  if (!name || !email || !cpf || !phone) {
    showToast('Por favor, preencha todos os seus dados pessoais.');
    document.getElementById('checkoutName').focus();
    return;
  }

  const isPickup = selectedShippingMethod === 'RETIRADA';
  let zip = document.getElementById('checkoutCep')?.value.trim() || '';
  let street = document.getElementById('checkoutStreet')?.value.trim() || '';
  let number = document.getElementById('checkoutNumber')?.value.trim() || '';
  let complement = document.getElementById('checkoutComplement')?.value.trim() || '';
  let neighborhood = document.getElementById('checkoutNeighborhood')?.value.trim() || '';
  let city = document.getElementById('checkoutCity')?.value.trim() || '';
  let state = document.getElementById('checkoutState')?.value.trim().toUpperCase() || '';

  if (isPickup) {
    if (!zip) zip = '01419-001';
    if (!street) street = 'Ateliê Bruna Valois - Showroom Exclusivo';
    if (!number) number = 'Showroom';
    if (!neighborhood) neighborhood = 'Jardins';
    if (!city) city = 'São Paulo';
    if (!state) state = 'SP';
  } else {
    if (!zip || !street || !number || !neighborhood || !city || !state) {
      showToast('Por favor, informe seu endereço completo para entrega segura.');
      document.getElementById('checkoutCep')?.focus();
      return;
    }
  }

  try {
    localStorage.setItem('BV_CUSTOMER_DATA', JSON.stringify({
      name, email, cpf, phone, zip, street, number, complement, neighborhood, city, state
    }));
  } catch {}

  const btn = document.getElementById('checkoutSubmitBtn');
  const originalHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Conectando ao Mercado Pago...';
  }

  try {
    const items = cart.map(item => ({
      id: String(item.id),
      title: item.name,
      description: item.category || 'Alta Joalheria Bruna Valois',
      unit_price: Number(item.price),
      price: Number(item.price),
      quantity: Number(item.quantity),
      image: item.image
    }));

    const payload = {
      items,
      customer: { name, email, cpf, phone },
      shipping: {
        method: selectedShippingMethod,
        zip,
        cep: zip,
        street,
        number,
        complement,
        neighborhood,
        city,
        state
      },
      paymentMethod: selectedPaymentMethod,
      couponCode: (checkoutCoupon || activeCoupon)?.code || null
    };

    const res = await fetch('/api/checkout/process-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Falha ao processar o pedido.');
    }

    localStorage.setItem('BV_LAST_ORDER_ID', data.orderId);
    Storage.setCart([]);
    updateCartBadge();
    renderCart();

    if (data.paymentMethod === 'checkout_pro') {
      showToast('Redirecionando para a interface oficial do Mercado Pago...');
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('URL de pagamento não retornada.');
      }
    } else if (data.paymentMethod === 'pix') {
      showToast('Pedido registrado! Realize o pagamento Pix.');
      navigateToTracking(null, data.orderId, data.order, data.pix);
    }
  } catch (err) {
    console.error('[Checkout] Erro:', err);
    showToast(`Erro ao finalizar: ${err.message}`);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    }
  }
}

// ================= 11. ACOMPANHAMENTO DE PEDIDOS =================
async function handleTrackingSearch(e) {
  if (e && e.preventDefault) e.preventDefault();
  const input = document.getElementById('trackingQueryInput');
  const query = input ? input.value.trim() : '';

  if (!query) {
    showToast('Digite o número do pedido, e-mail ou CPF.');
    input?.focus();
    return;
  }

  const loading = document.getElementById('trackingLoadingState');
  const notFound = document.getElementById('trackingNotFoundState');
  const multiView = document.getElementById('trackingMultipleOrdersView');
  const detailView = document.getElementById('trackingOrderDetailView');

  loading?.classList.remove('hidden');
  notFound?.classList.add('hidden');
  multiView?.classList.add('hidden');
  detailView?.classList.add('hidden');

  try {
    const res = await fetch(`/api/orders/lookup?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    loading?.classList.add('hidden');

    if (!res.ok || !data.success || !data.orders || data.orders.length === 0) {
      const msgEl = document.getElementById('trackingNotFoundMsg');
      if (msgEl) msgEl.innerText = data.message || `Nenhum pedido encontrado para "${query}".`;
      notFound?.classList.remove('hidden');
      return;
    }

    if (data.orders.length === 1) {
      renderOrderDetail(data.orders[0]);
    } else {
      renderMultipleOrdersList(data.orders);
    }
  } catch (err) {
    loading?.classList.add('hidden');
    showToast(`Erro na consulta: ${err.message}`);
  }
}

async function fetchAndDisplayOrder(orderId) {
  const loading = document.getElementById('trackingLoadingState');
  const notFound = document.getElementById('trackingNotFoundState');
  const multiView = document.getElementById('trackingMultipleOrdersView');
  const detailView = document.getElementById('trackingOrderDetailView');

  loading?.classList.remove('hidden');
  notFound?.classList.add('hidden');
  multiView?.classList.add('hidden');
  detailView?.classList.add('hidden');

  try {
    const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}`);
    const json = await res.json();
    loading?.classList.add('hidden');

    if (!res.ok || !json.success || !json.data) {
      notFound?.classList.remove('hidden');
      return;
    }

    renderOrderDetail(json.data);
  } catch {
    loading?.classList.add('hidden');
    notFound?.classList.remove('hidden');
  }
}

function renderMultipleOrdersList(orders) {
  const multiView = document.getElementById('trackingMultipleOrdersView');
  const list = document.getElementById('trackingOrdersCardsList');
  if (!multiView || !list) return;

  list.innerHTML = orders.map(order => {
    const dateFormatted = new Date(order.created_at).toLocaleString('pt-BR');
    const itemsCount = order.items ? order.items.reduce((acc, i) => acc + i.quantity, 0) : 0;
    const statusInfo = getStatusDisplayInfo(order.status, order.shipping_status);

    return `
      <div class="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-3">
            <span class="font-mono font-bold text-base text-stone-900">${order.id}</span>
            <span class="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${statusInfo.badgeClass}">
              ${statusInfo.label}
            </span>
          </div>
          <p class="text-xs text-stone-500">${dateFormatted} • ${itemsCount} ${itemsCount === 1 ? 'joia' : 'joias'}</p>
          <p class="text-sm font-bold text-stone-900 font-heading">Total: ${(order.total || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>

        <button onclick="fetchAndDisplayOrder('${order.id}')" class="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-1.5">
          <span>Ver Detalhes do Pedido</span>
          <i class="fas fa-arrow-right text-[10px]"></i>
        </button>
      </div>
    `;
  }).join('');

  multiView.classList.remove('hidden');
}

function getStatusDisplayInfo(status, shippingStatus) {
  if (status === 'cancelled' || status === 'rejected') {
    return { label: 'Cancelado / Recusado', badgeClass: 'bg-rose-100 text-rose-800' };
  }
  if (status === 'pending' || status === 'in_process') {
    return { label: 'Aguardando Pagamento', badgeClass: 'bg-amber-100 text-amber-800' };
  }
  if (shippingStatus === 'DELIVERED') {
    return { label: 'Entregue com Sucesso', badgeClass: 'bg-emerald-100 text-emerald-800' };
  }
  if (shippingStatus === 'SHIPPED') {
    return { label: 'Despachado com Seguro', badgeClass: 'bg-blue-100 text-blue-800' };
  }
  return { label: 'Em Confecção / Separação', badgeClass: 'bg-purple-100 text-purple-800' };
}

function renderOrderDetail(order, pixDetails = null) {
  stopOrderLivePolling();
  currentTrackingOrderId = order.id;

  const detailView = document.getElementById('trackingOrderDetailView');
  const multiView = document.getElementById('trackingMultipleOrdersView');
  if (multiView) multiView.classList.add('hidden');
  if (detailView) detailView.classList.remove('hidden');

  document.getElementById('detailOrderId').innerText = `#${order.id}`;
  const dateFormatted = new Date(order.created_at).toLocaleString('pt-BR');
  document.getElementById('detailOrderDate').innerText = `• ${dateFormatted}`;

  const statusInfo = getStatusDisplayInfo(order.status, order.shipping_status);
  const badgeContainer = document.getElementById('detailStatusBadgeContainer');
  if (badgeContainer) {
    badgeContainer.innerHTML = `
      <span class="text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider ${statusInfo.badgeClass} flex items-center gap-1.5 shadow-sm">
        <span class="w-2 h-2 rounded-full ${order.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'}"></span>
        ${statusInfo.label}
      </span>
    `;
  }

  updateOrderTimeline(order);

  const pendingPixBlock = document.getElementById('detailPendingPixBlock');
  const pixData = pixDetails || order.pix;

  if (order.status === 'pending' && pixData && (pixData.qr_code || pixData.qr_code_base64)) {
    if (pendingPixBlock) {
      pendingPixBlock.classList.remove('hidden');
      const img = document.getElementById('detailPixQrImage');
      const input = document.getElementById('detailPixCopyInput');
      if (input) input.value = pixData.qr_code || '';
      if (img) {
        if (pixData.qr_code_base64) {
          img.src = `data:image/png;base64,${pixData.qr_code_base64}`;
        } else {
          img.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixData.qr_code)}`;
        }
      }

      const simBox = document.getElementById('detailSandboxSimulateBox');
      if (simBox) {
        if (window.MP_CONFIG?.isSandbox || order.metadata?.is_sandbox) {
          simBox.classList.remove('hidden');
        } else {
          simBox.classList.add('hidden');
        }
      }
    }
    startOrderLivePolling(order.id);
  } else {
    if (pendingPixBlock) pendingPixBlock.classList.add('hidden');
  }

  const trackingBlock = document.getElementById('detailTrackingCodeBlock');
  if (order.tracking_code) {
    if (trackingBlock) trackingBlock.classList.remove('hidden');
    const valEl = document.getElementById('detailTrackingCodeValue');
    const linkEl = document.getElementById('detailCorreiosLink');
    if (valEl) valEl.innerText = order.tracking_code;
    if (linkEl) {
      linkEl.href = `https://rastreamento.correios.com.br/app/index.php?codigo=${encodeURIComponent(order.tracking_code)}`;
    }
  } else {
    if (trackingBlock) trackingBlock.classList.add('hidden');
  }

  const itemsList = document.getElementById('detailItemsList');
  const itemsCount = document.getElementById('detailItemsCount');
  const items = order.items || [];
  if (itemsCount) itemsCount.innerText = `${items.length} ${items.length === 1 ? 'joia' : 'joias'}`;

  if (itemsList) {
    itemsList.innerHTML = items.map(item => `
      <div class="flex items-center gap-4 p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
        <img src="${item.image || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80'}" alt="${item.title || item.name}" class="w-16 h-16 rounded-xl object-cover border border-stone-200">
        <div class="flex-1 min-w-0">
          <h4 class="font-heading font-bold text-sm text-stone-900 truncate">${item.title || item.name}</h4>
          <span class="text-xs text-stone-500 block">Quantidade: ${item.quantity || 1} un</span>
        </div>
        <span class="font-heading font-bold text-sm text-stone-900">${((item.unit_price || item.price || 0) * (item.quantity || 1)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </div>
    `).join('');
  }

  const customer = order.customer || order.payer || {};
  const shipping = order.shipping || {};
  document.getElementById('detailCustomerName').innerText = customer.name || 'Cliente Bruna Valois';
  document.getElementById('detailAddressStreet').innerText = `${shipping.street || ''}, ${shipping.number || ''} ${shipping.complement ? '- ' + shipping.complement : ''}`;
  document.getElementById('detailAddressCity').innerText = `${shipping.neighborhood || ''} - ${shipping.city || ''}/${shipping.state || ''}`;
  document.getElementById('detailAddressCep').innerText = (shipping.zip || shipping.cep) ? `CEP: ${shipping.zip || shipping.cep}` : '';
  document.getElementById('detailShippingMethod').innerText = `${shipping.method || 'PAC'} • Seguro Total Incluso`;

  const subtotal = order.subtotal || order.total || 0;
  const shippingPrice = order.shipping_price || 0;
  const discount = order.discount || 0;
  const total = order.total || 0;

  document.getElementById('detailSubtotal').innerText = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.getElementById('detailShippingPrice').innerText = shippingPrice === 0 ? 'Grátis' : shippingPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const discountRow = document.getElementById('detailDiscountRow');
  const discountEl = document.getElementById('detailDiscount');
  if (discount > 0) {
    discountRow?.classList.remove('hidden');
    if (discountEl) discountEl.innerText = `- ${discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
  } else {
    discountRow?.classList.add('hidden');
  }

  document.getElementById('detailTotal').innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const content = Storage.getContent();
  const atelierPhone = String(content.whatsappNumber || '5511999999999').replace(/\D/g, '');
  const whatsappMsg = encodeURIComponent(`Olá Bruna Valois Ateliê! ✨ Gostaria de informações sobre o meu pedido #${order.id} (Nome: ${customer.name || 'Cliente'}, Status: ${statusInfo.label}).`);
  const whatsappBtn = document.getElementById('detailWhatsappSupportBtn');
  if (whatsappBtn) {
    whatsappBtn.href = `https://wa.me/${atelierPhone}?text=${whatsappMsg}`;
  }
}

function updateOrderTimeline(order) {
  let step = 1;
  const status = order.status;
  const shippingStatus = order.shipping_status || '';

  if (status === 'approved') {
    step = 2;
    if (shippingStatus === 'SEPARATING' || shippingStatus === 'PAID') {
      step = 3;
    } else if (shippingStatus === 'SHIPPED') {
      step = 4;
    } else if (shippingStatus === 'DELIVERED') {
      step = 5;
    }
  }

  const progressBar = document.getElementById('timelineProgressBar');
  if (progressBar) {
    const percentages = { 1: '10%', 2: '30%', 3: '52%', 4: '75%', 5: '100%' };
    progressBar.style.width = percentages[step] || '10%';
  }

  for (let i = 1; i <= 5; i++) {
    const circle = document.getElementById(`stepCircle${i}`);
    const timeEl = document.getElementById(`stepTime${i}`);
    if (!circle) continue;

    if (i < step) {
      circle.className = 'w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0';
      circle.innerHTML = '<i class="fas fa-check"></i>';
      if (timeEl) timeEl.innerText = 'Concluído';
    } else if (i === step) {
      circle.className = 'w-10 h-10 rounded-full bg-[#C5A059] text-stone-950 flex items-center justify-center font-bold text-sm shadow-lg flex-shrink-0 ring-4 ring-[#C5A059]/30 animate-pulse';
      if (timeEl) timeEl.innerText = 'Em Andamento';
    } else {
      circle.className = 'w-10 h-10 rounded-full bg-stone-100 text-stone-400 border border-stone-200 flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0';
      if (timeEl) timeEl.innerText = 'Aguardando';
    }
  }
}

function startOrderLivePolling(orderId) {
  stopOrderLivePolling();
  trackingPollingInterval = setInterval(async () => {
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}`);
      if (!res.ok) return;
      const json = await res.json();
      const order = json.data;

      if (order && order.status === 'approved') {
        stopOrderLivePolling();
        showToast('🎉 Pagamento Confirmado com Sucesso pelo Mercado Pago!');
        if (typeof confetti === 'function') {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
        renderOrderDetail(order);
      }
    } catch {}
  }, 3000);
}

function stopOrderLivePolling() {
  if (trackingPollingInterval) {
    clearInterval(trackingPollingInterval);
    trackingPollingInterval = null;
  }
}

function copyDetailPixCode() {
  const input = document.getElementById('detailPixCopyInput');
  if (!input || !input.value) return;

  input.select();
  navigator.clipboard.writeText(input.value).then(() => {
    showToast('Código Pix copiado para a área de transferência!');
  }).catch(() => {
    document.execCommand('copy');
    showToast('Código Pix copiado!');
  });
}

async function simulateDetailPixApproval() {
  if (!currentTrackingOrderId) return;
  try {
    const res = await fetch(`/api/checkout/simulate-approval/${encodeURIComponent(currentTrackingOrderId)}`, {
      method: 'POST'
    });
    const data = await res.json();
    if (data.success) {
      showToast('⚡ Simulação Sandbox concluída!');
      fetchAndDisplayOrder(currentTrackingOrderId);
    }
  } catch (err) {
    showToast(`Erro ao simular: ${err.message}`);
  }
}

function initCheckoutMasks() {
  const cpf = document.getElementById('checkoutCpf');
  const phone = document.getElementById('checkoutPhone');
  const cep = document.getElementById('checkoutCep');

  if (cpf) {
    cpf.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      e.target.value = v;
    });
  }

  if (phone) {
    phone.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 10) {
        v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (v.length > 6) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      }
      e.target.value = v;
    });
  }

  if (cep) {
    cep.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 8);
      if (v.length > 5) {
        v = v.replace(/(\d{5})(\d{1,3})/, '$1-$2');
      }
      e.target.value = v;

      if (v.replace(/\D/g, '').length === 8) {
        handleCepSearch();
      }
    });
  }
}

const renderCartItems = renderCart;

async function checkReturnUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get('status') || urlParams.get('collection_status');
  const orderId = urlParams.get('order_id') || urlParams.get('external_reference');

  if (status === 'approved') {
    showToast('🎉 Pagamento Aprovado no Mercado Pago! Parabéns!');
    if (typeof confetti === 'function') {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }

    Storage.saveCart([]);
    updateCartBadge();
    renderCart();

    if (orderId) {
      navigateToTracking(null, orderId);
    }

    window.history.replaceState({}, document.title, window.location.pathname);
  } else if (status === 'failure') {
    showToast('O pagamento não foi concluído no Mercado Pago. Tente novamente.');
    window.history.replaceState({}, document.title, window.location.pathname);
  } else if (status === 'pending') {
    showToast('Seu pagamento está pendente de processamento no Mercado Pago.');
    if (orderId) {
      navigateToTracking(null, orderId);
    }
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

function openReceiptModal(order) {
  const modal = document.getElementById('receiptModal');
  if (!modal) return;

  document.getElementById('receiptTransactionId').innerText = order.transactionId;
  document.getElementById('receiptDate').innerText = order.dateStr;
  document.getElementById('receiptMethod').innerText = order.method;
  document.getElementById('receiptTotalAmount').innerText = order.formattedTotal;

  const list = document.getElementById('receiptItemsList');
  if (list) {
    list.innerHTML = order.items.map(i => `
      <li class="flex justify-between text-xs">
        <span>${i.quantity}x ${i.name}</span>
        <span class="font-bold">${(Number(i.price) * Number(i.quantity)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </li>
    `).join('');
  }

  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modal.firstElementChild?.classList.remove('scale-95');
  }, 10);
}

function closeReceiptModal() {
  const modal = document.getElementById('receiptModal');
  if (modal) {
    modal.classList.add('opacity-0');
    modal.firstElementChild?.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

function sendOrderToWhatsApp() {
  if (!lastOrderData) return;

  const content = Storage.getContent();
  const phone = String(content.whatsappNumber || '5511999999999').replace(/\D/g, '');
  const itemsSummary = lastOrderData.items.map(i => `• ${i.quantity}x ${i.name}`).join('%0A');

  const msg = `Olá *Bruna Valois Joias e Semijoias*! ✨%0A%0AAcabei de finalizar o pedido com pagamento aprovado no *Mercado Pago*:%0A%0A*Código:* ${lastOrderData.transactionId}%0A*Data:* ${lastOrderData.dateStr}%0A*Método:* ${lastOrderData.method}%0A*Valor Total:* ${lastOrderData.formattedTotal}%0A%0A*Itens Adquiridos:*%0A${itemsSummary}%0A%0APoderiam por gentileza confirmar o recebimento e me enviar o código de rastreamento com seguro total?%0A%0AMuito obrigado(a)!`;

  window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

// ================= 12. OPERAÇÕES DE CRUD EM NUVEM COM PROMISES E AWAIT OBRIGATÓRIOS =================

/**
 * 12.1. Briefings de Encomendas Sob Medida (handleCustomOrderSubmit)
 * Salva novo registro diretamente na coleção global custom_orders com await setDoc(orderDocRef, orderData)
 * Sem mutação manual em memória.
 */
async function handleCustomOrderSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();

  const nome = document.getElementById('atelieNome').value.trim();
  const whatsapp = document.getElementById('atelieWhatsapp').value.trim();
  const tipo = document.getElementById('atelieTipo').value;
  const metal = document.getElementById('atelieMetal').value;
  const gema = document.getElementById('atelieGema').value;
  const aro = document.getElementById('atelieAro').value.trim();
  const orcamento = document.getElementById('atelieOrcamento').value;
  const prazo = document.getElementById('ateliePrazo').value;
  const descricao = document.getElementById('atelieDescricao').value.trim();
  const link = document.getElementById('atelieLink').value.trim();

  const now = new Date();
  const protocol = `AT-${Math.floor(1000 + Math.random() * 9000)}`;

  const orderData = {
    id: protocol,
    nome,
    whatsapp,
    tipo,
    metal,
    gema,
    aro: aro || 'A definir',
    orcamento,
    prazo: prazo || 'A combinar',
    descricao,
    link,
    status: 'Em Análise',
    data: now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    createdAt: now.toISOString()
  };

  try {
    ensureCloudAuthenticated();
    const orderDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'custom_orders', protocol);
    await setDoc(orderDocRef, orderData);

    if (e && e.target && typeof e.target.reset === 'function') {
      e.target.reset();
    }
    showToast(`Briefing ${protocol} sincronizado na nuvem e enviado aos nossos ourives!`);

    const content = Storage.getContent();
    const phone = String(content.whatsappNumber || '5511999999999').replace(/\D/g, '');

    const confirmDispatch = confirm(`Briefing ${protocol} registrado na nuvem do Ateliê Bruna Valois!\n\nDeseja abrir o WhatsApp agora para conversar diretamente com nossa curadora de joias?`);
    if (confirmDispatch) {
      const msg = `Olá *Ateliê Bruna Valois*! ✨%0A%0AAcabei de cadastrar o briefing de joia sob medida no site:%0A%0A*Protocolo:* ${protocol}%0A*Cliente:* ${nome}%0A*Tipo de Joia:* ${tipo}%0A*Metal:* ${metal}%0A*Gema:* ${gema}%0A*Aro/Medida:* ${orderData.aro}%0A*Orçamento Estimado:* ${orcamento}%0A*Descrição:* ${descricao}%0A%0AAguardo o contato para a modelagem 3D e proposta!`;
      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    }
  } catch (error) {
    showCloudPermissionError('Envio de Briefing Sob Medida', error);
  }
}

// Alias de compatibilidade
const handleAtelieSubmit = handleCustomOrderSubmit;

/**
 * 12.2. Atualização de Status de Encomenda (updateAtelieOrderStatus)
 * Executa await updateDoc(orderDocRef, { status: newStatus })
 */
async function updateAtelieOrderStatus(orderId, newStatus) {
  try {
    ensureCloudAuthenticated();
    const orderDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'custom_orders', orderId);
    await updateDoc(orderDocRef, {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
    showToast(`Status da encomenda ${orderId} atualizado na nuvem para "${newStatus}".`);
  } catch (error) {
    showCloudPermissionError(`Atualizar Status da Encomenda ${orderId}`, error);
  }
}

// ================= 13. SEGURANÇA E ACESSO AO PAINEL CMS =================
const CMS_PASSWORD = 'oprincipeencantado';

function requestCmsAccess() {
  if (sessionStorage.getItem('BV_CMS_AUTHENTICATED') === 'true') {
    openCmsModal();
  } else {
    openCmsAuthModal();
  }
}

function openCmsAuthModal() {
  const modal = document.getElementById('cmsAuthModal');
  const input = document.getElementById('cmsPasswordInput');
  const error = document.getElementById('cmsAuthError');
  if (modal) {
    if (error) error.classList.add('hidden');
    if (input) input.value = '';
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.firstElementChild?.classList.remove('scale-95');
      input?.focus();
    }, 10);
  }
}

function closeCmsAuthModal() {
  const modal = document.getElementById('cmsAuthModal');
  if (modal) {
    modal.classList.add('opacity-0');
    modal.firstElementChild?.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

function submitCmsPassword(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('cmsPasswordInput');
  const error = document.getElementById('cmsAuthError');
  const val = input ? input.value.trim() : '';

  if (val === CMS_PASSWORD) {
    sessionStorage.setItem('BV_CMS_AUTHENTICATED', 'true');
    closeCmsAuthModal();
    setTimeout(() => {
      openCmsModal();
      showToast('Acesso administrativo concedido com sucesso!');
    }, 300);
  } else {
    if (error) error.classList.remove('hidden');
    if (input) {
      input.classList.add('border-rose-500', 'animate-shake');
      setTimeout(() => input.classList.remove('border-rose-500', 'animate-shake'), 800);
      input.focus();
      input.select();
    }
  }
}

function togglePasswordVisibility() {
  const input = document.getElementById('cmsPasswordInput');
  const btn = document.getElementById('togglePasswordVisibilityBtn');
  if (!input || !btn) return;

  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    input.type = 'password';
    btn.innerHTML = '<i class="fas fa-eye"></i>';
  }
}

function logoutCms() {
  sessionStorage.removeItem('BV_CMS_AUTHENTICATED');
  closeCmsModal();
  showToast('Sessão administrativa bloqueada com sucesso.');
}

// ================= 14. PAINEL CMS ADMINISTRATIVO & OPERAÇÕES EM NUVEM =================
function openCmsModal() {
  const modal = document.getElementById('cmsModal');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.firstElementChild?.classList.remove('scale-95');
    }, 10);
  }

  // Preenche formulários com o estado hidratado da nuvem
  applyThemeToDOM(Storage.getTheme());
  applyContentToDOM(Storage.getContent());
  applyPaymentConfigToDOM(Storage.getPayment());
  renderCmsProductsTable();
  renderCmsCategoriesTable();
  populateProductCategorySelect();
  renderCmsAtelieOrders();
  switchCmsTab('cmsTabTheme');
}

function closeCmsModal() {
  const modal = document.getElementById('cmsModal');
  if (modal) {
    modal.classList.add('opacity-0');
    modal.firstElementChild?.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

function switchCmsTab(tabId) {
  document.querySelectorAll('.cms-nav-tab').forEach(b => {
    const icon = b.querySelector('i');
    if (b.dataset.tab === tabId) {
      b.classList.add('active', 'bg-white', 'text-stone-950', 'shadow-sm', 'border', 'border-stone-200');
      b.classList.remove('text-stone-600', 'hover:text-stone-900', 'bg-transparent', 'border-transparent');
      if (icon) {
        icon.classList.add('text-[#C5A059]');
        icon.classList.remove('text-stone-400');
      }
    } else {
      b.classList.remove('active', 'bg-white', 'text-stone-950', 'shadow-sm', 'border', 'border-stone-200');
      b.classList.add('text-stone-600', 'hover:text-stone-900', 'bg-transparent', 'border-transparent');
      if (icon) {
        icon.classList.remove('text-[#C5A059]');
        icon.classList.add('text-stone-400');
      }
    }
  });

  document.querySelectorAll('.cms-tab-content').forEach(c => {
    c.classList.add('hidden');
  });

  const activeContent = document.getElementById(tabId);
  if (activeContent) {
    activeContent.classList.remove('hidden');
  }
}

function setupCmsNavigation() {
  document.querySelectorAll('.cms-nav-tab').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      const targetId = tabBtn.dataset.tab;
      switchCmsTab(targetId);
    });
  });

  ['Primary', 'Accent', 'Bg', 'CardBg', 'Text'].forEach(key => {
    const input = document.getElementById(`cmsColor${key}`);
    const hexSpan = document.getElementById(`cmsHex${key}`);
    if (input && hexSpan) {
      input.addEventListener('input', (e) => {
        hexSpan.innerText = e.target.value;
      });
    }
  });
}

/**
 * 14.1. Publicação do CMS na Nuvem (saveCmsSettings)
 * Salva com await setDoc(configDocRef, updatedSettings, { merge: true }).
 * Notifica: "Alterações publicadas globalmente para todos os visitantes".
 */
async function saveCmsSettings() {
  const saveBtn = document.getElementById('cmsSaveSettingsBtn');
  const originalText = saveBtn ? saveBtn.innerHTML : '';

  const updatedTheme = {
    preset: 'custom',
    colorPrimary: document.getElementById('cmsColorPrimary').value,
    colorAccent: document.getElementById('cmsColorAccent').value,
    colorBg: document.getElementById('cmsColorBg').value,
    colorCardBg: document.getElementById('cmsColorCardBg').value,
    colorText: document.getElementById('cmsColorText').value,
    fontFamily: document.getElementById('cmsFontSelect').value
  };

  const updatedContent = {
    topAnnouncement: document.getElementById('cmsInputAnnouncement').value,
    heroTitle: document.getElementById('cmsInputHeroTitle').value,
    heroSubtitle: document.getElementById('cmsInputHeroSubtitle').value,
    heroImage: document.getElementById('cmsInputHeroImg').value,
    aboutBrand: document.getElementById('cmsInputAboutBrand').value,
    whatsappNumber: document.getElementById('cmsInputWhatsapp').value
  };

  const updatedPayment = {
    checkoutUrl: document.getElementById('cmsMpCheckoutUrl') ? document.getElementById('cmsMpCheckoutUrl').value.trim() : '',
    publicKey: document.getElementById('cmsMpPublicKey').value.trim(),
    accessToken: document.getElementById('cmsMpAccessToken').value.trim(),
    environment: document.getElementById('cmsMpEnvironment').value,
    maxInstallmentsWithoutInterest: parseInt(document.getElementById('cmsMpInstallments').value, 10) || 10,
    pixKey: document.getElementById('cmsPixKey').value.trim()
  };

  const updatedSettings = {
    theme: updatedTheme,
    content: updatedContent,
    payment: updatedPayment,
    updatedAt: new Date().toISOString()
  };

  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1.5"></i> Publicando na Nuvem...';
  }

  try {
    ensureCloudAuthenticated();
    const configDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'site_config', 'main');
    await setDoc(configDocRef, updatedSettings, { merge: true });

    showToast('Alterações publicadas globalmente para todos os visitantes');
    closeCmsModal();
  } catch (error) {
    showCloudPermissionError('Publicação de Configurações CMS', error);
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = originalText;
    }
  }
}

// Alias de compatibilidade
const saveCmsChanges = saveCmsSettings;

async function restoreDefaultSettings() {
  if (!confirm('Deseja restaurar na nuvem as configurações originais de fábrica de cores, vitrine e textos para todos os dispositivos?')) {
    return;
  }

  try {
    ensureCloudAuthenticated();
    if (!firebaseNativeSdk) {
      const res = await fetch('/api/cloud/reset', {
        method: 'POST',
        headers: getCloudAuthHeaders(),
        body: JSON.stringify({ appId })
      });
      if (!res.ok) throw new Error('Falha ao restaurar padrões na nuvem.');
    } else {
      const configDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'site_config', 'main');
      await setDoc(configDocRef, {
        theme: DEFAULT_THEME_CONFIG,
        content: DEFAULT_CONTENT_CONFIG,
        payment: DEFAULT_PAYMENT_CONFIG,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      for (const cat of INITIAL_CATEGORIES) {
        const catDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'categories', cat.id);
        await setDoc(catDocRef, cat, { merge: true });
      }

      for (const prod of INITIAL_PRODUCTS) {
        const prodDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'products', prod.id);
        await setDoc(prodDocRef, prod, { merge: true });
      }
    }

    showToast('Alterações publicadas globalmente para todos os visitantes');
  } catch (error) {
    showCloudPermissionError('Restaurar Padrões de Fábrica', error);
  }
}

// ================= 15. CRUD DE PRODUTOS EM NUVEM (ZERO MUTAÇÃO LOCAL) =================
function renderCmsProductsTable() {
  const tbody = document.getElementById('cmsProductsTableBody');
  if (!tbody) return;

  const products = Storage.getProducts();

  if (!products || products.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="p-8 text-center text-stone-400 text-xs">
          Nenhuma joia cadastrada no catálogo em nuvem. Clique em <strong>"+ Nova Joia"</strong> acima para adicionar.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = products.map(item => `
    <tr class="hover:bg-stone-50 transition" data-product-row="${item.id}">
      <td class="p-3">
        <div class="flex items-center gap-3">
          <img src="${item.image}" alt="${item.name}" class="w-10 h-10 rounded-lg object-cover border border-stone-200">
          <div>
            <span class="font-bold text-stone-900 block">${item.name}</span>
            <span class="text-[10px] text-stone-500">${item.tag || 'Sem selo'}</span>
          </div>
        </div>
      </td>
      <td class="p-3 font-medium text-stone-700">${item.category}</td>
      <td class="p-3 font-bold text-stone-900">${(Number(item.price) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td class="p-3 text-stone-600 truncate max-w-xs">${item.material}</td>
      <td class="p-3 text-right space-x-2">
        <button onclick="editProduct('${item.id}')" class="text-stone-600 hover:text-[#C5A059] p-1.5" title="Editar Joia">
          <i class="fas fa-edit"></i>
        </button>
        <button onclick="deleteProduct('${item.id}')" class="text-stone-400 hover:text-rose-600 p-1.5" title="Excluir Joia">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function populateProductCategorySelect(selectedCategoryValue = '') {
  const select = document.getElementById('crudProductCategory');
  if (!select) return;

  const categories = Storage.getCategories() || [];
  const currentVal = selectedCategoryValue || select.value || '';

  if (categories.length === 0) {
    // Fallback caso todas as categorias tenham sido removidas
    select.innerHTML = '<option value="Sem Categoria">Sem Categoria (Cadastre na aba Categorias)</option>';
    return;
  }

  const visibleCategories = categories.filter(
    c => c.isActive !== false || normalizeCategoryText(c.name) === normalizeCategoryText(currentVal)
  );

  let html = '';
  visibleCategories.forEach(cat => {
    const isInactive = cat.isActive === false;
    html += `<option value="${cat.name}">${cat.name}${isInactive ? ' (Inativa)' : ''}</option>`;
  });

  // Se o produto sendo editado possui uma categoria que não está na lista, preserva na opção
  if (
    currentVal &&
    !visibleCategories.some(c => normalizeCategoryText(c.name) === normalizeCategoryText(currentVal))
  ) {
    html += `<option value="${currentVal}">${currentVal}</option>`;
  }

  select.innerHTML = html;

  if (currentVal) {
    const matched = Array.from(select.options).find(
      opt => normalizeCategoryText(opt.value) === normalizeCategoryText(currentVal)
    );
    if (matched) {
      select.value = matched.value;
    }
  }
}

function openProductFormModal(isEdit = false) {
  const modal = document.getElementById('productFormModal');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.firstElementChild?.classList.remove('scale-95');
    }, 10);
  }
  const uploadStatus = document.getElementById('crudProductImageUploadStatus');
  if (uploadStatus) uploadStatus.innerText = 'JPG, PNG ou WebP';

  if (!isEdit) {
    document.getElementById('productFormTitle').innerText = 'Adicionar Nova Joia';
    document.getElementById('productCrudForm').reset();
    document.getElementById('crudProductId').value = '';
    populateProductCategorySelect();
  }
}

function handleCrudProductImageUpload(event) {
  const file = event?.target?.files?.[0];
  if (!file) return;

  const statusEl = document.getElementById('crudProductImageUploadStatus');
  if (statusEl) statusEl.innerText = 'Otimizando imagem...';

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_DIM = 900;
      let width = img.width;
      let height = img.height;
      if (width > height && width > MAX_DIM) {
        height = Math.round((height * MAX_DIM) / width);
        width = MAX_DIM;
      } else if (height > MAX_DIM) {
        width = Math.round((width * MAX_DIM) / height);
        height = MAX_DIM;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);

      const urlInput = document.getElementById('crudProductImage');
      if (urlInput) urlInput.value = compressedDataUrl;
      if (statusEl) statusEl.innerText = `Foto pronta (${file.name})`;
      showToast('Foto carregada e otimizada para a nuvem!');
    };
    img.onerror = () => {
      const urlInput = document.getElementById('crudProductImage');
      if (urlInput) urlInput.value = e.target.result;
      if (statusEl) statusEl.innerText = `Foto carregada (${file.name})`;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function closeProductFormModal() {
  const modal = document.getElementById('productFormModal');
  if (modal) {
    modal.classList.add('opacity-0');
    modal.firstElementChild?.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

function editProduct(productId) {
  const products = Storage.getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  document.getElementById('productFormTitle').innerText = 'Editar Joia';
  document.getElementById('crudProductId').value = product.id;
  document.getElementById('crudProductName').value = product.name;
  populateProductCategorySelect(product.category);
  document.getElementById('crudProductCategory').value = product.category;
  document.getElementById('crudProductPrice').value = product.price;
  document.getElementById('crudProductImage').value = product.image;
  document.getElementById('crudProductTag').value = product.tag || '';
  document.getElementById('crudProductMaterial').value = product.material;
  document.getElementById('crudProductDescription').value = product.description;

  openProductFormModal(true);
}

/**
 * 15.1. Adicionar / Atualizar Produto (handleProductFormSubmit)
 * - Gera ID determinístico ou chave única (bv-prod-${Date.now()}).
 * - Executa escrita com await setDoc(docRef, payload, { merge: true }).
 * - Fecha o modal e exibe toast de sucesso somente após o retorno bem-sucedido da nuvem.
 * - Proibida qualquer mutação local em arrays ou localStorage em caso de erro.
 */
async function handleProductFormSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();

  const submitBtn = document.getElementById('crudProductSubmitBtn');
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Salvar Joia';

  const existingId = document.getElementById('crudProductId').value.trim();
  const id = existingId || `bv-prod-${Date.now()}`;
  const name = document.getElementById('crudProductName').value.trim();
  const category = document.getElementById('crudProductCategory').value;
  const price = parseFloat(document.getElementById('crudProductPrice').value) || 0;
  const image = document.getElementById('crudProductImage').value.trim() || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80';
  const tag = document.getElementById('crudProductTag').value.trim();
  const material = document.getElementById('crudProductMaterial').value.trim();
  const description = document.getElementById('crudProductDescription').value.trim();

  const payload = {
    id,
    name,
    category,
    price,
    image,
    tag,
    material,
    description,
    updatedAt: new Date().toISOString()
  };

  if (!existingId) {
    payload.createdAt = new Date().toISOString();
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1.5"></i> Sincronizando...';
  }

  try {
    ensureCloudAuthenticated();
    const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'products', id);
    await setDoc(docRef, payload, { merge: true });

    closeProductFormModal();
    showToast(
      existingId
        ? `Joia "${name}" atualizada globalmente na nuvem!`
        : `Joia "${name}" adicionada globalmente ao catálogo em nuvem!`
    );
  } catch (error) {
    showCloudPermissionError('Salvar Joia no Catálogo', error);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  }
}

// Alias de compatibilidade
const handleProductCrudSubmit = handleProductFormSubmit;

/**
 * 15.2. Excluir Produto (deleteProduct)
 * - Executa await deleteDoc(docRef).
 * - A remoção da linha da tabela do CMS e do card da vitrine ocorre exclusivamente
 *   através do evento disparado pelo listener em tempo real (onSnapshot), sem remoção manual imperativa prévia.
 */
async function deleteProduct(productId) {
  if (!confirm('Tem certeza de que deseja remover esta joia do catálogo global em nuvem?')) {
    return;
  }

  try {
    ensureCloudAuthenticated();
    const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'products', productId);
    await deleteDoc(docRef);
    showToast('Joia excluída globalmente do banco em nuvem.');
  } catch (error) {
    showCloudPermissionError('Excluir Joia do Catálogo', error);
  }
}

// ================= 15B. GESTOR DE CATEGORIAS EM NUVEM (PADRÃO JVMODAS) =================
let currentCategoryAdminSearch = '';
let categoryFormIsActive = true;
let categoryIdPendingDelete = null;

function getCategoryProductCount(cat) {
  if (!cat) return 0;
  const products = Storage.getProducts() || [];
  const catNameNorm = normalizeCategoryText(cat.name);
  const catSlugNorm = normalizeCategoryText(cat.slug);
  return products.filter(p => {
    const pCatNorm = normalizeCategoryText(p.category);
    const pSlugNorm = slugifyCategory(p.category);
    return p.categoryId === cat.id || pCatNorm === catNameNorm || pSlugNorm === catSlugNorm;
  }).length;
}

function renderCmsCategoriesTable() {
  const categories = Storage.getCategories() || [];
  const tbody = document.getElementById('cmsCategoriesTableBody');

  // Atualiza badge na aba "Categorias"
  const tabBadge = document.getElementById('cmsTabCategoriesCountBadge');
  if (tabBadge) tabBadge.innerText = categories.length;

  // Calcula contadores de resumo (idêntico ao JVMODAS)
  const totalCategories = categories.length;
  const activeCategoriesCount = categories.filter(c => c.isActive !== false).length;
  const totalProductsLinked = categories.reduce((acc, c) => acc + getCategoryProductCount(c), 0);

  const statTotalEl = document.getElementById('catStatTotal');
  const statActiveEl = document.getElementById('catStatActive');
  const statLinkedEl = document.getElementById('catStatLinkedProducts');

  if (statTotalEl) statTotalEl.innerText = totalCategories;
  if (statActiveEl) statActiveEl.innerText = activeCategoriesCount;
  if (statLinkedEl) statLinkedEl.innerText = totalProductsLinked;

  // Filtra categorias pela busca
  const term = currentCategoryAdminSearch.trim().toLowerCase();
  const filtered = !term
    ? categories
    : categories.filter(c =>
        String(c.name || '').toLowerCase().includes(term) ||
        String(c.slug || '').toLowerCase().includes(term) ||
        String(c.description || '').toLowerCase().includes(term)
      );

  const showingEl = document.getElementById('catFilterShowingCount');
  const totalEl = document.getElementById('catFilterTotalCount');
  if (showingEl) showingEl.innerText = filtered.length;
  if (totalEl) totalEl.innerText = totalCategories;

  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="py-10 px-4 text-center text-stone-400">
          <div class="max-w-sm mx-auto space-y-1.5">
            <i class="fas fa-sitemap text-2xl text-stone-300 block mb-1"></i>
            <p class="font-semibold text-stone-700 text-xs">Nenhuma categoria encontrada</p>
            <p class="text-[11px] text-stone-400">
              ${term
                ? `Nenhum resultado corresponde à busca "${currentCategoryAdminSearch}".`
                : 'Comece cadastrando sua primeira categoria no botão "+ Nova Categoria" acima.'}
            </p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(cat => {
    const productCount = getCategoryProductCount(cat);
    const isActive = cat.isActive !== false;
    const slug = cat.slug || slugifyCategory(cat.name);

    return `
      <tr class="hover:bg-stone-50/90 transition group" data-category-row="${cat.id}">
        <!-- Nome & Descrição -->
        <td class="py-3.5 px-4">
          <div class="space-y-0.5">
            <span class="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-[#C5A059] transition-colors block">
              ${cat.name}
            </span>
            ${cat.description ? `<p class="text-[11px] text-stone-500 line-clamp-1 max-w-md">${cat.description}</p>` : ''}
          </div>
        </td>

        <!-- Slug (URL) -->
        <td class="py-3.5 px-4">
          <span class="inline-flex items-center gap-1.5 font-mono text-[11px] bg-stone-100 border border-stone-200 text-stone-700 px-2.5 py-1 rounded-md">
            <i class="fas fa-tag text-[10px] text-[#C5A059]"></i>
            /${slug}
          </span>
        </td>

        <!-- Qtd. Joias Vinculadas -->
        <td class="py-3.5 px-4 text-center">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
            productCount > 0
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'bg-stone-100 text-stone-500 border border-stone-200'
          }">
            <i class="fas fa-gem text-[10px] ${productCount > 0 ? 'text-[#C5A059]' : 'text-stone-400'}"></i>
            ${productCount} ${productCount === 1 ? 'joia' : 'joias'}
          </span>
        </td>

        <!-- Status com Switch Rápido -->
        <td class="py-3.5 px-4 text-center">
          <button
            type="button"
            onclick="toggleCategoryStatus('${cat.id}')"
            title="${isActive ? 'Clique para desativar' : 'Clique para ativar'}"
            class="inline-flex items-center gap-2 text-xs font-bold transition-all cursor-pointer"
          >
            <div class="w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
              isActive ? 'bg-emerald-600' : 'bg-stone-300'
            }">
              <div class="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                isActive ? 'translate-x-5' : 'translate-x-0'
              }"></div>
            </div>
            <span class="text-[11px] font-semibold ${isActive ? 'text-emerald-700' : 'text-stone-400'}">
              ${isActive ? 'Ativa' : 'Inativa'}
            </span>
          </button>
        </td>

        <!-- Ações -->
        <td class="py-3.5 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onclick="editCategory('${cat.id}')"
              title="Editar Categoria"
              class="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 border border-stone-200 transition"
            >
              <i class="fas fa-edit text-xs"></i>
            </button>
            <button
              type="button"
              onclick="openCategoryDeleteModal('${cat.id}')"
              title="Excluir Categoria"
              class="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition"
            >
              <i class="fas fa-trash-alt text-xs"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function handleCategorySearchInput(event) {
  currentCategoryAdminSearch = event?.target?.value || '';
  const clearBtn = document.getElementById('cmsCategorySearchClearBtn');
  if (clearBtn) {
    if (currentCategoryAdminSearch.trim()) clearBtn.classList.remove('hidden');
    else clearBtn.classList.add('hidden');
  }
  renderCmsCategoriesTable();
}

function clearCategorySearch() {
  currentCategoryAdminSearch = '';
  const input = document.getElementById('cmsCategorySearchInput');
  if (input) input.value = '';
  document.getElementById('cmsCategorySearchClearBtn')?.classList.add('hidden');
  renderCmsCategoriesTable();
}

function syncCategoryFormToggleUI() {
  const track = document.getElementById('crudCategoryActiveTrack');
  const thumb = document.getElementById('crudCategoryActiveThumb');
  if (!track || !thumb) return;

  if (categoryFormIsActive) {
    track.className = 'w-11 h-6 flex items-center rounded-full p-1 transition-colors bg-emerald-600';
    thumb.className = 'bg-white w-4 h-4 rounded-full shadow-md transform transition-transform translate-x-5';
  } else {
    track.className = 'w-11 h-6 flex items-center rounded-full p-1 transition-colors bg-stone-300';
    thumb.className = 'bg-white w-4 h-4 rounded-full shadow-md transform transition-transform translate-x-0';
  }
}

function toggleCategoryFormActiveState() {
  categoryFormIsActive = !categoryFormIsActive;
  syncCategoryFormToggleUI();
}

function validateCategoryNameAndSlug(rawName, editingId = '') {
  const trimmed = String(rawName || '').trim();
  if (!trimmed) return null;
  if (trimmed.length < 2) return 'O nome da categoria deve ter no mínimo 2 caracteres.';
  if (trimmed.length > 60) return 'O nome da categoria não pode exceder 60 caracteres.';

  const computedSlug = slugifyCategory(trimmed);
  if (!computedSlug) return 'O nome informado não gerou um slug válido.';

  const categories = Storage.getCategories() || [];
  const nameDuplicate = categories.some(c => {
    if (editingId && c.id === editingId) return false;
    return String(c.name || '').trim().toLowerCase() === trimmed.toLowerCase();
  });
  if (nameDuplicate) {
    return 'Já existe uma categoria cadastrada com este nome.';
  }

  const slugDuplicate = categories.some(c => {
    if (editingId && c.id === editingId) return false;
    return (c.slug || slugifyCategory(c.name)) === computedSlug;
  });
  if (slugDuplicate) {
    return 'O slug gerado já está em uso por outra categoria.';
  }

  return null;
}

function handleCategoryNameInput(event) {
  const val = event?.target?.value || '';
  const editingId = document.getElementById('crudCategoryId')?.value || '';
  const slugRow = document.getElementById('crudCategorySlugPreviewRow');
  const slugPreview = document.getElementById('crudCategorySlugPreview');
  const errorEl = document.getElementById('crudCategoryValidationError');
  const errorTextEl = document.getElementById('crudCategoryValidationErrorText');
  const submitBtn = document.getElementById('crudCategorySubmitBtn');

  const computedSlug = slugifyCategory(val);
  if (val.trim() && slugRow && slugPreview) {
    slugRow.classList.remove('hidden');
    slugPreview.innerText = `/${computedSlug}`;
  } else if (slugRow) {
    slugRow.classList.add('hidden');
  }

  const validationError = val.trim() ? validateCategoryNameAndSlug(val, editingId) : null;
  if (validationError && errorEl && errorTextEl) {
    errorTextEl.innerText = validationError;
    errorEl.classList.remove('hidden');
    if (submitBtn) submitBtn.disabled = true;
  } else {
    if (errorEl) errorEl.classList.add('hidden');
    if (submitBtn) submitBtn.disabled = false;
  }
}

function openCategoryFormModal(isEdit = false) {
  const modal = document.getElementById('categoryFormModal');
  if (!isEdit) {
    document.getElementById('categoryCrudForm')?.reset();
    document.getElementById('crudCategoryId').value = '';
    document.getElementById('categoryFormBadge').innerText = 'Nova Categoria';
    document.getElementById('categoryFormTitle').innerText = 'Cadastrar Nova Categoria';
    document.getElementById('crudCategorySubmitBtn').innerText = 'Salvar Categoria';
    document.getElementById('crudCategorySlugPreviewRow')?.classList.add('hidden');
    document.getElementById('crudCategoryValidationError')?.classList.add('hidden');
    document.getElementById('crudCategorySubmitBtn').disabled = false;
    categoryFormIsActive = true;
    syncCategoryFormToggleUI();
  }

  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.firstElementChild?.classList.remove('scale-95');
    }, 10);
  }
}

function closeCategoryFormModal() {
  const modal = document.getElementById('categoryFormModal');
  if (modal) {
    modal.classList.add('opacity-0');
    modal.firstElementChild?.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

function editCategory(categoryId) {
  const categories = Storage.getCategories() || [];
  const cat = categories.find(c => c.id === categoryId);
  if (!cat) return;

  document.getElementById('crudCategoryId').value = cat.id;
  document.getElementById('crudCategoryName').value = cat.name || '';
  document.getElementById('crudCategoryDescription').value = cat.description || '';
  document.getElementById('categoryFormBadge').innerText = 'Editar Categoria';
  document.getElementById('categoryFormTitle').innerText = `Editar "${cat.name}"`;
  document.getElementById('crudCategorySubmitBtn').innerText = 'Atualizar Categoria';

  categoryFormIsActive = cat.isActive !== false;
  syncCategoryFormToggleUI();

  const slugRow = document.getElementById('crudCategorySlugPreviewRow');
  const slugPreview = document.getElementById('crudCategorySlugPreview');
  if (slugRow && slugPreview) {
    slugRow.classList.remove('hidden');
    slugPreview.innerText = `/${cat.slug || slugifyCategory(cat.name)}`;
  }
  document.getElementById('crudCategoryValidationError')?.classList.add('hidden');
  document.getElementById('crudCategorySubmitBtn').disabled = false;

  openCategoryFormModal(true);
}

async function handleCategoryFormSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();

  const editingId = document.getElementById('crudCategoryId').value.trim();
  const rawName = document.getElementById('crudCategoryName').value;
  const trimmedName = String(rawName || '').trim();
  const description = document.getElementById('crudCategoryDescription').value.trim();

  const validationError = validateCategoryNameAndSlug(trimmedName, editingId);
  if (validationError) {
    const errorEl = document.getElementById('crudCategoryValidationError');
    const errorTextEl = document.getElementById('crudCategoryValidationErrorText');
    if (errorEl && errorTextEl) {
      errorTextEl.innerText = validationError;
      errorEl.classList.remove('hidden');
    }
    showToast(validationError, 'fa-exclamation-triangle');
    return;
  }

  const slug = slugifyCategory(trimmedName);
  const id = editingId || `cat-${slug}-${Date.now().toString(36)}`;
  const existingCat = editingId ? (Storage.getCategories() || []).find(c => c.id === editingId) : null;
  const previousName = existingCat ? existingCat.name : null;

  const payload = {
    id,
    name: trimmedName,
    slug,
    description: description || '',
    isActive: Boolean(categoryFormIsActive),
    updatedAt: new Date().toISOString()
  };

  if (!editingId) {
    payload.createdAt = new Date().toISOString();
  }

  const submitBtn = document.getElementById('crudCategorySubmitBtn');
  const originalText = submitBtn ? submitBtn.innerHTML : 'Salvar Categoria';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1.5"></i> Salvando...';
  }

  try {
    ensureCloudAuthenticated();
    const catDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'categories', id);
    await setDoc(catDocRef, payload, { merge: true });

    // Se o nome da categoria foi alterado, atualiza automaticamente as joias vinculadas na nuvem para manter a integridade
    if (editingId && previousName && previousName !== trimmedName) {
      const products = Storage.getProducts() || [];
      const linkedProducts = products.filter(
        p => normalizeCategoryText(p.category) === normalizeCategoryText(previousName)
      );
      for (const prod of linkedProducts) {
        const prodRef = doc(db, 'artifacts', appId, 'public', 'data', 'products', prod.id);
        await updateDoc(prodRef, {
          category: trimmedName,
          updatedAt: new Date().toISOString()
        });
      }
      if (normalizeCategoryText(currentCategoryFilter) === normalizeCategoryText(previousName)) {
        currentCategoryFilter = trimmedName;
      }
    }

    closeCategoryFormModal();
    showToast(
      editingId
        ? `Categoria "${trimmedName}" atualizada com sucesso na nuvem!`
        : `Categoria "${trimmedName}" criada com sucesso na nuvem!`
    );
  } catch (error) {
    showCloudPermissionError('Salvar Categoria', error);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }
}

async function toggleCategoryStatus(categoryId) {
  const categories = Storage.getCategories() || [];
  const cat = categories.find(c => c.id === categoryId);
  if (!cat) return;

  const newStatus = cat.isActive === false ? true : false;

  try {
    ensureCloudAuthenticated();
    const catDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'categories', categoryId);
    await updateDoc(catDocRef, {
      isActive: newStatus,
      updatedAt: new Date().toISOString()
    });
    showToast(`Categoria "${cat.name}" ${newStatus ? 'ativada' : 'desativada'} com sucesso.`);
  } catch (error) {
    showCloudPermissionError('Alternar Status da Categoria', error);
  }
}

function openCategoryDeleteModal(categoryId) {
  const categories = Storage.getCategories() || [];
  const cat = categories.find(c => c.id === categoryId);
  if (!cat) return;

  categoryIdPendingDelete = cat.id;
  const productCount = getCategoryProductCount(cat);

  const blockedView = document.getElementById('categoryDeleteBlockedView');
  const confirmView = document.getElementById('categoryDeleteConfirmView');

  if (productCount > 0) {
    // CASO A: Bloqueio por Integridade Referencial
    blockedView?.classList.remove('hidden');
    confirmView?.classList.add('hidden');
    const nameEl = document.getElementById('categoryDeleteBlockedName');
    const countEl = document.getElementById('categoryDeleteBlockedCount');
    if (nameEl) nameEl.innerText = `"${cat.name}"`;
    if (countEl) countEl.innerText = `${productCount} ${productCount === 1 ? 'joia' : 'joias'}`;
  } else {
    // CASO B: Exclusão permitida
    blockedView?.classList.add('hidden');
    confirmView?.classList.remove('hidden');
    const nameEl = document.getElementById('categoryDeleteConfirmName');
    if (nameEl) nameEl.innerText = `"${cat.name}"`;
  }

  const modal = document.getElementById('categoryDeleteModal');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.firstElementChild?.classList.remove('scale-95');
    }, 10);
  }
}

function closeCategoryDeleteModal() {
  categoryIdPendingDelete = null;
  const modal = document.getElementById('categoryDeleteModal');
  if (modal) {
    modal.classList.add('opacity-0');
    modal.firstElementChild?.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

async function confirmDeleteCategory() {
  if (!categoryIdPendingDelete) return;
  const categories = Storage.getCategories() || [];
  const cat = categories.find(c => c.id === categoryIdPendingDelete);
  if (!cat) {
    closeCategoryDeleteModal();
    return;
  }

  const productCount = getCategoryProductCount(cat);
  if (productCount > 0) {
    showToast(
      `Exclusão bloqueada: "${cat.name}" possui ${productCount} joia(s) vinculada(s).`,
      'fa-exclamation-triangle'
    );
    closeCategoryDeleteModal();
    return;
  }

  const btn = document.getElementById('confirmDeleteCategoryBtn');
  const originalHtml = btn ? btn.innerHTML : 'Confirmar Exclusão';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1.5"></i> Excluindo...';
  }

  try {
    ensureCloudAuthenticated();
    const catDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'categories', cat.id);
    await deleteDoc(catDocRef);
    closeCategoryDeleteModal();
    showToast(`Categoria "${cat.name}" excluída permanentemente da nuvem!`);
  } catch (error) {
    showCloudPermissionError('Excluir Categoria', error);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    }
  }
}

// ================= 16. RENDERIZAÇÃO DE ENCOMENDAS DO ATELIÊ NO PAINEL CMS =================
function renderCmsAtelieOrders() {
  const container = document.getElementById('cmsAtelieOrdersContainer');
  if (!container) return;

  const orders = Storage.getAtelieOrders();
  if (orders.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-stone-500 text-xs">
        Nenhum briefing recebido até o momento.
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(order => {
    let statusClass = 'bg-amber-100 text-amber-800 border-amber-200';
    if (order.status === 'Orçamento Enviado') statusClass = 'bg-sky-100 text-sky-800 border-sky-200';
    if (order.status === 'Em Produção') statusClass = 'bg-purple-100 text-purple-800 border-purple-200';
    if (order.status === 'Entregue') statusClass = 'bg-emerald-100 text-emerald-800 border-emerald-200';

    const cleanWhatsapp = String(order.whatsapp || '').replace(/\D/g, '');
    const atelierGreeting = encodeURIComponent(`Olá ${order.nome}, aqui é da Bruna Valois Joias e Ateliê! Recebemos seu briefing para um(a) ${order.tipo} em ${order.metal} com ${order.gema}. Vamos conversar sobre o seu projeto exclusivo?`);

    return `
      <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-stone-100">
          <div>
            <span class="text-xs font-mono font-bold text-stone-900">${order.id}</span>
            <span class="text-xs text-stone-500 ml-2">• ${order.data || ''}</span>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-[10px] text-stone-400 uppercase font-semibold">Status:</label>
            <select onchange="updateAtelieOrderStatus('${order.id}', this.value)" class="text-xs font-bold py-1 px-3 rounded-full border ${statusClass} focus:outline-none">
              <option value="Em Análise" ${order.status === 'Em Análise' ? 'selected' : ''}>Em Análise</option>
              <option value="Orçamento Enviado" ${order.status === 'Orçamento Enviado' ? 'selected' : ''}>Orçamento Enviado</option>
              <option value="Em Produção" ${order.status === 'Em Produção' ? 'selected' : ''}>Em Produção</option>
              <option value="Entregue" ${order.status === 'Entregue' ? 'selected' : ''}>Entregue</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-stone-700">
          <div>
            <span class="text-stone-400 block text-[10px] uppercase font-semibold">Cliente:</span>
            <span class="font-bold text-stone-900">${order.nome}</span>
            <span class="block text-stone-500 text-[11px]">${order.whatsapp}</span>
          </div>
          <div>
            <span class="text-stone-400 block text-[10px] uppercase font-semibold">Especificações:</span>
            <span class="font-semibold text-stone-800">${order.tipo}</span>
            <span class="block text-stone-500 text-[11px]">${order.metal}</span>
          </div>
          <div>
            <span class="text-stone-400 block text-[10px] uppercase font-semibold">Gema / Aro:</span>
            <span class="font-semibold text-stone-800">${order.gema}</span>
            <span class="block text-stone-500 text-[11px]">${order.aro}</span>
          </div>
          <div>
            <span class="text-stone-400 block text-[10px] uppercase font-semibold">Orçamento / Prazo:</span>
            <span class="font-bold text-stone-900">${order.orcamento}</span>
            <span class="block text-stone-500 text-[11px]">Prazo: ${order.prazo}</span>
          </div>
        </div>

        <div class="p-3 bg-stone-50 rounded-xl text-xs text-stone-600">
          <p class="font-medium text-stone-800 mb-1">Descrição do Conceito:</p>
          <p class="font-light leading-relaxed">${order.descricao}</p>
          ${order.link ? `<a href="${order.link}" target="_blank" class="inline-block mt-2 text-[#C5A059] hover:underline text-[11px]"><i class="fas fa-external-link-alt mr-1"></i> Ver Referências Visuais</a>` : ''}
        </div>

        <div class="pt-1 flex justify-end">
          <a href="https://wa.me/55${cleanWhatsapp}?text=${atelierGreeting}" target="_blank" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition">
            <i class="fab fa-whatsapp"></i> Chamar no WhatsApp
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// ================= 17. MODAL QUICK VIEW DETALHES DO PRODUTO =================
function openProductDetail(productId) {
  const products = Storage.getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const paymentConfig = Storage.getPayment();
  const maxInst = paymentConfig.maxInstallmentsWithoutInterest || 10;
  const priceNum = Number(product.price) || 0;
  const instValue = (priceNum / maxInst).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  document.getElementById('detailProductImage').src = product.image;
  document.getElementById('detailProductName').innerText = product.name;
  document.getElementById('detailProductCategory').innerText = product.category;
  document.getElementById('detailProductTag').innerText = product.tag || 'ALTA JOALHERIA';
  document.getElementById('detailProductPrice').innerText = priceNum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.getElementById('detailProductInstallments').innerText = `em até ${maxInst}x de R$ ${instValue} sem juros no Mercado Pago`;
  document.getElementById('detailProductMaterial').innerText = product.material;
  document.getElementById('detailProductDescription').innerText = product.description;

  const addBtn = document.getElementById('detailAddToCartBtn');
  addBtn.onclick = () => {
    addToCart(product.id, true);
    closeProductDetailModal();
  };

  const modal = document.getElementById('productDetailModal');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.firstElementChild?.classList.remove('scale-95');
    }, 10);
  }
}

function closeProductDetailModal() {
  const modal = document.getElementById('productDetailModal');
  if (modal) {
    modal.classList.add('opacity-0');
    modal.firstElementChild?.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

// ================= 18. TOAST NOTIFICATION =================
let toastTimeout = null;
function showToast(message, icon = 'fa-check-circle') {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  const iconEl = document.getElementById('toastIcon');

  if (!toast || !msgEl) return;

  msgEl.innerText = message;
  if (iconEl) iconEl.className = `fas ${icon} text-[#C5A059] text-base`;

  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3800);
}

// ================= 19. INICIALIZAÇÃO E EVENT LISTENERS =================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Aplica estado base visual inicial enquanto aguarda o handshake de autenticação da nuvem
  applyThemeToDOM(CloudState.theme);
  applyContentToDOM(CloudState.content);
  applyPaymentConfigToDOM(CloudState.payment);

  // 2. Inicia o Ciclo de Autenticação Prévia Garantida, Seeding Determinístico e Listeners em Tempo Real
  initCloudPersistenceEngine();

  // 3. Atualiza sacola local e navegação do CMS
  updateCartBadge();
  setupCmsNavigation();

  // 4. Ano no rodapé
  const yearSpan = document.getElementById('yearSpan');
  if (yearSpan) yearSpan.innerText = new Date().getFullYear();

  // 5. Listeners da Vitrine (Busca, Ordenação e Categorias)
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.toLowerCase().trim();
      if (currentSearchTerm) clearSearchBtn?.classList.remove('hidden');
      else clearSearchBtn?.classList.add('hidden');
      renderVitrine();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentSearchTerm = '';
      clearSearchBtn.classList.add('hidden');
      renderVitrine();
    });
  }

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSortOrder = e.target.value;
      renderVitrine();
    });
  }

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-btn').forEach(b => {
        b.classList.remove('bg-stone-900', 'text-white', 'border-stone-900');
        b.classList.add('bg-white', 'text-stone-700', 'border-stone-200');
      });
      btn.classList.add('bg-stone-900', 'text-white', 'border-stone-900');
      btn.classList.remove('bg-white', 'text-stone-700');

      currentCategoryFilter = btn.dataset.category;
      renderVitrine();
    });
  });

  // 6. Listeners da Sacola (Drawer)
  document.getElementById('cartOpenBtn')?.addEventListener('click', openCart);
  document.getElementById('cartCloseBtn')?.addEventListener('click', closeCart);
  document.getElementById('cartDrawerBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'cartDrawerBackdrop') closeCart();
  });
  document.getElementById('applyCouponBtn')?.addEventListener('click', applyCoupon);

  // 7. Listeners do Modal Embutido Mercado Pago (Cartão Interativo)
  const cardNum = document.getElementById('cardNumberInput');
  const cardName = document.getElementById('cardNameInput');
  const cardExp = document.getElementById('cardExpiryInput');
  const cardCpf = document.getElementById('cardCpfInput');

  if (cardNum) cardNum.addEventListener('input', handleCardNumberInput);
  if (cardName) {
    cardName.addEventListener('input', (e) => {
      const val = e.target.value.toUpperCase();
      const preview = document.getElementById('cardPreviewName');
      if (preview) preview.innerText = val || 'NOME DO CLIENTE';
    });
  }
  if (cardExp) {
    cardExp.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
      e.target.value = val;
      const preview = document.getElementById('cardPreviewExpiry');
      if (preview) preview.innerText = val || 'MM/AA';
    });
  }
  if (cardCpf) {
    cardCpf.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 11);
      if (val.length > 9) val = val.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
      else if (val.length > 6) val = val.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3');
      else if (val.length > 3) val = val.replace(/^(\d{3})(\d{1,3})$/, '$1.$2');
      e.target.value = val;
    });
  }

  document.getElementById('cardPaymentForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const instSelect = document.getElementById('cardInstallmentsSelect');
    const selectedInst = instSelect ? instSelect.value : '1';
    finalizePurchase(`Cartão de Crédito em ${selectedInst}x`);
  });

  // 8. Listeners do Recibo Pós-Venda
  document.getElementById('closeReceiptBtn')?.addEventListener('click', closeReceiptModal);
  document.getElementById('sendToWhatsAppBtn')?.addEventListener('click', sendOrderToWhatsApp);

  // 9. Listeners do Ateliê Sob Medida (handleCustomOrderSubmit)
  document.getElementById('atelieForm')?.addEventListener('submit', handleCustomOrderSubmit);

  // 10. Listeners do CMS (handleProductFormSubmit & handleCategoryFormSubmit)
  document.getElementById('cmsAuthForm')?.addEventListener('submit', submitCmsPassword);
  document.getElementById('togglePasswordVisibilityBtn')?.addEventListener('click', togglePasswordVisibility);
  document.getElementById('productCrudForm')?.addEventListener('submit', handleProductFormSubmit);
  document.getElementById('categoryCrudForm')?.addEventListener('submit', handleCategoryFormSubmit);

  // 11. Menu Mobile
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 12. Listeners Online/Offline do Navegador
  window.addEventListener('offline', () => updateCloudConnectionStatus('reconnecting'));
  window.addEventListener('online', () => ensureRealtimeStreamConnected());

  // 13. Inicialização do Checkout, Máscaras e Roteador SPA
  initCheckoutMasks();
  initRouter();
  initPublicPaymentConfig();
  checkReturnUrlParams();
});
