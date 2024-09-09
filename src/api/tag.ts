import { TagDto } from "src/types";

import { apiClient, authApiClient } from "./axiosInstance";

// 모든 태그 불러오기
export const getAllTags = async () => {
  const response = await apiClient.get(`/tag`, {});
  return response.data;
};

// 새 태그 만들기
export const createTag = async (tag: TagDto) => {
  const response = await authApiClient.post(`/tag`, tag);
  return response.data;
};

// 태그 서치하기
export const searchTag = async (keyword: string) => {
  const response = await apiClient.get(`/tag/search?keyword=${keyword}`, {});
  return response.data;
};
