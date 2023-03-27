import { v4 as uuidv4 } from "uuid";

export const cards = [
  {
    id: uuidv4(),
    title: "A fazer",
    tasks: [
      {
        id: uuidv4(),
        title: "#boraCodar um Kanban 🧑‍💻",
        description:
          "Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.",
        tags: ["rocketseat", "desafio"],
      },
      {
        id: uuidv4(),
        title: "Manter a ofensiva 🔥",
        description:
          "Manter minha atividade na plataforma da Rocketseat para não perder a ofensiva",
        tags: ["rocketseat", "desafio"],
      },
      {
        id: uuidv4(),
        title: "Almoçar 🥗",
        description:
          "Me alimentar, aproveitando um momento de descanso para recarregar minhas energias durante o almoço",
        tags: ["rocketseat", "desafio"],
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Fazendo",
    tasks: [
      {
        id: uuidv4(),
        title: "Conferir o novo desafio 🚀 ",
        description:
          "Conferir o novo projeto do #boraCodar para fazê-lo da melhor maneira possível",
        tags: ["rocketseat", "desafio"],
      },
      {
        id: uuidv4(),
        title: "Ser incrível 😎",
        description:
          "Sempre me lembrar de manter minha autenticidade e espalhar amor",
        tags: ["rocketseat", "desafio"],
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Feito",
    tasks: [
      {
        id: uuidv4(),
        title: "#boraCodar uma página de login 🧑‍💻",
        description:
          "Novo desafio do #boraCodar da Rocketseat, onde é proposto construir uma página de login",
        tags: ["rocketseat", "desafio"],
      },
      {
        id: uuidv4(),
        title: "#boraCodar uma página de clima 🧑‍💻",
        description:
          "Novo desafio do #boraCodar da Rocketseat, onde é proposto construir uma página de clima",
        tags: ["rocketseat", "desafio"],
      },
      {
        id: uuidv4(),
        title: "#boraCodar um conversor 🧑‍💻",
        description:
          "Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um conversor de moedas",
        tags: ["rocketseat", "desafio"],
      },
    ],
  },
];
