import { useState } from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [userPWcheck, setUserPWcheck] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <form
          onSubmit={() => {
            console.log("good");
          }}
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <h3>회원 가입</h3>
          ID
          <input
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            placeholder="ID"
            required
            style={{ marginBottom: "20px" }}
          />
          비밀번호
          <input
            type="password"
            value={userPW}
            onChange={(e) => setUserPW(e.target.value)}
            placeholder="Password"
            required
            style={{ marginBottom: "20px" }}
          />
          비밀번호 확인
          <input
            type="password"
            value={userPWcheck}
            onChange={(e) => setUserPWcheck(e.target.value)}
            placeholder="Password Check"
            required
            style={{ marginBottom: "20px" }}
          />
          이름
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Name"
            required
            style={{ marginBottom: "20px" }}
          />
          Email
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Email"
            required
            style={{ marginBottom: "20px" }}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
