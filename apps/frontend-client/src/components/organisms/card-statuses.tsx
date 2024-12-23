"use client";

import React, { useEffect, useState } from "react";
import HealthStatus from "./card-status";
import blood from "../../images/cards/blood.svg";
import bmi from "../../images/cards/bmi.svg";
import colorBlood from "../../images/cards/color-status-blood.svg";
import colorBMI from "../../images/cards/color-status-bmi.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface BMIData {
  value1: number;
  health: string;
}

interface BloodPressureData {
  value1: number;
  value2: number;
  health: string;
}

interface HealthData {
  icon: string;
  label: string;
  value1: number;
  value2?: number;
  health: string;
  colorStatus: string;
}

const CardStatuses: React.FC = () => {
  const defaultBmiData: BMIData = {
    value1: 22.5,
    health: "សុខភាពល្អ",
  };

  const defaultBloodPressureData: BloodPressureData = {
    value1: 120,
    value2: 80,
    health: "សុខភាពល្អ",
  };

  const [bmiData, setBmiData] = useState<BMIData | null>(defaultBmiData);
  const [bloodPressureData, setBloodPressureData] =
    useState<BloodPressureData | null>(defaultBloodPressureData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBmiData = async () => {
      try {
        const response = await fetch("http://localhost:3001/v1/bmi/latest", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        const fetchedBmiData = {
          value1: data.bmi,
          health: data.category,
        };

        if (data.bmi && data.category) {
          setBmiData(fetchedBmiData);
        }
      } catch (error) {
        console.error("Error fetching latest BMI data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestBmiData();
  }, []);

  useEffect(() => {
    const fetchLatestBloodPressureData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/v1/bloodpressure/latest",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();

        const fetchedBloodPressureData = {
          value1: data.systolic,
          value2: data.diastolic,
          health: data.status,
        };

        if (data.systolic && data.diastolic && data.status) {
          setBloodPressureData(fetchedBloodPressureData);
        }
      } catch (error) {
        console.error("Error fetching latest blood pressure data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBloodPressureData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center gap-[10px] mt-[5px] mx-[20px]">
        <Skeleton width={200} height={220} borderRadius={15} />
        <Skeleton width={200} height={220} borderRadius={15} />
      </div>
    );
  }

  const healthData: HealthData[] = [
    bloodPressureData && {
      icon: blood.src,
      label: "សម្ពាធឈាម",
      value1: bloodPressureData.value1,
      value2: bloodPressureData.value2,
      health: bloodPressureData.health,
      colorStatus: colorBlood.src,
    },
    bmiData && {
      icon: bmi.src,
      label: "ទម្ងន់(BMI)",
      value1: bmiData.value1,
      health: bmiData.health,
      colorStatus: colorBMI.src,
    },
  ].filter(Boolean) as HealthData[];

  return (
    <div className="flex justify-center gap-[10px] mt-[5px] mx-[20px]">
      {healthData.map((data, index) => (
        <HealthStatus key={index} {...data} />
      ))}
    </div>
  );
};

export default CardStatuses;
