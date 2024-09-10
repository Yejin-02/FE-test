import React from "react";

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
    <div className="enteredTag">
      {postTags.map((tag) => (
        <span key={tag} style={{ marginRight: 5 }}>
          {tag}
          <button onClick={() => onTagRemove(tag)}>x</button>
        </span>
      ))}
    </div>
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
