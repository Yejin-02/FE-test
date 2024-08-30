import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getBoards } from "src/api/board";
import { useAuth } from "src/contexts/AuthContext";
import { BoardSummaryDto } from "src/types";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [boards, setBoards] = useState([]);
  const [boardCount, setBoardCount] = useState(0);
  const { token, logout } = useAuth();

  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault();
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
    }
  };

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await getBoards();
        setBoards(data.list);
        setBoardCount(data.count);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchBoards();
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
      <button>로그인 여부: {isLogin ? "로그인 됨" : "로그인 안 됨"}</button>
      <br />

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
                <Link to={`/boards/${board.id}`} key={board.id}>
                  <li>{board.title}</li>
                </Link>
              ))}
            </ul>
          )}
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
