import { useState } from "react";
import { useQuery } from "react-query";
import { getBoards } from "src/api/board";
import { createPost, uploadImageToPost } from "src/api/posts";
import { createTag, getAllTags } from "src/api/tag";

import BoardSelect from "./../components/createpostComponents/BoardSelect";
import PostForm from "./../components/createpostComponents/PostForm";
import TagInput from "./../components/createpostComponents/TagInput";

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

      // 새 태그만 새로이 업로드
      for (const tag of newTags) {
        const tagdto = {
          key: tag,
        };
        await createTag(tagdto);
      }

      // 제목-내용-태그 전달하여 포스트 업로드
      const response = await createPost(selectedBoardID, postData);
      console.log("Post uploaded successfully");

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
    setSelectedBoardID(boardID);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
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

  const handleTagRemove = (tagToRemove: string) => {
    setPostTags(postTags.filter((tag) => tag !== tagToRemove));
  };

  const handleCancle = () => {
    const isConfirmed = window.confirm(
      "뒤로 가기를 선택하면 글쓰기가 취소됩니다. 작성한 내용은 저장되지 않습니다. 취소하시겠습니까?",
    );
    if (isConfirmed) {
      window.location.href = "/"; // 홈 화면으로 리디렉션
    } else {
      alert("뒤로 가기가 취소되었습니다.");
    }
  };

  return (
    <div>
      <button onClick={handleCancle}>홈 화면으로 돌아가기</button>
      <h1>Create Post</h1>
      <BoardSelect
        boards={boards}
        selectedBoardID={selectedBoardID}
        onSelectBoard={handleSelectBoard}
      />
      <PostForm
        postTitle={postTitle}
        postBody={postBody}
        onTitleChange={(e) => setPostTitle(e.target.value)}
        onBodyChange={(e) => setPostBody(e.target.value)}
        onFileChange={handleFileChange}
      />
      <TagInput
        postTags={postTags}
        inputTag={inputTag}
        onTagChange={(e) => setInputTag(e.target.value)}
        onTagKeyDown={handleKeyDown}
        onTagRemove={handleTagRemove}
      />
      <button
        onClick={() =>
          handleCreatePost(
            postTitle,
            postBody,
            postTags,
            selectedBoardID,
            selectedFile,
          )
        }
      >
        발행
      </button>
    </div>
  );
}

export default CreatePostPage;
