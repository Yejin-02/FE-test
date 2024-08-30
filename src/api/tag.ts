import { apiClient, authApiClient } from "./axiosInstance";

// 모든 태그 불러오기 <-- 수정필요
export const getAllTags = async () => {
  const response = await apiClient.get(`/tag`, {});
  return response.data;
};

// 새 태그 만들기 <-- 수정필요
export const createTag = async (key: string) => {
  const response = await authApiClient.post(`/tag`, { "key": key });
  return response.data;
};

// 태그 서치하기 <-- 수정필요
export const getPostsByBoard = async (keyword: string) => {
  const response = await apiClient.get(`/tag/search?keyword=${keyword}`, {});
  return response.data;
};
