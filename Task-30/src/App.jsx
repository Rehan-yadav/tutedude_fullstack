import React, { useState, useEffect } from "react";

import ChessBoard from "./components/chessboard";
import ChessPiece from "./components/chesspiece";
import MoveHistory from "./components/movehistory";
import GameControl from "./components/gamecontrol";
import PlayerTimer from "./components/playertimer";

import initialBoard from "./logic/initialboard";

import {
  getLegalMoves,
  isKingInCheck,
  isCheckmate,
  isStalemate,
  isInsufficientMaterial
} from "./logic/checkdetection";

import {
  getMoveNotation,
  getPromotionNotation,
  getCheckNotation,
  getCheckmateNotation
} from "./logic/chessnotation";

import "./App.css";

const createInitialCastlingRights = () => ({
  whiteKingSide: true,
  whiteQueenSide: true,
  blackKingSide: true,
  blackQueenSide: true
});

const createPositionKey = (board, turn, rights, enPassant) => {
  const boardKey = board
    .map(row => row.map(piece => piece || "--").join(","))
    .join("/");

  const rightsKey = Object.keys(rights)
    .sort()
    .map(key => (rights[key] ? "1" : "0"))
    .join("");

  const enPassantKey = enPassant
    ? `${enPassant.row},${enPassant.col}`
    : "-";

  return `${boardKey}|${turn}|${rightsKey}|${enPassantKey}`;
};

