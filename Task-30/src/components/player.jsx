import React from "react";

function PlayerTimer({ player, time, isActive }) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className={`player-timer ${isActive ? "active-timer" : ""} ${time <= 60 ? "low-time" : ""}`}>
      <div className="timer-player">
        {player === "white" ? "♔" : "♚"}
        <span>{player === "white" ? "White" : "Black"}</span>
      </div>

      <div className="timer-display">
        {formattedTime}
      </div>

      <div className="timer-status">
        {isActive ? "Playing" : "Waiting"}
      </div>
    </div>
  );
}

export default PlayerTimer;
