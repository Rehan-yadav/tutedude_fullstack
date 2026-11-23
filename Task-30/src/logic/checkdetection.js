import getValidMoves from "./movevalidation";

export function findKing(board, color) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === color + "k") {
        return { row, col };
      }
    }
  }

  return null;
}

export function isSquareAttacked(board, row, col, attackerColor) {
  const pawnDirection = attackerColor === "w" ? -1 : 1;

  for (const dc of [-1, 1]) {
    const r = row - pawnDirection;
    const c = col + dc;

    if (
      r >= 0 &&
      r < 8 &&
      c >= 0 &&
      c < 8 &&
      board[r][c] === attackerColor + "p"
    ) {
      return true;
    }
  }

  const knightMoves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1]
  ];

  for (const [dr, dc] of knightMoves) {
    const r = row + dr;
    const c = col + dc;

    if (
      r >= 0 &&
      r < 8 &&
      c >= 0 &&
      c < 8 &&
      board[r][c] === attackerColor + "n"
    ) {
      return true;
    }
  }

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;

      const r = row + dr;
      const c = col + dc;

      if (
        r >= 0 &&
        r < 8 &&
        c >= 0 &&
        c < 8 &&
        board[r][c] === attackerColor + "k"
      ) {
        return true;
      }
    }
  }

  const directions = [
    [1, 0, ["r", "q"]],
    [-1, 0, ["r", "q"]],
    [0, 1, ["r", "q"]],
    [0, -1, ["r", "q"]],
    [1, 1, ["b", "q"]],
    [1, -1, ["b", "q"]],
    [-1, 1, ["b", "q"]],
    [-1, -1, ["b", "q"]]
  ];

  for (const [dr, dc, types] of directions) {
    let r = row + dr;
    let c = col + dc;

    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
      const piece = board[r][c];

      if (piece) {
        if (
          piece[0] === attackerColor &&
          types.includes(piece[1])
        ) {
          return true;
        }

        break;
      }

      r += dr;
      c += dc;
    }
  }

  return false;
}

export function isKingInCheck(board, color) {
  const king = findKing(board, color);

  if (!king) return false;

  const enemy = color === "w" ? "b" : "w";

  return isSquareAttacked(
    board,
    king.row,
    king.col,
    enemy
  );
}

export function getLegalMoves(board, row, col, gameState = {}) {
  const piece = board[row][col];

  if (!piece) return [];

  const color = piece[0];
  const enemy = color === "w" ? "b" : "w";

  const validMoves = getValidMoves(
    board,
    row,
    col,
    gameState
  );

  return validMoves.filter(move => {
    const newBoard = board.map(r => [...r]);

    newBoard[move.row][move.col] = piece;
    newBoard[row][col] = null;

    if (move.enPassant) {
      const direction = color === "w" ? -1 : 1;
      newBoard[move.row - direction][move.col] = null;
    }

    if (move.castling) {
      const rookFrom = move.castling === "kingSide" ? 7 : 0;
      const rookTo = move.castling === "kingSide" ? 5 : 3;

      newBoard[move.row][rookTo] = newBoard[move.row][rookFrom];
      newBoard[move.row][rookFrom] = null;

      if (isKingInCheck(board, color)) {
        return false;
      }

      const transitBoard = board.map(r => [...r]);

      transitBoard[row][col] = null;
      transitBoard[row][move.castling === "kingSide" ? 5 : 3] = piece;

      if (
        isSquareAttacked(
          transitBoard,
          row,
          move.castling === "kingSide" ? 5 : 3,
          enemy
        )
      ) {
        return false;
      }
    }

    return !isKingInCheck(newBoard, color);
  });
}

export function getAllLegalMoves(board, color, gameState = {}) {
  const allMoves = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];

      if (piece && piece[0] === color) {
        const moves = getLegalMoves(
          board,
          row,
          col,
          gameState
        );

        allMoves.push(...moves);
      }
    }
  }

  return allMoves;
}

export function isCheckmate(board, color, gameState = {}) {
  return (
    isKingInCheck(board, color) &&
    getAllLegalMoves(board, color, gameState).length === 0
  );
}

export function isStalemate(board, color, gameState = {}) {
  return (
    !isKingInCheck(board, color) &&
    getAllLegalMoves(board, color, gameState).length === 0
  );
}

export function isInsufficientMaterial(board) {
  const pieces = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];

      if (piece && piece[1] !== "k") {
        pieces.push({
          type: piece[1],
          row,
          col,
          color: (row + col) % 2
        });
      }
    }
  }

  if (pieces.length === 0) {
    return true;
  }

  if (pieces.length === 1) {
    return ["b", "n"].includes(pieces[0].type);
  }

  if (
    pieces.length === 2 &&
    pieces.every(piece => piece.type === "b")
  ) {
    return pieces[0].color === pieces[1].color;
  }

  return false;
}
