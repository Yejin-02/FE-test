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
  const accessToken = localStorage.getItem("accessToken");
  alert(accessToken); // 요청 보낼 때 액세스 토큰 잘 있나 확인

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`; // 있으면 그대로 붙여 보내기
  } else {
    window.location.href = "/login";
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
        const newAccessToken = refreshTokenResponse.resultData?.accessToken;

        if (refreshTokenResponse.resultCode === 0 && newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          // originalRequest가 정의되어 있는지 확인
          if (originalRequest) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            // 중단된 요청을 재요청
            return apiClient(originalRequest);
          } else {
            // originalRequest가 정의되지 않은 경우
            alert("요청 정보가 존재하지 않습니다.");
            localStorage.clear();
            window.location.href = "/login";
            return Promise.reject(error);
          }
        } else if (refreshTokenResponse.resultCode === 1002) {
          // Refresh Token이 만료된 경우
          alert("인증이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        } else {
          // 기타 오류 처리
          alert("토큰 재발급 과정 네트워크 오류");
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Refresh Token 요청 중 오류 발생
        alert("토큰 갱신 중 오류 발생");
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    } else {
      // Refresh Token이 없는 경우
      alert("Refresh Token이 존재하지 않습니다.");
      localStorage.clear();
      window.location.href = "/login";
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

apiClient.interceptors.response.use(onAxiosResponse, onAxiosResponseError);
authApiClient.interceptors.response.use(onAxiosResponse, onAxiosResponseError);
