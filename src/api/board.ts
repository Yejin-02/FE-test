import { apiClient, authApiClient } from "./axiosInstance";

// 모든 게시판 목록 불러오기
export const getBoards = async () => {
  const response = await apiClient.get("/boards", {});
  return response.data;
};

// 새 게시판 만들기
export const createBoard = async (boardTitle: string) => {
  const response = await authApiClient.post("/boards", {
    title: boardTitle,
  });
  return response.data;
};

// 게시판 삭제하기
export const deleteBoardById = async (boardId: string) => {
  const response = await authApiClient.delete(`/boards/${boardId}`, {});
  return response.data;
};
