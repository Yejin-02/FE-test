import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBoards } from "src/api/board";
import { createPost } from "src/api/posts";
import { BoardSummaryDto } from "src/types";

// 태그 처리, 이미지 처리 추가 필요
function CreatePostPage() {
  const [boards, setBoards] = useState<BoardSummaryDto[]>([]);
  const [selectedBoardID, setSelectedBoardID] = useState("");
  const [selectedBoardTitle, setSelectedBoardTitle] = useState("");
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
      alert(`게시글이 성공적으로 작성되었습니다. ${response.data.id}`);
      window.location.href = `/post-detail/${response.data.id}`; // 홈 화면으로 리디렉션
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleSelectBoard = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const boardID = event.target.value;
    const selectedBoard = boards.find((board) => board.id === boardID);
    const boardTitle = selectedBoard ? selectedBoard.title : "";
    setSelectedBoardID(boardUuid);
    setSelectedBoardTitle(boardTitle);
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
          value={selectedBoardTitle}
          onChange={handleSelectBoard}
        >
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.title}
            </option>
          ))}
        </select>
        <div>
          현재 선택된 카테고리
          <p>{selectedBoardTitle}</p>
          <p>{selectedBoardID}</p>
        </div>

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
