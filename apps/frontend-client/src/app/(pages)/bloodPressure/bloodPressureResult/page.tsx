
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css"; 
import ColorDot from "./color-dot";
import BackArrow from "@/components/atoms/back-arrow";
import Accordion from "@/components/molecules/accordion";
import { Chart } from "./chart";
import Link from "next/link";

export interface BloodPressureResultType {
  searchParams: {
    systolic: number;
    diastolic: number;
    note: string;
  };
}

interface Tip {
  categorizedTips: string;
  description: string;
  guideline: {
    title: string;
    content: string;
  }[];
  should_do: {
    title: string;
    content: string;
  }[];
  should_not: {
    title: string;
    content: string;
  }[];
}

const BloodPressureResult: React.FC<BloodPressureResultType> = ({
  searchParams,
}) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const determineCategory = () => {
    const { systolic, diastolic } = searchParams;
    if (
      (systolic > 50 && systolic <= 90) ||
      (diastolic > 50 && diastolic <= 60)
    )
      return "ខ្សោយ";
    if (systolic > 119 && systolic <= 120 && diastolic > 79 && diastolic <= 80)
      return "ធម្មតា";
    if (
      (systolic > 120 && systolic <= 139) ||
      (diastolic > 80 && diastolic <= 89)
    )
      return "ត្រៀមលើស";
    if (
      (systolic >= 140 && systolic <= 159) ||
      (diastolic >= 90 && diastolic <= 99)
    )
      return "លើសកម្រិត ១";
    if (systolic >= 160 || diastolic >= 100) return "លើសកម្រិត ២";
    return "default";
  };

  const category = determineCategory();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get("http://localhost:3007/api/v1/tips");
        if (response.data && Array.isArray(response.data.tips)) {
          setTips(response.data.tips);
        } else {
          throw new Error(
            "Invalid response structure: Expected tips to be an array."
          );
        }
      } catch (error) {
        console.error("Error fetching tips:", error);
        setError("Failed to fetch tips. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const renderAccordionForCategory = () => {
    return tips
      .filter((tip) => tip.categorizedTips === category)
      .map((tip, idx) => (
        <div key={idx} className="transition-opacity show">
          <br />
          <Accordion
            title={`ការណែនាំសម្រាប់សម្ពាធឈាម ${tip.categorizedTips}`}
            contentHtml={tip.guideline
              .map(
                (guide) =>
                  `<p class="mb-4">${guide.title}: <span class="text-gray-700 ml-2">${guide.content}</span></p>`
              )
              .join("")}
          />
          <br />
          <Accordion
            title={`អ្វីដែលគួរធ្វើសម្រាប់សម្ពាធឈាម ${tip.categorizedTips}`}
            contentHtml={tip.should_do
              .map(
                (doTip) =>
                  `<p class="mb-4">${doTip.title}: <span class="text-gray-700 ml-2">${doTip.content}</span></p>`
              )
              .join("")}
          />
          <br />
          <Accordion
            title={`អ្វីដែលមិនគួរធ្វើសម្រាប់សម្ពាធឈាម ${tip.categorizedTips}`}
            contentHtml={tip.should_not
              .map(
                (dontTip) =>
                  `<p class="mb-4">${dontTip.title}: <span class="text-gray-700 ml-2">${dontTip.content}</span></p>`
              )
              .join("")}
          />
        </div>
      ));
  };

  if (loading) {
    return (
      <div className="pl-[15px] pr-[15px]">
        <Skeleton height={45} width={180} borderRadius={15} className="mt-5"/>
        <Skeleton height={40} count={2} borderRadius={15} className="mt-3"/>
        <Skeleton height={280} borderRadius={15} className="mt-3"/>
        <Skeleton height={60}  borderRadius={15} className="mt-3"/>
        <Skeleton height={40}  borderRadius={15} className="mt-3" count={3}/>
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="pl-[15px] pr-[15px] transition-opacity show">
      <div className="pt-[19px] pb-[19px]">
        <Link href={"/bloodPressure"}>
          <BackArrow text={"លទ្ធផលសម្ពាធឈាម"} />
        </Link>
      </div>
      <h1 className="text-xl">លទ្ធផលពិនិត្យសម្ពាធឈាម</h1>
      <div className="flex justify-between p-[20px]">
        <div>
          <h1>សម្ពាធខ្ពស់</h1>
          <h1 className="font-bold">{searchParams.systolic}mmHg</h1>
        </div>
        <div>
          <h1>សម្ពាធទាប</h1>
          <h1 className="font-bold">{searchParams.diastolic}mmHg</h1>
        </div>
        <div>
          <h1>លទ្ធផល</h1>
          <ColorDot
            systolic={searchParams.systolic}
            diastolic={searchParams.diastolic}
          />
        </div>
      </div>
      <Chart
        systolic={searchParams.systolic}
        diastolic={searchParams.diastolic}
      />
      <h1 className="text-base w-10/12 pt-[19px] border-b-[1px] border-black">
        សម្ពាធឈាមរបស់អ្នក ស្វែងយល់ពីចំណុចដែលត្រូវអនុវត្តមួយចំនួននៅខាងក្រោម៖
      </h1>
      <div className="pt-[19px] mb-10 transition-slide show">{renderAccordionForCategory()}</div>
    </div>
  );
};

export default BloodPressureResult;
