"use client";
import React, { useEffect } from "react";

interface ColorDotProps {
  systolic: number;
  diastolic: number;
}

const ColorDot: React.FC<ColorDotProps> = ({ systolic, diastolic }) => {
  const colorClasses = {
    low: "#B0FFD2",
    normal: "#00FF6F",
    high: "#FFBE33",
    veryHigh: "#FF6600",
    extremelyHigh: "#FF0800",
    default: "#CCCCCC",
  };
  const statusMessages = {
    low: "ខ្សោយ",
    normal: "សុខភាពល្អ",
    high: "លើសឈាម",
    veryHigh: "ជំងឺលើសឈាមI",
    extremelyHigh: "ជំងឺលើសឈាមII",
    default: "N/A",
  };

  const getColorClass = () => {
    if (systolic != null && diastolic != null) {
      if (
        (systolic > 50 && systolic <= 90) ||
        (diastolic > 50 && diastolic <= 60)
      ) {
        return { color: colorClasses.low, status: statusMessages.low };
      } else if (
        systolic >= 90 &&
        systolic <= 120 &&
        diastolic >= 60 &&
        diastolic <= 80
      ) {
        return { color: colorClasses.normal, status: statusMessages.normal };
      } else if (
        (systolic > 120 && systolic <= 130) ||
        (diastolic > 80 && diastolic <= 90)
      ) {
        return { color: colorClasses.high, status: statusMessages.high };
      } else if (
        (systolic > 130 && systolic <= 140) ||
        (diastolic > 90 && diastolic <= 100)
      ) {
        return {
          color: colorClasses.veryHigh,
          status: statusMessages.veryHigh,
        };
      } else if (systolic > 140 || diastolic > 100) {
        return {
          color: colorClasses.extremelyHigh,
          status: statusMessages.extremelyHigh,
        };
      }
    }
    return { color: colorClasses.default, status: statusMessages.default };
  };

  const { color, status } = getColorClass();

  return (
    <div className="relative">
      <div
        style={{ backgroundColor: `${color}` }}
        className={`w-[15px] h-[15px] rounded-full absolute top-[5px] left-[-20px]`}
      ></div>
      <div className="font-semibold">{status}</div>
    </div>
  );
};

export default ColorDot;
