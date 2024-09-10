import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/contexts/AuthContext";
import {
  PagesWrapper,
  ProfilePageLink,
  RedirectHome,
} from "src/styledComponents";

const ProfilePage = () => {
  const { token, expiresIn } = useAuth();
  //   const [ userNickname, setUserNickname ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // const nickname = 회원 정보 가져오기
      // setUserNickname(nickname);
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [navigate, token]);

  const refreshToken = localStorage.getItem("refreshToken");

  return (
    <PagesWrapper>
      <RedirectHome to="/">{"< 홈 화면으로 돌아가기"}</RedirectHome>
      <h1>Profile</h1>
      <div>
        <h3>내 프로필</h3>
        <h3>accessToken</h3>
        {token ? <p>{token}</p> : <p>없다</p>}
        <h3>refreshToken</h3>
        {refreshToken ? <p>{refreshToken}</p> : <p>없다</p>}
        <h3>expiresIn</h3>
        {expiresIn ? <p>{expiresIn}</p> : <p>없다</p>}
        <h3>현재 날짜</h3>
        <p>{new Date().getTime()}</p>
        <br />
        <ProfilePageLink to="/user-settings">비밀번호 변경</ProfilePageLink>
        <ProfilePageLink to="/user-settings">회원탈퇴</ProfilePageLink>
      </div>
    </PagesWrapper>
  );
};

export default ProfilePage;
