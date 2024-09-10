import { LoginButton, LoginLink, LoginWrapper } from "src/styledComponents";

type LoginSectionProps = {
  isLogin: boolean;
  handleLogout: (event: React.FormEvent) => void;
};

const LoginSection = ({ isLogin, handleLogout }: LoginSectionProps) => {
  return (
    <>
      {isLogin ? (
        <LoginWrapper>
          <LoginLink to={"/create-post"}>글 쓰러 가기</LoginLink>
          <LoginLink to={"/profile"}>프로필 보기</LoginLink>
          <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
        </LoginWrapper>
      ) : (
        <LoginWrapper>
          <LoginLink to={"/login"}>로그인</LoginLink>
          <LoginLink to={"/sign-up"}>회원 가입</LoginLink>
        </LoginWrapper>
      )}
    </>
  );
};

export default LoginSection;
