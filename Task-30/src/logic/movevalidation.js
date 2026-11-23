function isInsideBoard(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function getValidMoves(board, row, col, gameState = {}) {
  const piece = board[row][col];

  if (!piece) return [];

  const color = piece[0];
  const type = piece[1];
  const enemy = color === "w" ? "b" : "w";

  const moves = [];

  const addMove = (r, c, extra = {}) => {
    if (!isInsideBoard(r, c)) return;

    const target = board[r][c];

    if (!target || (target[0] === enemy && target[1] !== "k")) {
      moves.push({ row: r, col: c, ...extra });
    }
  };

  if (type === "p") {
    const direction = color === "w" ? -1 : 1;
    const startRow = color === "w" ? 6 : 1;

    if (
      isInsideBoard(row + direction, col) &&
      !board[row + direction][col]
    ) {
      moves.push({ row: row + direction, col });

      if (
        row === startRow &&
        !board[row + direction * 2][col]
      ) {
        moves.push({ row: row + direction * 2, col });
      }
    }

    for (const dc of [-1, 1]) {
      const r = row + direction;
      const c = col + dc;

      if (
        isInsideBoard(r, c) &&
        board[r][c] &&
        board[r][c][0] === enemy &&
        board[r][c][1] !== "k"
      ) {
        moves.push({ row: r, col: c });
      }

      const enPassantTarget = gameState.enPassantTarget;

      if (
        enPassantTarget &&
        enPassantTarget.row === r &&
        enPassantTarget.col === c &&
        !board[r][c] &&
        board[row][c] === enemy + "p"
      ) {
        moves.push({
          row: r,
          col: c,
          enPassant: true
        });
      }
    }
  }

  if (type === "r" || type === "q") {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ];

    for (const [dr, dc] of directions) {
      let r = row + dr;
      let c = col + dc;

      while (isInsideBoard(r, c)) {
        if (!board[r][c]) {
          moves.push({ row: r, col: c });
        } else {
          if (board[r][c][0] === enemy && board[r][c][1] !== "k") {
            moves.push({ row: r, col: c });
          }
          break;
        }

        r += dr;
        c += dc;
      }
    }
  }

  if (type === "b" || type === "q") {
    const directions = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1]
    ];

    for (const [dr, dc] of directions) {
      let r = row + dr;
      let c = col + dc;

      while (isInsideBoard(r, c)) {
        if (!board[r][c]) {
          moves.push({ row: r, col: c });
        } else {
          if (board[r][c][0] === enemy && board[r][c][1] !== "k") {
            moves.push({ row: r, col: c });
          }
          break;
        }

        r += dr;
        c += dc;
      }
    }
  }

  if (type === "n") {
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
      addMove(row + dr, col + dc);
    }
  }

  if (type === "k") {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr !== 0 || dc !== 0) {
          addMove(row + dr, col + dc);
        }
      }
    }

    const rights = gameState.castlingRights || {};

    if (color === "w" && row === 7 && col === 4) {
      if (
        rights.whiteKingSide &&
        board[7][5] === null &&
        board[7][6] === null &&
        board[7][7] === "wr"
      ) {
        moves.push({
          row: 7,
          col: 6,
          castling: "kingSide"
        });
      }

      if (
        rights.whiteQueenSide &&
        board[7][1] === null &&
        board[7][2] === null &&
        board[7][3] === null &&
        board[7][0] === "wr"
      ) {
        moves.push({
          row: 7,
          col: 2,
          castling: "queenSide"
        });
      }
    }

    if (color === "b" && row === 0 && col === 4) {
      if (
        rights.blackKingSide &&
        board[0][5] === null &&
        board[0][6] === null &&
        board[0][7] === "br"
      ) {
        moves.push({
          row: 0,
          col: 6,
          castling: "kingSide"
        });
      }

      if (
        rights.blackQueenSide &&
        board[0][1] === null &&
        board[0][2] === null &&
        board[0][3] === null &&
        board[0][0] === "br"
      ) {
        moves.push({
          row: 0,
          col: 2,
          castling: "queenSide"
        });
      }
    }
  }

  return moves;
}

export default getValidMoves;
