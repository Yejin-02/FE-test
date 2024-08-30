import { apiClient } from "./axiosInstance";

// 모든 게시판 목록 불러오기
export const getBoards = async () => {
  const response = await apiClient.get("/boards", {});
  return response.data;
};
