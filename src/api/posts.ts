import apiClient from "./axiosInstance";

// 모든 게시글 불러오기
export const getAllPosts = async () => {
  const response = await apiClient.get("/posts", {});
  return response.data;
};

// 게시판 별 게시글 불러오기
export const getPostsByBoard = async (boardUuid: string) => {
  const response = await apiClient.get(`/posts/?${boardUuid}`);
  return response.data;
};

// 단일 게시글 불러오기
export const getPostById = async (id: string) => {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
};
