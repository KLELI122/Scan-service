export const ACTIONS = {
  INIT_GENERAL_SUMMARY: "INIT_GENERAL_SUMMARY",
  INIT_IDS: "INIT_IDS",
  INIT_DOCUMENTS: "INIT_DOCUMENTS",
};

export const initGeneralSummary = (data) => {
  return {
    type: ACTIONS.INIT_GENERAL_SUMMARY,
    data,
  };
};
export const initIds = (ids) => {
  return {
    type: ACTIONS.INIT_IDS,
    ids,
  };
};

export const initDocuments = (documents) => {
  return {
    type: ACTIONS.INIT_DOCUMENTS,
    documents,
  };
};
