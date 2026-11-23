import React from "react";

function GameControl({
  onUndo,
  onRestart,
  onNewGame,
  canUndo,
  gameOver
}) {
  return (
    <div className="game-control">
      <button
        className="undo-button"
        onClick={onUndo}
        disabled={!canUndo || gameOver}
      >
        ↶ Undo Move
      </button>

      <button
        className="restart-button"
        onClick={onRestart}
      >
        ↻ Restart Game
      </button>

      <button
        className="new-game-button"
        onClick={onNewGame}
      >
        + New Game
      </button>
    </div>
  );
}

export default GameControl;
