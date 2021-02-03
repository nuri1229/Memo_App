import { createReducer } from "typesafe-actions";
import { globalSpinnerAction, GlobalSpinnerAction } from "global/action/global.spinner.action";

const initState = false;

export const globalSpinnerReducer = createReducer<boolean, GlobalSpinnerAction>(initState).handleAction(globalSpinnerAction, (_, action) => {
  return action.payload;
});
