const BASE_URL = "http://192.168.1.35:3001"

import { AxiosRequestConfig } from "axios";
import { axios } from "../lib/axios";
import { getItemFromAsyncStorage } from "../utils/async-storage";
export interface IRequest {
  url: string;
  body?: any;
  config?: AxiosRequestConfig;
}

axios.interceptors.request.use(async (config) => {
  config.headers["Authorization"] = `Bearer ${await getItemFromAsyncStorage(
    "access_token"
  )}`;
  config.headers["CultureInfo"] = "pt-BR";
  return config;
});

export const api = {
  post: ({ url, body, config }: IRequest): Promise<any> =>
    axios.post(`${BASE_URL}${url}`, body, config).catch((error) => ({
      hasError: true,
      ...error
    })),

  delete: ({ url, config }: IRequest): Promise<any> =>
    axios.delete(`${BASE_URL}${url}`, config).catch((error) => ({
      hasError: true,
      ...error
    })),

  get: ({ url, config }: IRequest): Promise<any> =>
    axios.get(`${BASE_URL}${url}`, config).catch((error) => ({
      hasError: true,
      ...error
    })),

  put: ({ url, body, config }: IRequest): Promise<any> =>
    axios.put(`${BASE_URL}${url}`, body, config).catch((error) => ({
      hasError: true,
      ...error
    })),

  patch: ({ url, body, config }: IRequest): Promise<any> =>
    axios.patch(`${BASE_URL}${url}`, body, config).catch((error) => ({
      hasError: true,
      ...error
    }))
};