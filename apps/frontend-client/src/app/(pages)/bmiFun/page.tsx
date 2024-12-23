"use client";
import React from "react";
import BMICalculator from "./bmi-calculate";
import Link from "next/link";
import BackArrow from "@/components/atoms/back-arrow";

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="px-[20px] ">
        <Link href="/">
          <BackArrow text={"ថយក្រោយវិញ"} />
        </Link>
      </div>
      <BMICalculator />
    </div>
  );
};

export default HomePage;
