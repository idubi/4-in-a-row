
// File: src/pages/GamePage.tsx (refactored)
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { minimax } from '../utils/minimax';
import GameBoard from '../components/GameBoard';
import { GameSettings } from '../types';
import { useNavigate } from 'react-router-dom';

export default function GamePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { rows, cols, difficulty, hints } = state as GameSettings;

  const emptyBoard = useMemo(() => Array.from({ length: rows }, () => Array(cols).fill(null)), [rows, cols]);
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<'user' | 'ai'>('user');
  const [winner, setWinner] = useState<string | null>(null);
  const [hintCount, setHintCount] = useState(hints);
  const [hintSuggestion, setHintSuggestion] = useState<number | null>(null);

  const handleNewGame = () => {
      navigate('/');
    };

  const checkWinner = (board: string[][], player: string) => {
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (board[row][col] !== player) continue;
        for (let [dx, dy] of directions) {
          let count = 1;
          for (let i = 1; i < 4; i++) {
            const r = row + dx * i;
            const c = col + dy * i;
            if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== player) break;
            count++;
          }
          if (count === 4) {
            setWinner(player);
            return;
          }
        }
      }
    }
  };

  const handleColumnClick = (colIndex: number) => {
    if (currentPlayer !== 'user' || winner) return;
    const newBoard = [...board.map(row => [...row])];
    for (let row = rows - 1; row >= 0; row--) {
      if (!newBoard[row][colIndex]) {
        newBoard[row][colIndex] = 'user';
        setBoard(newBoard);
        checkWinner(newBoard, 'user');
        setCurrentPlayer('ai');
        setHintSuggestion(null);
        break;
      }
    }
  };

  const handleHint = () => {
    if (hintCount <= 0 || winner || currentPlayer !== 'user') return;
    const [bestCol] = minimax(board, 6, true, 'user', -Infinity, Infinity);
    const nextSquare = getNextSquare(board, bestCol);
    setHintSuggestion(bestCol);
    setHintCount(hintCount - 1);
  };
  

const getNextSquare = (board, col) => {
  for (let row = board.length - 1; row >= 0; row--) {
    if (board[row][col] === '') {
      return { row, col };
    }
  }
  return null;
};

  useEffect(() => {
    if (currentPlayer === 'ai' && !winner) {
      const [aiCol] = minimax(board, difficulty, true, 'ai', -Infinity, Infinity);
      if (aiCol !== null) {
        setTimeout(() => {
          const newBoard = [...board.map(row => [...row])];
          for (let row = rows - 1; row >= 0; row--) {
            if (!newBoard[row][aiCol]) {
              newBoard[row][aiCol] = 'ai';
              setBoard(newBoard);
              checkWinner(newBoard, 'ai');
              setCurrentPlayer('user');
              break;
            }
          }
        }, 500);
      }
    }
  }, [currentPlayer, board, difficulty, winner, rows]);

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">4 In A Row</h2>
      <div className="text-center mb-2">
        <p>Board: {rows} rows × {cols} columns</p>
        <p>Difficulty: {difficulty} | Hints left: {hintCount}</p>
        {winner && <p className="text-xl font-bold text-green-600">{winner.toUpperCase()} wins!</p>}
        {!winner && (
          <div >
          <button
            onClick={handleHint}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 border border-gray-300 w-32"
            disabled={hintCount <= 0}
          >
            Get Hint
          </button>   
           <button onClick={handleNewGame} 
           className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 w-32"
           >
              New Game
           </button>
           </div>                 
        )}
      </div>
      <div className="flex justify-center">
        <GameBoard board={board} onClick={handleColumnClick} hintSuggestion={hintSuggestion} />
      </div>
    </div>
  );
}
