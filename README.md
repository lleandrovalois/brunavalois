# 💎 Bruna Valois - Alta Joalheria & Semijoias Finas
## Arquitetura de Integração Oficial Mercado Pago (Checkout Pro, Pix Transparente & Webhooks)

Aplicação web completa e moderna de e-commerce e ateliê sob medida para alta joalheria, projetada com foco em desacoplamento arquitetural, segurança criptográfica, suporte idempotente a webhooks e alternância facilitada entre ambientes **Sandbox** (testes) e **Produção**.

---

## 🏛️ Visão Geral da Arquitetura de Pagamentos

A integração foi desenvolvida seguindo os princípios de **Clean Architecture** e **Single Responsibility Principle (SRP)**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CLIENTE (FRONTEND)                              │
│  - Sacola de Alta Joalheria (Drawer)                                       │
│  - Botão 1: Checkout Pro (Redirecionamento para interface Mercado Pago)    │
│  - Botão 2: Pix Transparente (Modal com QR Code, Copia e Cola & Polling)   │
│  - Retorno Automatizado (/checkout/success -> Modal de Recibo & WhatsApp)  │
└───────────────────────┬─────────────────────────────┬───────────────────────┘
                        │ POST /api/checkout/pref      │ POST /api/checkout/pix
                        ▼                             ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            ROTAS DA API (EXPRESS)                           │
│  - src/routes/checkout.routes.js: /preference, /pix, /orders/:id            │
│  - src/routes/webhook.routes.js:  POST /api/webhooks/mercadopago            │
└───────────────────────┬─────────────────────────────┬───────────────────────┘
                        │                             │
                        ▼                             ▼
┌───────────────────────────────────┐     ┌───────────────────────────────────┐
│     CAMADA DE SERVIÇO & SDK       │     │     MIDDLEWARE DE SEGURANÇA       │
│  - src/services/MercadoPagoClient │     │  - src/middleware/webhookValidator│
│    (Inicializador Oficial SDK v3) │     │    (Validação Criptográfica HMAC  │
│  - src/services/PaymentService    │     │     SHA-256 via x-signature)     │
│    (Preferências, Pix, Status)    │     └─────────────────┬─────────────────┘
└───────────────────────┬───────────┘                       │
                        │                                   ▼
                        │                  ┌──────────────────────────────────┐
                        │                  │   REPOSITÓRIO & IDEMPOTÊNCIA     │
                        └─────────────────►│  - src/storage/OrderRepository   │
                                           │    (Persistência e deduplicação) │
                                           └──────────────────────────────────┘
```

---

## ⚙️ 1. Configuração e Variáveis de Ambiente (.env)

O sistema conta com chave seletora de ambiente que permite alternar instantaneamente entre **Sandbox** e **Produção**.

Crie ou edite o arquivo `.env` na raiz do projeto (baseado em `.env.example`):

```bash
# ==============================================================================
# CONFIGURAÇÃO MERCADO PAGO & SERVIDOR
# ==============================================================================

# Alternância de Ambiente: 'sandbox' (testes) ou 'production' (pagamentos reais)
MERCADO_PAGO_ENV=sandbox

# Credenciais de API (Obtidas no Painel de Desenvolvedores do Mercado Pago)
# Em sandbox, use chaves que começam com 'TEST-...'
# Em produção, use chaves que começam com 'APP_USR-...'
MERCADO_PAGO_PUBLIC_KEY=TEST-00000000-0000-0000-0000-000000000000
MERCADO_PAGO_ACCESS_TOKEN=TEST-0000000000000000-000000-00000000000000000000000000000000-000000000

# Chave Secreta de Webhook para validação do header x-signature (HMAC SHA-256)
MERCADO_PAGO_WEBHOOK_SECRET=sua_chave_secreta_de_webhook_aqui

# URL Base da Aplicação (usada para URLs de retorno e notificações de webhook)
# Local: http://localhost:80 ou URL do túnel (ex: https://xxxx.ngrok-free.app)
# Produção: https://brunavalois.klynner.com.br
APP_BASE_URL=https://brunavalois.klynner.com.br

