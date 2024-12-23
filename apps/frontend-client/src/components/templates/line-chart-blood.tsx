// components/BloodPressureChart.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";

interface DataPoint {
  date: string;
  systolic: number;
  diastolic: number;
}

interface BloodPressureChartProps {
  data: DataPoint[];
}

const BloodPressureChart: React.FC<BloodPressureChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: -20, bottom: 5 }}
      >
        <CartesianGrid />
        <XAxis dataKey="date" tick={{ fontSize: 14 }} />
        <YAxis tick={{ fontSize: 14 }} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="systolic"
          stroke="#8884d8"
          activeDot={{ r: 7 }}
        />
        <Line
          type="monotone"
          dataKey="diastolic"
          stroke="#82ca9d"
          activeDot={{ r: 7 }}
        />
        <Brush dataKey="date" height={20} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BloodPressureChart;
