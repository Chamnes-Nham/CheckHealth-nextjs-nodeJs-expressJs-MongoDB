
"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Pagination, Navigation } from "swiper/modules";
import Skeleton from "react-loading-skeleton";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-loading-skeleton/dist/skeleton.css"; 

interface BloodPressureTipsProps {
  bloodPressureTipsData: {
    CardDetailPage: any;
    healthTipsId: string;
    _id: string;
    img: string;
    title: string;
    subtitle: string;
    description: string;
    detail: string;
    category: string;
  }[];
}

const BloodPressureTips: React.FC<BloodPressureTipsProps> = ({
  bloodPressureTipsData,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="mt-[5px] mx-[20px]">
      {loading ? (
        <div className="space-y-3">
          <Skeleton height={180} width={"100%"}  borderRadius={20}/>
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}"></span>`;
            },
          }}
          spaceBetween={10}
          slidesPerView={1}
        >
          {bloodPressureTipsData.map((tip) => (
            <SwiperSlide key={tip._id}>
              <Link
                href={`/healthTips/${tip._id}`}
                aria-label={`View details for ${tip.title}`}
              >
                <div className="w-full h-[233px] rounded-[12px] flex flex-col p-[10px] bg-white shadow-sm border">
                  <div className="w-full rounded-[13px] h-[100%] relative overflow-hidden hover:transition-all hover:duration-1000 ease-out mb-[1px]">
                    <Image
                      src={tip.img}
                      alt={tip.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col h-[25%] pb-[9px] mt-[7px] mb-[1px]">
                    <h3 className="font-medium truncate">{tip.title}</h3>
                    <p className="truncate text-gray-500 font-light">
                      {tip.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default BloodPressureTips;