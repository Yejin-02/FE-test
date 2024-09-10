import { Link } from "react-router-dom";
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
  return (
    <nav>
      {boardCount === 0 ? (
        <ul>
          <Link to={`/`}>
            <li>전체 게시판</li>
          </Link>
        </ul>
      ) : (
        <ul>
          <Link to={`/`}>
            <li>전체 게시판</li>
          </Link>
          {boards.map((board: BoardSummaryDto) => (
            <div key={board.id}>
              <Link to={`/boards/${board.id}`}>
                <li>{board.title}</li>
              </Link>
              <button onClick={() => handleDeleteBoard(board.id)}>
                게시판 삭제
              </button>
            </div>
          ))}
        </ul>
      )}
      <div>
        새 게시판 추가
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
          생성
        </button>
      </div>
    </nav>
  );
};

export default BoardList;
