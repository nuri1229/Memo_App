import { asyncActionCreator } from "global/util/global.redux.util";
import { Label } from "label/model";
import { ActionType } from "typesafe-actions";

export const labelListAction = asyncActionCreator<null, Label[], Error, null>("LABEL_LIST");
export type LabelListAction = ActionType<typeof labelListAction>;
