import { useState } from "react";
import { Link } from "react-router-dom";
import { searchTag } from "src/api/tag";
import { PagesWrapper, RedirectHome, SearchDiv, TagListLi, TagListUl } from "src/styledComponents";
import { TagDto } from "src/types";

const SearchTag = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [tags, setTags] = useState([]);
  const [tagCount, setTagCount] = useState(0);

  const handleSearch = async (keyword: string) => {
    const response = await searchTag(keyword);
    setTags(response.list);
    setTagCount(response.count);
  };

  return (
    <PagesWrapper>
      <RedirectHome to="/">홈으로 돌아가기</RedirectHome>
      <h1>Search Tag</h1>
      <p>키워드가 포함되는 태그를 확인하세요</p>
      <SearchDiv>
        <input
          type="text"
          placeholder="태그 검색"
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
      {tagCount === 0 ? (
        <p>검색 결과 없음</p>
      ) : (
        <TagListUl>
          {tags.map((tag: TagDto) => (
            <div key={tag.key}>
              <TagListLi to={`/tags/${tag.key}`}>#{tag.key}</TagListLi>
            </div>
          ))}
        </TagListUl>
      )}
    </PagesWrapper>
  );
};

export default SearchTag;
