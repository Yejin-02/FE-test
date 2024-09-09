import { useState } from "react";
import { Link } from "react-router-dom";
import { searchPostByKeyword } from "src/api/posts";
import BoardItem from "src/components/BoardItem";
import { PostDto } from "src/types";

const DefaultBoard = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);

  const handleSearch = async (keyword: string) => {
    const response = await searchPostByKeyword(keyword);
    setPosts(response.list);
    setPostCount(response.count);
  };

  return (
    <div>
      <Link to="/">홈으로 돌아가기</Link>
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
            handleSearch(searchKeyword);
          }}
        >
          검색
        </button>
      </div>
      {postCount === 0 ? (
        <p>검색 결과 없음</p>
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
