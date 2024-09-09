import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, Outlet } from "react-router-dom";
import { createBoard, deleteBoardById, getBoards } from "src/api/board";
import { getAllTags } from "src/api/tag";
import { useAuth } from "src/contexts/AuthContext";
import { BoardSummaryDto, TagDto } from "src/types";

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
    return <div>Loading...</div>;
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
      <h1>HomePage</h1>
      {isLogin ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <Link to={"/create-post"}>
            <button>글 쓰러 가기</button>
          </Link>
          <Link to={"/profile"}>
            <button>프로필 보기</button>
          </Link>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <Link to={"/login"}>
            <button>로그인</button>
          </Link>
          <Link to={"/sign-up"}>
            <button>회원 가입</button>
          </Link>
        </div>
      )}

      <div>
        <Link to="/search">제목으로 검색하러 가기</Link>
        <nav>
          {boardCount === 0 ? (
            <ul>
              <Link to={`/`}>
                <li>전체 게시판</li>
              </Link>
            </ul>
          ) : (
            <ul>
              <Link to={`/`}>
                <li>전체 게시판</li>
              </Link>
              {boards.map((board: BoardSummaryDto) => (
                <>
                  <Link to={`/boards/${board.id}`} key={board.id}>
                    <li>{board.title}</li>
                  </Link>
                  <button onClick={() => handleDeleteBoard(board.id)}>
                    게시판 삭제
                  </button>
                </>
              ))}
            </ul>
          )}
          <div>
            새 게시판 추가
            <input
              type="text"
              placeholder="새 게시판 이름"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              required
            ></input>
            <button
              onClick={() => {
                handleCreateNewBoard(newBoardTitle);
              }}
            >
              생성
            </button>
          </div>
        </nav>
        <Outlet />
        <div>
          <h3>모든 태그 보기</h3>
          {tagCount === 0 ? (
            <p>태그 없음</p>
          ) : (
            tags.map((tag: TagDto) => (
              <>
                <Link to={`/tags/${tag.key}`} key={tag.key}>
                  <li>{tag.key}</li>
                </Link>
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
