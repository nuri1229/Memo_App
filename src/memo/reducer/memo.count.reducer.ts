import { memoCountAction, MemoCountAction } from "memo/action/memo.count.action";
import { createReducer } from "typesafe-actions";

const initState = 0;

export const memoCountReducer = createReducer<number, MemoCountAction>(initState).handleAction(memoCountAction.success, (_, action) => {
  return action.payload;
});
