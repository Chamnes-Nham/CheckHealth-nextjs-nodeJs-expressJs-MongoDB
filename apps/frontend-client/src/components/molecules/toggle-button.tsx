"use client";
import React, { useState } from "react";

export interface ToggleButtonProps {
  button1Label: string;
  button2Label: string;
  content1: React.ReactNode;
  content2: React.ReactNode;
  activeBgColor?: string;
  inactiveBgColor?: string;
  activeTextColor?: string; 
  inactiveTextColor?: string; 
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  button1Label,
  button2Label,
  content1,
  content2,
  activeBgColor = "bg-blue-500",
  inactiveBgColor = "bg-white",
  activeTextColor = "text-white",
  inactiveTextColor = "text-black",
}) => {
  const [activeContainer, setActiveContainer] = useState<boolean>(false);

  return (
    <div>
      <div className="flex w-full overflow-hidden rounded-[10px] rounded-b-[17px] pb-[5px] cursor-pointer">
        <div
          onClick={() => setActiveContainer(false)}
          className={`${
            activeContainer ? inactiveBgColor : activeBgColor
          } ${activeContainer ? inactiveTextColor : activeTextColor} font-size: 1rem; flex h-[60px] w-1/2 items-center justify-center`}
        >
          {button1Label}
        </div>
        <div
          onClick={() => setActiveContainer(true)}
          className={`${
            activeContainer ? activeBgColor : inactiveBgColor
          } ${activeContainer ? activeTextColor : inactiveTextColor} font-size: 1rem; flex h-[60px] w-1/2 items-center justify-center`}
        >
          {button2Label}
        </div>
      </div>
      {activeContainer === false ? content1 : content2}
    </div>
  );
};

export default ToggleButton;
