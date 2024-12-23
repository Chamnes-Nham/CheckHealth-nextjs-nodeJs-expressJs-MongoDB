
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Funcs from "./func-block"; 
import blood from "@/images/cards/blood.svg";
import bmi from "@/images/cards/bmi.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardStatuses: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 

  const healthData = [
    {
      icon: blood.src, 
      label1: "មុនងារពិនិត្យ",
      label2: "សម្ពាធឈាម",
      buttonLabel: "ចាប់ផ្តើម",
      onClick: () => router.push("/bloodPressure"), 
    },
    {
      icon: bmi.src, 
      label1: "មុនងារគណនា",
      label2: "BMI នៃទម្ងន់",
      buttonLabel: "ចាប់ផ្តើម",
      onClick: () => router.push("/bmiFun"),
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500); 
  }, []);

  return (
    <div className="flex justify-center gap-[10px] mt-[5px] mx-[20px]">
      {loading ? (

        <>
          <Skeleton height={200} width={200} borderRadius={10} />
          <Skeleton height={200} width={200} borderRadius={10} />
        </>
      ) : (

        healthData.map((data, index) => <Funcs key={index} {...data} />)
      )}
    </div>
  );
};

export default CardStatuses;
