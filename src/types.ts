export type TagDto = {
  key: string;
};

export type AddImageProps = {
  postID: string | undefined;
};

export interface BoardSummaryDto {
  id: string;
  title: string;
  createdAt: string;
  creator: UserDto;
}

export interface ImageDto {
  image: string;
  id: string;
}

export interface PostDto {
  id: string;
  title: string;
  body: string;
  tags: string[];
  board: BoardSummaryDto;
  createdAt: string;
  createdBy: UserDto;
  images: ImageDto[];
}

interface UserDto {
  id: string;
  nickname: string;
  createdAt: string;
}
