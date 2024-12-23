
"use client";

import React, { useEffect, useState } from "react";
import BackArrow from "@/components/atoms/back-arrow";
import BmiCard from "@/components/templates/history-bmi";
import NavigationBar from "@/components/organisms/navigation-bar";
import Link from "next/link";
import ThreeToggle from "@/components/molecules/three-toggle";
import { IoScaleOutline } from "react-icons/io5";
import { MdOutlineBloodtype } from "react-icons/md";
import { FaRegChartBar } from "react-icons/fa";
import GraphB from "@/components/templates/graph-blood";
import GraphBMI from "@/components/templates/graph-bmi";
import BloodPressureCard from "@/components/templates/history-bloodpressure";

const CardHistory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="p-4 mb-[70px] ">
        <Link href={"/"}>
          <BackArrow text={"ត្រឡប់ក្រោយ"} />
        </Link>
        <div className="pt-[60px] ">
          <ThreeToggle
            options={[
              {
                id: "complete",
                label: (
                  <>
                    {isLoading ? (
                      <div className="relative flex items-center justify-center animate-pulse">
                        <div className="h-6 bg-gray-300 rounded w-5"></div>{" "}
                        <div className="h-6 bg-gray-300 rounded w-20 ml-2"></div>{" "}
                      </div>
                    ) : (
                      <div className="relative flex items-center justify-center transition-opacity show">
                        <MdOutlineBloodtype className="mr-[1px]" />
                        <div className="text-sm">សម្ពាធឈាម</div>
                      </div>
                    )}
                  </>
                ),
                component: (
                  <div className={`transition-opacity ${!isLoading ? "show" : ""}`}>
                    {isLoading ? (
                      <div className="animate-pulse space-y-4">
                        <div className="h-24 bg-gray-300 rounded w-full"></div>
                        <div className="h-24 bg-gray-300 rounded w-full"></div>
                        <div className="h-24 bg-gray-300 rounded w-full"></div>
                      </div>
                    ) : (
                      <BloodPressureCard />
                    )}
                  </div>
                ),
              },
              {
                id: "incomplete",
                label: (
                  <>
                    {isLoading ? (
                      <div className="relative flex items-center justify-center animate-pulse">
                        <div className="h-6 bg-gray-300 rounded w-5"></div>{" "}
                        <div className="h-6 bg-gray-300 rounded w-20 ml-2"></div>{" "}
                      </div>
                    ) : (
                      <div className="relative flex items-center justify-center transition-opacity show">
                        <IoScaleOutline className="mr-[1px]" />
                        <div className="text-sm">ម៉ាសរាងកាយ</div>
                      </div>
                    )}
                  </>
                ),
                component: (
                  <div className={`transition-opacity ${!isLoading ? "show" : ""}`}>
                    {isLoading ? (
                      <div className="animate-pulse space-y-4">
                        <div className="h-24 bg-gray-300 rounded w-full"></div>
                        <div className="h-24 bg-gray-300 rounded w-full"></div>
                        <div className="h-24 bg-gray-300 rounded w-full"></div>
                      </div>
                    ) : (
                      <BmiCard />
                    )}
                  </div>
                ),
              },
              {
                id: "pending",
                label: (
                  <>
                    {isLoading ? (
                      <div className="relative flex items-center justify-center animate-pulse">
                        <div className="h-6 bg-gray-300 rounded w-5"></div>{" "}
                        <div className="h-6 bg-gray-300 rounded w-20 ml-2"></div>{" "}
                      </div>
                    ) : (
                      <div className="relative flex items-center justify-center transition-opacity show">
                        <FaRegChartBar className="mr-[1px] mt-[1px]" />
                        <div className="text-sm">ក្រាប</div>
                      </div>
                    )}
                  </>
                ),
                component: (
                  <div className={`transition-opacity ${!isLoading ? "show" : ""}`}>
                    {isLoading ? (
                      <div className="animate-pulse space-y-4">
                        <div className="h-24 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-24 bg-gray-300 rounded w-full"></div>
                        <div className="h-24 bg-gray-300 rounded w-5/6"></div>
                      </div>
                    ) : (
                      <>
                        <GraphB />
                        <GraphBMI />
                      </>
                    )}
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
      <NavigationBar />
    </div>
  );
};

export default CardHistory;
