import { theme } from './theme.js';
import { services } from './services.js';
import { quiz } from './quiz.js';
import { quizIcons } from './quiz.js';
import { faq } from './faq.js';
import { portfolio } from './portfolio.js';
import { trackingConfig } from './tracking.js';

export const client = {
  // Configurações Gerais de Identidade e Branding
  branding: {
    name: "Vanna Clinic",
    title: "Vanna Clinic | Estética Avançada com Naturalidade",
    profession: "Clínica de Estética Avançada",
    professionShort: "Estética Avançada",
    niche: "Estética Avançada",
    city: "Rio de Janeiro",
    neighborhood: "Barra da Tijuca",
    registerNumber: "Reg. Profissional: CRF-RJ 12345", // Exibir obrigatório no rodapé
    logoHorizontal: "assets/logo-horizontal.webp",
    logoIcon: "assets/logo-icon.webp",
    logoPreloader: "assets/logo-preloader.webp",
    favicon: "assets/favicon.webp",
    specialistPhoto: "assets/specialist.webp",
    heroBg: "assets/hero.webp"
  },

  seo: {
    title: "Vanna Clinic | Estética Avançada com Naturalidade",
    description: "Vanna Clinic na Barra da Tijuca. Procedimentos como Botox, Preenchimento e Bioestimuladores focados em naturalidade, sofisticação e resultados elegantes.",
    keywords: "botox natural, preenchimento barra da tijuca, bioestimuladores, harmonização discreta, rejuvenescimento",
    ogImage: "assets/og-image.webp"
  },

  contacts: {
    whatsappNumber: "5521999999999", // Telefone real
    instagramUser: "vannaclinic",
    address: "Av. das Américas, 4666 - Barra da Tijuca, Rio de Janeiro - RJ, 22640-102",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Vanna+Clinic+Barra+da+Tijuca",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.748348986877!2d-43.3444!3d-23.0012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAwJzA0LjMiUyA0M8KwMjAnMzkuOCJX!5e0!3m2!1spt-BR!2sbr!4v1711111111111!5m2!1spt-BR!2sbr"
  },

  hero: {
    badge: "Estética personalizada Barra da Tijuca",
    kicker: "Estética avançada",
    titleLine1: "Você continuará sendo você,",
    titleLine2: "apenas mais <em>descansada.</em>",
    subtitle: "Vanna Clinic oferece botox, preenchimento e bioestimuladores personalizados para resultados elegantes e naturais.",
    urgencyText: "<strong>Agenda aberta</strong> para avaliações individuais nesta semana.",
    floatTagLabel: "Local",
    floatTagValue: "Barra da Tijuca",
    ctaWhatsApp: "Agendar avaliação",
    ctaQuiz: "Fazer pré-atendimento",
    checkmarks: [
      "Avaliação anatômica individual",
      "Resultados discretos e naturais",
      "Segurança com profissional especialista"
    ]
  },

  trustStrip: [
    "Resultados naturais",
    "Sofisticação e segurança",
    "Avaliação individual",
    "Estética personalizada",
    "Cuidado premium",
    "Resultado elegante"
  ],

  rollers: {
    top: ["BOTOX NATURAL", "PREENCHIMENTO LABIAL SUTIL", "BIOESTIMULADORES DE COLÁGENO", "VANNA CLINIC", "ESTÉTICA AVANÇADA"],
    middle: ["ELEGÂNCIA", "SEGURANÇA", "RESULTADOS NATURAIS", "CUIDADO PERSONALIZADO", "AUTOESTIMA", "SOFISTICAÇÃO"],
    bottom: ["AGENDE UMA CONSULTA DE AVALIAÇÃO INDIVIDUAL", "VANNA CLINIC BARRA DA TIJUCA", "ESTÉTICA DE ALTA PERFORMANCE"]
  },

  bodySignals: {
    label: "Sinais do tempo",
    title: "O que você deseja suavizar ou <em>realçar?</em>",
    intro: "Pequenos cuidados que devolvem o aspecto descansado, firme e harmônico ao seu rosto.",
    ctaText: "Entender qual o meu caso",
    cards: [
      {
        icon: "syringe",
        signal: "Rugas e lines",
        title: "Marcas de expressão",
        description: "Rugas na testa, entre as sobrancelhas ou pés de galinha que trazem aspecto cansado.",
        protocol: "Protocolo Botox Natural"
      },
      {
        icon: "lips",
        signal: "Lábios sem contorno",
        title: "Perda de volume labial",
        description: "Lábios que perderam o viço, contorno ou volume ao longo do tempo.",
        protocol: "Preenchimento Labial Sutil"
      },
      {
        icon: "droplet",
        signal: "Flacidez facial",
        title: "Perda de sustentação",
        description: "Pele que está perdendo a firmeza e o contorno na região das bochechas e mandíbula.",
        protocol: "Bioestimulador de Colágeno"
      }
    ]
  },

  specialist: {
    label: "Especialistas",
    title: "Quem cuida da sua <em>naturalidade.</em>",
    description: `
      <div class="specialist-team">
        <div class="specialist-member">
          <h4>Ana Lucia</h4>
          <p class="specialist-role">Estética Avançada & Biomedicina (CRF-RJ 12345)</p>
          <p>Especialista em procedimentos injetáveis como Botox, Preenchimento e Bioestimuladores de colágeno, sempre focada em suavizar marcas de expressão sem alterar sua essência ou traços naturais.</p>
        </div>
        <div class="specialist-member" style="margin-top: 20px;">
          <h4>Érica</h4>
          <p class="specialist-role">Cílios & Sobrancelhas</p>
          <p>Especialista em design de olhar, extensão de cílios e micropigmentação sutil, garantindo um realce elegante que harmoniza com a expressividade do seu rosto.</p>
        </div>
      </div>
    `,
    bullets: [
      "Procedimentos seguros baseados em anatomia individual.",
      "Produtos de alta performance e marcas renomadas mundialmente.",
      "Acompanhamento personalizado em todas as etapas pós-procedimento."
    ],
    ctaText: "Agendar minha avaliação"
  },

  process: {
    label: "Como funciona",
    title: "Seu caminho para um cuidado <em>seguro.</em>",
    caption: "Da primeira conversa ao acompanhamento pós-procedimento, cada etapa é pensada para sua segurança e conforto.",
    ctaText: "Fazer meu pré-atendimento",
    steps: [
      { number: "01", title: "Objetivo", description: "O contato inicial já serve para contar o que você deseja valorizar e cuidar." },
      { number: "02", title: "Avaliação Individual", description: "Uma conversa detalhada com a especialista para traçar o plano ideal." },
      { number: "03", title: "Procedimento", description: "Realização sutil e segura, focada em naturalidade." },
      { number: "04", title: "Cuidado Pós", description: "Acompanhamento para garantir o melhor resultado e autoestima." }
    ]
  },

  confidence: {
    label: "Confiança",
    title: "Clareza e acolhimento também fazem parte do <em>cuidado.</em>",
    intro: "Antes do agendamento, você já entende como funciona o atendimento, onde será recebido e como conversar com calma sobre o que deseja melhorar.",
    points: [
      {
        title: "Escuta antes da indicação",
        description: "A escolha do procedimento começa com conversa, não com uma decisão apressada."
      },
      {
        title: "Atendimento individualizado",
        description: "Horários, localização e direção de protocolo são alinhados de forma clara pelo WhatsApp."
      },
      {
        title: "Experiência premium e acolhedora",
        description: "Da página ao atendimento, a proposta é leve, elegante e respeitosa com o seu momento."
      }
    ]
  },

  location: {
    label: "Localização",
    title: "Atendimento na <em>Barra da Tijuca.</em>",
    description: "Um espaço pensado para receber você com conforto, privacidade e atendimento individualizado na Barra da Tijuca.",
    cardTitle: "Local",
    cardAddress: "Av. das Américas, 4666 - Barra da Tijuca, Rio de Janeiro - RJ, 22640-102",
    points: [
      "Para garantir o melhor cuidado, os atendimentos são feitos com hora marcada.",
      "Você pode tirar dúvidas, entender o protocolo indicado e confirmar horários diretamente no WhatsApp."
    ],
    ctaWhatsApp: "Chamar no WhatsApp",
    ctaRoute: "Abrir rota"
  },

  ctaFinal: {
    label: "Agendamento",
    title: "Seu rosto merece mais leveza, presença e <em>cuidado.</em>",
    description: "Chame no WhatsApp, conte o que você gostaria de melhorar e receba uma orientação inicial para escolher o procedimento mais coerente para o seu momento.",
    ctaWhatsApp: "Agendar meu atendimento",
    ctaQuiz: "Fazer pré-atendimento",
    micro: "Consulte disponibilidade pelo WhatsApp."
  },

  footer: {
    description: "Vanna Clinic — Estética Avançada e Design de Olhar. Atendimento individualizado com foco em naturalidade, segurança e resultados refinados. Barra da Tijuca, Rio de Janeiro.",
    quickLinksTitle: "Navegação rápida",
    copyright: "© 2026 Vanna Clinic. Todos os direitos reservados. · Reg. Profissional: CRF-RJ 12345",
    locationText: "Barra da Tijuca · Rio de Janeiro",
    privacyPolicyUrl: "politica-de-privacidade.html",
    termsOfUseUrl: "termos-de-uso.html"
  },

  whatsappMessages: {
    heroCta: "Olá, vim pelo site da Vanna Clinic e gostaria de saber mais sobre a avaliação de procedimentos.",
    specialistCta: "Olá, quero falar com a Ana Lucia / Érica sobre procedimentos na Barra da Tijuca.",
    finalCta: "Olá, gostaria de agendar uma consulta na Vanna Clinic.",
    floatingCta: "Olá! Gostaria de tirar algumas dúvidas sobre os procedimentos da Vanna Clinic.",
    locationCta: "Olá, gostaria de saber como chegar na Vanna Clinic e agendar um horário.",
    navbarCta: "Olá, gostaria de agendar um horário na Vanna Clinic pelo botão do cabeçalho."
  },

  // Referências Importadas
  theme,
  services,
  quiz,
  quizIcons,
  faq,
  portfolio,
  trackingConfig
};
