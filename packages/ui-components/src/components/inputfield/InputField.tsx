"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  type?: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  error,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const preventBlur = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
  };

  return (
    <div className="relative">
      <input
        type={showPassword && type === "password" ? "text" : type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`${className}`}
      />
      {type === "password" && isFocused && (
        <span
          onMouseDown={preventBlur}
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-[30%] cursor-pointer"
        >
          {showPassword ? (
            <FaEyeSlash className="text-gray-400 text-xl" />
          ) : (
            <FaEye className="text-gray-400 text-xl" />
          )}
        </span>
      )}
      {error && (
        <span className="text-red-500 text-sm absolute -left-[0%] top-11">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
