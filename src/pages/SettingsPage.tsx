import { useState } from "react";

const SettingsPage = () => {
  const [userID, setUserID] = useState("userID");
  const [userPW, setUserPW] = useState("userPW");
  const [userPWcheck, setUserPWcheck] = useState("userPWcheck");
  const [userName, setUserName] = useState("userName");
  const [userEmail, setUserEmail] = useState("userEmail");

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <form
          onSubmit={() => {
            console.log("good");
          }}
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <h3>계정 설정</h3>
          ID
          <input
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            placeholder={userID}
            required
            style={{ marginBottom: "20px" }}
          />
          비밀번호
          <input
            type="password"
            value={userPW}
            onChange={(e) => setUserPW(e.target.value)}
            placeholder={userPW}
            required
            style={{ marginBottom: "20px" }}
          />
          비밀번호 확인
          <input
            type="password"
            value={userPWcheck}
            onChange={(e) => setUserPWcheck(e.target.value)}
            placeholder={userPWcheck}
            required
            style={{ marginBottom: "20px" }}
          />
          이름
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={userName}
            required
            style={{ marginBottom: "20px" }}
          />
          Email
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder={userEmail}
            required
            style={{ marginBottom: "20px" }}
          />
          <button type="submit">변경</button>
        </form>
        <button style={{ width: "300px", marginTop: "20px" }}>회원 탈퇴</button>
      </div>
    </div>
  );
};

export default SettingsPage;
