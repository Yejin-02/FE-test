import { Link } from "react-router-dom";
import styled from "styled-components";

// main.tsx에서 적용되는 가장 큰 단위 래퍼
export const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  overflow: scroll;

  background-color: black;
  color: white;
`;

// 스크롤 처리
export const MainContainer = styled.div`
  width: 1000px;
  height: 100%;
`;

// 홈페이지 타이틀
export const HomapageTitle = styled.div`
  margin-top: 10px;
  width: 1000px;
  height: 100px;
  border-radius: 15px;
  background-color: aliceblue;
  color: black;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 30px;
  font-weight: bold;
`;

// LoginSection.tsx 래퍼
export const LoginWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: 10px;
`;

// LoginSection.tsx 아이템 - 링크
export const LoginLink = styled(Link)`
  color: black;
  text-decoration: none;
  background-color: aliceblue;
  border-radius: 10px;

  display: block;
  width: 150px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-left: 10px;

  &:hover {
    background-color: aqua;
  }
`;

// LoginSection.tsx 아이템 - 버튼
export const LoginButton = styled.div`
  color: black;
  text-decoration: none;
  background-color: aliceblue;
  border-radius: 10px;

  width: 150px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-left: 10px;

  &:hover {
    background-color: aqua;
  }
`;

// BoardList.tsx <ul>
export const BoardListUl = styled.ul`
  width: 1000px;
  list-style: none;
  padding: 0;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

// BoardList.tsx <Link>
export const BoardListLi = styled(Link)`
  background-color: white;
  border-radius: 10px;
  color: black;
  text-decoration: none;

  display: flex;
  flex-direction: row;
  align-items: center;

  width: auto;
  height: 35px;
  padding: 0 10px 0 10px;
  margin-right: 10px;
  margin-bottom: 10px;

  &:hover {
    background-color: aqua;
    color: black;
  }
`;

// selected면 가중 치 주기
export const SelectedBoardListLi = styled(BoardListLi)`
  background-color: #bb0000; // 선택된 게시판의 배경색
  color: white;
`;

// BoardList.tsx 게시판 삭제 버튼
export const BoardDeleteButton = styled.button`
  margin-left: 8px;
  border-radius: 100%;
  width: 25px;
  height: 25px;

  background-color: gray;
  color: white;
  border: 0;

  &:hover {
    color: white;
    background-color: black;
  }
`;

// 새 게시판 생성 래퍼
export const AddNewBoard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;

  input {
    height: 40px;
    width: 200px; /* 너비를 추가하여 입력 필드가 더 명확하게 보이도록 */

    margin-right: 10px;
    padding-left: 10px;
  }

  button {
    height: 50px;

    border-radius: 10px;
    width: 120px; /* 버튼의 너비를 조정하여 더 안정적인 레이아웃 */

    background-color: beige;
    color: black;
    cursor: pointer;

    &:hover {
      background-color: aqua;
    }
  }
`;

// 게시판의 모든 글을 보여주는 리스트의 래퍼
export const BoardWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// 게시판, 검색 결과 등에서 볼 수 있는 게시글 목록의 아이템
export const BoardItem = styled(Link)`
  display: block;
  padding: 0;
  margin: 0;

  background-color: white;
  text-decoration: none;
  color: black;

  border-radius: 10px;
  box-shadow: 5px 5px 5px rgb(100, 100, 100);

  height: 40px;
  width: 1000px;
  margin-bottom: 10px;

  text-align: center;
  align-content: center;

  &:hover {
    background-color: aqua;
  }
`;

// TagList.tsx <ul>
export const TagListUl = styled.ul`
  width: 1000px;
  list-style: none;
  padding: 0;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

// TagList.tsx <Link>
export const TagListLi = styled(Link)`
  background-color: white;
  border-radius: 10px;
  color: black;
  text-decoration: none;

  display: flex;
  flex-direction: row;
  align-items: center;

  width: auto;
  height: 35px;
  padding: 0 10px 0 10px;
  margin-right: 10px;
  margin-bottom: 10px;

  &:hover {
    background-color: aqua;
    color: black;
  }
`;
