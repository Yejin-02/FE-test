import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostsByBoard } from "src/api/posts";
import BoardItem from "src/components/BoardItem";
import { PostDto } from "src/types";

const Board = () => {
  const { boardUuid } = useParams<{ boardUuid: string }>();
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPostsByBoard(boardUuid as string);
        setPosts(data.list);
        setPostCount(data.count);
      } catch (error) {
        console.error("Failed to fetch posts by board:", error);
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
                <li>
                  {post.title} - {post.createdBy.nickname}
                </li>
              </BoardItem>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Board;
