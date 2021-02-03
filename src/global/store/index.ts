import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { globalSaga } from "global/saga";
import { label } from "label/reducer";
import { memo } from "memo/reducer";
import { global } from "global/reducer";

export const appState = combineReducers({
  label,
  memo,
  global,
});

export type AppState = ReturnType<typeof appState>;

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(appState, {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(globalSaga);
