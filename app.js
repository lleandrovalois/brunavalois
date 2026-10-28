/**
 * BRUNA VALOIS JOIAS E SEMIJOIAS - APLICAÇÃO DE ALTA JOALHERIA
 * Arquitetura Modular em JavaScript com Sincronização em Tempo Real (BroadcastChannel + LocalStorage)
 */

// ================= ESTADO INICIAL E CATÁLOGO PADRÃO =================
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
  publicKey: 'APP_USR-78921-6543-9876-0001',
  accessToken: 'APP_USR-9876543210-PROD-SECRET',
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
    description: 'Lapidação brilhante com garra sutil em Ouro Branco maciço 18k. Design atemporal para noivados e celebrações inesquecíveis.'
  },
  {
    id: 'bv-002',
    name: 'Colar Riviera Serena com Esmeraldas Colombianas e Brilhantes',
    category: 'Colares',
    price: 14500.00,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    tag: 'Edição Limitada',
    material: 'Ouro Amarelo 18k e Esmeraldas Naturais de Muzo',
    description: 'Rara seleção de esmeraldas colombianas lapidadas à mão, intercaladas por microdiamantes com fecho gaveta e trava dupla de segurança.'
  },
  {
    id: 'bv-003',
    name: 'Brincos Cascata de Pérolas Barrocas e Topázio Imperial',
    category: 'Brincos',
    price: 1850.00,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    tag: 'Lançamento',
    material: 'Prata 925 com Banho Ouro 18k (20 milésimos)',
    description: 'Pérolas barrocas naturais dos mares do sul com movimento orgânico gracioso e gemas de topázio imperial lapidadas.'
  },
  {
    id: 'bv-004',
    name: 'Aliança Eternidade Royale Cravejada de Moissanite Flawless',
    category: 'Anéis',
    price: 3200.00,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
    tag: 'Best Seller',
    material: 'Ouro Amarelo 18k com Moissanites D-Color VVS1',
    description: 'Cravação em canaleta circular contínua simbolizando amor eterno. Moissanites com fogo e brilho ótico superior ao diamante.'
  },
  {
    id: 'bv-005',
    name: 'Gargantilha Choker Trançada Ouro Amarelo 18k Maciço',
    category: 'Colares',
    price: 6780.00,
    image: 'https://images.unsplash.com/photo-1611591475152-47354c8d0a45?auto=format&fit=crop&w=800&q=80',
    tag: 'Coleção Ouro 18k',
    material: 'Ouro Amarelo 18k (750) Maciço Italiano',
    description: 'Malha trançada de ourivesaria florentina com caimento anatômico suave no colo e acabamento espelhado de alto polimento.'
  },
  {
    id: 'bv-006',
    name: 'Pulseira Tênis Lumière Diamantes Zircônia Premium AAA+',
    category: 'Pulseiras',
    price: 890.00,
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
    tag: 'Semijoia Fina',
    material: 'Semijoia Alta Fusão com Banho Ouro 18k',
    description: 'A clássica pulseira tênis com pedras selecionadas de zircônia cúbica AAA+ lapidação brilhante. Fecho de joalheria com duas travas.'
  },
  {
    id: 'bv-007',
    name: 'Brincos Ear Cuff Constellation com Safiras Azuis e Diamantes',
    category: 'Brincos',
    price: 2490.00,
    image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80',
    tag: 'Alta Joalheria',
    material: 'Ouro Branco 18k e Safiras Azuis Naturais',
    description: 'Design escultural que acompanha o contorno da orelha com gradiente de safiras azuis celestes e diamantes estelares.'
  },
  {
    id: 'bv-008',
    name: 'Bracelete Rígido Imperial com Fecho Joia e Mola Oculta',
    category: 'Pulseiras',
    price: 5450.00,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    tag: 'Coleção Ouro 18k',
    material: 'Ouro Rosé 18k (750)',
    description: 'Bracelete rígido anatômico em Ouro Rosé 18k. Design minimalista com proporção imponente e fecho de encaixe invisível.'
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
    data: '27/10/2026 15:40'
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
    data: '26/10/2026 11:15'
  }
];

// ================= SINCRONIZAÇÃO EM TEMPO REAL VIA BROADCASTCHANNEL =================
const cmsBroadcast = new BroadcastChannel('bruna_valois_cms_sync');

