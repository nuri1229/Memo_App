import { takeLatest, call, put } from "redux-saga/effects";
import { memoCountAction } from "memo/action/memo.count.action";
import { AxiosResponse } from "axios";
import { memoService } from "memo/service";
import { globalSpinnerAction } from "global/action/global.spinner.action";

function* asyncMemoCountActionSaga() {
  try {
    yield put(globalSpinnerAction(true));
    const response: AxiosResponse<{ data: number }> = yield call(memoService.list, true);
    const { data: count } = response.data;
    yield put(memoCountAction.success(count));
  } catch (error) {
    throw error.response || error;
  } finally {
    yield put(globalSpinnerAction(false));
  }
}

export function* memoCountActionSaga() {
  yield takeLatest(memoCountAction.request, asyncMemoCountActionSaga);
}
