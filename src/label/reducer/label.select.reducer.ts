import { labelSelectAction, LabelSelectAction } from "label/action/label.select.action";
import { createReducer } from "typesafe-actions";
import { Label } from "label/model";

const initState: Label | null = null;

export const labelSelectReducer = createReducer<Label | null, LabelSelectAction>(initState).handleAction(labelSelectAction, (_, action) => {
  return action.payload;
});