// Gerenciador de Armazenamento Local Reativo
const Storage = {
  getTheme: () => JSON.parse(localStorage.getItem('BV_THEME_CONFIG')) || DEFAULT_THEME_CONFIG,
  setTheme: (data) => {
    localStorage.setItem('BV_THEME_CONFIG', JSON.stringify(data));
    cmsBroadcast.postMessage({ type: 'THEME_SYNC', data });
  },

  getContent: () => JSON.parse(localStorage.getItem('BV_CONTENT_CONFIG')) || DEFAULT_CONTENT_CONFIG,
  setContent: (data) => {
    localStorage.setItem('BV_CONTENT_CONFIG', JSON.stringify(data));
    cmsBroadcast.postMessage({ type: 'CONTENT_SYNC', data });
  },

  getPayment: () => JSON.parse(localStorage.getItem('BV_PAYMENT_CONFIG')) || DEFAULT_PAYMENT_CONFIG,
  setPayment: (data) => {
    localStorage.setItem('BV_PAYMENT_CONFIG', JSON.stringify(data));
    cmsBroadcast.postMessage({ type: 'PAYMENT_SYNC', data });
  },

  getProducts: () => JSON.parse(localStorage.getItem('BV_PRODUCTS')) || INITIAL_PRODUCTS,
  setProducts: (data) => {
    localStorage.setItem('BV_PRODUCTS', JSON.stringify(data));
    cmsBroadcast.postMessage({ type: 'PRODUCTS_SYNC', data });
  },

  getCart: () => JSON.parse(localStorage.getItem('BV_CART')) || [],
  setCart: (data) => localStorage.setItem('BV_CART', JSON.stringify(data)),

  getAtelieOrders: () => JSON.parse(localStorage.getItem('BV_ATELIE_ORDERS')) || INITIAL_ATELIE_ORDERS,
  setAtelieOrders: (data) => {
    localStorage.setItem('BV_ATELIE_ORDERS', JSON.stringify(data));
    cmsBroadcast.postMessage({ type: 'ATELIE_SYNC', data });
  }
};

// Ouvinte de sincronização entre abas
cmsBroadcast.onmessage = (event) => {
  const { type } = event.data;
  if (type === 'THEME_SYNC') applyTheme(Storage.getTheme(), false);
  if (type === 'CONTENT_SYNC') applyContent(Storage.getContent(), false);
  if (type === 'PAYMENT_SYNC') applyPaymentConfig(Storage.getPayment(), false);
  if (type === 'PRODUCTS_SYNC') {
    renderVitrine();
    renderCmsProductsTable();
  }
  if (type === 'ATELIE_SYNC') renderCmsAtelieOrders();
  showToast('Atualização sincronizada em tempo real!');
};

// Fallback de Storage Event nativo do navegador
window.addEventListener('storage', (e) => {
  if (e.key?.startsWith('BV_')) {
    applyTheme(Storage.getTheme(), false);
    applyContent(Storage.getContent(), false);
    applyPaymentConfig(Storage.getPayment(), false);
    renderVitrine();
    renderCmsProductsTable();
    renderCmsAtelieOrders();
  }
});

// ================= GESTÃO DE TEMAS E IDENTIDADE VISUAL =================
function applyTheme(theme, save = true) {
  const root = document.documentElement;
  
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

  if (save) Storage.setTheme(theme);
}

