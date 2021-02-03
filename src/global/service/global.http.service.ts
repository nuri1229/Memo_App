import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

export const defaultOptions: AxiosRequestConfig = {
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
};

export const API_HOST = `http://localhost:8080`;

export const HTTP = {
  get: <ResponseType>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseType>> => axios.get(url, options ? options : defaultOptions),
  post: <ParamType, ResponseType>(url: string, param: ParamType, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseType>> => axios.post(url, param, options ? options : defaultOptions),
  patch: <ParamType, ResponseType>(url: string, param: ParamType, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseType>> => axios.patch(url, param, options ? options : defaultOptions),
  delete: <ResponseType>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseType>> => axios.delete(url, options ? options : defaultOptions),
  put: <ParamType, ResponseType>(url: string, param: ParamType, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseType>> => axios.put(url, param, options ? options : defaultOptions),
};
