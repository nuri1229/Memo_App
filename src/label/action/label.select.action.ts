import { createAction } from "typesafe-actions";
import { ActionType } from "typesafe-actions";
import { Label } from "label/model";

export const labelSelectAction = createAction("LABEL_SELECT")<Label | null>();
export type LabelSelectAction = ActionType<typeof labelSelectAction>;