function applyThemePreset(presetKey) {
  if (THEME_PRESETS[presetKey]) {
    const newTheme = { ...THEME_PRESETS[presetKey], preset: presetKey };
    applyTheme(newTheme, true);
    showToast(`Preset "${presetKey.toUpperCase()}" aplicado com sucesso!`);
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

// ================= GESTÃO DE CONTEÚDOS =================
function applyContent(content, save = true) {
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
  
  const cleanPhone = content.whatsappNumber.replace(/\D/g, '');
  if (elTopWhatsApp) elTopWhatsApp.href = `https://wa.me/${cleanPhone}`;
  if (elFooterPhone) elFooterPhone.innerText = `+${cleanPhone.slice(0, 2)} (${cleanPhone.slice(2, 4)}) ${cleanPhone.slice(4, 9)}-${cleanPhone.slice(9)}`;

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

  if (save) Storage.setContent(content);
}

// ================= GESTÃO DE PAGAMENTO MERCADO PAGO =================
function applyPaymentConfig(payment, save = true) {
  const elInstallmentBadge = document.getElementById('trustInstallmentText');
  if (elInstallmentBadge) {
    elInstallmentBadge.innerText = `Até ${payment.maxInstallmentsWithoutInterest}x Sem Juros no Mercado Pago`;
  }

  // Preencher inputs CMS
  const elKey = document.getElementById('cmsMpPublicKey');
  const elToken = document.getElementById('cmsMpAccessToken');
  const elEnv = document.getElementById('cmsMpEnvironment');
  const elInst = document.getElementById('cmsMpInstallments');
  const elPix = document.getElementById('cmsPixKey');

  if (elKey) elKey.value = payment.publicKey;
  if (elToken) elToken.value = payment.accessToken;
  if (elEnv) elEnv.value = payment.environment;
  if (elInst) elInst.value = payment.maxInstallmentsWithoutInterest;
  if (elPix) elPix.value = payment.pixKey;

  if (save) Storage.setPayment(payment);
}

// ================= VITRINE & CATÁLOGO DINÂMICO =================
let currentCategoryFilter = 'all';
let currentSearchTerm = '';
let currentSortOrder = 'default';

function renderVitrine() {
  const grid = document.getElementById('productGrid');
  const emptyState = document.getElementById('emptyCatalogState');
  if (!grid) return;

  const products = Storage.getProducts();
  const paymentConfig = Storage.getPayment();

  // Filtragem
  let filtered = products.filter(item => {
    const matchCategory = currentCategoryFilter === 'all' || item.category === currentCategoryFilter;
    const matchSearch = currentSearchTerm === '' || 
      item.name.toLowerCase().includes(currentSearchTerm) ||
      item.material.toLowerCase().includes(currentSearchTerm) ||
      (item.tag && item.tag.toLowerCase().includes(currentSearchTerm)) ||
      item.description.toLowerCase().includes(currentSearchTerm);
    return matchCategory && matchSearch;
  });

  // Ordenação
  if (currentSortOrder === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSortOrder === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSortOrder === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState?.classList.remove('hidden');
    return;
  }

  emptyState?.classList.add('hidden');

  grid.innerHTML = filtered.map(product => {
    const maxInst = paymentConfig.maxInstallmentsWithoutInterest || 10;
    const instValue = (product.price / maxInst).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedPrice = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return `
      <div class="product-card group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm flex flex-col justify-between" data-id="${product.id}">
        <!-- Imagem e Tag -->
        <div class="product-image-container relative aspect-square overflow-hidden bg-stone-100 cursor-pointer" onclick="openProductDetail('${product.id}')">
          <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" loading="lazy">
          
          <!-- Tag de Destaque -->
          ${product.tag ? `
            <span class="absolute top-3 left-3 bg-stone-900/90 text-[#C5A059] border border-[#C5A059]/40 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md">
              ${product.tag}
            </span>
          ` : ''}

          <!-- Botão Quick View Flutuante -->
          <button class="absolute bottom-3 inset-x-3 py-2 bg-stone-950/80 backdrop-blur-md text-white text-xs uppercase tracking-wider font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5 hover:bg-stone-900">
            <i class="fas fa-eye text-xs text-[#C5A059]"></i> Detalhes da Joia
          </button>
        </div>

        <!-- Informações do Produto -->
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

          <!-- Preço e Parcelas -->
          <div class="pt-2 border-t border-stone-100">
            <span class="text-xl font-heading font-bold text-stone-900 block">${formattedPrice}</span>
            <p class="text-[11px] text-stone-500">ou até <strong class="text-stone-700 font-semibold">${maxInst}x de R$ ${instValue}</strong> sem juros</p>
          </div>

          <!-- Ação de Compra Rápida -->
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
  
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('bg-stone-900', 'text-white', 'border-stone-900');
    btn.classList.add('bg-white', 'text-stone-700', 'border-stone-200');
    if (btn.dataset.category === 'all') {
      btn.classList.add('bg-stone-900', 'text-white', 'border-stone-900');
      btn.classList.remove('bg-white', 'text-stone-700');
    }
  });

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'default';

  renderVitrine();
}

// ================= SACOLA DE COMPRAS (DRAWER & REGRAS) =================
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

  // Animar badge da sacola
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
    const itemTotal = item.price * item.quantity;
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

  // Cálculo de desconto e totais
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

// Cupom de Desconto
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

// ================= CHECKOUT 100% MERCADO PAGO EM MODAL EMBUTIDO =================
let pixCountdownInterval = null;

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
      modal.firstElementChild.classList.remove('scale-95');
    }, 10);
  }

  // Calcular valor a pagar
  let subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let discount = activeCoupon ? subtotal * activeCoupon.discount : 0;
  const total = subtotal - discount;

  const formattedTotal = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.getElementById('mpPayAmount').innerText = formattedTotal;
  document.getElementById('cardPayBtnText').innerText = `Pagar ${formattedTotal} com Mercado Pago`;
  document.getElementById('mpBalancePayAmount').innerText = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  // Iniciar PIX e Parcelas
  generatePixPayment(total);
  setupCardInstallments(total);
  switchMpTab('pix');
}

function closeMercadoPagoCheckout() {
  const modal = document.getElementById('mercadoPagoModal');
  if (modal) {
    modal.classList.add('opacity-0');
    modal.firstElementChild.classList.add('scale-95');
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
    t.classList.remove('border-[#009EE3]', 'text-[#009EE3]', 'font-bold');
    t.classList.add('border-transparent', 'text-stone-600');
  });

  [viewPix, viewCard, viewBalance].forEach(v => v.classList.add('hidden'));

  if (tab === 'pix') {
    tabPix.classList.add('border-[#009EE3]', 'text-[#009EE3]', 'font-bold');
    tabPix.classList.remove('border-transparent', 'text-stone-600');
    viewPix.classList.remove('hidden');
  } else if (tab === 'card') {
    tabCard.classList.add('border-[#009EE3]', 'text-[#009EE3]', 'font-bold');
    tabCard.classList.remove('border-transparent', 'text-stone-600');
    viewCard.classList.remove('hidden');
  } else if (tab === 'balance') {
    tabBalance.classList.add('border-[#009EE3]', 'text-[#009EE3]', 'font-bold');
    tabBalance.classList.remove('border-transparent', 'text-stone-600');
    viewBalance.classList.remove('hidden');
  }
}

// 1. PIX Instantâneo
function generatePixPayment(amount) {
  const paymentConfig = Storage.getPayment();
  const pixContainer = document.getElementById('pixQrCodeContainer');
  if (!pixContainer) return;

  pixContainer.innerHTML = '';

  const cleanAmount = amount.toFixed(2);
  const pixKey = paymentConfig.pixKey || 'brunavalois@joiasexclusivas.com.br';
  const pixPayload = `00020126580014br.gov.bcb.pix0136${pixKey}520400005303986540${cleanAmount.length}${cleanAmount}5802BR5925BRUNA VALOIS JOIAS6009SAO PAULO62070503***6304`;

  document.getElementById('pixCodeInput').value = pixPayload;

  // Renderizar QR Code real
  try {
    new QRCode(pixContainer, {
      text: pixPayload,
      width: 160,
      height: 160,
      colorDark: "#1C1917",
      colorLight: "#FFFFFF",
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch (err) {
    pixContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(pixPayload)}" alt="QR Code PIX" class="w-40 h-40">`;
  }

  // Timer de 15 minutos
  if (pixCountdownInterval) clearInterval(pixCountdownInterval);
  let timeLeft = 15 * 60; // 900 segundos

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

function copyPixCode() {
  const input = document.getElementById('pixCodeInput');
  const feedback = document.getElementById('pixCopiedFeedback');
  if (!input) return;

  input.select();
  input.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(input.value).then(() => {
    feedback?.classList.remove('hidden');
    showToast('Código PIX Copia e Cola copiado com sucesso!');
    setTimeout(() => feedback?.classList.add('hidden'), 3500);
  });
}

// 2. Cartão de Crédito com Detecção de Bandeira e Validações
function setupCardInstallments(total) {
  const select = document.getElementById('cardInstallmentsSelect');
  if (!select) return;

  const paymentConfig = Storage.getPayment();
  const maxWithoutInterest = paymentConfig.maxInstallmentsWithoutInterest || 10;

  select.innerHTML = '';

  for (let i = 1; i <= 12; i++) {
    let installmentValue = 0;
    let label = '';

    if (i <= maxWithoutInterest) {
      installmentValue = total / i;
      label = `${i}x de R$ ${installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} sem juros (Total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`;
    } else {
      // 1.99% a.m. simulado acima do limite
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
  let val = e.target.value.replace(/\D/g, '');
  val = val.substring(0, 16);
  
  // Format 0000 0000 0000 0000
  let formatted = '';
  for (let i = 0; i < val.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += ' ';
    formatted += val[i];
  }
  e.target.value = formatted;

  // Atualizar Preview
  const previewNum = document.getElementById('cardPreviewNumber');
  if (previewNum) {
    previewNum.innerText = formatted ? formatted.padEnd(19, '•') : '•••• •••• •••• ••••';
  }

  // Detecção da Bandeira
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
  } else if (/^6062/.test(num)) {
    brandIconHtml = '<span class="font-bold text-xs bg-red-700 text-white px-1.5 py-0.5 rounded">HIPER</span>';
  }

  icon.innerHTML = brandIconHtml;
  badge.innerHTML = brandIconHtml;
}

function handleCardNameInput(e) {
  const val = e.target.value.toUpperCase();
  document.getElementById('cardPreviewName').innerText = val || 'NOME DO CLIENTE';
}

function handleCardExpiryInput(e) {
  let val = e.target.value.replace(/\D/g, '');
  if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
  e.target.value = val;
  document.getElementById('cardPreviewExpiry').innerText = val || 'MM/AA';
}

function handleCardCpfInput(e) {
  let val = e.target.value.replace(/\D/g, '');
  if (val.length > 11) val = val.substring(0, 11);
  if (val.length > 9) val = val.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
  else if (val.length > 6) val = val.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3');
  else if (val.length > 3) val = val.replace(/^(\d{3})(\d{1,3})$/, '$1.$2');
  e.target.value = val;
}

// 3. Conclusão e Aprovação da Compra
let lastOrderData = null;

function finalizePurchase(paymentMethodName) {
  const cart = Storage.getCart();
  if (cart.length === 0) return;

  let subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let discount = activeCoupon ? subtotal * activeCoupon.discount : 0;
  const total = subtotal - discount;

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

  // Efeito de celebração com confetes dourados
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#DFBA73', '#FFFFFF', '#009EE3']
    });
  } catch (e) {}

  // Limpar sacola após compra aprovada
  Storage.setCart([]);
  activeCoupon = null;
  updateCartBadge();
  renderCart();
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
        <span class="font-bold">${(i.price * i.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </li>
    `).join('');
  }

  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modal.firstElementChild.classList.remove('scale-95');
  }, 10);
}

function closeReceiptModal() {
  const modal = document.getElementById('receiptModal');
  if (modal) {
    modal.classList.add('opacity-0');
    modal.firstElementChild.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

function sendOrderToWhatsApp() {
  if (!lastOrderData) return;

  const content = Storage.getContent();
  const phone = content.whatsappNumber.replace(/\D/g, '') || '5511999999999';

  let itemsSummary = lastOrderData.items.map(i => `• ${i.quantity}x ${i.name}`).join('%0A');
  
  const msg = `Olá *Bruna Valois Joias e Semijoias*! ✨%0A%0AAcabei de finalizar o pedido com pagamento aprovado no *Mercado Pago*:%0A%0A*Código:* ${lastOrderData.transactionId}%0A*Data:* ${lastOrderData.dateStr}%0A*Método:* ${lastOrderData.method}%0A*Valor Total:* ${lastOrderData.formattedTotal}%0A%0A*Itens Adquiridos:*%0A${itemsSummary}%0A%0APoderiam por gentileza confirmar o recebimento e me enviar o código de rastreamento com seguro total?%0A%0AMuito obrigado(a)!`;

  window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

// ================= ATELIÊ SOB MEDIDA: ENCOMENDE SUA JOIA =================
function handleAtelieSubmit(e) {
  e.preventDefault();

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

  const newOrder = {
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
    data: now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  };

  const orders = Storage.getAtelieOrders();
  orders.unshift(newOrder);
  Storage.setAtelieOrders(orders);

  // Efeito de sucesso e limpeza
  e.target.reset();
  showToast(`Briefing ${protocol} enviado com sucesso para os nossos ourives!`);

  // Envio imediato para WhatsApp opcional
  const content = Storage.getContent();
  const phone = content.whatsappNumber.replace(/\D/g, '') || '5511999999999';

  const confirmDispatch = confirm(`Briefing ${protocol} registrado com sucesso no Ateliê Bruna Valois!\n\nDeseja abrir o WhatsApp agora para conversar diretamente com nossa curadora de joias?`);
  if (confirmDispatch) {
    const msg = `Olá *Ateliê Bruna Valois*! ✨%0A%0AAcabei de cadastrar o briefing de joia sob medida no site:%0A%0A*Protocolo:* ${protocol}%0A*Cliente:* ${nome}%0A*Tipo de Joia:* ${tipo}%0A*Metal:* ${metal}%0A*Gema:* ${gema}%0A*Aro/Medida:* ${newOrder.aro}%0A*Orçamento Estimado:* ${orcamento}%0A*Descrição:* ${descricao}%0A%0AAguardo o contato para a modelagem 3D e proposta!`;
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  }
}

// ================= SEGURANÇA E ACESSO AO PAINEL CMS =================
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

// ================= PAINEL CMS ADMINISTRATIVO =================
function openCmsModal() {
  const modal = document.getElementById('cmsModal');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.firstElementChild?.classList.remove('scale-95');
    }, 10);
  }

  // Preencher formulários com estado ativo
  applyTheme(Storage.getTheme(), false);
  applyContent(Storage.getContent(), false);
  applyPaymentConfig(Storage.getPayment(), false);
  renderCmsProductsTable();
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

  // Color Pickers interativos
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

function saveCmsChanges() {
  // Salvar Temas
  const updatedTheme = {
    preset: 'custom',
    colorPrimary: document.getElementById('cmsColorPrimary').value,
    colorAccent: document.getElementById('cmsColorAccent').value,
    colorBg: document.getElementById('cmsColorBg').value,
    colorCardBg: document.getElementById('cmsColorCardBg').value,
    colorText: document.getElementById('cmsColorText').value,
    fontFamily: document.getElementById('cmsFontSelect').value
  };
  applyTheme(updatedTheme, true);

  // Salvar Conteúdos
  const updatedContent = {
    topAnnouncement: document.getElementById('cmsInputAnnouncement').value,
    heroTitle: document.getElementById('cmsInputHeroTitle').value,
    heroSubtitle: document.getElementById('cmsInputHeroSubtitle').value,
    heroImage: document.getElementById('cmsInputHeroImg').value,
    aboutBrand: document.getElementById('cmsInputAboutBrand').value,
    whatsappNumber: document.getElementById('cmsInputWhatsapp').value
  };
  applyContent(updatedContent, true);

  // Salvar Pagamentos
  const updatedPayment = {
    publicKey: document.getElementById('cmsMpPublicKey').value,
    accessToken: document.getElementById('cmsMpAccessToken').value,
    environment: document.getElementById('cmsMpEnvironment').value,
    maxInstallmentsWithoutInterest: parseInt(document.getElementById('cmsMpInstallments').value, 10),
    pixKey: document.getElementById('cmsPixKey').value
  };
  applyPaymentConfig(updatedPayment, true);

  renderVitrine();
  showToast('Todas as alterações foram salvas e sincronizadas em tempo real!');
  closeCmsModal();
}

function restoreDefaultSettings() {
  if (confirm('Deseja restaurar as configurações originais de fábrica de cores, vitrine e textos?')) {
    localStorage.removeItem('BV_THEME_CONFIG');
    localStorage.removeItem('BV_CONTENT_CONFIG');
    localStorage.removeItem('BV_PAYMENT_CONFIG');
    localStorage.removeItem('BV_PRODUCTS');
    localStorage.removeItem('BV_ATELIE_ORDERS');

    applyTheme(DEFAULT_THEME_CONFIG, true);
    applyContent(DEFAULT_CONTENT_CONFIG, true);
    applyPaymentConfig(DEFAULT_PAYMENT_CONFIG, true);
    Storage.setProducts(INITIAL_PRODUCTS);
    Storage.setAtelieOrders(INITIAL_ATELIE_ORDERS);

    renderVitrine();
    renderCmsProductsTable();
    renderCmsAtelieOrders();

    showToast('Configurações originais de alta joalheria restauradas com sucesso!');
  }
}

// CRUD de Produtos
function renderCmsProductsTable() {
  const tbody = document.getElementById('cmsProductsTableBody');
  if (!tbody) return;

  const products = Storage.getProducts();

  tbody.innerHTML = products.map(item => `
    <tr class="hover:bg-stone-50 transition">
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
      <td class="p-3 font-bold text-stone-900">${item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
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

function openProductFormModal(isEdit = false) {
  const modal = document.getElementById('productFormModal');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.firstElementChild.classList.remove('scale-95');
    }, 10);
  }
  if (!isEdit) {
    document.getElementById('productFormTitle').innerText = 'Adicionar Nova Joia';
    document.getElementById('productCrudForm').reset();
    document.getElementById('crudProductId').value = '';
  }
}

function closeProductFormModal() {
  const modal = document.getElementById('productFormModal');
  if (modal) {
    modal.classList.add('opacity-0');
    modal.firstElementChild.classList.add('scale-95');
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
  document.getElementById('crudProductCategory').value = product.category;
  document.getElementById('crudProductPrice').value = product.price;
  document.getElementById('crudProductImage').value = product.image;
  document.getElementById('crudProductTag').value = product.tag || '';
  document.getElementById('crudProductMaterial').value = product.material;
  document.getElementById('crudProductDescription').value = product.description;

  openProductFormModal(true);
}

function deleteProduct(productId) {
  if (confirm('Tem certeza de que deseja remover esta joia do catálogo?')) {
    let products = Storage.getProducts();
    products = products.filter(p => p.id !== productId);
    Storage.setProducts(products);
    renderVitrine();
    renderCmsProductsTable();
    showToast('Joia removida do catálogo.');
  }
}

function handleProductCrudSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('crudProductId').value || `bv-${Date.now()}`;
  const name = document.getElementById('crudProductName').value.trim();
  const category = document.getElementById('crudProductCategory').value;
  const price = parseFloat(document.getElementById('crudProductPrice').value) || 0;
  const image = document.getElementById('crudProductImage').value.trim();
  const tag = document.getElementById('crudProductTag').value.trim();
  const material = document.getElementById('crudProductMaterial').value.trim();
  const description = document.getElementById('crudProductDescription').value.trim();

  const newProduct = { id, name, category, price, image, tag, material, description };

  let products = Storage.getProducts();
  const existingIndex = products.findIndex(p => p.id === id);

  if (existingIndex >= 0) {
    products[existingIndex] = newProduct;
    showToast(`Joia "${name}" atualizada com sucesso!`);
  } else {
    products.unshift(newProduct);
    showToast(`Joia "${name}" adicionada ao catálogo!`);
  }

  Storage.setProducts(products);
  renderVitrine();
  renderCmsProductsTable();
  closeProductFormModal();
}

// Gestão de Encomendas do Ateliê
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

    const cleanWhatsapp = order.whatsapp.replace(/\D/g, '');
    const atelierGreeting = encodeURIComponent(`Olá ${order.nome}, aqui é da Bruna Valois Joias e Ateliê! Recebemos seu briefing para um(a) ${order.tipo} em ${order.metal} com ${order.gema}. Vamos conversar sobre o seu projeto exclusivo?`);

    return `
      <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-stone-100">
          <div>
            <span class="text-xs font-mono font-bold text-stone-900">${order.id}</span>
            <span class="text-xs text-stone-500 ml-2">• ${order.data}</span>
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

function updateAtelieOrderStatus(orderId, newStatus) {
  const orders = Storage.getAtelieOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    Storage.setAtelieOrders(orders);
    showToast(`Status da encomenda ${orderId} alterado para "${newStatus}".`);
  }
}

// ================= MODAL QUICK VIEW DETALHES DO PRODUTO =================
function openProductDetail(productId) {
  const products = Storage.getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const paymentConfig = Storage.getPayment();
  const maxInst = paymentConfig.maxInstallmentsWithoutInterest || 10;
  const instValue = (product.price / maxInst).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  document.getElementById('detailProductImage').src = product.image;
  document.getElementById('detailProductName').innerText = product.name;
  document.getElementById('detailProductCategory').innerText = product.category;
  document.getElementById('detailProductTag').innerText = product.tag || 'ALTA JOALHERIA';
  document.getElementById('detailProductPrice').innerText = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
      modal.firstElementChild.classList.remove('scale-95');
    }, 10);
  }
}

function closeProductDetailModal() {
  const modal = document.getElementById('productDetailModal');
  if (modal) {
    modal.classList.add('opacity-0');
    modal.firstElementChild.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

// ================= TOAST NOTIFICATION =================
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
  }, 3500);
}

// ================= INICIALIZAÇÃO E EVENT LISTENERS =================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Carregar configurações salvas
  applyTheme(Storage.getTheme(), false);
  applyContent(Storage.getContent(), false);
  applyPaymentConfig(Storage.getPayment(), false);
  
  // 2. Renderizar componentes principais
  renderVitrine();
  updateCartBadge();
  setupCmsNavigation();

  // 3. Atualizar ano no rodapé
  const yearSpan = document.getElementById('yearSpan');
  if (yearSpan) yearSpan.innerText = new Date().getFullYear();

  // 4. Listeners da Vitrine
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

  // 5. Listeners da Sacola (Drawer)
  document.getElementById('cartOpenBtn')?.addEventListener('click', openCart);
  document.getElementById('cartCloseBtn')?.addEventListener('click', closeCart);
  document.getElementById('cartDrawerBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'cartDrawerBackdrop') closeCart();
  });
  document.getElementById('applyCouponBtn')?.addEventListener('click', applyCoupon);
  document.getElementById('checkoutBtn')?.addEventListener('click', openMercadoPagoCheckout);

  // 6. Listeners do Mercado Pago Checkout
  document.getElementById('closeMpModalBtn')?.addEventListener('click', closeMercadoPagoCheckout);
  document.getElementById('mpTabPix')?.addEventListener('click', () => switchMpTab('pix'));
  document.getElementById('mpTabCard')?.addEventListener('click', () => switchMpTab('card'));
  document.getElementById('mpTabBalance')?.addEventListener('click', () => switchMpTab('balance'));
  document.getElementById('copyPixBtn')?.addEventListener('click', copyPixCode);

  document.getElementById('simulatePixPaidBtn')?.addEventListener('click', () => {
    finalizePurchase('PIX Instantâneo Oficial');
  });

  document.getElementById('payWithMpBalanceBtn')?.addEventListener('click', () => {
    finalizePurchase('Saldo em Conta Mercado Pago');
  });

  // Inputs do Cartão de Crédito
  const cardNum = document.getElementById('cardNumberInput');
  const cardName = document.getElementById('cardNameInput');
  const cardExp = document.getElementById('cardExpiryInput');
  const cardCpf = document.getElementById('cardCpfInput');

  if (cardNum) cardNum.addEventListener('input', handleCardNumberInput);
  if (cardName) cardName.addEventListener('input', handleCardNameInput);
  if (cardExp) cardExp.addEventListener('input', handleCardExpiryInput);
  if (cardCpf) cardCpf.addEventListener('input', handleCardCpfInput);

  document.getElementById('cardPaymentForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const instSelect = document.getElementById('cardInstallmentsSelect');
    const selectedInst = instSelect ? instSelect.value : '1';
    finalizePurchase(`Cartão de Crédito em ${selectedInst}x`);
  });

  // 7. Listeners do Recibo Pós-Venda
  document.getElementById('closeReceiptBtn')?.addEventListener('click', closeReceiptModal);
  document.getElementById('sendToWhatsAppBtn')?.addEventListener('click', sendOrderToWhatsApp);

  // 8. Listeners do Ateliê Sob Medida
  document.getElementById('atelieForm')?.addEventListener('submit', handleAtelieSubmit);

  // 9. Listeners do CMS
  document.getElementById('adminTriggerBtn')?.addEventListener('click', requestCmsAccess);
  document.getElementById('cmsAuthForm')?.addEventListener('submit', submitCmsPassword);
  document.getElementById('togglePasswordVisibilityBtn')?.addEventListener('click', togglePasswordVisibility);
  document.getElementById('productCrudForm')?.addEventListener('submit', handleProductCrudSubmit);

  // 10. Menu Mobile
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});
