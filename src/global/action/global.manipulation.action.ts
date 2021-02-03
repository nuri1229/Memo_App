import { ActionType, createAction } from "typesafe-actions";
import { AxiosResponse } from "axios";

export type ManipulationRequestPayload<CallServiceParamType, ResponseDataType> = {
  callService: (param: CallServiceParamType) => Promise<AxiosResponse<ResponseDataType>>;
  callServiceParam: CallServiceParamType;
  successCallback: (response: ResponseDataType) => void;
  errorCallback?: () => void;
};

export const globalManipulationAction = createAction("GLOBAL_MANIPULATION_REQUEST")<ManipulationRequestPayload<any, any>>();

export type GlobalManipulationAction = ActionType<typeof globalManipulationAction>;
