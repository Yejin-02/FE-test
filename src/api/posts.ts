import { apiClient, authApiClient } from "./axiosInstance";

// 모든 게시글 목록 불러오기
export const getAllPosts = async () => {
  const response = await apiClient.get("/posts", {});
  return response.data;
};

// 게시판 별 게시글 불러오기
export const getPostsByBoard = async (boardUuid: string) => {
  const response = await apiClient.get(`/posts?boardUuid=${boardUuid}`, {});
  return response.data;
};

// 게시글 쓰기 <-- 수정필요
export const createPost = async (boardUuid: string) => {
  const response = await authApiClient.post(
    `/posts?boardUuid=${boardUuid}`,
    {},
  );
  return response.data;
};

// 단일 게시글 불러오기
export const getPostById = async (id: string) => {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
};

// 단일 게시글 삭제하기 <-- 수정필요
export const deletePostById = async (id: string) => {
  const response = await apiClient.delete(`/posts/${id}`);
  return response.data;
};

// 단일 게시글 수정하기 <-- 수정피룡
export const patchPostById = async (id: string) => {
  const response = await apiClient.patch(`/posts/${id}`);
  return response.data;
};

// 단일 게시글 이미지 첨부 <-- 수정필요
export const addImageOfPost = async (id: string) => {
  const response = await authApiClient.post(`/posts/${id}/image`);
  return response.data;
};

// 단일 게시글 이미지 삭제 <-- 수정필요
export const deleteImageOfPost = async (id: string, imageId: string) => {
  const response = await authApiClient.delete(`/posts/${id}/image/${imageId}`);
  return response.data;
};

// 게시글 검색 결과 <--수정필요
export const searchPostByKeyword = async (keyword: string) => {
  const response = await apiClient.get(`/posts/search?keyword=${keyword}`);
  return response.data;
  /*
  keyword: 제목 <- 이렇게 보냈는데
  curl -X 'GET' \
  'https://api.2024.newbies.gistory.me/posts/search?keyword=%EC%A0%9C%EB%AA%A9' \
  -H 'accept: application/json' <- 이렇게 뜨는 이유 뭐지?

  제목 -> %EC%A0%9C%EB%AA%A9 변환은 어디서 어떤 로직으로 일어나는 거지?
   */
};
