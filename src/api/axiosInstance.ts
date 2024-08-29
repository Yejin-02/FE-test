import axios, { AxiosError,InternalAxiosRequestConfig } from "axios";

// 기본 URL 설정
const apiClient = axios.create({
  baseURL: "/local",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정
const onAxiosRequest = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    // refresh();
  }

  return config;
};

const onAxiosRequestError = (error: AxiosError | Error): Promise<AxiosError> =>
  Promise.reject(error);

apiClient.interceptors.request.use(onAxiosRequest, onAxiosRequestError);

export default apiClient;
