const apiUrl = "https://gateway.scan-interfax.ru/api/v1";

export const loginRequest = async (login, password) => {
  const response = await fetch(`${apiUrl}/account/login`, {
    method: "POST",
    body: JSON.stringify({
      login: login,
      password: password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};

export const infoRequest = async (accessToken) => {
  const response = await fetch(`${apiUrl}/account/info`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};

export const searchRequest = async (accessToken, searchData, request) => {
  const getValue = (name) => {
    return searchData.filter((item) => item["name"] === name)[0].value;
  };
  const getDate = (date) => {
    return searchData.filter((item) => item["name"] === "date")[0][date].value;
  };
  const response = await fetch(`${apiUrl}/objectsearch${request}`, {
    method: "POST",
    body: JSON.stringify({
      issueDateInterval: {
        startDate: getDate("startDate"),
        endDate: getDate("endDate"),
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: "company",
              sparkId: null,
              entityId: null,
              inn: getValue("inn"),
              maxFullness: getValue("maxFullness"),
              inBusinessNews: getValue("inBusinessNews"),
            },
          ],
          onlyMainRole: getValue("onlyMainRole"),
          tonality: getValue("tonality") || "any",
          onlyWithRiskFactors: getValue("onlyWithRiskFactors"),
          riskFactors: {
            and: [],
            or: [],
            not: [],
          },
          themes: {
            and: [],
            or: [],
            not: [],
          },
        },
        themesFilter: {
          and: [],
          or: [],
          not: [],
        },
      },
      searchArea: {
        includedSources: [],
        excludedSources: [],
        includedSourceGroups: [],
        excludedSourceGroups: [],
      },
      attributeFilters: {
        excludeTechNews: getValue("excludeTechNews"),
        excludeAnnouncements: getValue("excludeAnnouncements"),
        excludeDigests: getValue("excludeDigests"),
      },
      similarMode: "duplicates",
      limit: getValue("limit"),
      sortType: "sourceInfluence",
      sortDirectionType: "desc",
      intervalType: "month",
      histogramTypes: ["totalDocuments", "riskFactors"],
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};

export const searchDocumentsRequest = async (accessToken, ids) => {
  const response = await fetch(`${apiUrl}/documents`, {
    method: "POST",
    body: JSON.stringify({
      ids: ids,
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};
