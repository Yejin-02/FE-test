import apiClient from "./axiosInstance";

// WingBang 게시판에서 글 가져오기
export const getAllPosts = async () => {
  const response = await apiClient.post("/posts", {});
  return response.data;
};
