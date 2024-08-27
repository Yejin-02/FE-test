import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Post Detail</h1>
      <Link to="/">
        <button>뒤로 가기</button>
      </Link>
      <p>post ID: {id}</p>
      <button>삭제하기</button>
    </div>
  );
};

export default PostDetail;
