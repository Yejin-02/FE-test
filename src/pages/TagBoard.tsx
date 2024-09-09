import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getPostsByTag } from "src/api/posts";
import BoardItem from "src/components/BoardItem";
import { PostDto } from "src/types";

const TagBoard = () => {
  const { tag } = useParams<{ tag: string }>();

  const {
    data: postsData,
    error: postsError,
    isLoading: postsLoading,
  } = useQuery(["posts", tag], () => getPostsByTag(tag as string));

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
      <h3>{tag} 태그가 달린 모든 글</h3>
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

export default TagBoard;
