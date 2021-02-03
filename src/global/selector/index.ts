import { AppState } from "global/store";

export const selectSpinner = (store: AppState) => store.global.spinner;
export const selectAlert = (store: AppState) => store.global.alert;
