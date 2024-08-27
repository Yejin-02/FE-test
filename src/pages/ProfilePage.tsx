import { Link } from "react-router-dom";
import BoardItem from "src/components/BoardItem.tsx";

const ProfilePage = () => {
  return (
    <div>
      <h1>Profile</h1>
      <div>
        <h3>내 프로필</h3>
        홍길동
        <Link to="/user-settings">
          <button>계정 설정</button>
        </Link>
        <button>로그아웃</button>
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
