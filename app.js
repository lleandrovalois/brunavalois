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
  checkoutUrl: '',
  publicKey: 'APP_USR-78921-6543-9876-0001',
  accessToken: '',
  environment: 'production',
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
  saveCart: (data) => localStorage.setItem('BV_CART', JSON.stringify(data)),

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

// ================= INTEGRAÇÃO MERCADO PAGO OFICIAL =================
let pixPollingInterval = null;
let currentPixOrderId = null;

// Consulta a configuração pública do servidor (ambiente, modo sandbox, public key)
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
    console.warn('[MercadoPago] API offline ou executando em modo estático:', err.message);
  }
}

// ================= ROTEAMENTO CLIENT-SIDE (SPA ROUTER) =================
let currentRoute = 'home'; // 'home', 'checkout', 'tracking', 'order-detail'

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

  // Preenche dados salvos do cliente se houver
  loadSavedCustomerData();
  renderCheckoutSummary();
}

function navigateToTracking(e, orderId = null) {
  if (e && e.preventDefault) e.preventDefault();
  closeCart();
  currentRoute = 'tracking';

  const path = orderId ? `/pedido/${encodeURIComponent(orderId)}` : '/meus-pedidos';
  window.history.pushState({ route: 'tracking', orderId }, 'Acompanhar Pedido | Bruna Valois', path);

  document.getElementById('mainStoreContent')?.classList.add('hidden');
  document.getElementById('checkoutView')?.classList.add('hidden');
  document.getElementById('orderTrackingView')?.classList.remove('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (orderId) {
    const queryInput = document.getElementById('trackingQueryInput');
    if (queryInput) queryInput.value = orderId;
    fetchAndDisplayOrder(orderId);
  } else {
    // Se já havia buscado ou tem pedido recente no storage, sugere
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

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.add('hidden');
}

function initRouter() {
  window.addEventListener('popstate', (e) => {
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

  // Se retornou do Mercado Pago com aprovação:
  if (status === 'approved' && externalRef) {
    navigateToTracking(null, externalRef);
    return;
  }

  // Padrão: Home
  document.getElementById('mainStoreContent')?.classList.remove('hidden');
  document.getElementById('checkoutView')?.classList.add('hidden');
  document.getElementById('orderTrackingView')?.classList.add('hidden');
}

// ================= CHECKOUT SEGURO (MODELO JVMODAS) =================
let selectedShippingMethod = 'PAC'; // 'PAC', 'SEDEX', 'RETIRADA'
let selectedPaymentMethod = 'checkout_pro'; // 'checkout_pro', 'pix'
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
  
  const options = ['PAC', 'SEDEX', 'RETIRADA'];
  options.forEach(opt => {
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

// Busca de CEP automática via API ViaCEP
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

  if (feedback) {
    feedback.className = 'text-xs mt-1.5 font-medium text-stone-500 block';
    feedback.innerText = 'Consultando endereço nos Correios...';
  }

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json();

    if (data.erro) {
      if (feedback) {
        feedback.className = 'text-xs mt-1.5 font-medium text-rose-600 block';
        feedback.innerText = 'CEP não encontrado. Por favor, preencha o endereço manualmente.';
      }
      return;
    }

    // Auto-preenchimento
    if (data.logradouro) document.getElementById('checkoutStreet').value = data.logradouro;
    if (data.bairro) document.getElementById('checkoutNeighborhood').value = data.bairro;
    if (data.localidade) document.getElementById('checkoutCity').value = data.localidade;
    if (data.uf) document.getElementById('checkoutState').value = data.uf;

    if (feedback) {
      feedback.className = 'text-xs mt-1.5 font-medium text-emerald-600 block';
      feedback.innerHTML = `<i class="fas fa-check-circle"></i> ${data.localidade} - ${data.uf} localizada com sucesso!`;
    }

    document.getElementById('checkoutNumber')?.focus();
  } catch (err) {
    if (feedback) {
      feedback.className = 'text-xs mt-1.5 font-medium text-amber-600 block';
      feedback.innerText = 'Não foi possível consultar o CEP automaticamente. Preencha os campos abaixo.';
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalBtn;
    }
  }
}

// Cupom no Checkout
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

// Renderização dos totais e itens do resumo do checkout
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
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    return `
      <div class="flex items-center gap-3 p-2.5 rounded-2xl bg-stone-50 border border-stone-200/80">
        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-xl object-cover border border-stone-200">
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-heading font-bold text-stone-900 truncate">${item.name}</h4>
          <span class="text-[10px] text-stone-500">${item.quantity}x ${item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        <span class="text-xs font-bold text-stone-900 font-heading">${itemTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </div>
    `;
  }).join('');

  // Frete
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

  // Desconto de cupom
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

  // Desconto Pix (5% extra sobre o subtotal)
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

// Submissão do Checkout Unificado (Process Order)
async function processOrderCheckout() {
  const cart = Storage.getCart();
  if (cart.length === 0) {
    showToast('Sua sacola está vazia.');
    return;
  }

  // Validação dos dados do comprador
  const name = document.getElementById('checkoutName').value.trim();
  const email = document.getElementById('checkoutEmail').value.trim();
  const cpf = document.getElementById('checkoutCpf').value.trim();
  const phone = document.getElementById('checkoutPhone').value.trim();

  if (!name || !email || !cpf || !phone) {
    showToast('Por favor, preencha todos os seus dados pessoais.');
    document.getElementById('checkoutName').focus();
    return;
  }

  // Validação do endereço
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

  // Salva no storage para conveniência
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
      quantity: Number(item.quantity),
      image: item.image
    }));

    const payload = {
      items,
      customer: {
        name,
        email,
        cpf,
        phone
      },
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
      payment_method: selectedPaymentMethod,
      coupon: (checkoutCoupon || activeCoupon)?.code || null
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

    // Salva último ID gerado
    localStorage.setItem('BV_LAST_ORDER_ID', data.orderId);

    // Limpa a sacola
    cart = [];
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
      // Navega diretamente para a tela de acompanhamento com o pedido
      navigateToTracking(null, data.orderId);
      renderOrderDetail(data.order, data.pix);
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

// ================= ACOMPANHAMENTO DE PEDIDOS (MODELO JVMODAS) =================
let trackingPollingInterval = null;
let currentTrackingOrderId = null;

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
      if (msgEl) msgEl.innerText = data.message || `Nenhum pedido encontrado para "${query}". Verifique os dados e tente novamente.`;
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
  } catch (err) {
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
  // Se aprovado:
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

  // Header
  document.getElementById('detailOrderId').innerText = `#${order.id}`;
  const dateFormatted = new Date(order.created_at).toLocaleString('pt-BR');
  document.getElementById('detailOrderDate').innerText = `• ${dateFormatted}`;

  // Badge Status
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

  // Atualização da Esteira de 5 Passos
  updateOrderTimeline(order);

  // Bloco Pix Pendente
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

      // Mostra simulação de sandbox se ambiente de teste
      const simBox = document.getElementById('detailSandboxSimulateBox');
      if (simBox) {
        if (window.MP_CONFIG?.isSandbox || order.metadata?.is_sandbox) {
          simBox.classList.remove('hidden');
        } else {
          simBox.classList.add('hidden');
        }
      }
    }

    // Inicia Polling em tempo real a cada 3 segundos
    startOrderLivePolling(order.id);
  } else {
    if (pendingPixBlock) pendingPixBlock.classList.add('hidden');
  }

  // Bloco Rastreamento Correios
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

  // Produtos
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

  // Destinatário e Endereço
  const customer = order.customer || order.payer || {};
  const shipping = order.shipping || {};
  document.getElementById('detailCustomerName').innerText = customer.name || 'Cliente Bruna Valois';
  document.getElementById('detailAddressStreet').innerText = `${shipping.street || ''}, ${shipping.number || ''} ${shipping.complement ? '- ' + shipping.complement : ''}`;
  document.getElementById('detailAddressCity').innerText = `${shipping.neighborhood || ''} - ${shipping.city || ''}/${shipping.state || ''}`;
  document.getElementById('detailAddressCep').innerText = shipping.zip ? `CEP: ${shipping.zip}` : '';
  document.getElementById('detailShippingMethod').innerText = `${shipping.method || 'PAC'} • Seguro Total Incluso`;

  // Resumo Financeiro
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

  // Botão WhatsApp Suporte VIP
  const content = Storage.getContent();
  const atelierPhone = content.whatsappNumber.replace(/\D/g, '') || '5511999999999';
  const whatsappMsg = encodeURIComponent(`Olá Bruna Valois Ateliê! ✨ Gostaria de informações sobre o meu pedido #${order.id} (Nome: ${customer.name || 'Cliente'}, Status: ${statusInfo.label}).`);
  const whatsappBtn = document.getElementById('detailWhatsappSupportBtn');
  if (whatsappBtn) {
    whatsappBtn.href = `https://wa.me/${atelierPhone}?text=${whatsappMsg}`;
  }
}

