import { useState } from "react";
import { useQuery } from "react-query";
import { getBoards } from "src/api/board";
import { createPost, uploadImageToPost } from "src/api/posts";
import { createTag, getAllTags } from "src/api/tag";

// 태그 처리, 이미지 처리 추가 필요
function CreatePostPage() {
  const [selectedBoardID, setSelectedBoardID] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [postTags, setPostTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");

  const { data: boardsData } = useQuery("boards", getBoards);
  const boards = boardsData.list;
  const { data: tagsData } = useQuery("tags", getAllTags);
  const existingTags = tagsData?.list || [];

  const handleCreatePost = async (
    postTitle: string,
    postBody: string,
    postTags: string[],
    selectedBoardID: string,
    selectedFile: File | null,
  ) => {
    const postData = {
      title: postTitle,
      body: postBody,
      tags: postTags,
    };

    try {
      // DB에 없는 새 태그만 모으기
      const existingTagKeys = existingTags.map(
        (tag: { key: string }) => tag.key,
      );
      const newTags = postTags.filter(
        (postTag) => !existingTagKeys.includes(postTag),
      );
      console.log(newTags);

      // 새 태그만 새로이 업로드
      for (const tag of newTags) {
        const tagdto = {
          key: tag,
        };
        await createTag(tagdto);
      }

      // 제목-내용-태그 전달하여 포스트 업로드
      const response = await createPost(selectedBoardID, postData);
      console.log("Post uploaded seccessfully");

      // post id 받아와서 이미지 업로드
      const postUuid = response.id;
      if (postUuid && selectedFile) {
        await uploadImageToPost(postUuid, selectedFile);
        console.log("Image uploaded successfully");
      }

      // 모든 작업 완료되면 게시글로 리디렉션
      alert("게시글이 성공적으로 작성되었습니다. 게시글로 이동합니다.");
      window.location.href = `/post-detail/${postUuid}`;
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputTag.trim()) {
      const newTag = inputTag.trim();
      if (!postTags.includes(newTag)) {
        setPostTags([...postTags, newTag]);
      }
      setInputTag("");
    }
  };

  // 태그 제거 핸들러
  const handleTagRemove = (tagToRemove: string) => {
    setPostTags(postTags.filter((tag) => tag !== tagToRemove));
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
      <div className="inputTag">
        <div className="enteredTag">
          {postTags.map((tag) => (
            <span key={tag} style={{ marginRight: 5 }}>
              {tag}
              <button onClick={() => handleTagRemove(tag)}>x</button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a tag and press Enter"
        />
      </div>
      <button
        onClick={() => {
          if (selectedFile) {
            handleCreatePost(
              postTitle,
              postBody,
              postTags,
              selectedBoardID,
              selectedFile,
            );
          } else {
            handleCreatePost(
              postTitle,
              postBody,
              postTags,
              selectedBoardID,
              null,
            );
          }
        }}
      >
        발행
      </button>
    </div>
  );
}

export default CreatePostPage;
