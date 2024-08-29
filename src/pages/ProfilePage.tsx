import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BoardItem from "src/components/BoardItem.tsx";
import { useAuth } from "src/contexts/AuthContext";

const ProfilePage = () => {
  const { token } = useAuth();
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

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <h3>내 프로필</h3>
        <Link to="/user-settings">
          <button>비밀번호 변경</button>
        </Link>
        <button>회원탈퇴</button>
      </div>
      <div>
        <h3>내가 쓴 글</h3>
        <BoardItem>1번</BoardItem>
        <BoardItem>2번</BoardItem>
        <BoardItem>3번</BoardItem>
      </div>
    </div>
  );
};

export default ProfilePage;