// Atualização Visual dos 5 Passos da Esteira
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

    if (i < step) {
      // Concluído
      circle.className = 'w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0';
      circle.innerHTML = '<i class="fas fa-check"></i>';
      if (timeEl) timeEl.innerText = 'Concluído';
    } else if (i === step) {
      // Passo Atual Ativo
      circle.className = 'w-10 h-10 rounded-full bg-[#C5A059] text-stone-950 flex items-center justify-center font-bold text-sm shadow-lg flex-shrink-0 ring-4 ring-[#C5A059]/30 animate-pulse';
      if (timeEl) timeEl.innerText = 'Em Andamento';
    } else {
      // Futuro
      circle.className = 'w-10 h-10 rounded-full bg-stone-100 text-stone-400 border border-stone-200 flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0';
      if (timeEl) timeEl.innerText = 'Aguardando';
    }
  }
}

// Live Polling do Pedido (quando pendente)
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

// Máscaras de Input (Puro JS)
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

      // Auto busca ao atingir 8 dígitos
      if (v.replace(/\D/g, '').length === 8) {
        handleCepSearch();
      }
    });
  }
}

// Alias para compatibilidade
const renderCartItems = renderCart;

// 3. Verificação de Retorno de Checkout (/checkout/success ou query status=approved)
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
    checkoutUrl: document.getElementById('cmsMpCheckoutUrl') ? document.getElementById('cmsMpCheckoutUrl').value.trim() : '',
    publicKey: document.getElementById('cmsMpPublicKey').value.trim(),
    accessToken: document.getElementById('cmsMpAccessToken').value.trim(),
    environment: document.getElementById('cmsMpEnvironment').value,
    maxInstallmentsWithoutInterest: parseInt(document.getElementById('cmsMpInstallments').value, 10),
    pixKey: document.getElementById('cmsPixKey').value.trim()
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
  
  // 6. Listeners do Recibo Pós-Venda
  document.getElementById('closeReceiptBtn')?.addEventListener('click', closeReceiptModal);
  document.getElementById('sendToWhatsAppBtn')?.addEventListener('click', sendOrderToWhatsApp);

  // 7. Listeners do Ateliê Sob Medida
  document.getElementById('atelieForm')?.addEventListener('submit', handleAtelieSubmit);

  // 8. Listeners do CMS
  document.getElementById('adminTriggerBtn')?.addEventListener('click', requestCmsAccess);
  document.getElementById('cmsAuthForm')?.addEventListener('submit', submitCmsPassword);
  document.getElementById('togglePasswordVisibilityBtn')?.addEventListener('click', togglePasswordVisibility);
  document.getElementById('productCrudForm')?.addEventListener('submit', handleProductCrudSubmit);

  // 9. Menu Mobile
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 10. Inicialização do Checkout, Máscaras e Roteador SPA (Modelo JVMODAS)
  initCheckoutMasks();
  initRouter();
  initPublicPaymentConfig();
  checkReturnUrlParams();

});
