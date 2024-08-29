import apiClient from "./axiosInstance";

// 모든 게시글 불러오기
export const getBoards = async () => {
  const response = await apiClient.get("/boards", {});
  return response.data;
};
