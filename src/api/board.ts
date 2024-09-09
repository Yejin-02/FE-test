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

// 게시판 삭제하기 <-- 수정필요. 안 비어있으면 삭제 못 하는 듯? 그 부분 따로 경고문 처리 못 하나..
export const deleteBoardById = async (boardId: string) => {
  const response = await authApiClient.delete(`/boards/${boardId}`, {});
  return response.data;
};
