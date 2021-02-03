import { Memo } from "memo/model";
import { createAction } from "typesafe-actions";

export type MemoCreateActionPayload = {
  title: string;
  content: string;
  labelId: string;
  successCallback: (memoId: string) => void;
};

export const memoCreateAction = createAction("MEMO_CREATE")<MemoCreateActionPayload>();
