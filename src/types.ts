interface UserDto {
  id: string;
  nickname: string;
  createdAt: string;
}

export interface BoardSummaryDto {
  id: string;
  title: string;
  createdAt: string;
  creator: UserDto;
}

interface ImageDto {
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
