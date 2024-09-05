import { apiClient } from "./axiosInstance";

// 로그인 버튼
export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};

// 회원가입 버튼
export const register = async (
  nickname: string,
  email: string,
  password: string,
) => {
  const response = await apiClient.post("/auth/register", {
    nickname,
    email,
    password,
  });
  return response.data;
};

// 인증 토큰 갱신
export const refresh = async (refreshToken: string) => {
  try {
    const response = await apiClient.post("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};
