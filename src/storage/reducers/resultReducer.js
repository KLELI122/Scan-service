import { ACTIONS } from "../actions/resultActoins";
import { resultState } from "../store/resultState";
import placeholder from "../../assets/placeholder.jpg";
import parse from "html-react-parser";

const reducer = (state = resultState, action) => {
  switch (action.type) {
    case ACTIONS.INIT_GENERAL_SUMMARY:
      let totalDocuments = 0;
      Object.keys(action.data["data"][0]["data"]).map((key) => {
        totalDocuments += action.data["data"][0]["data"][key].value;
      });
      return {
        ...state,
        totalOptions: totalDocuments,
        generalSummary: Object.keys(action.data["data"][0]["data"]).map(
          (key) => {
            const item = action.data["data"][0]["data"][key];
            return {
              id: key,
              date: item.date,
              totalDocuments: item.value,
              riskFactors: action.data["data"][1]["data"][key]["value"],
            };
          }
        ),
      };

    case ACTIONS.INIT_IDS:
      return {
        ...state,
        ids: Object.keys(action.ids["items"]).map((key) => {
          return action.ids["items"][key].encodedId;
        }),
      };

    case ACTIONS.INIT_DOCUMENTS:
      return {
        ...state,
        documents: [
          ...state.documents.concat(
            Object.keys(action.documents).map((key) => {
              const item = action.documents[key]["ok"];
              var date = new Date(Date.parse(item.issueDate));
              let src;
              parse(item.content["markup"])["props"]["children"] &&
                parse(item.content["markup"])["props"]["children"].map(
                  (item) => {
                    if (typeof item === "string") {
                      src = item.split('"')[1];
                    }
                  }
                );
              return {
                id: item.id,
                date: date.toLocaleDateString("ru-US"),
                source: item.source["name"],
                url: item.url,
                title: item.title["text"],
                attributes: {
                  isTechNews: item.attributes["isTechNews"],
                  isAnnouncement: item.attributes["isAnnouncement"],
                  isDigest: item.attributes["isDigest"],
                },
                wordCount: item.attributes["wordCount"],
                img: src ? src : placeholder,
                content: item.content["markup"]
                  .replace(/&lt;/g, "<")
                  .replace(/&gt;/g, ">")
                  .replace(/(<(.*?)>|&\w+;)/g, ""),
              };
            })
          ),
        ],
      };

    default:
      return state;
  }
};

export default reducer;
