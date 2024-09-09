import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deletePostById, getPostById } from "src/api/posts";

import { ImageDto, PostDto } from "../types";

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
    <div>
      <h1>Post Detail</h1>
      <Link to="/">
        <button>뒤로 가기</button>
      </Link>
      <p>게시판: {post?.board.title}</p>
      <p>제목: {post?.title}</p>
      <p>내용: {post?.body}</p>
      <p>아이디: {post?.id}</p>
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
      <div>
        태그:{" "}
        {post?.tags?.map((tag) => (
          <>
            <Link to={`/tags/${tag}`} key={tag}>
              <li>{tag}</li>
            </Link>
          </>
        ))}
      </div>
      <button onClick={handleDelete}>삭제하기</button>
      <button onClick={handlePatch}>수정하기..는 아직 미완성</button>
    </div>
  );
};

export default PostDetail;
