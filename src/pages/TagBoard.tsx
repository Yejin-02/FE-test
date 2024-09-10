import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getPostsByTag } from "src/api/posts";
import { BoardItem, BoardWrapper } from "src/styledComponents";
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
      <h3>
        <span style={{ fontWeight: "bold", color: "red" }}>{tag}</span> 태그가
        달린 모든 글
      </h3>
      {postCount === 0 ? (
        <p>No posts available.</p>
      ) : (
        <BoardWrapper>
          {posts.map((post: PostDto) => (
            <BoardItem to={`/post-detail/${post.id}`} key={post.id}>
              {post.title} - {post.createdBy.nickname}
            </BoardItem>
          ))}
        </BoardWrapper>
      )}
    </div>
  );
};

export default TagBoard;
