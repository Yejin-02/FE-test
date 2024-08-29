import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getPostById } from "src/api/posts";

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

  return (
    <div>
      <h1>Post Detail</h1>
      <Link to="/">
        <button>뒤로 가기</button>
      </Link>
      <p>{post?.title}</p>
      <p>{post?.body}</p>
      <button>삭제하기</button>
    </div>
  );
};

export default PostDetail;
