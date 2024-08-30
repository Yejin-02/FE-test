import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { refresh } from "./auth";

// 기본 URL 설정
export const apiClient = axios.create({
  baseURL: "/local",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApiClient = axios.create({
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

authApiClient.interceptors.request.use(onAxiosRequest, onAxiosRequestError);

// 응답 인터셉터 설정
const onAxiosResponse = async (
  response: AxiosResponse,
): Promise<AxiosResponse> => {
  const { data } = response;

  // response 자체가 안 온 경우
  if (!response) {
    alert("response 자체가 안 온 네트워크 오류");
  }

  // 정상인 경우 + 인증 관련 처리
  if (data.resultCode === 0) {
    // response가 정상적으로 온 경우
    return response;
  } else if (data.resultCode === 1001) {
    // accessToken이 만료된 경우. ResultCode가 1001이 아닐 수도.
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // 토큰 재발급 전 오류 검사하는 전처리
    if (!accessToken || !refreshToken) {
      // 로컬스토리지에 accessToken이나 refreshToken 둘 중 하나라도 없는 경우
      // (??) -> 원인 파악 불가, 에러 처리
      alert("로컬에서 토큰 유실 네트워크 오류");
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
      // refreshToken이 만료된 경우. 마찬가지로 resultCode가 1002가 아닐 수 있음.
      alert("인증이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear();
      window.location.href = "/login";
      return response;
    } else {
      // 토큰 재발급 과정에서 예상하지 못한 오류 처리
      alert("토큰 재발급 과정 네트워크 오류");
      localStorage.clear();
      window.location.href = "/login";
      return response;
    }
  } else {
    // 그 외 인증 관련된 오류가 아닌 경우. resultCode로 컨트롤 되는 거니까 이것도 바뀔 수 있음.
    return response;
  }
};

const onAxiosResponseError = (error: AxiosError): Promise<AxiosError> => {
  alert("응답 네트워크 오류");

  return Promise.reject(error);
};

apiClient.interceptors.response.use(onAxiosResponse, onAxiosResponseError);
authApiClient.interceptors.response.use(onAxiosResponse, onAxiosResponseError);
