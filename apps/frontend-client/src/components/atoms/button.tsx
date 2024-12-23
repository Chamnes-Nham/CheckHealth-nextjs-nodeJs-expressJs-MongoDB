// components/atoms/Button.tsx
import React from "react";

export interface ButtonProps {
  label: string;
  size?: "small" | "medium" | "large";
  width?: string;
  height?: string;
  textColor?: string;
  backgroundColor?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

export const Button: React.FC<ButtonProps> = ({
  label,
  size = "medium",
  width,
  height,
  textColor = "white",
  backgroundColor = "#3385FF",
  icon,
  onClick,
  type = "button",
}) => {
  const baseClasses =
    "rounded-[10px] cursor-pointer flex items-center justify-center mt-[19px]";
  const sizeClasses = {
    small: "text-sm py-2 px-4",
    medium: "text-base py-[10px] px-[2px]",
    large: "text-lg py-3 px-6",
  };

  const customStyles = {
    backgroundColor,
    color: textColor,
    width: width || "144px",
    height: height || "34px",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${sizeClasses[size]}`}
      style={customStyles}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
