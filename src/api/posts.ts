import { ImageDto } from "src/types";

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

// 게시글 쓰기 <-- 수정필요: 태그 처리부 필요
export const createPost = async (
  boardUuid: string,
  postData: { title: string; body: string },
) => {
  const response = await authApiClient.post(
    `/posts?boardUuid=${boardUuid}`,
    postData, // 전달할 데이터를 여기에 포함
  );
  return response.data;
};

// 단일 게시글 불러오기
export const getPostById = async (id: string) => {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
};

// 단일 게시글 삭제하기
export const deletePostById = async (id: string) => {
  const response = await authApiClient.delete(`/posts/${id}`);
  return response.data;
};

// 단일 게시글 수정하기 <-- 수정필요
export const patchPostById = async (id: string) => {
  const response = await apiClient.patch(`/posts/${id}`);
  return response.data;
};

// 단일 게시글 이미지 첨부 <-- 수정필요
export const uploadImageToPost = async (postId: string, imageFile: File) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      const base64String = reader.result as string;

      try {
        const response = await authApiClient.post(`/posts/${postId}/image`, {
          image: base64String,
        });
        resolve(response.data.imageUrl); // 서버가 반환하는 이미지 URL
      } catch (error) {
        console.error("Image upload failed:", error);
        reject(error);
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      reject(error);
    };

    reader.readAsDataURL(imageFile); // 이미지를 Base64로 변환
  });
};

export const addImagesToPost = async (postId: string, imageFiles: File[]) => {
  try {
    const imageDtos: ImageDto[] = await Promise.all(
      imageFiles.map(async (file) => {
        const imageUrl = await uploadImageToPost(postId, file);
        return {
          id: crypto.randomUUID(), // 고유한 ID 생성
          image: imageUrl,
        };
      }),
    );

    // 이미지를 포함한 새로운 postDto 생성
    const updatedPostDto = {
      ...postDto,
      images: [...postDto.images, ...imageDtos],
    };

    // 여기서 postDto를 갱신할 필요가 없다면, 이미지만 업데이트하는 것에 그칠 수 있음.
    return updatedPostDto;
  } catch (error) {
    console.error("Failed to add images to post:", error);
    throw error;
  }
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
  제목 -> %EC%A0%9C%EB%AA%A9 변환은 알아서 일어나는 거겠죠?
   */
};
