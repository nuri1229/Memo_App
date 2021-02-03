import { asyncActionCreator } from "global/util/global.redux.util";
import { Memo } from "memo/model";
import { ActionType } from "typesafe-actions";

export const memoListAction = asyncActionCreator<string, Memo[], Error, null>("MEMO_LIST");
export type MemoListAction = ActionType<typeof memoListAction>;
