import { takeLatest, put, call } from "redux-saga/effects";
import { memoCreateAction } from "memo/action/memo.create.action";
import { memoService } from "memo/service";
import { AxiosResponse } from "axios";
import { MemoDomain } from "memo/model";
import { labelService } from "label/service";
import { globalDataRefreshAction } from "global/action/global.data.action";
import { globalSpinnerAction } from "global/action/global.spinner.action";

function* asyncMemoCreateActionSaga(action: ReturnType<typeof memoCreateAction>) {
  try {
    yield put(globalSpinnerAction(true));
    const { title, content, labelId, successCallback } = action.payload;

    const response: AxiosResponse<{ data: MemoDomain }> = yield call(memoService.post, { title, content });
    const { data: memoResponse } = response;

    const memoIds = [memoResponse.data.id];

    if (labelId !== "all") {
      yield call(labelService.addMemoToLabel, { id: labelId, memoIds });
    }

    yield put(globalDataRefreshAction(labelId));
    yield call(successCallback, memoResponse.data.id);
  } catch (error) {
    throw error.response || error;
  } finally {
    yield put(globalSpinnerAction(false));
  }
}

export function* memoCreateActionSaga() {
  yield takeLatest(memoCreateAction, asyncMemoCreateActionSaga);
}
