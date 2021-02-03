import { combineReducers } from "redux";
import { memoListReducer } from "./memo.list.reducer";
import { memoCountReducer } from "./memo.count.reducer";

export const memo = combineReducers({
  list: memoListReducer,
  count: memoCountReducer,
});
