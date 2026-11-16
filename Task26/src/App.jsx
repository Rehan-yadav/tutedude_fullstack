import React from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const cardData = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    title: `Card ${index + 1}`,
    description: `This is card ${index + 1} description`,
    image: `https://picsum.photos/200?random=${index + 1}`
  }));

  return (
    <div className="app">
      <h1>All the cards are here</h1>
      <Card cards={cardData} />
    </div>
  );
}

export default App;
