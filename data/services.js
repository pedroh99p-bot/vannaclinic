export const services = {
  sectionLabel: "Procedimentos",
  sectionTitle: "Escolha seu procedimento por <em>especialista.</em>",
  sectionIntro: "Os procedimentos estão organizados por especialista para você identificar sua escolha sem dúvidas e seguir direto para o agendamento.",

  categories: [
    {
      id: "cilios",
      specialistKey: "cilios",
      specialist: "Érica Nascimento",
      name: "Cílios e Sobrancelhas",
      lead: "Técnicas personalizadas para realçar o olhar com leveza e definição."
    },
    {
      id: "estetica",
      specialistKey: "estetica",
      specialist: "Ana Lúcia Freitas",
      name: "Estética Avançada",
      lead: "Protocolos faciais definidos após avaliação individual e alinhamento de expectativas."
    }
  ],

  items: {
    cilios: [
      {
        title: "Fox Eyes",
        description: "Efeito visual alongado para destacar o olhar.",
        featured: true,
        badge: "Principal"
      },
      {
        title: "Extensão de cílios",
        description: "Mapeamento e volume escolhidos de acordo com o seu estilo."
      },
      {
        title: "Design de sobrancelhas",
        description: "Desenho personalizado para valorizar seus traços."
      },
      {
        title: "Micropigmentação",
        description: "Definição de sobrancelhas com planejamento individual."
      },
      {
        title: "Brow Lamination",
        description: "Alinhamento dos fios para um acabamento mais definido."
      }
    ],
    estetica: [
      {
        title: "Botox / Toxina botulínica",
        description: "Avaliação individual para suavizar linhas de expressão com equilíbrio.",
        featured: true,
        badge: "Destaque"
      },
      {
        title: "Preenchimento labial",
        description: "Planejamento de contorno, hidratação e volume conforme seu objetivo."
      },
      {
        title: "Skinbooster",
        description: "Protocolo voltado à hidratação e à qualidade da pele."
      },
      {
        title: "Bioestimulador de colágeno",
        description: "Cuidado gradual para firmeza e qualidade da pele."
      },
      {
        title: "Fios de sustentação / PDO",
        description: "Indicação avaliada conforme a necessidade de sustentação facial."
      }
    ]
  }
};
