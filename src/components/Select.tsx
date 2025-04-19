
// File: src/components/Select.tsx
import React from 'react';

interface SelectProps {
  label: string;
  value: number;
  options: number[];
  onChange: (value: number) => void;
}

const Select: React.FC<SelectProps> = ({ label, value, options, onChange }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full p-2 border rounded"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default Select;