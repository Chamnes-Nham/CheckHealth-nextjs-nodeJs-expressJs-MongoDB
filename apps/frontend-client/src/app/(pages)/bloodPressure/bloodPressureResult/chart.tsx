"use client";
import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Cell,
  ReferenceArea,
  ResponsiveContainer,
  ReferenceLine,
  ScatterProps,
} from "recharts";

let data = [{ x: 60, y: 70, z: 100 }];
const COLORS = ["#05FF44"];

const SquareAreaChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        height={500}
        margin={{
          top: 20,
          right: 8,
          bottom: 0,
          left: -34,
        }}
      >
        <XAxis
          type="number"
          dataKey="x"
          name="diastolic"
          domain={[50, 140]} // Set fixed range for x-axis
          ticks={[50, 60, 70, 80, 90, 100, 110, 120, 130, 140]}
          fontSize={11}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="systolic"
          domain={[50, 180]} // Set fixed range for y-axis
          ticks={[
            50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180,
          ]}
          fontSize={11}
        />

        <ReferenceArea
          x1={50}
          x2={140}
          y1={50}
          y2={180}
          stroke="white"
          strokeOpacity={1}
          fill="#FF0800"
          fillOpacity={1}
        />
        <ReferenceArea
          x1={50}
          x2={100}
          y1={50}
          y2={170}
          stroke="white"
          strokeOpacity={1}
          fill="#FF6600"
          fillOpacity={1}
        />
        <ReferenceArea
          x1={50}
          x2={90}
          y1={50}
          y2={140}
          stroke="white"
          strokeOpacity={1}
          fill="#FFBE33"
          fillOpacity={1}
        />
        <ReferenceArea
          x1={50}
          x2={80}
          y1={50}
          y2={120}
          stroke="white"
          strokeOpacity={1}
          fill="#00FF6F"
          fillOpacity={1}
        />
        <ReferenceArea
          x1={50}
          x2={60}
          y1={50}
          y2={90}
          stroke="white"
          strokeOpacity={1}
          fill="#B0FFD2"
        />
        <ReferenceLine
          x={data[0].x}
          stroke="black"
          strokeOpacity={1}
          strokeWidth={2}
        />
        <ReferenceLine
          y={data[0].y}
          stroke="black"
          strokeOpacity={1}
          strokeWidth={2}
        />
        <Scatter
          name="result"
          data={data}
          fill="#8884d8"
          strokeWidth="1px"
          stroke="gray"
          shape={(props: ScatterProps) => (
            <circle
              cx={props.cx}
              cy={props.cy}
              r={8} // Adjust this value to change the size
              fill={props.fill}
              stroke={props.stroke}
              strokeWidth={props.strokeWidth}
            />
          )}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};
interface ChartType {
  systolic: number;
  diastolic: number;
}

const updateData = (systolic: number, diastolic: number) => {
  data = [
    {
      x: diastolic > 140 ? 140 : diastolic < 50 ? 50 : diastolic,
      y: systolic > 180 ? 180 : systolic < 50 ? 50 : systolic,
      z: 100,
    },
  ];
};

export const Chart: React.FC<ChartType> = ({
  systolic = 70,
  diastolic = 60,
}) => {
  updateData(systolic, diastolic);
  return (
    <div className="w-full h-[390px] relative">
      <h1 className="absolute text-[10px] top-[-5px] left-[6px]">(systolic)</h1>
      <h1 className="absolute text-[10px] bottom-[-5px] right-[-12px]">
        (diastolic)
      </h1>
      <SquareAreaChart />
    </div>
  );
};
