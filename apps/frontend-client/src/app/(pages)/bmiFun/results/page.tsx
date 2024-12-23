"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/atoms/button";
import BackArrow from "@/components/atoms/back-arrow";
import ProgressBar from "@/components/templates/multicolor-process";
import Modal from "@/components/molecules/pop-up";
import Accordion from "@/components/molecules/accordion";
import Link from "next/link";
import Bmi from "@/../public/bmi1.gif";
import Image from "next/image";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Tip {
  categorizedTips: string;
  description: string;
  guideline: { title: string; content: string }[];
  should_do: { title: string; content: string }[];
  should_not: { title: string; content: string }[];
}

const SearchParamsWrapper: React.FC<{ children: (searchParams: URLSearchParams) => React.ReactNode }> = ({ children }) => {
  const searchParams = useSearchParams();
  return <>{children(searchParams)}</>;
};

const ResultPageContent: React.FC<{ searchParams: URLSearchParams }> = ({ searchParams }) => {
  const bmi = parseFloat(searchParams.get("bmi") || "0");
  const category = decodeURIComponent(searchParams.get("category") || "");
  const weight = searchParams.get("weight") || "";
  const height = searchParams.get("height") || "";
  const showModal = searchParams.get("showModal") === "true";

  const [isModalOpen, setIsModalOpen] = useState(showModal);
  const [isVisible, setIsVisible] = useState(false);
  const [tips, setTips] = useState<Tip[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3009/api/v1/bmi-tips",
          {
            params: { category },
          }
        );
        if (response.data && response.data.tips) {
          setTips(response.data.tips);
        } else {
          throw new Error("No tips found.");
        }
      } catch (error) {
        console.error("Error fetching tips:", error);
        setError("Failed to fetch tips. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchTips();
    }
  }, [category]);


  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300); 
  }, []);

  const renderAccordionForCategory = () => {
    if (!tips || tips.length === 0) {
      return <p>No tips available for this category.</p>;
    }

    return tips
      .filter((tip) => tip.categorizedTips === category)
      .map((tip, idx) => (
        <div key={idx}>
          <div className="p-4">
          <Accordion
            title={`ការណែនាំសម្រាប់ BMI ${tip.categorizedTips}`}
            contentHtml={tip.guideline
              .map(
                (guide) =>
                  `<p class="mb-4">${guide.title}:<span class="text-gray-700 ml-2"> ${guide.content}</span></p>`
              )
              .join("")}
          />
          <Accordion
            title={`អ្វីដែលត្រូវធ្វើសម្រាប់ BMI ${tip.categorizedTips}`}
            contentHtml={tip.should_do
              .map(
                (doTip) =>
                  `<p class="mb-4">${doTip.title}:<span class="text-gray-700 ml-2"> ${doTip.content}</span></p>`
              )
              .join("")}
          />
          <Accordion
            title={`អ្វីដែលមិនគួរធ្វើសម្រាប់ BMI ${tip.categorizedTips}`}
            contentHtml={tip.should_not
              .map(
                (dontTip) =>
                  `<p class="mb-4">${dontTip.title}:<span class="text-gray-700 ml-2"> ${dontTip.content}</span></p>`
              )
              .join("")}
          />
          </div>
        </div>
      ));
  };

  return (
    <div>
      <div className="ml-5 mt-2">
        {loading ? (
          <Skeleton width={250} height={40} borderRadius={15} />
        ) : (
          <Link href="/">
            <BackArrow text={"ថយក្រោយវិញ"} />
          </Link>
        )}
      </div>

      <div className="mt-20 p-0">
        <h1 className="text-[16px] mb-4 text-center">
          សន្ទស្សន៍ម៉ាសរាងកាយ (BMI) របស់អ្នក
        </h1>
        <div className="flex text-center justify-center items-center gap-5">
          <div>
            {loading ? (
              <Skeleton width={150} height={60} />
            ) : (
              <>
                <h2 className="font-semibold text-bold">ទម្ងន់:</h2>
                <h2 className="mt-[5px] font-semibold">{weight} kg</h2>
              </>
            )}
          </div>
          <div>
            {loading ? (
              <Skeleton width={150} height={60} />
            ) : (
              <>
                <h2 className="text-bold font-semibold">កម្ពស់:</h2>
                <h2 className="mt-[5px] font-semibold">{height} cm</h2>
              </>
            )}
          </div>
          <div>
            {loading ? (
              <Skeleton width={150} height={60} />
            ) : (
              <>
                <h2 className="text-bold font-semibold">លទ្ធផល</h2>
                <h2 className="mt-[5px] font-semibold">{category}</h2>
              </>
            )}
          </div>
        </div>

        <div className="pr-6 -mt-5">
          {loading ? (
            <Skeleton height={50} width="100%" />
          ) : (
            <ProgressBar bmi={bmi} />
          )}
        </div>

        <div className="pl-[25px] bg-gray-100">
          {loading ? (
            <>
              <Skeleton count={10} height={80} />
            </>
          ) : error ? (
            <p>{error}</p>
          ) : (
            renderAccordionForCategory()
          )}
        </div>

        <div className={`${isVisible ? "fade-in" : ""}`}>
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title=""
            >
              {loading ? (
                <>
                  <div className="mb-[5px] flex flex-col items-center">
                    <Skeleton width={200} height={200} borderRadius={15} />
                  </div>
                  <Skeleton height={25} className="mt-5" borderRadius={10} />
                  <Skeleton height={25} className="mt-2" borderRadius={10} />
                  <div className="mt-[5px] flex flex-col items-center">
                    <Skeleton
                      width={258}
                      height={39}
                      borderRadius={15}
                      className="mt-5"
                    />
                    <Skeleton
                      width={258}
                      height={39}
                      borderRadius={15}
                      className="mt-3"
                    />
                  </div>
                </>
              ) : (
                // Render actual content when loading is false
                <>
                  <Image src={Bmi} alt="BMI Image" />
                  <p className="text-center font-semi text-[16px]">
                    សូមញ្ចូលគណនី ឬធ្វើការបង្កើតគណនី
                  </p>
                  <p className="text-center font-semi text-[16px]">
                    ដើម្បីរក្សាទុករាល់ការពិនិត្យរបស់អ្នក
                  </p>
                  <div className="mt-[5px] flex flex-col items-center">
                    <Link href="/user-profile/sign-up">
                      <Button
                        label="បញ្ចូលគណនី"
                        size="large"
                        height="39px"
                        width="258px"
                        backgroundColor="#3385FF"
                        textColor="white"
                      />
                    </Link>
                    <Link href="/user-profile/login">
                      <Button
                        label="បង្កើតគណនី"
                        size="large"
                        height="39px"
                        width="258px"
                        backgroundColor="#3385FF"
                        textColor="white"
                      />
                    </Link>
                  </div>
                </>
              )}
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

const ResultPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsWrapper>
        {(searchParams) => <ResultPageContent searchParams={searchParams} />}
      </SearchParamsWrapper>
    </Suspense>
  );
};

export default ResultPage;