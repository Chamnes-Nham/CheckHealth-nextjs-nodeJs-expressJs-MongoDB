import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

interface BloodPressureCardProps {
  systolic: number;
  diastolic: number;
  label: string;
  description: string;
  date: string;
  time: string;
}

const BloodPressureCard: React.FC<BloodPressureCardProps> = ({
  systolic,
  diastolic,
  label,
  description,
  date,
  time,
}) => {
  return (
    <div className="bg-blue-100 rounded-[10px] py-[15px] px-[20px] mb-[15px] flex justify-between items-center">
      <div className="flex items-center">
        <div className="border-r-[5px] border-green-500 pr-3">
          <div className="text-lg font-semibold">{systolic}</div>
          <div className="text-lg font-semibold">{diastolic}</div>
          <div className="text-sm text-gray-600">mmHg</div>
        </div>
        <div className="pl-3">
          <div className="text-lg font-bold">{label}</div>
          <div className="text-sm text-gray-600">{description}</div>
          <div className="text-sm text-gray-600">{date}</div>
          <div className="text-sm text-gray-600">{time}</div>
        </div>
      </div>
      <div className="cursor-pointer hover:text-red-500 transition-colors pb-[50px] text-gray-600">
        <RiDeleteBinLine size={22}  />
      </div>
    </div>
  );
};

export default BloodPressureCard;
