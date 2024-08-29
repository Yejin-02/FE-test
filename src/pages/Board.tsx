import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllPosts, getPostById } from "src/api/posts";
import BoardItem from "src/components/BoardItem";
import { PostDto } from "src/types";

const Board = () => {
  const { boardUuid = "all" } = useParams<{ boardUuid: string }>();
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (boardUuid === "all") {
          const data = await getAllPosts();
          setPosts(data.list);
          setPostCount(data.count);
        } else {
          const data = await getPostById(boardUuid);
          setPosts(data.list);
          setPostCount(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, [boardUuid]);

  return (
    <div>
      {postCount === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post: PostDto) => (
            <Link to={`/post-detail/${post.id}`} key={post.id}>
              <BoardItem>
                <li>{post.title}</li>
              </BoardItem>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Board;
