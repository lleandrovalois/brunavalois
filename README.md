# Bruna Valois - Alta Joalheria & Semijoias Finas

Aplicação web completa, moderna e responsiva de e-commerce e ateliê sob medida para alta joalheria, construída com arquitetura de arquivo único/modular em **HTML5**, **Tailwind CSS**, **Font Awesome**, **Google Fonts** e **JavaScript reativo com sincronização em tempo real**.

---

## 💎 Destaques do Projeto

### 1. Identidade Visual de Alta Joalheria & Glassmorphism
- **Paleta Nobre**: Preto ônix (`#1C1917`), Ouro Envelhecido (`#C5A059`), Fundo Nude/Alabastro (`#FAF9F6`), bordas suaves e gradientes dourados.
- **Tipografia Editorial**: *Playfair Display*, *Cormorant Garamond* e *Cinzel* para títulos majestosos, combinados com *Montserrat* e *Inter* para o corpo de texto.
- **Responsividade Total**: Sem rolagem horizontal, compatível com smartphones, tablets e telas 4K.

### 2. Painel CMS Administrativo (Sincronização em Tempo Real)
- Sincronização instantânea entre abas e dispositivos via **BroadcastChannel API** e **LocalStorage**.
- **4 Presets de Cores Prontos**:
  1. *Clássico Ouro & Nude* (`#1C1917`, `#C5A059`, `#FAF9F6`)
  2. *Minimal Rosé Gold* (`#2E282A`, `#C07A76`, `#FFF9F9`)
  3. *Esmeralda Real & Ouro* (`#062C22`, `#D4AF37`, `#F4F9F6`)
  4. *Dark Champagne* (`#0F0F11`, `#E5C158`, `#F7F6F2`)
- **Ajuste Fino de Cores**: Color pickers manuais para Cor Primária, Destaque Dourado, Fundo da Loja, Fundo dos Cards e Cor do Texto.
- **Seletor de Tipografia**: Escolha entre famílias clássicas editoriais.
- **Editor de Conteúdos**: Edição da barra superior de avisos/frete, título e subtítulo hero, imagem hero, história institucional e WhatsApp oficial.
- **Gerenciador de Credenciais de Pagamento**: Public Key, Access Token, ambiente Sandbox/Produção, limite de parcelas sem juros e chave PIX.

### 3. Catálogo & CRUD Completo de Produtos
- **Vitrine Dinâmica**:
  - Busca textual instantânea por nome, tag e descrição.
  - Filtros rápidos por categoria (*Todos*, *Colares*, *Brincos*, *Anéis*, *Pulseiras*, *Coleção Ouro 18k*).
  - Ordenação por destaques, menor preço, maior preço e nome alfabético.
  - Cards com efeito hover zoom suave, tags de lançamento/pureza, cálculo automático de parcelas sem juros e botão rápido de compra.
- **Área Administrativa do Catálogo**:
  - Formulário modal para Adicionar, Editar e Excluir peças.
  - Campos: Nome da joia, Categoria, Preço em R$, URL da imagem, Selo/Tag de destaque, Material/Pureza e Descrição detalhada.
  - Catálogo pré-carregado com 8 joias finas ilustrativas com fotos de alta qualidade.

### 4. Sacola de Compras & Checkout 100% Mercado Pago em Modal Embutido
- **Sacola Lateral (Drawer)**:
  - Controle de quantidade (+ e -), remoção de item e cálculo automático de subtotal e frete.
  - Barra de progresso para Frete Grátis com Seguro (acima de R$ 450,00).
  - Sistema de cupom de desconto (ex: `BRUNA10`).
- **Checkout Oficial Mercado Pago em Modal Embutido (Sem abrir nova aba)**:
  - **PIX Instantâneo**:
    - QR Code dinâmico gerado na hora via QRCode.js.
    - Código Copia e Cola funcional com botão copiar em 1 clique.
    - Timer regressivo de expiração (15 minutos).
    - Botão de confirmação de pagamento instantâneo simulado.
  - **Cartão de Crédito**:
    - Preview interativo do Cartão Virtual Mercado Pago com atualização em tempo real.
    - Detecção automática da bandeira do cartão (Visa, Mastercard, Amex, Elo, Hipercard) com ícones dinâmicos.
    - Validação de campos (número, titular, validade, CVV e CPF com máscara).
    - Seletor dinâmico de parcelas (1x a 12x) exibindo opções com e sem juros baseadas na configuração do CMS.
  - **Saldo em Conta Mercado Pago**:
    - Débito direto da conta digital Mercado Pago com confirmação em 1 clique.
  - **Recibo e Pós-Venda**:
    - Modal de aprovação com código de transação (`#MP-XXXXXXX`), método utilizado, resumo dos itens e valor total.
    - Botão para imprimir/salvar comprovante com folha de estilo de impressão limpa (`@media print`).
    - Botão de envio automático do pedido e comprovante diretamente para o WhatsApp da loja para recebimento do código de rastreamento com seguro total.

### 5. Ateliê Sob Medida: "Encomende sua Joia"
- Explicação visual do processo em 3 etapas (1. Briefing & Conceito → 2. Render 3D & Orçamento → 3. Produção Artesanal).
- Formulário detalhado com campos para:
  - Nome e WhatsApp do cliente.
  - Tipo de joia (Anel Solitário, Alianças, Colar, Brincos, Bracelete, Tiara, Outro).
  - Metal/Material (Ouro 18k Amarelo, Branco ou Rosé, Prata 925, Semijoia alta fusão, Platina 950).
  - Gema principal (Diamante Natural GIA, Moissanite Flawless, Esmeralda Colombiana, Safira Azul Royal, Rubi Birmanês, Pérola dos Mares do Sul, Zircônia AAA+).
  - Aro/Medida, Orçamento Estimado e Prazo Limite desejado.
  - Descrição detalhada do conceito e link para referências/croquis (Pinterest, Drive).
- **Gestão no CMS**:
  - Aba "Encomendas Ateliê" para o administrador listar os briefings recebidos.
  - Alteração do status do projeto (*Em Análise*, *Orçamento Enviado*, *Em Produção*, *Entregue*).
  - Botão para abrir conversa direta no WhatsApp com o cliente preenchida com a mensagem de boas-vindas do ateliê.

---

## 🚀 Como Executar

### Opção 1: Execução Direta (Sem Servidor)
Basta dar um duplo clique no arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox, Safari).

### Opção 2: Servidor Local Rápido
Você pode servir via Node.js ou Python:
```bash
# Com Node.js npx serve
npx serve .

# Ou com Python
python -m http.server 3000
```
Acesse `http://localhost:3000` no seu navegador.
