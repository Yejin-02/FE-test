import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { refresh } from "./auth";

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

// 응답 인터셉터 설정
const onAxiosResponse = async (
  response: AxiosResponse,
): Promise<AxiosResponse> => {
  const { data } = response;

  // response 자체가 안 온 경우
  if (!response) {
    alert("네트워크 오류");
  }

  if (data.resultCode === 0) {
    // response가 정상적으로 온 경우
    return response;
  } else if (data.resultCode === 1001) {
    // accessToken이 만료된 경우
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      // 로컬의 accessToken을 사용해서 요청을 보냈지만, 로컬스토리지에 accessToken이나 refreshToken이 없는 경우
      // (??) -> 원인 파악 불가, 에러 처리
      alert("네트워크 오류");
      return response;
    }

    // 원래 요청을 불러옴
    const originalRequest = response.config;

    // accesstoken을 refresh하는 요청
    const refreshTokenResponse = await refresh(refreshToken);

    const newAccessToken = refreshTokenResponse.resultData?.accessToken;
    if (refreshTokenResponse.resultCode === 0 && newAccessToken) {
      // refreshToken으로 accessToken을 재발급 받은 경우
      localStorage.setItem(accessToken, newAccessToken);
      return apiClient(originalRequest);
    } else if (refreshTokenResponse.resultCode === 1002) {
      // refreshToken이 만료된 경우
      alert("인증이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear();
      window.location.href = "/login";
      return response;
    } else {
      // 그 외의 경우 (??) -> 원인 파악 불가, 에러 처리
      alert("네트워크 오류");
      localStorage.clear();
      window.location.href = "/login";
      return response;
    }
  } else {
    // 그 외 인증 관련된 오류가 아닌 경유
    return response;
  }
};

const onAxiosResponseError = (error: AxiosError): Promise<AxiosError> => {
  alert("네트워크 오류");

  return Promise.reject(error);
};

apiClient.interceptors.response.use(onAxiosResponse, onAxiosResponseError);

export default apiClient;
