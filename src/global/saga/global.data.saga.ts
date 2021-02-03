import { takeLatest, put, all } from "redux-saga/effects";
import { globalDataRefreshAction } from "global/action/global.data.action";
import { memoListAction } from "memo/action/memo.list.action";
import { labelListAction } from "label/action/label.list.action";
import { memoCountAction } from "memo/action/memo.count.action";

function* asyncGlobalDataRefreshActionSaga(action: ReturnType<typeof globalDataRefreshAction>) {
  try {
    const { payload } = action;
    yield all([put(memoListAction.request(payload)), put(labelListAction.request(null)), put(memoCountAction.request(null))]);
  } catch (error) {
    throw error.response || error;
  }
}

export function* globalDataRefreshActionSaga() {
  yield takeLatest(globalDataRefreshAction, asyncGlobalDataRefreshActionSaga);
}
