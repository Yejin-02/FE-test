import apiClient from "./axiosInstance";

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
  const response = await apiClient.post(
    "/auth/refresh",
    {},
    {
      headers: { Authorization: `Bearer ${refreshToken}` },
    },
  );
  return response.data;
};
