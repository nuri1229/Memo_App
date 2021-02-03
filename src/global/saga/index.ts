import { all, fork, call, AllEffect, ForkEffect, put, select } from "redux-saga/effects";
import { labelSagas } from "label/saga";
import { memoSagas } from "memo/saga";
import { globalDataRefreshActionSaga } from "global/saga/global.data.saga";
import { globalManipulationSaga } from "global/saga/global.manipulation.saga";
import { globalAlertAction } from "global/action/global.alert.action";
import { selectAlert } from "global/selector";

export const errorHandler = (error: { status?: number; message?: string }): void => {
  const { status = 999, message = "" } = error;

  let text = message;
  if (!message) {
    switch (status) {
      case 400:
        text = "잘못된 요청입니다.";
        break;
      case 401:
        text = "인증되지 않은 요청입니다.";
        break;
      case 403:
        text = "권한이 없습니다.";
        break;
      case 404:
        text = "페이지를 찾을 수 없습니다.";
        break;
      case 500:
        text = "서버와의 통신이 원활하지 않습니다";
        break;
      default:
        text = "알 수 없는 에러가 발생했습니다.";
        break;
    }
  }

  alert(text);
};

function* alertErrorHandler(error: { status?: number; message?: string }) {
  const { status = 999, message = "" } = error;
  const { isOpen } = yield select(selectAlert);

  if (!isOpen) {
    let text = message;
    if (!message) {
      switch (status) {
        case 400:
          text = "잘못된 요청입니다.";
          break;
        case 401:
          text = "인증되지 않은 요청입니다.";
          break;
        case 403:
          text = "권한이 없습니다.";
          break;
        case 404:
          text = "페이지를 찾을 수 없습니다.";
          break;
        case 500:
          text = "서버와의 통신이 원활하지 않습니다";
          break;
        default:
          text = "알 수 없는 에러가 발생했습니다.";
          break;
      }
    }

    yield put(globalAlertAction({ isOpen: true, message: text }));
  }
}

const globalSagas = [globalDataRefreshActionSaga, globalManipulationSaga];

export function* globalSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
  const allSagas = [...globalSagas, ...labelSagas, ...memoSagas];

  yield all(
    allSagas.map((saga) =>
      fork(function* () {
        while (true) {
          try {
            yield call(saga);
          } catch (error) {
            yield fork(alertErrorHandler, error);
          }
        }
      }),
    ),
  );
}
