// File: src/pages/SettingsPage.tsx (refactored)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { GameSettings } from '../types';

export default function SettingsPageComponent() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState(2);
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(7);
  const [hints, setHints] = useState(3);

  const startGame = () => {
    const settings: GameSettings = { difficulty, rows, cols, hints };
    navigate('/game', { state: settings });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-100">
      <h1 className="text-4xl font-bold mb-6">4 In A Row</h1>
      <div className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4">
        <Input label="Difficulty" value={difficulty} min={1} max={6} onChange={setDifficulty} />
        <Input label="Rows" value={rows} min={4} max={10} onChange={setRows} />
        <Input label="Columns" value={cols} min={4} max={10} onChange={setCols} />
        <Input label="Hints" value={hints} min={0} max={10} onChange={setHints} />
        <button onClick={startGame} className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Start Game</button>
      </div>
    </div>
  );
}
