"use client";
import BackArrow from "@/components/atoms/back-arrow";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import InputAndScan from "./input-and-scan";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BloodPressureResult: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pl-[20px] pr-[20px] pb-[83px]">
      <div className="pb-[20px] bg-gray-100">
        <Link href={"/"}>
          <BackArrow text={"ពិនិត្យសម្ពាធឈាម"} />
        </Link>
      </div>

      {isLoading ? (
        <div>
          <Skeleton height={80}  borderRadius={20}/>
          <Skeleton
            height={60}
            style={{ marginTop: "15px" }}
            borderRadius={20}
          />
          <Skeleton
            height={60}
            style={{ marginTop: "15px" }}
            borderRadius={20}
          />
          <Skeleton
            height={140}
            style={{ marginTop: "15px" }}
            borderRadius={20}
          />
          <Skeleton
            height={50}
            style={{ marginTop: "15px" }}
            borderRadius={20}
          />
          <Skeleton
            height={50}
            style={{ marginTop: "15px" }}
            borderRadius={20}
          />
        </div>
      ) : (
        <InputAndScan />
      )}
    </div>
  );
};

export default BloodPressureResult;