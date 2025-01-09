import React, { useState } from "react";
import Square from "./Square";
import './Board.css';

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        } 
        const newSquares = squares.slice();
        newSquares[i] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);
    }

    function renderSquare(i, isWinning) {
        return (
            <Square 
                value={squares[i]} 
                onClick={() => handleClick(i)}
                isWinning={isWinning}
            />
        );
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], line: [a, b, c] };
            }
        }
        return null;
    }

    const result = calculateWinner(squares);
    const isBoardFull = squares.every(square => square !== null);

    let status;
    let winningLine = [];
    if (result) {
        status = `Победитель: ${result.winner}`;
        winningLine = result.line;
    } else if (isBoardFull) {
        status = 'Ничья!';
    } else {
        status = `Следующий ход: ${isXNext ? 'X' : 'O'}`;
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0, winningLine.includes(0))}
                {renderSquare(1, winningLine.includes(1))}
                {renderSquare(2, winningLine.includes(2))}
            </div>
            <div className="board-row">
                {renderSquare(3, winningLine.includes(3))}
                {renderSquare(4, winningLine.includes(4))}
                {renderSquare(5, winningLine.includes(5))}
            </div>
            <div className="board-row">
                {renderSquare(6, winningLine.includes(6))}
                {renderSquare(7, winningLine.includes(7))}
                {renderSquare(8, winningLine.includes(8))}
            </div>
        </div>
    ); 
}

export default Board;