// File: src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SettingsPageComponent from './pages/SettingsPage';
import GamePage from './pages/GamePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SettingsPageComponent />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/new-game" element={<GamePage />} />
      </Routes>
    </Router>
  );
}