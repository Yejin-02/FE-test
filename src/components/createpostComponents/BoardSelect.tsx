import React from "react";
import { BoardSummaryDto } from "src/types";

type BoardSelectProps = {
  boards: BoardSummaryDto[];
  selectedBoardID: string;
  onSelectBoard: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const BoardSelect: React.FC<BoardSelectProps> = ({
  boards,
  selectedBoardID,
  onSelectBoard,
}) => (
  <select id="board-select" value={selectedBoardID} onChange={onSelectBoard}>
    {boards.map((board) => (
      <option key={board.id} value={board.id}>
        {board.title}
      </option>
    ))}
  </select>
);

export default BoardSelect;
