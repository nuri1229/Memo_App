import { asyncActionCreator } from "global/util/global.redux.util";
import { ActionType } from "typesafe-actions";

export const memoCountAction = asyncActionCreator<null, number, Error, null>("MEMO_COUNT");
export type MemoCountAction = ActionType<typeof memoCountAction>;
