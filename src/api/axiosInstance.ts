import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { refresh } from "./auth";

// auth 테스트용
export const authTestClient = axios.create({
  baseURL: "/local",
  headers: {
    "Content-Type": "application/json",
  },
});

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
  // 특정 엔드포인트에 대해 401 오류를 강제로 발생
  if (config.url === "/test-endpoint") {
    return Promise.reject({
      response: {
        status: 401,
      },
    });
  }

  // 이외에는 정상 작동
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    return Promise.reject(
      new Error("Access token is missing. Please log in again."),
    );
  }
  return config;
};

const onAxiosRequestError = (
  error: AxiosError | Error,
): Promise<AxiosError> => {
  if (error.message.includes("Access token is missing")) {
    window.location.href = "/login";
  }
  return Promise.reject(error);
};

authApiClient.interceptors.request.use(onAxiosRequest, onAxiosRequestError);
authTestClient.interceptors.request.use(onAxiosRequest, onAxiosRequestError);

// 응답 인터셉터
const onAxiosResponse = async (
  response: AxiosResponse,
): Promise<AxiosResponse> => {
  return response;
};

const onAxiosResponseError = async (error: AxiosError): Promise<never> => {
  const { config, response } = error;
  const originalRequest = config;

  // 인증 오류 (401) 발생 시
  if (response?.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        // Refresh Token으로 Access Token 갱신
        const refreshTokenResponse = await refresh(refreshToken);
        const newAccessToken = refreshTokenResponse.accessToken;
        const emptyTokenResponse = !newAccessToken || newAccessToken === "";

        if (!emptyTokenResponse) {
          localStorage.setItem("accessToken", newAccessToken);
          if (originalRequest) {
            console.log("토큰 붙여서 원래 요청 반환");
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
          } else {
            console.log("originalRequest를 찾을 수 없음");
            handleUnauthorized();
            return Promise.reject(error);
          }
        } else {
          console.log("new access token이 비어있음");
          handleUnauthorized();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.log("재발급 중 오류 발생");
        handleUnauthorized();
        return Promise.reject(refreshError);
      }
    } else {
      console.log("refresh token이 없음");
      handleUnauthorized();
      return Promise.reject(error);
    }
  }

  // 기타 응답 오류 처리
  if (response?.status === 404) {
    window.location.href = "/notFound";
  } else if (response?.status === 500) {
    alert("서버 오류가 발생했습니다.");
  } else {
    alert("응답 네트워크 오류");
  }

  return Promise.reject(error);
};

const handleUnauthorized = () => {
  alert("인증이 만료되었습니다. 다시 로그인해주세요.");
  localStorage.clear();
  window.location.href = "/login";
};

apiClient.interceptors.response.use(onAxiosResponse, onAxiosResponseError);
authApiClient.interceptors.response.use(onAxiosResponse, onAxiosResponseError);
authTestClient.interceptors.response.use(onAxiosResponse, onAxiosResponseError);
