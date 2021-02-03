import { memoListAction, MemoListAction } from "memo/action/memo.list.action";
import { createReducer } from "typesafe-actions";
import { Memo } from "memo/model";

const initState: Memo[] = [];

export const memoListReducer = createReducer<Memo[], MemoListAction>(initState).handleAction(memoListAction.success, (_, action) => {
  return [...action.payload];
});
