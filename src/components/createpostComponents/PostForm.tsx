import React from "react";

type PostFormProps = {
  postTitle: string;
  postBody: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBodyChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PostForm: React.FC<PostFormProps> = ({
  postTitle,
  postBody,
  onTitleChange,
  onBodyChange,
  onFileChange,
}) => (
  <div>
    <input
      type="text"
      value={postTitle}
      onChange={onTitleChange}
      placeholder="제목"
      style={{ width: "1000px" }}
      required
    />
    <textarea
      value={postBody}
      onChange={onBodyChange}
      placeholder="내용"
      style={{ width: "1000px" }}
      required
    />
    <input type="file" accept="image/*" onChange={onFileChange} />
  </div>
);

export default PostForm;
