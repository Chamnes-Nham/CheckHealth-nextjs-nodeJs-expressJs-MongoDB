"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TipDetail from "@/components/organisms/tip-detail";
import BackArrow from "@/components/atoms/back-arrow";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface DropdownItem {
  _id: string;
  text: string;
  href: string;
}

interface DetailTitle {
  _id: string;
  text: string;
  dropdownItem: DropdownItem[];
}

interface Detail {
  _id: string;
  detailTitle: DetailTitle[];
  content: string;
}

interface CardDetail {
  _id: string;
  img: string;
  title: string;
  description: string;
  category: string;
  details: Detail;
}

const CardDetailPage = () => {
  const { healthTipsId } = useParams();
  const [cardDetail, setCardDetail] = useState<CardDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false); // For fade-in effect

  useEffect(() => {
    if (healthTipsId) {
      const timeoutId = setTimeout(() => {
        fetch(`http://localhost:3005/health-tips/${healthTipsId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            return response.json();
          })
          .then((data) => {
            setCardDetail(data);
            setLoading(false);
            setIsVisible(true); // Trigger visibility for fade-in
          })
          .catch((err) => {
            setError("Error fetching health tip details");
            setLoading(false);
          });
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [healthTipsId]);

  if (loading) {
    return (
      <div className="p-4 max-w-screen-2xl mx-auto bg-gray-100 min-h-screen flex flex-col">
        <Skeleton height={50} style={{ marginTop: "15px" }} />
        <Skeleton width="100%" height={300} style={{ marginTop: "15px" }} />
        <Skeleton count={50} style={{ marginTop: "10px" }} />
        <Skeleton count={50} style={{ marginTop: "8px" }} />
        <Skeleton count={50} style={{ marginTop: "8px" }} />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!cardDetail) {
    return <p>No details available</p>;
  }

  return (
    <div className="p-4 max-w-screen-2xl mx-auto bg-gray-100 min-h-screen flex flex-col">
      <Link href="/healthTips">
        <BackArrow text="ត្រឡប់ក្រោម" />
      </Link>
      
      {/* Main Content */}
      <div className="w-full h-1/2 mt-3 pt-[5px] transition-opacity duration-700 ease-in-out">
        <div className={`p-1 rounded-md transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Image Section with Fade-in Effect */}
          {cardDetail.img ? (
            <Image
              src={cardDetail.img.startsWith("/") ? cardDetail.img : `/${cardDetail.img}`}
              alt={cardDetail.title}
              width={800}
              height={300}
              className="w-full h-2/5 mx-auto p-1 rounded-xl mt-5 transition-opacity duration-700 ease-in-out"
            />
          ) : (
            <p>No image available</p>
          )}
          
          {/* Tip Details with Fade-in Effect */}
          <div className={`transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <TipDetail
              title={cardDetail.title}
              content={cardDetail.description}
              details={cardDetail.details}
              subtitle={""}
              detail={""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailPage;
