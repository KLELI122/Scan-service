export const ACTIONS = {
  CHANGE_FOCUS_INPUT: "CHANGE_FOCUS_INPUT",
  CHANGE_BLUR_INPUT: "CHANGE_BLUR_INPUT",
  CHANGE_VALUE_INPUT: "CHANGE_VALUE_INPUT",

  CHANGE_FOCUSE_DATE: "CHANGE_FOCUSE_DATE",
  CHANGE_BLUR_DATE: "CHANGE_BLUR_DATE",
  CHANGE_VALUE_DATE: "CHANGE_VALUE_DATE",

  RESET_DATA: "RESET_DATA",
};

export const changeFocusInput = (name) => {
  return {
    type: ACTIONS.CHANGE_FOCUS_INPUT,
    name,
  };
};

export const changeBlurInput = (name) => {
  return {
    type: ACTIONS.CHANGE_BLUR_INPUT,
    name,
  };
};

export const changeValueInput = (name, value) => {
  return {
    type: ACTIONS.CHANGE_VALUE_INPUT,
    name,
    value,
  };
};

export const changeFocusDate = () => {
  return {
    type: ACTIONS.CHANGE_FOCUSE_DATE,
  };
};

export const changeBlurDate = (startDateValue, endDateValue) => {
  return {
    type: ACTIONS.CHANGE_BLUR_DATE,
    startDateValue,
    endDateValue,
  };
};

export const changeValueDate = (startDateValue, endDateValue) => {
  return {
    type: ACTIONS.CHANGE_VALUE_DATE,
    startDateValue,
    endDateValue,
  };
};

export const resetData = () => {
  return {
    type: ACTIONS.RESET_DATA,
  };
};
