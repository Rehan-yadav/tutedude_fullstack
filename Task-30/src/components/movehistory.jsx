import React from "react";

function MoveHistory({ moves }) {
  return (
    <div className="move-history">
      <h3>Move History</h3>

      <div className="history-header">
        <span>No.</span>
        <span>White</span>
        <span>Black</span>
      </div>

      <div className="history-list">
        {moves.length === 0 ? (
          <p className="empty-history">No moves yet</p>
        ) : (
          moves.map(move => (
            <div className="history-row" key={move.number}>
              <span>{move.number}.</span>
              <span>{move.white || "-"}</span>
              <span>{move.black || "-"}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MoveHistory;
