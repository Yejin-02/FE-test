import { Link } from "react-router-dom";

type LoginSectionProps = {
  isLogin: boolean;
  handleLogout: (event: React.FormEvent) => void;
};

const LoginSection = ({ isLogin, handleLogout }: LoginSectionProps) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
      }}
    >
      {isLogin ? (
        <>
          <Link to={"/create-post"}>
            <button>글 쓰러 가기</button>
          </Link>
          <Link to={"/profile"}>
            <button>프로필 보기</button>
          </Link>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <Link to={"/login"}>
            <button>로그인</button>
          </Link>
          <Link to={"/sign-up"}>
            <button>회원 가입</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default LoginSection;
