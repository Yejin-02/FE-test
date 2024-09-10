import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deletePostById, getPostById } from "src/api/posts";

import { ImageDto, PostDto } from "../types";
import {
  PagesWrapper,
  RedirectHome,
  TagListLi,
  TagListUl,
} from "src/styledComponents";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDto | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const data: PostDto = await getPostById(id); // API 호출 (정의 필요)
          setPost(data);
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (post?.id) {
      const isConfirmed = window.confirm(
        "정말로 이 게시글을 삭제하시겠습니까?",
      );
      if (isConfirmed) {
        try {
          await deletePostById(post.id);
          alert("게시글이 삭제되었습니다.");
          window.location.href = "/"; // 홈 화면으로 리디렉션
        } catch (error) {
          console.error("게시글 삭제 실패:", error);
          alert("게시글 삭제에 실패했습니다.");
        }
      } else {
        alert("게시글 삭제가 취소되었습니다.");
      }
    } else {
      alert("게시글 ID가 없습니다.");
    }
  };

  const handlePatch = () => {};

  return (
    <PagesWrapper>
      <RedirectHome to="/">{"< 홈 화면으로 돌아가기"}</RedirectHome>
      <h1>Post Detail</h1>
      <div
        style={{
          backgroundColor: "white",
          color: "black",
          paddingLeft: "10px",
        }}
      >
        <h3>제목: {post?.title}</h3>
        <p style={{ textAlign: "end", paddingRight: "10px", margin: "0" }}>
          게시판: {post?.board.title}
        </p>
        <p style={{ textAlign: "end", paddingRight: "10px", margin: "0" }}>
          작성자 아이디: {post?.id}
        </p>
        <p>{post?.body}</p>
        <p>
          {post?.images.map((image: ImageDto) => {
            return (
              <div key={image.id}>
                <img
                  id={image.id}
                  alt="image"
                  src={`data:image/png;base64,${image.image}`}
                />
                <p>image id: {image.id}</p>
              </div>
            );
          })}
        </p>
      </div>
      <div>
        <TagListUl>
          {post?.tags?.map((tag) => (
            <TagListLi to={`/tags/${tag}`} key={tag}>
              #{tag}
            </TagListLi>
          ))}
        </TagListUl>
      </div>
      <button onClick={handleDelete}>삭제하기</button>
      <button onClick={handlePatch}>수정하기..는 아직 미완성</button>
    </PagesWrapper>
  );
};

export default PostDetail;
