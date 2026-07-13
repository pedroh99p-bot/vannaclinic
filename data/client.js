import { theme } from './theme.js';
import { services } from './services.js';
import { quiz } from './quiz.js';
import { faq } from './faq.js';
import { portfolio } from './portfolio.js';
import { trackingConfig } from './tracking.js';

export const client = {
  // Configurações Gerais de Identidade e Branding
  branding: {
    name: "Jo Souza",
    profession: "Massoterapeuta",
    professionShort: "Massoterapia",
    niche: "Massoterapia",
    city: "Rio de Janeiro",
    neighborhood: "Barra da Tijuca",
    address: "Av. Evandro Lins e Silva, 840 - Tower Office - Barra da Tijuca, Rio de Janeiro - RJ, 22631-470",
    
    // Logos locais na pasta assets
    logoHorizontal: "assets/logo-horizontal.webp",
    logoIcon: "assets/logo-icon.webp",
    logoPreloader: "assets/logo-preloader.webp",
    favicon: "assets/favicon.webp",
    specialistPhoto: "assets/specialist.webp",
    heroBg: "assets/hero.webp"
  },

  // SEO e Metadados do site
  seo: {
    title: "Jo Souza | Massoterapia na Barra da Tijuca",
    description: "Massoterapia na Barra da Tijuca com atendimentos pensados para relaxamento, alívio de tensões, estética corporal e autocuidado.",
    keywords: "massoterapia, relaxamento, barra da tijuca, drenagem linfática, alívio de tensões, bem-estar, autocuidado",
    ogImage: "https://res.cloudinary.com/dm9mnc97u/image/upload/v1782852691/5cc5b510-e39c-4050-a9b2-8a4ca379e76b_qgrguu.webp",
    locale: "pt_BR",
    telephone: "+55 21 96739-9264"
  },

  // Links Sociais e de Contato
  contacts: {
    whatsappNumber: "5521967399264",
    instagramUser: "josouzamassoterapia",
    instagramUrl: "https://www.instagram.com/josouzamassoterapia/",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Av.%20Evandro%20Lins%20e%20Silva%2C%20840%20-%20Barra%20da%20Tijuca%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2022631-470&t=&z=16&ie=UTF8&iwloc=&output=embed",
    googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.%20Evandro%20Lins%20e%20Silva%2C%20840%20-%20Barra%20da%20Tijuca%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2022631-470"
  },

  // Mensagens padrão para envio no WhatsApp
  whatsappMessages: {
    navbarCta: "Olá, vim pelo site da Jo Souza e quero ver os horários disponíveis desta semana.",
    heroCta: "Olá, vim pelo site da Jo Souza e quero agendar pelo WhatsApp. Pode me mostrar os horários disponíveis?",
    specialistCta: "Olá, vim pelo site da Jo Souza e quero conversar antes de agendar um atendimento.",
    locationCta: "Olá, vim pelo site da Jo Souza e quero falar sobre atendimento na Barra da Tijuca.",
    finalCta: "Olá, vim pelo site da Jo Souza e quero agendar meu atendimento.",
    floatingCta: "Olá, vim pelo site da Jo Souza e quero falar pelo WhatsApp agora."
  },

  // Conteúdo da Seção Hero
  hero: {
    badge: "Agenda aberta esta semana · Barra da Tijuca",
    kicker: "Atendimento individualizado em massoterapia",
    titleLine1: "Cuidar de si também",
    titleLine2: "é se sentir mais <em>livre.</em>",
    subtitle: "Atendimentos em massoterapia na Barra da Tijuca para quem busca relaxar, aliviar tensões, cuidar do corpo e viver com mais bem-estar.",
    ctaWhatsApp: "Agendar pelo WhatsApp",
    ctaQuiz: "Fazer pré-atendimento",
    checkmarks: [
      "Atendimento com hora marcada",
      "Barra da Tijuca",
      "Pré-atendimento pelo WhatsApp"
    ],
    urgencyText: "<strong>Horários limitados</strong> para atendimentos individualizados nesta semana.",
    floatTagLabel: "Local",
    floatTagValue: "Tower Office Barra"
  },

  // Diferenciais (Trust Strip)
  trustStrip: [
    "Atendimento humanizado",
    "Escuta antes da indicação",
    "Ambiente acolhedor",
    "WhatsApp sem complicação"
  ],

  // Rollers Marquees (Letreiros)
  rollers: {
    top: [
      "Atendimento com hora marcada",
      "Pré-atendimento pelo WhatsApp",
      "Bem-estar, leveza e autocuidado",
      "Protocolos personalizados",
      "Barra da Tijuca",
      "Agenda aberta esta semana",
      "Horários limitados para atendimentos individuais"
    ],
    middle: [
      "Seu corpo merece atenção",
      "Bem-estar, leveza e autocuidado",
      "Barra da Tijuca",
      "Pré-atendimento pelo WhatsApp"
    ],
    bottom: [
      "Atendimento com hora marcada",
      "Barra da Tijuca",
      "Bem-estar, leveza e autocuidado",
      "Pré-atendimento pelo WhatsApp",
      "Agenda da semana por ordem de agendamento",
      "Jo Souza Massoterapia"
    ]
  },

  // Sinais do Corpo (Sintomas / Dores)
  bodySignals: {
    label: "Sinais do corpo",
    title: "Seu corpo pede pausa, leveza e <em>atenção.</em>",
    intro: "Perceba o que mais pesa hoje e entenda qual direção de cuidado pode fazer sentido para você agora.",
    ctaText: "Descobrir o melhor cuidado",
    cards: [
      {
        signal: "Sinal de sobrecarga",
        title: "Dor nas costas",
        description: "Quando a lombar ou o meio das costas pedem atenção, o ideal é direcionar o cuidado para aliviar rigidez e devolver conforto ao movimento.",
        protocol: "Pode combinar com Massagem Terapêutica.",
        icon: "spine"
      },
      {
        signal: "Tensão recorrente",
        title: "Cervical tensionada",
        description: "Pescoço duro, dor de cabeça tensional e sensação de travamento costumam apontar para acúmulo de esforço e postura sobrecarregada.",
        protocol: "Pode combinar com liberação de tensões localizada.",
        icon: "neck"
      },
      {
        signal: "Alerta muscular",
        title: "Ombros travados",
        description: "Quando os ombros ficam elevados e pesados, o corpo tende a responder com menos mobilidade e mais desconforto ao longo do dia.",
        protocol: "Pode combinar com cuidado personalizado para dor e tensão.",
        icon: "neck" // Neck style / similar
      },
      {
        signal: "Ritmo alto demais",
        title: "Cansaço acumulado",
        description: "Se o corpo parece cansado o tempo todo, a sessão pode priorizar desaceleração, presença e uma sensação mais real de descanso corporal.",
        protocol: "Pode combinar com Massagem Relaxante.",
        icon: "body"
      },
      {
        signal: "Leveza comprometida",
        title: "Inchaço e sensação de peso",
        description: "Pernas pesadas, retenção ou desconforto ao fim do dia pedem uma orientação mais objetiva para saber se drenagem faz sentido no momento.",
        protocol: "Pode combinar com Drenagem Linfática.",
        icon: "droplet"
      },
      {
        signal: "Corpo em alerta",
        title: "Estresse e dificuldade de relaxar",
        description: "Quando a mente acelera e o corpo não consegue desligar, o atendimento pode ajudar a criar uma pausa acolhedora e devolver sensação de leveza.",
        protocol: "Pode combinar com protocols de relaxamento e bem-estar.",
        icon: "moon"
      }
    ]
  },

  // Perfil Especialista
  specialist: {
    label: "Especialista",
    title: "Acolhimento, escuta e um cuidado pensado para o que seu corpo <em>precisa agora.</em>",
    description: "Jo Souza conduz um atendimento voltado para bem-estar, leveza e autocuidado. A proposta é entender seu momento antes de sugerir o cuidado mais coerente para a sua rotina e para o que você quer sentir.",
    bullets: [
      "Atendimento individualizado",
      "Escuta antes do protocolo",
      "Ambiente acolhedor na Barra da Tijuca",
      "Orientação pelo WhatsApp antes do agendamento"
    ],
    ctaText: "Conversar com a Jô"
  },

  // Como Funciona
  process: {
    label: "Como funciona",
    title: "Um processo simples para você não precisar escolher sozinha o melhor <em>cuidado.</em>",
    caption: "Do primeiro contato até a confirmação do horário, tudo foi pensado para deixar a decisão mais leve, acolhida e orientada.",
    ctaText: "Ver horários disponíveis",
    steps: [
      {
        number: "01",
        title: "Você chama no WhatsApp",
        description: "O primeiro contato já serve para contar o que está sentindo e o que você quer cuidar primeiro."
      },
      {
        number: "02",
        title: "Faz um pré-atendimento rápido",
        description: "Algumas perguntas simples ajudam a entender seu objetivo, a região principal e a urgência do atendimento."
      },
      {
        number: "03",
        title: "A Jo entende sua necessidade",
        description: "Com esse contexto, fica mais claro qual direção de cuidado faz sentido para o seu corpo neste momento."
      },
      {
        number: "04",
        title: "O cuidado mais indicado é sugerido",
        description: "A orientação considera sua rotina, sua principal queixa e o resultado percebido que você busca."
      },
      {
        number: "05",
        title: "Você agenda seu horário",
        description: "Depois disso, basta confirmar a agenda disponível e combinar o atendimento com hora marcada."
      }
    ]
  },

  // Seção de Confiança (Depoimentos)
  confidence: {
    label: "Confiança",
    title: "Clareza e acolhimento também fazem parte do <em>cuidado.</em>",
    intro: "Antes do agendamento, você já entende como funciona o atendimento, onde será recebida e como conversar com calma sobre o que seu corpo precisa agora.",
    points: [
      {
        title: "Escuta antes da indicação",
        description: "A escolha do cuidado começa com conversa, não com uma decisão apressada."
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

  // Seção Localização
  location: {
    label: "Localização",
    title: "Atendimento na <em>Barra da Tijuca.</em>",
    description: "Um espaço pensado para receber você com conforto, privacidade e atendimento individualizado na Barra da Tijuca.",
    cardTitle: "Local",
    cardAddress: "Tower Office · Av. Evandro Lins e Silva, 840 - Barra da Tijuca, Rio de Janeiro - RJ, 22631-470",
    points: [
      "Para garantir o melhor cuidado, os atendimentos são feitos com hora marcada.",
      "Você pode tirar dúvidas, entender o protocolo indicado e confirmar horários diretamente no WhatsApp."
    ],
    ctaWhatsApp: "Chamar no WhatsApp",
    ctaRoute: "Abrir rota"
  },

  // Seção CTA Final
  ctaFinal: {
    label: "Agendamento",
    title: "Seu corpo merece mais leveza, presença e <em>cuidado.</em>",
    description: "Chame no WhatsApp, conte o que você está sentindo e receba uma orientação inicial para escolher o atendimento mais coerente para o seu momento.",
    ctaWhatsApp: "Agendar meu atendimento",
    ctaQuiz: "Fazer pré-atendimento",
    micro: "Consulte disponibilidade pelo WhatsApp."
  },

  // Footer
  footer: {
    description: "Atendimento individualizado em massoterapia para relaxamento, alívio de tensões, estética corporal e autocuidado na Barra da Tijuca, Rio de Janeiro.",
    quickLinksTitle: "Navegação rápida",
    copyright: "© 2026 Jo Souza — Massoterapia.",
    locationText: "Barra da Tijuca · Rio de Janeiro"
  },

  // Referências Importadas
  theme,
  services,
  quiz,
  faq,
  portfolio,
  trackingConfig
};
