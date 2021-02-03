import { ActionType, createAction } from "typesafe-actions";

export type AlertPayload = {
  isOpen: boolean;
  message: string;
};

export const globalAlertAction = createAction("GLOBAL_ALERT")<AlertPayload>();
export type GlobalAlertAction = ActionType<typeof globalAlertAction>;
