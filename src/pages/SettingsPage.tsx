import { useState } from "react";
import { PagesWrapper, RedirectHome } from "src/styledComponents";

const SettingsPage = () => {
  const [userPW, setUserPW] = useState("userPW");
  const [newUserPW, setNewUserPW] = useState("");
  const [userPWcheck, setUserPWcheck] = useState("");

  return (
    <PagesWrapper>
      <RedirectHome to="/">{"< 홈 화면으로 돌아가기"}</RedirectHome>
      <h1>Settings Page</h1>
      <div>
        <form
          onSubmit={() => {
            console.log("good");
          }}
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <h3>비밀번호 변경</h3>
          기존 비밀번호
          <input
            type="password"
            onChange={(e) => setUserPW(e.target.value)}
            required
            style={{ marginBottom: "20px" }}
          />
          새 비밀번호
          <input
            type="password"
            value={newUserPW}
            onChange={(e) => setNewUserPW(e.target.value)}
            placeholder="새 비밀번호"
            required
            style={{ marginBottom: "20px" }}
          />
          새 비밀번호 확인
          <input
            type="password"
            value={userPWcheck}
            onChange={(e) => setUserPWcheck(e.target.value)}
            placeholder="새 비밀번호 확인"
            required
            style={{ marginBottom: "20px" }}
          />
          <button type="submit">변경</button>
        </form>
        <button style={{ width: "300px", marginTop: "20px" }}>회원 탈퇴</button>
      </div>
    </PagesWrapper>
  );
};

export default SettingsPage;
