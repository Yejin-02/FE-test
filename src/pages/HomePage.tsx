import { useState } from "react";
import { Link } from "react-router-dom";
import BoardItem from "src/components/BoardItem.tsx";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <h1>HomePage</h1>
      <button
        onClick={() => {
          setIsLogin(!isLogin);
        }}
      >
        클릭하여 로그인 여부 변경. 현재 상태는{" "}
        {isLogin ? "로그인 됨" : "로그인 안 됨"}
      </button>
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
        <h3>전체 글 목록</h3>
        <Link to={`/post-detail/firstItem`}>
          <BoardItem id={"firstItem"}>1번 아이템</BoardItem>
        </Link>
        <Link to={`/post-detail/secondItem`}>
          <BoardItem id={"secondItem"}>2번 아이템</BoardItem>
        </Link>
        <Link to={`/post-detail/thirdItem`}>
          <BoardItem id={"thirdItem"}>3번 아이템</BoardItem>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
