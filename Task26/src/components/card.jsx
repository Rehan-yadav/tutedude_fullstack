import React from "react";
import "./Card.css";

function Card({ cards }) {
  return (
    <div className="card-container">
      {cards.map((item) => (
        <div className="gradient-border" key={item.id}>
          <div className="card">
            <img src={item.image} alt={item.title} />

            <h2>{item.title}</h2>

            <p>{item.description}</p>

            <button>Learn More</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
