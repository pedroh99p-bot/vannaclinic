# Template Landing Page Premium - Base Modular

Este é um template premium de alta performance, 100% modular e desacoplado, projetado para permitir a criação rápida de landing pages de alta conversão para diversos profissionais (estética, odontologia, massoterapia, fisioterapia, quiropraxia, biomedicina, advogados, clínicas, etc.).

A alteração de cliente exige apenas a substituição de arquivos de imagem na pasta `/assets` e edição dos dados na pasta `/data`, **sem a necessidade de tocar na marcação do `index.html` ou em estilos estruturais de CSS**.

---

## 📁 Estrutura de Diretórios

* `/assets` - Fotos do profissional, logos, favicon, texturas e subpasta `images/portfolio/` para antes e depois.
* `/css` - Estilos modulares da página (`tokens.css`, `animations.css`, `responsive.css` etc.).
* `/js` - Scripts funcionais que gerenciam interações e animações.
* `/data` - A **fonte única de verdade** do cliente. Contém todos os textos, dados de contato e links.

---

## 🚀 Como Customizar para um Novo Cliente

### 1. Trocar Logos e Imagens (`/assets`)
Substitua os arquivos físicos mantendo exatamente os mesmos nomes e extensões (`.webp` recomendado para performance):
* `assets/logo-horizontal.webp` - Logo horizontal para a barra de navegação (Navbar).
* `assets/logo-preloader.webp` - Logo exibido no loader inicial de abertura e no rodapé (Footer).
* `assets/logo-icon.webp` - Ícone menor ou marca d'água para usos rápidos.
* `assets/favicon.webp` - Ícone de navegação do site.
* `assets/images/hero-vanna.webp` - Imagem de fundo principal (Banner Hero).
* `assets/specialist.webp` - Foto do especialista/profissional.
* `assets/og-image.webp` - Imagem de compartilhamento usada em WhatsApp e redes sociais.
* `assets/textures/subtle-line-texture.svg` - Textura local usada nos fundos.

#### Adicionar Imagens ao Portfólio
Coloque as fotos do Antes e Depois no diretório `assets/images/portfolio/` com nomes declarados em `data/portfolio.js`:
* `assets/images/portfolio/advanced-aesthetics-01.webp`
* `assets/images/portfolio/brows-01.webp`
* etc.
Em seguida, certifique-se de declará-las no arquivo `/data/portfolio.js`.

---

### 2. Alterar Dados Básicos e Textos (`/data/client.js`)
Abra o arquivo [data/client.js](file:///c:/Users/pedro/Documents/Base%20(EST%C3%89TICA)/data/client.js) e edite os blocos de dados do cliente:
* **`branding`**: Altere `name` (Nome do profissional), `profession` (Profissão/Especialidade) e caminhos das imagens.
* **`contacts`**: Defina os telefones de cada especialista em `whatsappDestinations`, o usuário do Instagram e os links e iframe do Google Maps.
* **`hero`**: Edite o badge de localização, kicker, título, subtítulo e textos de urgência.
* **`specialist`**: Altere a mini-biografia e a lista de diferenciais (bullets) do profissional.

---

### 3. Alterar Identidade Visual e Cores (`/data/theme.js`)
O template permite alterar completamente a paleta de cores modificando o arquivo [data/theme.js](file:///c:/Users/pedro/Documents/Base%20(EST%C3%89TICA)/data/theme.js). Defina as cores hexadecimais para as variáveis dos modos Claro (`light`) e Escuro (`dark`):
* `primary`: Cor de destaque do site (botões, títulos, detalhes importantes).
* `primary-dark`: Variação mais escura da cor primária para efeitos de hover.
* `bg`: Cor de fundo geral da página.
* `text`: Cor principal de leitura do texto.
* `text-muted`: Cor secundária de leitura de menor intensidade.

*O script de renderização irá injetar dinamicamente as cores nos seletores CSS do `:root` sem que você precise reescrever arquivos CSS.*

---

### 4. Alterar Serviços e Protocolos (`/data/services.js`)
As especialistas e os procedimentos exibidos na página são configurados em [data/services.js](file:///c:/Users/pedro/Documents/Base%20(EST%C3%89TICA)/data/services.js):
1. **Especialistas (`categories`)**: Mantenha `specialistKey` igual à chave cadastrada em `whatsappDestinations`.
2. **Procedimentos (`items`)**: Defina `title`, `description` e, quando necessário, `featured` e `badge`.

Os mesmos dados alimentam os cards da seção de procedimentos e o mini agendamento, evitando listas divergentes.

---

### 5. Mini agendamento (`/js/booking.js`)
O mini agendamento usa os procedimentos de `/data/services.js` e os números de `/data/client.js`. A seção de serviços alterna entre as duas profissionais e abre o popup com o procedimento selecionado. A pessoa escolhe a data no calendário, um horário entre as opções de preferência, informa o nome e revisa todos os dados e a profissional responsável antes de abrir o WhatsApp correto. A disponibilidade não é confirmada pelo site.

---

### 6. Alterar Dúvidas Frequentes (`/data/faq.js`)
Adicione ou edite perguntas e respostas do acordeão de forma simples em [data/faq.js](file:///c:/Users/pedro/Documents/Base%20(EST%C3%89TICA)/data/faq.js) no formato:
```javascript
{
  question: "Sua Pergunta aqui?",
  answer: "Sua resposta explicativa aqui."
}
```

---

### 7. Alterar SEO e Metadados (`/data/client.js`)
Altere os dados de SEO do bloco `seo` em `data/client.js`:
* `title`: Título do site que aparece nas abas do navegador e no Google.
* `description`: Meta descrição de sumário de busca.
* `keywords`: Palavras-chave relevantes separadas por vírgula.
* `siteUrl`: URL pública canônica do site.
* `ogImage`: caminho local da imagem de compartilhamento. O script converte para URL absoluta usando `siteUrl`.

Para verificar se alguma referência externa de mídia voltou ao código:
```bash
node scripts/assert-local-media.mjs
```

---

### 8. Configurar Rastreamento de Tráfego (`/data/tracking.js`)
Os códigos de inicialização de Tags de Rastreamento (pixels) ficam isolados e são gerenciados dinamicamente em [data/tracking.js](file:///c:/Users/pedro/Documents/Base%20(EST%C3%89TICA)/data/tracking.js). Basta inserir os IDs correspondentes fornecidos pelas plataformas:
* `googleTagManagerId` (ex: `GTM-XXXXXXX`)
* `metaPixelId` (ex: `1234567890`)
* `googleAdsId` (ex: `AW-XXXXXXXXX`)
* `tiktokPixelId` (ex: `TT-XXXXXXXXX`)
* `microsoftClarityId` (ex: `CL-XXXXXXXXX`)

*Os scripts do GTM, Meta Pixel, Google Ads, Clarity e TikTok serão injetados dinamicamente na página apenas se os respectivos IDs estiverem definidos. Caso contrário, nenhum script de rastreamento desnecessário será carregado, mantendo a página mais leve.*

---

## 🛠️ Tecnologias Utilizadas
* **HTML5 Semântico**: Estrutura robusta, acessível e otimizada para SEO.
* **Vanilla CSS (CSS Variables)**: Estilos rápidos e fáceis de customizar através de Custom Properties.
* **Vanilla JavaScript (ES6 Modules)**: Código nativo e limpo carregado via `<script type="module">` garantindo que não haja poluição do escopo global e melhorando o carregamento assíncrono.
