import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deletePostById, getPostById } from "src/api/posts";

import { PostDto } from "../types";

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
      try {
        await deletePostById(post.id);
        alert("게시글이 삭제되었습니다.");
        window.location.href = "/"; // 홈 화면으로 리디렉션
      } catch (error) {
        console.error("게시글 삭제 실패:", error);
        alert("게시글 삭제에 실패했습니다.");
      }
    } else {
      alert("게시글 ID가 없습니다.");
    }
  };

  return (
    <div>
      <h1>Post Detail</h1>
      <Link to="/">
        <button>뒤로 가기</button>
      </Link>
      <p>제목: {post?.title}</p>
      <p>내용: {post?.body}</p>
      <div>태그: {post?.tags?.join(", ")}</div>
      <button onClick={handleDelete}>삭제하기</button>
    </div>
  );
};

export default PostDetail;