function App() {
  const [board, setBoard] = useState(
    initialBoard.map(row => [...row])
  );

  const [currentTurn, setCurrentTurn] = useState("w");
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);

  const [message, setMessage] = useState("White's Turn");
  const [gameOver, setGameOver] = useState(false);

  const [castlingRights, setCastlingRights] = useState(
    createInitialCastlingRights()
  );

  const [enPassantTarget, setEnPassantTarget] = useState(null);
  const [pendingPromotion, setPendingPromotion] = useState(null);

  const [moveHistory, setMoveHistory] = useState([]);

  const [whiteTime, setWhiteTime] = useState(600);
  const [blackTime, setBlackTime] = useState(600);

  const [undoStack, setUndoStack] = useState([]);

  const [capturedPieces, setCapturedPieces] = useState({
    white: [],
    black: []
  });

  const [lastMove, setLastMove] = useState(null);

  const [halfMoveClock, setHalfMoveClock] = useState(0);

  const [positionCounts, setPositionCounts] = useState(() => {
    const initialRights = createInitialCastlingRights();

    const initialKey = createPositionKey(
      initialBoard,
      "w",
      initialRights,
      null
    );

    return {
      [initialKey]: 1
    };
  });

  const gameState = {
    castlingRights,
    enPassantTarget
  };

  useEffect(() => {
    if (gameOver || pendingPromotion) return;

    const timer = setInterval(() => {
      if (currentTurn === "w") {
        setWhiteTime(previous => {
          if (previous <= 1) {
            setGameOver(true);
            setMessage("TIME OVER! Black Wins!");
            return 0;
          }

          return previous - 1;
        });
      } else {
        setBlackTime(previous => {
          if (previous <= 1) {
            setGameOver(true);
            setMessage("TIME OVER! White Wins!");
            return 0;
          }

          return previous - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTurn, gameOver, pendingPromotion]);

  const saveUndoState = () => {
    const snapshot = {
      board: board.map(row => [...row]),
      currentTurn,
      castlingRights: { ...castlingRights },

      enPassantTarget: enPassantTarget
        ? { ...enPassantTarget }
        : null,

      moveHistory: moveHistory.map(move => ({ ...move })),

      whiteTime,
      blackTime,

      message,
      gameOver,

      lastMove: lastMove ? { ...lastMove } : null,

      capturedPieces: {
        white: [...capturedPieces.white],
        black: [...capturedPieces.black]
      },

      halfMoveClock,

      positionCounts: { ...positionCounts }
    };

    setUndoStack(previous => [...previous, snapshot]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0 || pendingPromotion) return;

    const previousState = undoStack[undoStack.length - 1];

    setBoard(previousState.board.map(row => [...row]));

    setCurrentTurn(previousState.currentTurn);

    setCastlingRights({
      ...previousState.castlingRights
    });

    setEnPassantTarget(
      previousState.enPassantTarget
        ? { ...previousState.enPassantTarget }
        : null
    );

    setMoveHistory(
      previousState.moveHistory.map(move => ({ ...move }))
    );

    setWhiteTime(previousState.whiteTime);
    setBlackTime(previousState.blackTime);

    setMessage(previousState.message);
    setGameOver(previousState.gameOver);

    setLastMove(
      previousState.lastMove
        ? { ...previousState.lastMove }
        : null
    );

    setCapturedPieces({
      white: [...previousState.capturedPieces.white],
      black: [...previousState.capturedPieces.black]
    });

    setHalfMoveClock(previousState.halfMoveClock);

    setPositionCounts({
      ...previousState.positionCounts
    });

    setSelectedSquare(null);
    setLegalMoves([]);
    setPendingPromotion(null);

    setUndoStack(previous => previous.slice(0, -1));
  };

  const resetGame = () => {
    const initialRights = createInitialCastlingRights();

    setBoard(initialBoard.map(row => [...row]));

    setCurrentTurn("w");

    setSelectedSquare(null);
    setLegalMoves([]);

    setMessage("White's Turn");
    setGameOver(false);

    setCastlingRights(initialRights);

    setEnPassantTarget(null);
    setPendingPromotion(null);

    setMoveHistory([]);

    setWhiteTime(600);
    setBlackTime(600);

    setUndoStack([]);

    setCapturedPieces({
      white: [],
      black: []
    });

    setLastMove(null);

    setHalfMoveClock(0);

    const initialKey = createPositionKey(
      initialBoard,
      "w",
      initialRights,
      null
    );

    setPositionCounts({
      [initialKey]: 1
    });
  };

  const handleRestart = () => {
    const confirmRestart = window.confirm(
      "Are you sure you want to restart the game?"
    );

    if (!confirmRestart) return;

    resetGame();
  };

  const addMoveToHistory = (color, notation) => {
    setMoveHistory(previous => {
      const updated = [...previous];

      if (color === "w") {
        updated.push({
          number: updated.length + 1,
          white: notation,
          black: ""
        });
      } else {
        const last = updated[updated.length - 1];

        if (last && !last.black) {
          updated[updated.length - 1] = {
            ...last,
            black: notation
          };
        } else {
          updated.push({
            number: updated.length + 1,
            white: "",
            black: notation
          });
        }
      }

      return updated;
    });
  };

  const finishTurn = (
    newBoard,
    color,
    rights,
    enPassant,
    notation,
    isPawnMove,
    isCapture
  ) => {
    const nextTurn = color === "w" ? "b" : "w";

    const nextGameState = {
      castlingRights: rights,
      enPassantTarget: enPassant
    };

    const nextHalfMoveClock =
      isPawnMove || isCapture ? 0 : halfMoveClock + 1;

    setHalfMoveClock(nextHalfMoveClock);

    const positionKey = createPositionKey(
      newBoard,
      nextTurn,
      rights,
      enPassant
    );

    const nextPositionCount =
      (positionCounts[positionKey] || 0) + 1;

    const updatedPositionCounts = {
      ...positionCounts,
      [positionKey]: nextPositionCount
    };

    setPositionCounts(updatedPositionCounts);

    let finalNotation = notation;

    if (isCheckmate(newBoard, nextTurn, nextGameState)) {
      finalNotation = getCheckmateNotation(finalNotation);

      addMoveToHistory(color, finalNotation);

      setCurrentTurn(nextTurn);

      setMessage(
        `CHECKMATE! ${color === "w" ? "White" : "Black"} Wins!`
      );

      setGameOver(true);

      return;
    }

    if (isStalemate(newBoard, nextTurn, nextGameState)) {
      addMoveToHistory(color, finalNotation);

      setCurrentTurn(nextTurn);

      setMessage("STALEMATE! The game is a Draw.");

      setGameOver(true);

      return;
    }

    if (isInsufficientMaterial(newBoard)) {
      addMoveToHistory(color, finalNotation);

      setCurrentTurn(nextTurn);

      setMessage("DRAW! Insufficient Material.");

      setGameOver(true);

      return;
    }

    const isCheck = isKingInCheck(newBoard, nextTurn);

    if (isCheck) {
      finalNotation = getCheckNotation(finalNotation);
    }

    addMoveToHistory(color, finalNotation);

    setCurrentTurn(nextTurn);

    if (nextPositionCount >= 3) {
      setMessage("DRAW! Threefold Repetition.");

      setGameOver(true);

      return;
    }

    if (nextHalfMoveClock >= 100) {
      setMessage("DRAW! Fifty-Move Rule.");

      setGameOver(true);

      return;
    }

    if (isCheck) {
      setMessage(
        `CHECK! ${nextTurn === "w" ? "White" : "Black"} King is under attack!`
      );
    } else {
      setMessage(
        `${nextTurn === "w" ? "White" : "Black"}'s Turn`
      );
    }
  };

  const handlePromotion = pieceType => {
    if (!pendingPromotion) return;

    const {
      row,
      col,
      color,
      newBoard,
      newRights,
      newEnPassant,
      notation,
      wasCapture
    } = pendingPromotion;

    const promotedBoard = newBoard.map(r => [...r]);

    promotedBoard[row][col] = color + pieceType;

    const finalNotation = getPromotionNotation(
      notation,
      pieceType
    );

    setBoard(promotedBoard);

    setPendingPromotion(null);

    finishTurn(
      promotedBoard,
      color,
      newRights,
      newEnPassant,
      finalNotation,
      true,
      wasCapture
    );
  };

  const handleSquareClick = (row, col) => {
    if (gameOver || pendingPromotion) return;

    const clickedPiece = board[row][col];

    if (!selectedSquare) {
      if (!clickedPiece) {
        setMessage("Select a chess piece first!");
        return;
      }

      if (clickedPiece[0] !== currentTurn) {
        setMessage("It's not your turn!");
        return;
      }

      const moves = getLegalMoves(
        board,
        row,
        col,
        gameState
      );

      setSelectedSquare({ row, col });
      setLegalMoves(moves);

      setMessage(
        `${currentTurn === "w" ? "White" : "Black"} selected a piece`
      );

      return;
    }

    const {
      row: selectedRow,
      col: selectedCol
    } = selectedSquare;

    if (selectedRow === row && selectedCol === col) {
      setSelectedSquare(null);
      setLegalMoves([]);

      setMessage(
        `${currentTurn === "w" ? "White" : "Black"}'s Turn`
      );

      return;
    }

    if (clickedPiece && clickedPiece[0] === currentTurn) {
      const moves = getLegalMoves(
        board,
        row,
        col,
        gameState
      );

      setSelectedSquare({ row, col });
      setLegalMoves(moves);

      setMessage("Piece selected!");

      return;
    }

    const selectedMove = legalMoves.find(
      move => move.row === row && move.col === col
    );

    if (!selectedMove) {
      setMessage("Illegal move! Your king must remain safe.");
      return;
    }

    saveUndoState();

    const newBoard = board.map(r => [...r]);

    const movingPiece = newBoard[selectedRow][selectedCol];

    const capturedPiece = newBoard[row][col];

    newBoard[row][col] = movingPiece;

    newBoard[selectedRow][selectedCol] = null;

    let actualCapturedPiece = capturedPiece;

    if (selectedMove.enPassant) {
      const direction = currentTurn === "w" ? -1 : 1;

      actualCapturedPiece = newBoard[row - direction][col];

      newBoard[row - direction][col] = null;
    }

    if (actualCapturedPiece) {
      const capturedColor = actualCapturedPiece[0];

      setCapturedPieces(previous => ({
        ...previous,

        [capturedColor === "w" ? "white" : "black"]: [
          ...previous[
            capturedColor === "w" ? "white" : "black"
          ],
          actualCapturedPiece
        ]
      }));
    }

    const newRights = { ...castlingRights };

    if (movingPiece === "wk") {
      newRights.whiteKingSide = false;
      newRights.whiteQueenSide = false;
    }

    if (movingPiece === "bk") {
      newRights.blackKingSide = false;
      newRights.blackQueenSide = false;
    }

    if (
      movingPiece === "wr" &&
      selectedRow === 7 &&
      selectedCol === 0
    ) {
      newRights.whiteQueenSide = false;
    }

    if (
      movingPiece === "wr" &&
      selectedRow === 7 &&
      selectedCol === 7
    ) {
      newRights.whiteKingSide = false;
    }

    if (
      movingPiece === "br" &&
      selectedRow === 0 &&
      selectedCol === 0
    ) {
      newRights.blackQueenSide = false;
    }

    if (
      movingPiece === "br" &&
      selectedRow === 0 &&
      selectedCol === 7
    ) {
      newRights.blackKingSide = false;
    }

    if (
      capturedPiece === "wr" &&
      row === 7 &&
      col === 0
    ) {
      newRights.whiteQueenSide = false;
    }

    if (
      capturedPiece === "wr" &&
      row === 7 &&
      col === 7
    ) {
      newRights.whiteKingSide = false;
    }

    if (
      capturedPiece === "br" &&
      row === 0 &&
      col === 0
    ) {
      newRights.blackQueenSide = false;
    }

    if (
      capturedPiece === "br" &&
      row === 0 &&
      col === 7
    ) {
      newRights.blackKingSide = false;
    }

    if (selectedMove.castling) {
      const rookFrom =
        selectedMove.castling === "kingSide" ? 7 : 0;

      const rookTo =
        selectedMove.castling === "kingSide" ? 5 : 3;

      newBoard[row][rookTo] = newBoard[row][rookFrom];

      newBoard[row][rookFrom] = null;
    }

    let newEnPassant = null;

    if (
      movingPiece[1] === "p" &&
      Math.abs(row - selectedRow) === 2
    ) {
      newEnPassant = {
        row: (row + selectedRow) / 2,
        col
      };
    }

    const notation = getMoveNotation(
      movingPiece,
      selectedRow,
      selectedCol,
      row,
      col,
      actualCapturedPiece,
      selectedMove.castling ||
        (selectedMove.enPassant ? "enPassant" : null)
    );

    setCastlingRights(newRights);
    setEnPassantTarget(newEnPassant);

    setSelectedSquare(null);
    setLegalMoves([]);

    setLastMove({
      from: {
        row: selectedRow,
        col: selectedCol
      },
      to: {
        row,
        col
      }
    });

    const isPromotion =
      movingPiece[1] === "p" &&
      (row === 0 || row === 7);

    if (isPromotion) {
      setBoard(newBoard);

      setPendingPromotion({
        row,
        col,
        color: currentTurn,
        newBoard,
        newRights,
        newEnPassant,
        notation,
        wasCapture: Boolean(actualCapturedPiece)
      });

      setMessage("Choose a piece for pawn promotion!");

      return;
    }

    setBoard(newBoard);

    finishTurn(
      newBoard,
      currentTurn,
      newRights,
      newEnPassant,
      notation,
      movingPiece[1] === "p",
      Boolean(actualCapturedPiece)
    );
  };

  const isDraw =
    message.toLowerCase().includes("draw") ||
    message.toLowerCase().includes("stalemate");

  return (
    <div className="app">
      <div className="game-container">
        <div className="game-header">
          <h1>♟ Offline Chess</h1>
          <p>Two Player Chess Game</p>
        </div>

        <PlayerTimer
          player="black"
          time={blackTime}
          isActive={currentTurn === "b" && !gameOver}
        />

        <div className="turn-message">
          {message}
        </div>

        <div className="draw-counter">
          Moves without pawn move or capture: {halfMoveClock}/100
        </div>

        <ChessBoard
          board={board}
          selectedSquare={selectedSquare}
          legalMoves={legalMoves}
          lastMove={lastMove}
          onSquareClick={handleSquareClick}
        />

        {pendingPromotion && (
          <div className="promotion-panel">
            <h3>Choose Your Promotion</h3>

            <div className="promotion-options">
              {[
                { type: "q", name: "Queen" },
                { type: "r", name: "Rook" },
                { type: "b", name: "Bishop" },
                { type: "n", name: "Knight" }
              ].map(piece => (
                <button
                  key={piece.type}
                  onClick={() => handlePromotion(piece.type)}
                >
                  <ChessPiece
                    piece={pendingPromotion.color + piece.type}
                  />
                  <span>{piece.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <PlayerTimer
          player="white"
          time={whiteTime}
          isActive={currentTurn === "w" && !gameOver}
        />

        <div className="captured-container">
          <div className="captured-section">
            <h3>Captured White Pieces</h3>

            <div className="captured-list">
              {capturedPieces.white.length === 0 ? (
                <span className="no-captured">
                  No pieces captured
                </span>
              ) : (
                capturedPieces.white.map((piece, index) => (
                  <ChessPiece
                    key={index}
                    piece={piece}
                  />
                ))
              )}
            </div>
          </div>

          <div className="captured-section">
            <h3>Captured Black Pieces</h3>

            <div className="captured-list">
              {capturedPieces.black.length === 0 ? (
                <span className="no-captured">
                  No pieces captured
                </span>
              ) : (
                capturedPieces.black.map((piece, index) => (
                  <ChessPiece
                    key={index}
                    piece={piece}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <GameControl
          onUndo={handleUndo}
          onRestart={handleRestart}
          onNewGame={resetGame}
          canUndo={undoStack.length > 0 && pendingPromotion === null}
          gameOver={gameOver}
        />

        <MoveHistory moves={moveHistory} />
      </div>

      {gameOver && (
        <div className="result-overlay">
          <div className="result-card">
            <div className="result-icon">
              {isDraw ? "🤝" : "🏆"}
            </div>

            <h1>GAME OVER</h1>

            <p className="result-message">
              {message}
            </p>

            <button
              className="play-again-button"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
