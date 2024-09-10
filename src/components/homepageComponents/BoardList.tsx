import { useParams } from "react-router-dom";
import {
  AddNewBoard,
  BoardDeleteButton,
  BoardListLi,
  BoardListUl,
  SelectedBoardListLi,
} from "src/styledComponents";
import { BoardSummaryDto } from "src/types";

type BoardListProps = {
  boards: BoardSummaryDto[];
  boardCount: number;
  newBoardTitle: string;
  setNewBoardTitle: React.Dispatch<React.SetStateAction<string>>;
  handleCreateNewBoard: (boardTitle: string) => Promise<void>;
  handleDeleteBoard: (boardId: string) => Promise<void>;
};

const BoardList = ({
  boards,
  boardCount,
  newBoardTitle,
  setNewBoardTitle,
  handleCreateNewBoard,
  handleDeleteBoard,
}: BoardListProps) => {
  const { boardUuid } = useParams<{ boardUuid?: string }>();

  return (
    <nav>
      <h3>게시판 목록</h3>
      {boardCount === 0 ? (
        <BoardListUl>
          <BoardListLi to={`/`}>전체 게시판</BoardListLi>
          <BoardListLi to="/search-posts">게시글 검색하러 가기</BoardListLi>
        </BoardListUl>
      ) : (
        <BoardListUl>
          {boards.map((board: BoardSummaryDto) =>
            board.id === boardUuid ? (
              <SelectedBoardListLi to={`/boards/${board.id}`} key={board.id}>
                <p>{board.title}</p>
                <BoardDeleteButton onClick={() => handleDeleteBoard(board.id)}>
                  x
                </BoardDeleteButton>
              </SelectedBoardListLi>
            ) : (
              <BoardListLi to={`/boards/${board.id}`} key={board.id}>
                <p>{board.title}</p>
                <BoardDeleteButton onClick={() => handleDeleteBoard(board.id)}>
                  x
                </BoardDeleteButton>
              </BoardListLi>
            ),
          )}
          {boardUuid === undefined ? (
            <SelectedBoardListLi to={`/`}>전체 게시판</SelectedBoardListLi>
          ) : (
            <BoardListLi to={`/`}>전체 게시판</BoardListLi>
          )}

          <BoardListLi to="/search-posts">게시글 검색하러 가기</BoardListLi>
        </BoardListUl>
      )}
      <AddNewBoard>
        <input
          type="text"
          placeholder="새 게시판 이름"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          required
        ></input>
        <button
          onClick={() => {
            handleCreateNewBoard(newBoardTitle);
          }}
        >
          게시판 생성
        </button>
      </AddNewBoard>
    </nav>
  );
};

export default BoardList;
