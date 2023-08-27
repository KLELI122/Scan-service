export const userState = {
  account: {
    accessToken: localStorage.getItem("accessToken"),
    expire: localStorage.getItem("expire"),
  },
  info: {
    rate: "beginner",
    usedCompanyCount: "",
    companyLimit: "",
  },
};
