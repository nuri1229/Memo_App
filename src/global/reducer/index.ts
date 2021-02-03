import { combineReducers } from "redux";
import { globalSpinnerReducer } from "./global.spinner.reducer";
import { globalAlertReducer } from "./global.alert.reducer";

export const global = combineReducers({
  spinner: globalSpinnerReducer,
  alert: globalAlertReducer,
});
