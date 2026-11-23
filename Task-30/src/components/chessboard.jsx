import React from "react";
import ChessPiece from "./chesspiece";

import {
  findKing,
  isKingInCheck
} from "../logic/chessdetection";

function ChessBoard({
  board,
  selectedSquare,
  legalMoves,
  onSquareClick,
  lastMove
}) {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const getCheckedKingPosition = () => {
    for (const color of ["w", "b"]) {
      if (isKingInCheck(board, color)) {
        return findKing(board, color);
      }
    }

    return null;
  };

  const checkedKing = getCheckedKingPosition();

  return (
    <div className="board-container">
      <div className="chessboard">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const isLightSquare =
              (rowIndex + colIndex) % 2 === 0;

            const isSelected =
              selectedSquare &&
              selectedSquare.row === rowIndex &&
              selectedSquare.col === colIndex;

            const isLegalMove = legalMoves.some(
              move =>
                move.row === rowIndex &&
                move.col === colIndex
            );

            const isLastMoveFrom =
              lastMove &&
              lastMove.from &&
              lastMove.from.row === rowIndex &&
              lastMove.from.col === colIndex;

            const isLastMoveTo =
              lastMove &&
              lastMove.to &&
              lastMove.to.row === rowIndex &&
              lastMove.to.col === colIndex;

            const isCheckedKing =
              checkedKing &&
              checkedKing.row === rowIndex &&
              checkedKing.col === colIndex;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  chess-square
                  ${isLightSquare ? "light-square" : "dark-square"}
                  ${isSelected ? "selected-square" : ""}
                  ${isLegalMove ? "legal-move" : ""}
                  ${isLastMoveFrom ? "last-move-from" : ""}
                  ${isLastMoveTo ? "last-move-to" : ""}
                  ${isCheckedKing ? "check-square" : ""}
                `}
                onClick={() =>
                  onSquareClick(rowIndex, colIndex)
                }
              >
                {colIndex === 0 && (
                  <span className="coordinate rank-coordinate">
                    {8 - rowIndex}
                  </span>
                )}

                {rowIndex === 7 && (
                  <span className="coordinate file-coordinate">
                    {files[colIndex]}
                  </span>
                )}

                <ChessPiece piece={piece} />

                {isLegalMove && !piece && (
                  <div className="legal-move-dot"></div>
                )}

                {isLegalMove && piece && (
                  <div className="capture-indicator"></div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ChessBoard;
