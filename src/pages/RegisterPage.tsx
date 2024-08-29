import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { register } from "../api/auth";

const RegisterPage = () => {
  const [userNickname, setUserNickname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPW, setUserPW] = useState("");
  const [userPWcheck, setUserPWcheck] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation(
    () => register(userNickname, userEmail, userPW),
    {
      onSuccess: () => {
        navigate("/"); // 회원가입 후 홈으로 이동
      },
      onError: (error: any) => {
        console.error("회원가입 오류:", error);
        alert(`회원가입 실패: ${error.message}`);
      },
    },
  );

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <h3>회원 가입</h3>
          이름
          <input
            type="text"
            value={userNickname}
            onChange={(e) => setUserNickname(e.target.value)}
            placeholder="Nickname"
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
