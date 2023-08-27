export const ACTIONS = {
  ACCOUNT_LOGIN: "ACCOUNT_LOGIN",
  ACCOUNT_LOGOUT: "ACCOUNT_LOGOUT",
  GET_USER_INFO: "GET_USER_INFO",
  CHECK_EXPIRE: "CHECK_EXPIRE",
};

export const accountLogin = (accessToken, expire) => {
  return {
    type: ACTIONS.ACCOUNT_LOGIN,
    accessToken,
    expire,
  };
};

export const accountLogout = () => {
  return {
    type: ACTIONS.ACCOUNT_LOGOUT,
  };
};

export const getUserInfo = (usedCompanyCount, companyLimit) => {
  return {
    type: ACTIONS.GET_USER_INFO,
    usedCompanyCount,
    companyLimit,
  };
};

export const checkExpire = () => {
  return {
    type: ACTIONS.CHECK_EXPIRE,
  };
};
