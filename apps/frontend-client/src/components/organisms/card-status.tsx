

import Image from "next/image";
import React from "react";

interface HealthStatusProps {
  icon: string;
  label: string;
  value1: number;
  value2?: number;
  health: string;
  colorStatus: string;
}

const getStatusColor = (health: string): string => {
  switch (health) {
    case "ខ្សោយ":
      return "bg-blue-200";
    case "សុខភាពល្អ":
      return "bg-green-200";
    case "លើសឈាម":
      return "bg-orange-200";
    case "ជំងឺលើសឈាមI":
      return "bg-red-200"
    case "ជំងឺលើសឈាមII":
      return "bg-red-500";
    case "ស្គមខ្លាំងណាស់":
      return "bg-blue-200";
    case "ស្គមខ្លាំង":
      return "bg-indigo-200";
    case "ស្គម":
      return "bg-purple-200";
    case "លើសទម្ងន់":
      return "bg-yellow-200";
    case "លើសទម្ងន់ខ្លាំង":
      return "bg-orange-200"
    case "លើសទម្ងន់ខ្លាំងណាស់":
      return "bg-red-200";
    case "ធាត់ខ្លាំងណាស់":
      return "bg-red-500"
    default:
      return "bg-gray-200"; 
  }
};

const HealthStatus: React.FC<HealthStatusProps> = ({
  icon,
  label,
  value1,
  value2,
  health,
  colorStatus,
}) => {
  return (
    <div
      className={`${getStatusColor(health)} bg-opacity-20 rounded-[12px] shadow-md w-[190px] h-[190px]`}
    >
      <div className="px-[20px] pt-[20px]">
        <div className="flex items-center">
          <div
            className={`${getStatusColor(health)} bg-green-100 rounded-[12px] w-[40px] h-[40px] flex items-center justify-center`}
          >
            <Image width={80} height={80} src={icon} alt={label} />
          </div>
          <p className="text-[16px] font-medium text-gray-700 ml-[9px]">
            {label}
          </p>
        </div>
        <p className="text-[25px] font-bold text-gray-900 flex items-baseline">
          {value1}
          {value2 && (
            <span className="text-[14px] font-normal ml-[5px]">
              / {value2} mmhg
            </span>
          )}
        </p>
        <div
          className={`${getStatusColor(health)} w-[100px] rounded-[4px] flex justify-center px-[8px] py-[4px] text-[12px]`}
        >
          <p className="text-[12px] text-black">{health}</p>
        </div>
      </div>
      <div>
        <Image
          width={10}
          height={10}
          src={colorStatus}
          alt="color status"
          className="w-full rounded-b-lg"
        />
      </div>
    </div>
  );
};

export default HealthStatus;