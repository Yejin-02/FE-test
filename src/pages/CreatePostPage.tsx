import { useState } from "react";
import { Link } from "react-router-dom";
import { createPost } from "src/api/posts";

function CreatePostPage() {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const boardUuid = "265f245a-8a6e-4278-9af8-2935b3e8e153";

  const handleCreatePost = async (
    postTitle: string,
    postBody: string,
    boardUuid: string,
  ) => {
    try {
      const response = await createPost(boardUuid);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <div>
        <input
          type="text"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          placeholder="제목"
          style={{ width: "1000px" }}
          required
        ></input>
        <textarea
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          placeholder="내용"
          style={{ width: "1000px" }}
          required
        ></textarea>
      </div>
      <button>이미지 첨부</button>
      <button
        onClick={() => {
          handleCreatePost(postTitle, postBody, boardUuid);
        }}
      >
        발행
      </button>
    </div>
  );
}

export default CreatePostPage;
