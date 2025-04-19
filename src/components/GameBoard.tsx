// File: src/components/GameBoard.tsx
import React from 'react';

interface GameBoardProps {
  board: string[][];
  onClick: (col: number) => void;
  hintSuggestion?: number | null;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onClick, hintSuggestion }) => {
  const cols = board[0].length;
  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 60px)` }}>
      {board.flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isHint = hintSuggestion !== null && colIndex === hintSuggestion;
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-[60px] h-[60px] border border-black flex items-center justify-center cursor-pointer bg-white ${isHint ? 'bg-purple-200 animate-pulse' : ''}`}
              onClick={() => onClick(colIndex)}
            >
              {cell === 'user' && <div className="w-10 h-10 bg-red-500 rounded-full" />}
              {cell === 'ai' && <div className="w-10 h-10 bg-yellow-400 rounded-full" />}
            </div>
          );
        })
      )}
    </div>
  );
};

export default GameBoard;