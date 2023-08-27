import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import searchReducer from "./reducers/searchReducer";
import resultReducer from "./reducers/resultReducer";

export const rootReducer = combineReducers({
  userReducer,
  searchReducer,
  resultReducer,
});
