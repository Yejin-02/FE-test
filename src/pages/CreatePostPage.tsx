import { useState } from "react";
import { useQuery } from "react-query";
import { getBoards } from "src/api/board";
import { createPost, uploadImageToPost } from "src/api/posts";

// 태그 처리, 이미지 처리 추가 필요
function CreatePostPage() {
  const [selectedBoardID, setSelectedBoardID] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: boardsData } = useQuery("boards", getBoards);

  const boards = boardsData.list;

  const handleCreatePost = async (
    postTitle: string,
    postBody: string,
    selectedBoardID: string,
    selectedFile: File | null,
  ) => {
    const postData = {
      title: postTitle,
      body: postBody,
      tags: [],
    };

    try {
      const response = await createPost(selectedBoardID, postData);
      console.log("Post uploaded seccessfully");

      const postUuid = response.id;
      if (postUuid && selectedFile) {
        await uploadImageToPost(postUuid, selectedFile);
        console.log("Image uploaded successfully");
      }

      alert("게시글이 성공적으로 작성되었습니다. 게시글로 이동합니다.");
      window.location.href = `/post-detail/${postUuid}`; // 게시글로 리디렉션
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleSelectBoard = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const boardID = event.target.value;
    const boardTitle = boards.find((board: any) => board.id === boardID)?.title;
    if (boardTitle) {
      setSelectedBoardID(boardID);
    }
  };

  // 이미지 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      alert("이미지 선택 핸들링 완료");
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <div>
        <select
          id="board-select"
          value={selectedBoardID}
          onChange={handleSelectBoard}
        >
          {boards.map((board: any) => (
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
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <button
        onClick={() => {
          if (selectedFile) {
            handleCreatePost(
              postTitle,
              postBody,
              selectedBoardID,
              selectedFile,
            );
          } else {
            handleCreatePost(postTitle, postBody, selectedBoardID, null);
          }
        }}
      >
        발행
      </button>
    </div>
  );
}

export default CreatePostPage;
