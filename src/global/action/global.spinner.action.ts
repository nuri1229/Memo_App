import { createAction, ActionType } from "typesafe-actions";

export const globalSpinnerAction = createAction("GLOBAL_SPINNER")<boolean>();
export type GlobalSpinnerAction = ActionType<typeof globalSpinnerAction>;
