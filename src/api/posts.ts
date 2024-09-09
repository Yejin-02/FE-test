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

// 특정 태그가 달린 게시글 불러오기
export const getPostsByTag = async (tag: string) => {
  const response = await apiClient.get(`/posts?tag=${tag}`, {});
  return response.data;
};

// 게시글 쓰기
export const createPost = async (
  boardUuid: string,
  postData: { title: string; body: string; tags: string[] },
) => {
  const response = await authApiClient.post(
    `/posts?boardUuid=${boardUuid}`,
    postData,
  );
  return response.data;
};

// 단일 게시글 불러오기
export const getPostById = async (id: string) => {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
};

// 단일 게시글 삭제하기
export const deletePostById = async (postId: string) => {
  try {
    // 게시글 정보 가져오기
    const postResponse = await authApiClient.get(`/posts/${postId}`);
    const images = postResponse.data.images;

    // 이미지가 있는 경우, 이미지 삭제
    if (images && images.length > 0) {
      for (const image of images) {
        await deleteImageOfPost(postId, image.id);
        console.log(`Image with id ${image.id} deleted successfully.`);
      }
    }

    const deletePostResponse = await authApiClient.delete(`/posts/${postId}`);
    console.log(`Post with id ${postId} deleted successfully.`);
    return deletePostResponse.data;
  } catch (error) {
    console.error(`Error deleting post with id ${postId}:`, error);
    throw error;
  }
};

// 단일 게시글 수정하기 <-- 수정필요. 우선 PostDetail에 수정 버튼부터 만들고 거따 붙이자.
export const patchPostById = async (id: string) => {
  const response = await apiClient.patch(`/posts/${id}`);
  return response.data;
};

// 이미지 첨부하기
export const uploadImageToPost = async (
  postUuid: string,
  selectedFile: File,
) => {
  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await authApiClient.post(
      `/posts/${postUuid}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Failed to upload image:", error);
    throw error;
  }
};

// 단일 게시글 이미지 삭제
export const deleteImageOfPost = async (id: string, imageId: string) => {
  const response = await authApiClient.delete(`/posts/${id}/image/${imageId}`);
  return response.data;
};

// 게시글 검색 결과 <-- 수정필요
export const searchPostByKeyword = async (keyword: string) => {
  const response = await apiClient.get(`/posts/search?keyword=${keyword}`);
  return response.data;

  /*
  keyword: 제목 <- 이렇게 보냈는데
  curl -X 'GET' \
  'https://api.2024.newbies.gistory.me/posts/search?keyword=%EC%A0%9C%EB%AA%A9' \
  -H 'accept: application/json' <- 이렇게 뜨는 이유 뭐지?
  제목 -> %EC%A0%9C%EB%AA%A9 변환은 알아서 일어나는 거겠죠?
   */
};
