import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getPostsByBoard } from "src/api/posts";
import { BoardItem, BoardWrapper } from "src/styledComponents";
import { PostDto } from "src/types";

const Board = () => {
  const { boardUuid } = useParams<{ boardUuid: string }>();

  const {
    data: postsData,
    error: postsError,
    isLoading: postsLoading,
  } = useQuery(["posts", boardUuid], () =>
    getPostsByBoard(boardUuid as string),
  );

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
    <>
      <h3>게시글 목록</h3>
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
    </>
  );
};

export default Board;
