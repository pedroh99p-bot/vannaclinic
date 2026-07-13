export const quizIcons = {
  syringe: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2-3 3M11 5l8 8M14 8l-6 6M7 11l-3 3M5 19l-3 3M19 14l3 3M12.5 16.5l-5-5"/></svg>`,
  lips: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12a10 5 0 0 1 4-3 12 6 0 0 0 12 0 10 5 0 0 1 4 3 10 5 0 0 1-4 3 12 6 0 0 0-12 0 10 5 0 0 1-4-3Z"/><path d="M6 10c2.5 1 5.5 1 8 0"/></svg>`,
  cilios: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10a12 6 0 0 0 20 0"/><path d="m4 11-1.5 2.5M7 12l-.5 3M10 12.5v3M14 12.5v3M17 12l.5 3M20 11l1.5 2.5"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2Z"/><path d="M18 14l.7 2.3L21 17l-2.3.7L18 20l-.7-2.3L15 17l2.3-.7Z"/><path d="M6 14l.5 1.8L8.3 16l-1.8.5L6 18.3l-.5-1.8L3.7 16l1.8-.2Z"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  shieldCheck: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 6.5 5v5.5c0 4 2 7 5.5 9 3.5-2 5.5-5 5.5-9V5L12 3Z"/><path d="M9.5 12.2 11 13.7l3.5-3.9"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3v3M17 3v3"/><rect x="4" y="6" width="16" height="14" rx="2"/><path d="M4 10h16"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>`,
  droplet: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c2.7 3.3 5 6 5 9a5 5 0 0 1-10 0c0-3 2.3-5.7 5-9Z"/><path d="M9 13c.3 1.4 1.2 2.3 2.7 2.8"/></svg>`,
  message: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 6h14v9H9l-4 3V6Z"/><path d="M8 10h8M8 13h5"/></svg>`
};

export const quiz = {
  header: {
    label: "Pré-atendimento",
    title: "Quer entender qual procedimento combina melhor com você <em>hoje?</em>",
    intro: "Responda rápido e envie seu contexto para nossa equipe pelo WhatsApp.",
    note: "Consultas individuais realizadas na Barra da Tijuca.",
    ctaButton: "Iniciar pré-atendimento"
  },
  result: {
    icon: "chat",
    title: "Pré-atendimento pronto para enviar",
    desc: "Com essas respostas, a equipe da Vanna Clinic consegue te orientar de forma personalizada.",
    whatsappCta: "Enviar respostas no WhatsApp",
    restartCta: "Refazer perguntas",
    summaryGoalLabel: "Objetivo",
    summaryRegionLabel: "Resultado",
    summaryPreferenceLabel: "Urgência",
    summaryGoalDefault: "Ainda não definido",
    summaryRegionDefault: "Ainda não definido",
    summaryPreferenceDefault: "Ainda não definida"
  },
  steps: [
    {
      id: 1,
      question: "O que você gostaria de melhorar hoje?",
      options: [
        {
          label: "Botox Natural",
          sublabel: "Suavizar linhas finas mantendo expressões saudáveis.",
          icon: "syringe"
        },
        {
          label: "Preenchimento Labial",
          sublabel: "Definição e volume labial sutil e proporcional.",
          icon: "lips"
        },
        {
          label: "Bioestimulador de Colágeno",
          sublabel: "Recuperar a firmeza e a sustentação natural da pele.",
          icon: "droplet"
        },
        {
          label: "Cílios e Sobrancelhas",
          sublabel: "Realçar o olhar com extensões discretas.",
          icon: "cilios"
        },
        {
          label: "Conversar sobre indicações",
          sublabel: "Avaliar em consulta qual o procedimento ideal.",
          icon: "chat"
        }
      ]
    },
    {
      id: 2,
      question: "Como você prefere o resultado?",
      options: [
        {
          label: "100% natural e discreto",
          sublabel: "Apenas um aspecto descansado e leve.",
          icon: "shieldCheck"
        },
        {
          label: "Realce sutil e perceptível",
          sublabel: "Valorizar traços sem mudar a sua identidade.",
          icon: "sparkles"
        },
        {
          label: "Definição marcante e segura",
          sublabel: "Mudança mais nítida sempre dentro da proporção.",
          icon: "droplet"
        }
      ]
    },
    {
      id: 3,
      question: "Quando deseja realizar?",
      options: [
        {
          label: "Esta semana",
          sublabel: "Desejo consultar horários imediatos.",
          icon: "calendar"
        },
        {
          label: "Nas próximas semanas",
          sublabel: "Estou planejando para os próximos 15 dias.",
          icon: "clock"
        },
        {
          label: "Apenas tirando dúvidas",
          sublabel: "Quero entender mais antes de decidir.",
          icon: "message"
        }
      ]
    }
  ]
};
