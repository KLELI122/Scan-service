import { validateInn, validateLimit, validateDate } from "../../validation";

export const searchState = [
  {
    name: "inn",
    type: "text",
    label: "ИНН компании",
    placeholder: "10 цифр",
    value: "",
    required: true,
    focus: false,
    error: "",
    validation: validateInn,
  },
  {
    name: "tonality",
    type: "select",
    label: "Тональность",
    value: "any",
  },
  {
    name: "limit",
    type: "number",
    label: "Количество документов в выдаче",
    placeholder: "От 1 до 1000",
    value: "",
    required: true,
    focus: false,
    error: "",
    validation: validateLimit,
  },
  {
    name: "date",
    type: "date",
    label: "Диапазон поиска",

    startDate: {
      name: "startDate",
      placeholder: "Дата начала",
      value: "",
    },
    endDate: {
      name: "endDate",
      placeholder: "Дата конца",
      value: "",
    },
    required: true,
    focus: false,
    validation: validateDate,
    error: "",
  },
  {
    name: "maxFullness",
    label: "Признак максимальной полноты",
    type: "checkbox",
    value: false,
  },
  {
    name: "inBusinessNews",
    label: "Упоминания в бизнес-контексте",
    type: "checkbox",
    value: false,
  },
  {
    name: "onlyMainRole",
    label: "Главная роль в публикации",
    type: "checkbox",
    value: false,
  },
  {
    name: "onlyWithRiskFactors",
    label: "Публикации только с риск-факторами",
    type: "checkbox",
    value: false,
  },
  {
    name: "excludeTechNews",
    label: "Включать технические новости рынков",
    type: "checkbox",
    value: false,
  },
  {
    name: "excludeAnnouncements",
    label: "Включать анонсы и календари",
    type: "checkbox",
    value: false,
  },
  {
    name: "excludeDigests",
    label: "Включать сводки новостей",
    type: "checkbox",
    value: false,
  },
];
