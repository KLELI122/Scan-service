import carouselIcon1 from "./assets/carousel_item1.svg";
import carouselIcon2 from "./assets/carousel_item2.svg";
import carouselIcon3 from "./assets/carousel_item3.svg";

import rateIcon1 from "./assets/rate_icon1.svg";
import rateIcon2 from "./assets/rate_icon2.svg";
import rateIcon3 from "./assets/rate_icon3.svg";

export const carousel = [
  {
    id: 1,
    icon: carouselIcon1,
    desc: "Высокая и оперативная скорость обработки заявки",
  },
  {
    id: 2,
    icon: carouselIcon2,
    desc: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
  },
  {
    id: 3,
    icon: carouselIcon3,
    desc: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
  },
  {
    id: 4,
    icon: carouselIcon1,
    desc: "Высокая и оперативная скорость обработки заявки",
  },
  {
    id: 5,
    icon: carouselIcon2,
    desc: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
  },
  {
    id: 6,
    icon: carouselIcon3,
    desc: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
  },
];

export const rates = [
  {
    id: 1,
    type: "beginner",
    desc: "Для небольшого исследования",
    icon: rateIcon1,
    currentPrice: "799",
    previousPrice: "1 200",
    installmentPrice: "150",
    rateContent: [
      {
        id: 1,
        content: "Безлимитная история запросов",
      },
      {
        id: 2,
        content: "Безопасная сделка",
      },
      {
        id: 3,
        content: "Поддержка 24/7",
      },
    ],
  },
  {
    id: 2,
    type: "pro",
    desc: "Для HR и фрилансеров",
    icon: rateIcon2,
    currentPrice: "1 299",
    previousPrice: "2 600",
    installmentPrice: "279",
    rateContent: [
      {
        id: 1,
        content: "Все пункты тарифа Beginner",
      },
      {
        id: 2,
        content: "Экспорт истории",
      },
      {
        id: 3,
        content: "Рекомендации по приоритетам",
      },
    ],
  },
  {
    id: 3,
    type: "business",
    desc: "Для корпоративных клиентов",
    icon: rateIcon3,
    currentPrice: "2 379",
    previousPrice: "3 700",
    rateContent: [
      {
        id: 1,
        content: "Все пункты тарифа Pro",
      },
      {
        id: 2,
        content: "Безлимитное количество запросов",
      },
      {
        id: 3,
        content: "Приоритетная поддержка",
      },
    ],
  },
];
