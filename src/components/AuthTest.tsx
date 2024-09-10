import { authTestClient } from "src/api/axiosInstance";

const AuthTest = () => {
  const handleTestRequest = async () => {
    try {
      await authTestClient.get("/test-endpoint");
    } catch (error) {
      // 오류가 발생하면 여기서 처리
      console.error("요청 오류:", error);
    }
  };

  return (
    <div>
      <button onClick={handleTestRequest}>테스트 요청 보내기</button>
    </div>
  );
};

export default AuthTest;
