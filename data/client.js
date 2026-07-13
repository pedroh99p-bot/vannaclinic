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
    neighborhood: "Itanhangá",
    registerNumber: "",
    address: "Itanhangui Plaza, Estr. do Itanhangá, 483 - Sl 214 - Itanhangá, Rio de Janeiro - RJ, 22753-005",
    logoHorizontal: "assets/logo-horizontal.webp",
    logoIcon: "assets/logo-icon.webp",
    logoPreloader: "assets/logo-preloader.webp",
    favicon: "assets/favicon.webp",
    specialistPhoto: "assets/specialist.webp",
    heroBg: "assets/images/hero-vanna-desktop.png",
    heroBgDesktop: "assets/images/hero-vanna-desktop.png",
    heroBgMobile: "assets/images/hero-vanna-mobile.png"
  },

  seo: {
    title: "Vanna Clinic | Estética Avançada com Naturalidade",
    description: "Vanna Clinic na Barra da Tijuca. Procedimentos como Botox, Preenchimento e Bioestimuladores focados em naturalidade, sofisticação e resultados elegantes.",
    keywords: "botox natural, preenchimento barra da tijuca, bioestimuladores, harmonização discreta, rejuvenescimento",
    ogImage: "assets/og-image.webp",
    locale: "pt_BR",
    telephone: "+55 (21) 97137-6433"
  },

  contacts: {
    instagramUser: "vannaclinic",
    instagramUrl: "https://instagram.com/vannaclinic",
    whatsappDestinations: {
      default: {
        destination: "estetica",
        label: "Estética Avançada"
      },
      estetica: {
        number: "5521964923211",
        label: "Estética Avançada",
        specialist: "Ana Lucia"
      },
      cilios: {
        number: "5521993127648",
        label: "Cílios e Sobrancelhas",
        specialist: "Érica"
      }
    },
    address: "Itanhangui Plaza, Estr. do Itanhangá, 483 - Sl 214 - Itanhangá, Rio de Janeiro - RJ, 22753-005",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=VANNACLINIC+Harmoniza%C3%A7%C3%A3o+facial+Botox+RJ",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.4!2d-43.3766!3d-22.9878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVkFOTkFDTElOSUM!5e0!3m2!1spt-BR!2sbr!4v1711111111111!5m2!1spt-BR!2sbr"
  },

  hero: {
    badge: "Estética avançada personalizada",
    kicker: "Vanna Clinic",
    titleLine1: "Estética que respeita",
    titleLine2: "seus <em>traços.</em>",
    subtitle: "Você segue sendo você — apenas com aparência mais descansada, leve e harmoniosa.",
    urgencyText: "Tratamentos personalizados com foco em naturalidade, segurança e elegância.",
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
        signal: "Rugas e linhas",
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
          <p class="specialist-role">Estética Avançada & Biomedicina</p>
          <p>Procedimentos injetáveis (Botox, Preenchimento e Bioestimuladores) focados em rejuvenescimento sutil e segurança anatômica.</p>
          <a href="#" target="_blank" rel="noopener" class="btn btn-outline btn-sm wa-link" data-specialist="estetica" data-wa-key="specialistAnalucia">Falar com Ana Lúcia</a>
        </div>
        <div class="specialist-member">
          <h4>Érica</h4>
          <p class="specialist-role">Cílios & Sobrancelhas</p>
          <p>Extensões e micropigmentação personalizadas para realçar o olhar com delicadeza e elegância.</p>
          <a href="#" target="_blank" rel="noopener" class="btn btn-outline btn-sm wa-link" data-specialist="cilios" data-wa-key="specialistErica">Falar com Érica</a>
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
    title: "Atendimento no <em>Itanhangá.</em>",
    description: "Espaço reservado para receber você com conforto, privacidade e atendimento individualizado no Itanhangá, Rio de Janeiro.",
    cardTitle: "VANNACLINIC — Harmonização facial | Botox RJ",
    cardAddress: "Itanhangui Plaza, Estr. do Itanhangá, 483 - Sl 214 - Itanhangá, Rio de Janeiro - RJ, 22753-005",
    cardPhone: "(21) 97137-6433",
    cardRating: "5,0 ★ (8 avaliações no Google)",
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
    description: "Vanna Clinic — Estética Avançada e Design de Olhar. Atendimento individualizado com foco em naturalidade, segurança e resultados refinados. Itanhangá, Rio de Janeiro.",
    quickLinksTitle: "Navegação rápida",
    copyright: "© 2026 Vanna Clinic. Todos os direitos reservados.",
    locationText: "Itanhangá · Rio de Janeiro",
    privacyPolicyUrl: "politica-de-privacidade.html",
    termsOfUseUrl: "termos-de-uso.html"
  },

  testimonials: [
    {
      name: "Camila R.",
      procedure: "Botox Natural",
      text: "Resultado incrível! Ficou extremamente natural, exatamente o que eu queria. Saí me sentindo descansada sem parecer que fiz nada.",
      initials: "CR"
    },
    {
      name: "Fernanda M.",
      procedure: "Preenchimento Labial",
      text: "A Ana Lúcia tem uma sensibilidade única. Lábio definido, proporcional e sem exageros. Superei o medo que tinha do procedimento.",
      initials: "FM"
    },
    {
      name: "Leticia S.",
      procedure: "Extensão de Cílios",
      text: "A Érica é incrível! Meus cílios ficaram exatamente como eu sonhei — delicados e elegantes. Já marquei a manutenção!",
      initials: "LS"
    },
    {
      name: "Andressa P.",
      procedure: "Bioestimulador de Colágeno",
      text: "Depois dos bioestimuladores minha pele ficou muito mais firme e com brilho. A recuperação foi tranquila e o resultado progressivo é lindo.",
      initials: "AP"
    },
    {
      name: "Roberta G.",
      procedure: "Design de Sobrancelhas",
      text: "Nunca me senti tão bem olhando para mim mesma. O design ficou perfeito para o meu rosto. Atendimento acolhedor e seguro.",
      initials: "RG"
    },
    {
      name: "Mariana C.",
      procedure: "Harmonização Facial",
      text: "Resultado harmonioso e elegante. Me sinto muito mais confiante. A clínica tem uma energia incrível — ambiente sofisticado e acolhedor.",
      initials: "MC"
    }
  ],

  whatsappMessages: {
    heroCta: "Olá, vim pelo site da Vanna Clinic e gostaria de saber mais sobre a avaliação de procedimentos.",
    specialistCta: "Olá, quero falar com a Ana Lucia / Érica sobre procedimentos na Barra da Tijuca.",
    finalCta: "Olá, gostaria de agendar uma consulta na Vanna Clinic.",
    floatingCta: "Olá! Gostaria de tirar algumas dúvidas sobre os procedimentos da Vanna Clinic.",
    locationCta: "Olá, gostaria de saber como chegar na Vanna Clinic e agendar um horário.",
    navbarCta: "Olá, gostaria de agendar um horário na Vanna Clinic pelo botão do cabeçalho.",
    specialistAnalucia: "Olá Dra. Ana Lúcia, gostaria de saber mais sobre os procedimentos de Estética Avançada.",
    specialistErica: "Olá Érica, gostaria de saber mais sobre os procedimentos de Cílios e Sobrancelhas.",
    dialogEstetica: "Olá Dra. Ana Lúcia, vim pelo site da Vanna Clinic e gostaria de agendar uma avaliação de Estética Avançada.",
    dialogCilios: "Olá Érica, vim pelo site da Vanna Clinic e gostaria de saber mais sobre design de cílios e sobrancelhas."
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
