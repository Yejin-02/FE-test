import styled from "styled-components";

const BoardItem = styled.div`
  background-color: beige;
  text-decoration: none;

  border-radius: 10px;
  border: 0;
  box-shadow: 5px 5px 5px rgb(100, 100, 100);

  height: 50px;
  width: 1000px;
  margin-top: 10px;

  text-align: center;
  align-content: center;

  font-weight: bold;
  font-size: large;

  &:hover {
    background-color: bisque;
  }
`;

export default BoardItem;
