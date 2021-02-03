import { combineReducers } from "redux";
import { labelListReducer } from "./label.list.reducer";
import { labelSelectReducer } from "./label.select.reducer";

export const label = combineReducers({
  list: labelListReducer,
  select: labelSelectReducer,
});
