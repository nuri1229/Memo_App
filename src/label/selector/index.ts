import { AppState } from "global/store";

export const selectLabel = (store: AppState) => store.label;
export const selectLabelList = (store: AppState) => store.label.list;
