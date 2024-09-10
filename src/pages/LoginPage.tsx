import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { login } from "../api/auth";
import { useAuth } from "../contexts/AuthContext.tsx";

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPW, setUserPW] = useState("");
  const { token, setToken, setExpiresIn } = useAuth();
  const navigate = useNavigate();

  const refreshToken = localStorage.getItem("refreshToken");

  const mutation = useMutation(() => login(userEmail, userPW), {
    onSuccess: (data) => {
      const getCurrentTime = () => new Date().getTime();
      setExpiresIn((getCurrentTime() + data.expiresIn * 1000).toString());
      setToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/"); // 로그인 후 홈으로 이동
    },
    onError: (error: any) => {
      console.error("로그인 오류:", error);
      alert(`로그인 실패: ${error.message}`);
    },
  });

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleLogin}>
          <h3>로그인</h3>
          <input
            type="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Email"
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
      <h3>accessToken</h3>
      {token ? <p>{token}</p> : <p>없다</p>}
      <h3>refreshToken</h3>
      {refreshToken ? <p>{refreshToken}</p> : <p>없다</p>}
    </div>
  );
};

export default LoginPage;
