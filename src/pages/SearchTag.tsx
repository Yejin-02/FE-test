import { useState } from "react";
import { Link } from "react-router-dom";
import { searchTag } from "src/api/tag";
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
    <div>
      <Link to="/">홈으로 돌아가기</Link>
      <div className="setTag">
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
      </div>
      {tagCount === 0 ? (
        <p>검색 결과 없음</p>
      ) : (
        <ul>
          {tags.map((tag: TagDto) => (
            <div key={tag.key}>
              <Link to={`/tags/${tag.key}`}>{tag.key}</Link>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchTag;
