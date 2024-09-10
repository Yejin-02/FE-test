import { Link } from "react-router-dom";
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
        tags.map((tag: TagDto) => (
          <Link to={`/tags/${tag.key}`} key={tag.key}>
            <li>{tag.key}</li>
          </Link>
        ))
      )}
    </div>
  );
};

export default TagList;
