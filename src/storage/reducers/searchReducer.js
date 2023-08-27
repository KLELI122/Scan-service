import { ACTIONS } from "../actions/searchActions";
import { searchState } from "../store/searchState";

const reducer = (state = searchState, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_FOCUS_INPUT:
      return state.map((item) =>
        item.name === action.name ? { ...item, focus: true } : item
      );

    case ACTIONS.CHANGE_BLUR_INPUT:
      return state.map((item) =>
        item.name === action.name
          ? {
              ...item,
              error: item.validation && item.validation(item.value),
            }
          : item
      );

    case ACTIONS.CHANGE_VALUE_INPUT:
      return state.map((item) =>
        item.name === action.name
          ? {
              ...item,
              error: item.validation && item.validation(action.value),
              value: action.value,
            }
          : item
      );

    case ACTIONS.CHANGE_FOCUSE_DATE:
      return state.map((item) =>
        item.name === "date" ? { ...item, focus: true } : item
      );

    case ACTIONS.CHANGE_BLUR_DATE:
      return state.map((item) =>
        item.name === "date"
          ? {
              ...item,
              error: item.validation(
                action.startDateValue,
                action.endDateValue
              ),
            }
          : item
      );
    case ACTIONS.CHANGE_VALUE_DATE:
      return state.map((item) =>
        item.name === "date"
          ? {
              ...item,
              startDate: { ...item.startDate, value: action.startDateValue },
              endDate: { ...item.endDate, value: action.endDateValue },
              error: item.validation(
                action.startDateValue,
                action.endDateValue
              ),
            }
          : item
      );
    case ACTIONS.RESET_DATA:
      return state.map((item) => {
        return {
          ...item,
          value: "",
          error: "",
          focus: false,
        };
      });
    default:
      return state;
  }
};

export default reducer;