# Porta HTTP do servidor
PORT=80
```

### Comportamento da Flag `MERCADO_PAGO_ENV`
- Quando `MERCADO_PAGO_ENV=sandbox`:
  - O Checkout Pro utiliza automaticamente a URL `sandbox_init_point`.
  - O frontend exibe o badge visual `"Ambiente Mercado Pago: Sandbox (Testes)"`.
  - O modal Pix exibe o botão `"⚡ Simular Pagamento Aprovado (Sandbox)"` para facilitar testes de ponta a ponta sem necessidade de transação bancária real.
- Quando `MERCADO_PAGO_ENV=production`:
  - O Checkout Pro utiliza a URL `init_point` de produção.
  - As transações bancárias e no cartão são reais.
  - Endpoints de simulação de sandbox ficam estritamente desabilitados (HTTP 403).

---

## 🛠️ 2. Camada de Serviço e Integração (Backend)

Localizada no diretório `src/`:

### `src/services/MercadoPagoClient.js`
- Inicializa a configuração oficial do SDK `mercadopago` (`MercadoPagoConfig`).
- Isola o Access Token e exporta instâncias prontas de `Preference`, `Payment` e `WebhookSignatureValidator`.
- Gera logs estruturados mascarando as chaves para proteção de dados (`TEST-***1234`).

### `src/services/PaymentService.js`
- **`createPreference(params)`**:
  - Recebe itens da sacola, formata valores em BRL e define `statement_descriptor: 'BRUNA VALOIS'`.
  - Configura URLs de retorno (`back_urls` com `success`, `failure`, `pending`).
  - Ativa retorno automático (`auto_return: 'approved'`).
  - Injeta `notification_url` e metadados (`order_id`, `user_id`, `environment`).
  - Retorna `init_point` e `checkout_url` para redirecionamento.
- **`createPixPayment(params)`**:
  - Dispara cobrança direta no Mercado Pago com `payment_method_id: 'pix'`.
  - Retorna o código Pix Copia e Cola (`qr_code`) e imagem do QR Code em Base64 (`qr_code_base64`).
  - Registra o pedido como `pending` com prazo de expiração.
- **`getPaymentById(paymentId)`**:
  - Consulta o status real e oficial do pagamento diretamente na API do Mercado Pago.

### `src/storage/OrderRepository.js`
- Persistência e gerenciamento do ciclo de vida dos pedidos (`pending`, `approved`, `rejected`, `cancelled`).
- **Garantia de Idempotência**: Armazena eventos e IDs de notificação já processados. Caso o Mercado Pago reenvie a mesma notificação, ela é identificada e respondida com 200 OK sem duplicação de processos.

---

## 🔔 3. Webhook e Notificações IPN

Endpoint: `POST /api/webhooks/mercadopago`

### Validação Criptográfica de Assinatura (`src/middleware/webhookValidator.js`)
O Mercado Pago envia dois headers de segurança em cada notificação:
- `x-signature`: no formato `ts=[timestamp],v1=[hash_hmac_sha256]`
- `x-request-id`: identificador único da requisição

O middleware realiza:
1. Extração do `dataId` (seja por query `data.id` ou body `data.id`).
2. Validação oficial via `WebhookSignatureValidator.validate` do SDK do Mercado Pago comparando o HMAC SHA-256 gerado a partir do manifesto com a chave secreta `MERCADO_PAGO_WEBHOOK_SECRET`.
3. Verificação de tolerância de tempo contra ataques de repetição (*replay attacks*).
4. Em caso de assinatura inválida, a requisição é imediatamente rejeitada com HTTP 401 Unauthorized.

### Fluxo de Processamento Assíncrono Idempotente:
1. A requisição é recebida e verificada contra `orderRepository.isEventProcessed(eventId)`.
2. O servidor responde de imediato `HTTP 200 OK` ao Mercado Pago para cumprir a janela de resposta exigida.
3. De forma assíncrona, consulta `PaymentService.getPaymentById(paymentId)` para obter o status real na API.
4. O status do pedido é atualizado no repositório (`approved`, `in_process`, etc.).
5. O evento é registrado como processado em `webhook_events.json`.

---

## 💻 4. Camada de Frontend / Testes de Integração

O frontend oferece duas modalidades integradas na sacola de compras:

1. **Checkout Pro (Mercado Pago)**:
   - Ao clicar em *"Pagar com Mercado Pago (Checkout Pro)"*, o cliente dispara `POST /api/checkout/preference`.
   - O servidor cria a preferência e devolve a URL oficial (`sandbox_init_point` ou `init_point`).
   - O usuário é redirecionado para a página segura de pagamento do Mercado Pago.
2. **Pix Instantâneo (API Transparente)**:
   - Ao clicar em *"Pagar com Pix Instantâneo (QR Code)"*, dispara `POST /api/checkout/pix`.
   - Abre o modal de alta joalheria exibindo o QR Code gerado e o código Pix Copia e Cola.
   - O frontend mantém um **polling automático a cada 3 segundos** (`GET /api/orders/:id`) aguardando a confirmação do pagamento pelo webhook.
   - Assim que o status muda para `approved`, o modal Pix é fechado e o **Recibo Oficial da Compra** é exibido.
3. **Tela de Retorno (`/checkout/success`)**:
   - Ao concluir a compra no Mercado Pago, o cliente é redirecionado para `/checkout/success?order_id=...&payment_id=...&status=approved`.
   - O sistema detecta o status aprovado, limpa a sacola, exibe o recibo e disponibiliza o botão para enviar o comprovante com seguro total para o WhatsApp da loja.

---

## 🧪 5. Guia e Estrutura de Testes (Sandbox)

### 5.1. Como obter as Credenciais de Teste
1. Acesse o [Painel do Desenvolvedor do Mercado Pago](https://www.mercadopago.com.br/developers/panel).
2. Vá em **Suas integrações** e crie ou selecione sua aplicação.
3. No menu lateral esquerdo, clique em **Credenciais de teste**.
4. Copie:
   - **Public Key** (começa com `TEST-...`)
   - **Access Token** (começa com `TEST-...`)
5. No menu **Notificações Webhook**:
   - Cadastre a URL: `https://seu-dominio-ou-ngrok/api/webhooks/mercadopago`
   - Marque o evento **Pagamentos (Payments)**.
   - Copie o **Webhook Secret** gerado e cole no seu `.env`.

