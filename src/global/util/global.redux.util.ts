import { createAsyncAction, createAction } from "typesafe-actions";

export const asyncActionCreator = <RequestPayloadType, SuccessPayloadType, FailurePayloadType, ClearPayloadType>(prefix: string) => {
  const asyncActions = createAsyncAction(`${prefix}_REQUEST`, `${prefix}_SUCCESS`, `${prefix}_FAILURE`)<RequestPayloadType, SuccessPayloadType, FailurePayloadType>();
  const clear = createAction(`${prefix}_CLEAR`)<ClearPayloadType>();
  return {
    ...asyncActions,
    clear,
  };
};
