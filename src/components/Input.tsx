
// File: src/components/Input.tsx
import React from 'react';

interface InputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

const Input: React.FC<InputProps> = ({ label, value, min = 0, max = 100, onChange }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full p-2 border rounded"
    />
  </div>
);

export default Input;
