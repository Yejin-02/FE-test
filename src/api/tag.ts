import { apiClient, authApiClient } from "./axiosInstance";

// 모든 태그 불러오기 <-- 수정필요. 입력한 태그가 현존하는지 체크할 때 필요.
export const getAllTags = async () => {
  const response = await apiClient.get(`/tag`, {});
  return response.data;
};

// 새 태그 만들기 <-- 수정필요. 입력한 태그가 없는 태그면 새로 만들어야 함.
export const createTag = async (key: string) => {
  const response = await authApiClient.post(`/tag`, { "key": key });
  return response.data;
};

// 태그 서치하기 <-- 수정필요. 서치 키워드 포함하는 태그 리스트로 보여주기
export const searchTag = async (keyword: string) => {
  const response = await apiClient.get(`/tag/search?keyword=${keyword}`, {});
  return response.data;
};
