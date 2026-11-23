import React from "react";

const pieces = {
  wp: "♙",
  wr: "♖",
  wn: "♘",
  wb: "♗",
  wq: "♕",
  wk: "♔",

  bp: "♟",
  br: "♜",
  bn: "♞",
  bb: "♝",
  bq: "♛",
  bk: "♚"
};

function ChessPiece({ piece }) {
  if (!piece) return null;

  return (
    <div className={`chess-piece ${piece[0] === "w" ? "white-piece" : "black-piece"}`}>
      {pieces[piece]}
    </div>
  );
}

export default ChessPiece;
