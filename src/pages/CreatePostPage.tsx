import { useState } from "react";
import { Link } from "react-router-dom";

function CreatePostPage() {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postCreator, setPostCreator] = useState("생각해보니까 이건 변경 필요한 값이 아님");

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
      <button>발행</button>
    </div>
  );
}

export default CreatePostPage;
