import { takeLatest, call, put } from "redux-saga/effects";
import { LabelDomain } from "label/model";
import { labelListAction } from "label/action/label.list.action";
import { AxiosResponse } from "axios";
import { labelService } from "label/service";
import { convertLabel } from "label/converter/label.domain.convert";
import { globalSpinnerAction } from "global/action/global.spinner.action";

function* asyncLabelListActionSaga() {
  try {
    yield put(globalSpinnerAction(true));
    const response: AxiosResponse<{ data: LabelDomain[] }> = yield call(labelService.list);
    const labels = response.data.data.map((label) => convertLabel(label));

    yield put(labelListAction.success(labels));
  } catch (error) {
    throw error.response || error;
  } finally {
    yield put(globalSpinnerAction(false));
  }
}

export function* labelListActionSaga() {
  yield takeLatest(labelListAction.request, asyncLabelListActionSaga);
}
