import React from "react";
import { TagListItem, TagListUl } from "src/styledComponents";

type TagInputProps = {
  postTags: string[];
  inputTag: string;
  onTagChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTagKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onTagRemove: (tagToRemove: string) => void;
};

const TagInput: React.FC<TagInputProps> = ({
  postTags,
  inputTag,
  onTagChange,
  onTagKeyDown,
  onTagRemove,
}) => (
  <div className="inputTag">
    <TagListUl>
      {postTags.map((tag) => (
        <TagListItem key={tag}>
          #{tag}
          <button onClick={() => onTagRemove(tag)}>x</button>
        </TagListItem>
      ))}
    </TagListUl>

    <input
      type="text"
      value={inputTag}
      onChange={onTagChange}
      onKeyDown={onTagKeyDown}
      placeholder="Type a tag and press Enter"
    />
  </div>
);

export default TagInput;
