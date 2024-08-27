import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");

  return (
    <div>
      <h1>Login</h1>
      <div>
        <form
          onSubmit={() => {
            console.log("good");
          }}
        >
          <h3>로그인</h3>
          <input
            type="userId"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            placeholder="ID"
            required
          />
          <input
            type="password"
            value={userPW}
            onChange={(e) => setUserPW(e.target.value)}
            placeholder="Password"
            required
          />
          <input type="checkbox" /> 로그인 정보 저장
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
