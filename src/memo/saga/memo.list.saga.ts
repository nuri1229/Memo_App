import { takeLatest, call, put } from "redux-saga/effects";
import { MemoDomain } from "memo/model";
import { memoListAction } from "memo/action/memo.list.action";
import { AxiosResponse } from "axios";
import { memoService } from "memo/service";
import { convertMemo } from "memo/converter/memo.domain.convert";
import { globalSpinnerAction } from "global/action/global.spinner.action";

function* asyncMemoListActionSaga(action: ReturnType<typeof memoListAction.request>) {
  try {
    yield put(globalSpinnerAction(true));
    const { payload } = action;
    const response: AxiosResponse<{ data: MemoDomain[] }> = payload === "all" ? yield call(memoService.list) : yield call(memoService.getMemosByLabel, payload);
    const memos = response.data.data.map((label) => convertMemo(label));
    yield put(memoListAction.success(memos));
  } catch (error) {
    throw error.response || error;
  } finally {
    yield put(globalSpinnerAction(false));
  }
}

export function* memoListActionSaga() {
  yield takeLatest(memoListAction.request, asyncMemoListActionSaga);
}
