import { createAction } from "typesafe-actions";

export const globalDataRefreshAction = createAction("GLOBAL_GET_ALL_DATA")<string>();
