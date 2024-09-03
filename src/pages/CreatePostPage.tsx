import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBoards } from "src/api/board";
import { createPost } from "src/api/posts";
import { BoardSummaryDto } from "src/types";

// 태그 처리, 이미지 처리 추가 필요
function CreatePostPage() {
  const [boards, setBoards] = useState<BoardSummaryDto[]>([]);
  const [selectedBoard, setSelectedBoard] = useState("게시판 선택");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const boardUuid = "265f245a-8a6e-4278-9af8-2935b3e8e153";

  const handleCreatePost = async (
    postTitle: string,
    postBody: string,
    boardUuid: string,
  ) => {
    const postData = {
      title: postTitle,
      body: postBody,
      tags: [],
    };
    try {
      const response = await createPost(boardUuid, postData);
      console.log("Post created successfully:", response);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleSelectBoard = (event: { target: { value: any } }) => {
    const boardUuid = event.target.value;
    setSelectedBoard(boardUuid);
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await getBoards();
        setBoards(data.list);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchBoards();
  }, []);

  return (
    <div>
      <h1>Create Post</h1>
      <div>
        <select
          id="board-select"
          value={selectedBoard}
          onChange={handleSelectBoard}
        >
          <option value="">게시판을 선택하세요</option>
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.title}
            </option>
          ))}
        </select>
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