### 5.2. Como Testar Webhooks Localmente via ngrok
Para receber as notificações de teste do Mercado Pago em sua máquina de desenvolvimento:

1. Inicie a aplicação localmente:
   ```bash
   npm start
   ```
2. Em outro terminal, inicie o túnel ngrok apontando para a porta do seu servidor (ex: porta 80 ou 8085):
   ```bash
   npx ngrok http 80
   ```
3. O ngrok fornecerá uma URL HTTPS (ex: `https://a1b2-c3d4.ngrok-free.app`).
4. Atualize a variável no `.env`:
   ```env
   APP_BASE_URL=https://a1b2-c3d4.ngrok-free.app
   ```
5. No Painel do Desenvolvedor do Mercado Pago, configure a URL de Notificação Webhook para:
   `https://a1b2-c3d4.ngrok-free.app/api/webhooks/mercadopago`

---

### 5.3. Tabela Oficial de Cartões de Teste (Mercado Pago)

Utilize os seguintes números fictícios para simular cada cenário no **Checkout Pro**:

| Bandeira | Número do Cartão de Teste | CVV | Data de Validade | Comportamento / Status Esperado |
| :--- | :--- | :--- | :--- | :--- |
| **Mastercard** | `4066 5500 0000 0000` | `123` | Qualquer mês/ano futuro | ✅ **Aprovado** (`approved` / `accredited`) |
| **Visa** | `4066 5500 0000 0001` | `123` | Qualquer mês/ano futuro | ✅ **Aprovado** (`approved` / `accredited`) |
| **Elo** | `5031 7500 0000 0000` | `123` | Qualquer mês/ano futuro | ✅ **Aprovado** (`approved` / `accredited`) |
| **Mastercard** | `4066 5500 0000 0002` | `123` | Qualquer mês/ano futuro | ❌ **Rejeitado por Saldo Insuficiente** (`cc_rejected_insufficient_amount`) |
| **Mastercard** | `4066 5500 0000 0003` | `123` | Qualquer mês/ano futuro | ❌ **Rejeitado por Código de Segurança Inválido** (`cc_rejected_bad_filled_security_code`) |
| **Mastercard** | `4066 5500 0000 0004` | `123` | Mês/ano expirado ou inválido | ❌ **Rejeitado por Data Inválida** (`cc_rejected_bad_filled_date`) |
| **Mastercard** | `4066 5500 0000 0005` | `123` | Qualquer mês/ano futuro | ❌ **Rejeitado por Outros Motivos** (`cc_rejected_other_reason`) |
| **Mastercard** | `4066 5500 0000 0006` | `123` | Qualquer mês/ano futuro | ❌ **Rejeitado por Suspeita de Fraude / Risco** (`cc_rejected_high_risk`) |

> **Dicas para Testes em Sandbox**:
> - **Nome do Titular**: Digite qualquer nome (ex: `APRO` para aprovação garantida).
> - **CPF do Pagador**: Utilize um CPF válido gerado para testes (ex: `19119119100`).
> - **E-mail do Pagador**: Utilize um e-mail diferente do e-mail da sua conta de vendedor do Mercado Pago (o Mercado Pago não permite que a conta vendedora pague a si mesma).

---

## 🚀 Como Executar o Projeto

```bash
# 1. Instalar dependências
npm install

# 2. Configurar o arquivo .env com suas chaves de teste ou produção
cp .env.example .env

# 3. Iniciar o servidor
npm start
```

Acesse: `http://localhost:80` (ou sua porta configurada) para testar os fluxos de checkout e pagamentos!
