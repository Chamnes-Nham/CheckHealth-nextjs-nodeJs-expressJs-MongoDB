

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/atoms/button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface HealthStatusProps {
  icon: string;
  label1: string;
  label2: string;
  buttonLabel: string;
  onClick: () => void; 
}

const HealthStatus: React.FC<HealthStatusProps> = ({
  icon,
  label1,
  label2,
  buttonLabel,
  onClick, 
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 500); 
  }, []);

  return (
    <div className="bg-white border rounded-[12px] shadow-md w-[190px] h-[144px] flex justify-between">
      {loading ? (

        <div className="m-auto">
          <Skeleton circle height={50} width={50} />
          <Skeleton height={20} width={120} className="mt-2" />
          <Skeleton height={34} width={144} className="mt-2" />
        </div>
      ) : (

        <div className="m-auto">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-[12px] w-[50px] h-[50px] flex items-center justify-center">
              <img src={icon} alt="icon" className="rounded-[12px]" />
            </div>
            <p className="text-[16px] xl:text-[20px] font-medium text-gray-700 ml-[9px]">
              {label1} <br />
              {label2}
            </p>
          </div>
          <div className="">
            <Button
              label={buttonLabel}
              size="medium"
              width="144px"
              height="34px"
              textColor="white"
              backgroundColor="#3385FF"
              onClick={onClick} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthStatus;
