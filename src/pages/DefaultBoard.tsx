import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getAllPosts } from "src/api/posts";
import BoardItem from "src/components/BoardItem";
import { PostDto } from "src/types";

const DefaultBoard = () => {
  const {
    data: postsData,
    error: postsError,
    isLoading: postsLoading,
  } = useQuery(["posts"], getAllPosts);

  if (postsLoading) {
    return <div>Loading...</div>;
  }

  if (postsError) {
    console.error("Failed to fetch posts:", postsError);
    return <div>Error fetching data</div>;
  }

  const posts = postsData.list;
  const postCount = postsData.count;

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

export default DefaultBoard;
