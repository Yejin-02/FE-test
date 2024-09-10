import { Link } from "react-router-dom";
import { TagListUl, TagListLi } from "src/styledComponents";
import { TagDto } from "src/types";

type TagListProps = {
  tags: TagDto[];
  tagCount: number;
};

const TagList = ({ tags, tagCount }: TagListProps) => {
  return (
    <div>
      <h3>모든 태그 보기</h3>
      {tagCount === 0 ? (
        <p>태그 없음</p>
      ) : (
        <TagListUl>
          {tags.map((tag: TagDto) => (
            <TagListLi to={`/tags/${tag.key}`} key={tag.key}>
              #{tag.key}
            </TagListLi>
          ))}
          <TagListLi to="/search-tags">태그 검색하러 가기</TagListLi>
        </TagListUl>
      )}
    </div>
  );
};

export default TagList;
