import React from "react";
import Board from "./Board";
import './index.css';

function App() {
  return (
    <div className="game">
      <h1 className="game-title">Крестики-Нолики</h1>
      <Board />
    </div>
  );
}

export default App;