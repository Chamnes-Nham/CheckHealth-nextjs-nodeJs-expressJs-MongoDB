// pages/index.tsx or wherever you want to use the chart
import React from "react";
import BloodPressureChart from "./line-chart-blood";

const data = [
  { date: "2023-08-01", systolic: 120, diastolic: 80 },
  { date: "2023-08-02", systolic: 125, diastolic: 85 },
  { date: "2023-08-03", systolic: 130, diastolic: 82 },
  { date: "2023-08-04", systolic: 135, diastolic: 88 },
  { date: "2023-08-05", systolic: 128, diastolic: 84 },
  { date: "2023-08-06", systolic: 122, diastolic: 80 },
  { date: "2023-08-07", systolic: 118, diastolic: 78 },
  { date: "2023-08-08", systolic: 126, diastolic: 85 },
  { date: "2023-08-09", systolic: 122, diastolic: 81 },
  { date: "2023-08-10", systolic: 124, diastolic: 83 },
  { date: "2023-08-11", systolic: 128, diastolic: 86 },
  { date: "2023-08-12", systolic: 130, diastolic: 87 },
  { date: "2023-08-13", systolic: 127, diastolic: 84 },
  { date: "2023-08-14", systolic: 123, diastolic: 80 },
  { date: "2023-08-15", systolic: 121, diastolic: 79 },
  { date: "2023-08-16", systolic: 125, diastolic: 82 },
  { date: "2024-08-03", systolic: 195, diastolic: 92 },
  { date: "2024-08-03", systolic: 200, diastolic: 100 },
  { date: "2024-08-03", systolic: 210, diastolic: 120 },
  { date: "2023-08-01", systolic: 120, diastolic: 80 },
  { date: "2023-08-02", systolic: 125, diastolic: 85 },
  { date: "2023-08-03", systolic: 130, diastolic: 82 },
  { date: "2023-08-04", systolic: 135, diastolic: 88 },
  { date: "2023-08-05", systolic: 128, diastolic: 84 },
  { date: "2023-08-06", systolic: 122, diastolic: 80 },
  { date: "2023-08-07", systolic: 118, diastolic: 78 },
  { date: "2023-08-08", systolic: 126, diastolic: 85 },
  { date: "2023-08-09", systolic: 122, diastolic: 81 },
  { date: "2023-08-10", systolic: 124, diastolic: 83 },
  { date: "2023-08-11", systolic: 128, diastolic: 86 },
  { date: "2023-08-12", systolic: 130, diastolic: 87 },
  { date: "2023-08-13", systolic: 127, diastolic: 84 },
  { date: "2023-08-14", systolic: 123, diastolic: 80 },
  { date: "2023-08-15", systolic: 121, diastolic: 79 },
  { date: "2023-08-16", systolic: 125, diastolic: 82 },
  { date: "2024-08-03", systolic: 195, diastolic: 92 },
  { date: "2024-08-03", systolic: 200, diastolic: 100 },
  { date: "2024-08-03", systolic: 210, diastolic: 120 },
];

const GraphBlood: React.FC = () => {
  return (
    <div className="">
      <div className="">
        <BloodPressureChart data={data} />
      </div>
    </div>
  );
};

export default GraphBlood;
