import { AppState } from "global/store";

export const selectMemo = (state: AppState) => state.memo;
export const selectMemoList = (state: AppState) => state.memo.list;
export const selectMemoCount = (state: AppState) => state.memo.count;
