import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getAllPosts, searchPostByKeyword } from "src/api/posts";
import BoardItem from "src/components/BoardItem";
import { PostDto } from "src/types";

const DefaultBoard = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

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

  const handleSearchPost = async (keyword: string) => {
    const response = await searchPostByKeyword(keyword);
  };

  return (
    <div>
      <div className="searchPostByTitle">
        <input
          type="text"
          placeholder="제목으로 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          required
        ></input>
        <button
          onClick={() => {
            handleSearchPost(searchKeyword);
          }}
        >
          검색
        </button>
      </div>
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
