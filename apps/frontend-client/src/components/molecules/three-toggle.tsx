// components/ToggleButton.tsx
"use client"
import React, { useState } from 'react';


type ToggleButton = {
  id: string | number;
  label: React.ReactNode;
  icon?: React.ReactNode;
  component: React.ReactNode;

}
type ToggleButtonProps = {
  options:ToggleButton[];
  defaultSelected?: string | number;
};

const ThreeToggle: React.FC<ToggleButtonProps> = ({ options, defaultSelected }) => {
  const [selectedId, setSelectedId] = useState(defaultSelected || options[0].id);

  const handleClick = (id: string | number) => {
    setSelectedId(id);
  };

  return (
    <div>
      <div className="flex rounded-[12px] border-[5px] border-blue-100">
        {options.map(({ id, label, icon }) => (
          <button
            key={id}
            className={`flex-1 py-2 px-4 text-center ${
              selectedId === id ? 'bg-blue-500 text-white' : ' text-black'
            } rounded-md`}
            onClick={() => handleClick(id)}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {options.find(option => option.id === selectedId)?.component}
      </div>
    </div>
  );
};

export default ThreeToggle;
