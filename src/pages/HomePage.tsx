import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { createBoard, deleteBoardById, getBoards } from "src/api/board";
import { getAllTags } from "src/api/tag";
import { useAuth } from "src/contexts/AuthContext";

import BoardList from "../components/homepageComponents/BoardList";
import Loading from "../components/homepageComponents/Loading";
import LoginSection from "../components/homepageComponents/LoginSection";
import TagList from "../components/homepageComponents/TagList";
import { HomapageTitle } from "src/styledComponents";
import AuthTest from "src/components/AuthTest";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const { token, logout } = useAuth();

  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault();
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
    }
  };

  const handleCreateNewBoard = async (boardTitle: string) => {
    try {
      await createBoard(boardTitle);
      alert("새 게시판이 생성되었습니다");
      window.location.href = "/"; // 홈 화면으로 리디렉션
    } catch (error) {
      console.error("새 게시판 생성 실패:", error);
      alert("새 게시판 생성에 실패했습니다.");
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    try {
      await deleteBoardById(boardId);
      alert("게시판이 삭제되었습니다");
      window.location.href = "/"; // 홈 화면으로 리디렉션
    } catch (error) {
      console.error("게시판 삭제에 실패:", error);
      alert("게시판 삭제에 실패했습니다");
    }
  };

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);

  const {
    data: boardsData,
    error: boardsError,
    isLoading: boardsLoading,
  } = useQuery(["boards"], getBoards);

  const {
    data: tagsData,
    error: tagsError,
    isLoading: tagsLoading,
  } = useQuery(["tags"], getAllTags);

  if (boardsLoading || tagsLoading) {
    return <Loading />;
  }

  if (boardsError) {
    console.error("Failed to fetch boards:", boardsError);
    return <div>Error fetching boards data</div>;
  }

  if (tagsError) {
    console.error("Failed to fetch tags:", tagsError);
    return <div>Error fetching tags data</div>;
  }

  const boards = boardsData.list;
  const boardCount = boardsData.count;
  const tags = tagsData.list;
  const tagCount = tagsData.count;

  return (
    <div>
      <HomapageTitle
        onClick={() => {
          window.location.href = `/`;
        }}
      >
        게시판
      </HomapageTitle>
      <LoginSection isLogin={isLogin} handleLogout={handleLogout} />
      <BoardList
        boards={boards}
        boardCount={boardCount}
        newBoardTitle={newBoardTitle}
        setNewBoardTitle={setNewBoardTitle}
        handleCreateNewBoard={handleCreateNewBoard}
        handleDeleteBoard={handleDeleteBoard}
      />
      <Outlet />
      <TagList tags={tags} tagCount={tagCount} />
      <AuthTest />
    </div>
  );
};

export default HomePage;
