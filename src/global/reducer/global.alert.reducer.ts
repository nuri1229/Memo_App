import { createReducer } from "typesafe-actions";
import { globalAlertAction, GlobalAlertAction, AlertPayload } from "global/action/global.alert.action";

const initState = {
  isOpen: false,
  message: "",
};

export const globalAlertReducer = createReducer<AlertPayload, GlobalAlertAction>(initState).handleAction(globalAlertAction, (_, action) => {
  return action.payload;
});
