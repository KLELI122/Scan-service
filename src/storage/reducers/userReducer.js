import { ACTIONS } from "../actions/userActions";
import { userState } from "../store/userState";

const reducer = (state = userState, action) => {
  switch (action.type) {
    case ACTIONS.ACCOUNT_LOGIN:
      return {
        ...state,
        account: {
          ...state.account,
          accessToken: action.accessToken,
          expire: action.expire,
        },
      };
    case ACTIONS.ACCOUNT_LOGOUT:
      localStorage.clear();
      return {
        ...state,
        account: {
          ...state.account,
          accessToken: "",
          expire: "",
        },
      };
    case ACTIONS.GET_USER_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          usedCompanyCount: action.usedCompanyCount,
          companyLimit: action.companyLimit,
        },
      };

    case ACTIONS.CHECK_EXPIRE:
      if (Date.parse(state.account.expire) < Date.parse(new Date())) {
        localStorage.clear();
        return {
          ...state,
          account: {
            accessToken: "",
            expire: "",
          },
        };
      }
    default:
      return state;
  }
};

export default reducer;
