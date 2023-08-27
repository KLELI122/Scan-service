export const validateLogin = (value) => {
  return value === "";
};

export const validateLimit = (value) => {
  if (!value.length) {
    return "Обязательное поле";
  } else if (value > 1000 || value < 1) {
    return "Введите корректные данные";
  } else {
    return;
  }
};

export const validateInn = (value) => {
  if (typeof value === "number") {
    value = value.toString();
  } else if (typeof value !== "string") {
    value = "";
  }
  if (!value.length) {
    return "Обязательное поле";
  } else if (/[^0-9]/.test(value)) {
    return "ИНН должен состоять только из цифр";
  } else if ([10].indexOf(value.length) === -1) {
    return "ИНН должен состоять из 10 цифр";
  } else {
    var n = 0;
    var coefficients = [2, 4, 10, 3, 5, 9, 4, 6, 8];
    for (var i in coefficients) {
      n += coefficients[i] * value[i];
    }
    var n10 = parseInt((n % 11) % 10);
    if (n10 !== parseInt(value[9])) {
      return "Неправильное контрольное число";
    }
  }
};

export const validateDate = (startDate, endDate) => {
  const nowDate = Date.parse(new Date());
  const start = Date.parse(startDate);
  const end = Date.parse(endDate);

  if (!start || !end) {
    return "Обязательное поле";
  }
  if (start > nowDate || end > nowDate || start > end) {
    return "Введите корректные данные";
  }
};
