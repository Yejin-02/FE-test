import { useState } from "react";
import { Link } from "react-router-dom";
import { searchPostByKeyword } from "src/api/posts";
import { AddNewBoard, BoardItem, BoardWrapper, PagesWrapper, RedirectHome, SearchDiv } from "src/styledComponents";
import { PostDto } from "src/types";

const SearchPost = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);

  const handleSearch = async (keyword: string) => {
    const response = await searchPostByKeyword(keyword);
    setPosts(response.list);
    setPostCount(response.count);
  };

  return (
    <PagesWrapper>
      <RedirectHome to="/">홈으로 돌아가기</RedirectHome>
      <h1>Search Post</h1>
      <p>제목이나 게시글에 키워드가 포함되는 글을 확인하세요</p>
      <SearchDiv>
        <input
          type="text"
          placeholder="키워드로 검색"
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
      </SearchDiv>
      {postCount === 0 ? (
        <p>검색 결과 없음</p>
      ) : (
        <BoardWrapper>
          {posts.map((post: PostDto) => (
            <BoardItem to={`/post-detail/${post.id}`} key={post.id}>
              {post.title} - {post.createdBy.nickname}
            </BoardItem>
          ))}
        </BoardWrapper>
      )}
    </PagesWrapper>
  );
};

export default SearchPost;
