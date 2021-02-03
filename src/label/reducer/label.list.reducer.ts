import { labelListAction, LabelListAction } from "label/action/label.list.action";
import { createReducer } from "typesafe-actions";
import { Label } from "label/model";

const initState: Label[] = [];

export const labelListReducer = createReducer<Label[], LabelListAction>(initState).handleAction(labelListAction.success, (_, action) => {
  return [...action.payload];
});
