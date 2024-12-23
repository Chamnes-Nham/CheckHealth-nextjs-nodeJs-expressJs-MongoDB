// pages/index.tsx or wherever you want to use the chart
import React from "react";
import BMIChart from "./line-chart-bmi";

const bmiData = [
  { date: "2023-08-01", bmi: 22.5 },
  { date: "2023-08-02", bmi: 22.7 },
  { date: "2023-08-03", bmi: 22.8 },
  { date: "2023-08-04", bmi: 23.0 },
  { date: "2023-08-05", bmi: 22.9 },
  { date: "2023-08-06", bmi: 22.6 },
  { date: "2023-08-07", bmi: 22.4 },
  { date: "2023-08-08", bmi: 22.7 },
  { date: "2023-08-09", bmi: 22.5 },
  { date: "2023-08-10", bmi: 22.6 },
  { date: "2023-08-11", bmi: 22.8 },
  { date: "2023-08-12", bmi: 23.0 },
  { date: "2023-08-13", bmi: 22.7 },
  { date: "2023-08-14", bmi: 22.4 },
  { date: "2023-08-15", bmi: 22.3 },
  { date: "2023-08-16", bmi: 22.6 },
  { date: "2024-08-03", bmi: 25.5 },
  { date: "2024-08-03", bmi: 26.0 },
  { date: "2024-08-03", bmi: 206.5 },
];

const HomePage: React.FC = () => {
  return (
    <div className="">
      <div className="">
        <BMIChart data={bmiData} />
      </div>
    </div>
  );
};

export default HomePage;
