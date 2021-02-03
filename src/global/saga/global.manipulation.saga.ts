import { takeLatest, call, put } from "redux-saga/effects";
import { globalManipulationAction } from "global/action/global.manipulation.action";
import { AxiosResponse } from "axios";
import { globalSpinnerAction } from "global/action/global.spinner.action";

function* asyncGlobalManipulationSaga(action: ReturnType<typeof globalManipulationAction>) {
  const { callService, callServiceParam, successCallback, errorCallback } = action.payload;

  try {
    yield put(globalSpinnerAction(true));
    const response: AxiosResponse<any> = yield call(callService, callServiceParam);
    if (successCallback) yield call(successCallback, response.data);
  } catch (error) {
    if (errorCallback) yield call(errorCallback);
    throw error.response || error;
  } finally {
    yield put(globalSpinnerAction(true));
  }
}

export function* globalManipulationSaga() {
  yield takeLatest(globalManipulationAction, asyncGlobalManipulationSaga);
}
