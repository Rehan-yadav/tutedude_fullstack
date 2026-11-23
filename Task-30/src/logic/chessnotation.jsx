const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

const pieceSymbols = {
  p: "",
  r: "R",
  n: "N",
  b: "B",
  q: "Q",
  k: "K"
};

export function getSquareName(row, col) {
  return files[col] + (8 - row);
}

export function getMoveNotation(
  movingPiece,
  fromRow,
  fromCol,
  toRow,
  toCol,
  capturedPiece,
  specialMove
) {
  if (specialMove === "kingSide") {
    return "O-O";
  }

  if (specialMove === "queenSide") {
    return "O-O-O";
  }

  const pieceSymbol = pieceSymbols[movingPiece[1]];
  const destination = getSquareName(toRow, toCol);

  const isCapture =
    Boolean(capturedPiece) || specialMove === "enPassant";

  if (movingPiece[1] === "p" && isCapture) {
    return `${files[fromCol]}x${destination}`;
  }

  return `${pieceSymbol}${isCapture ? "x" : ""}${destination}`;
}

export function getPromotionNotation(notation, pieceType) {
  return `${notation}=${pieceSymbols[pieceType]}`;
}

export function getCheckNotation(notation) {
  return `${notation}+`;
}

export function getCheckmateNotation(notation) {
  return `${notation}#`;
}
