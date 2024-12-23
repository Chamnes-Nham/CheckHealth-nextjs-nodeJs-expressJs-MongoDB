"use client";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

interface BackArrowProps {
  text: string;
}

const BackArrow: React.FC<BackArrowProps> = ({ text }) => {
  return (
    <div className="fixed top-0 w-full bg-gray-100">
      <div className="flex items-center cursor-pointer h-[71px]">
        <FaArrowLeftLong />
        <span className="pl-[5px]">{text}</span>
      </div>
    </div>
  );
};

export default BackArrow;
