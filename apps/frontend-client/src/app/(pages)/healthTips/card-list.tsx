
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css";

interface Card {
  _id: string;
  img: string;
  title: string;
  subtitle: string;
  category: string;
}

interface CardListComponentProps {
  cards?: Card[]; 
}

const selectOptions = [
  "ទាំងអស់",
  "សម្ពាធឈាម",
  "ទម្ងន់ (BMI)",
  "ការថែរក្សាសុខភាព",
];

const CardListComponent: React.FC<CardListComponentProps> = ({ cards: propCards }) => {
  const [cards, setCards] = useState<Card[]>(propCards || []); 
  const [selectedOption, setSelectedOption] = useState<string>(selectOptions[0]);
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 
  const [isVisible, setIsVisible] = useState(false); 
  useEffect(() => {
    if (!propCards) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3005/health-tips"); 
          if (!response.ok) {
            throw new Error("Failed to fetch health tips");
          }
          const data = await response.json();
          setCards(data);
        } catch (error) {
          setError("Failed to load health tips. Please try again later.");
        }
      };

      fetchData();

      const loadingTimeout = setTimeout(() => {
        setLoading(false); 
        setIsVisible(true);
      }, 500);

      return () => clearTimeout(loadingTimeout); 
    } else {
      setLoading(false); 
      setIsVisible(true);
    }
  }, [propCards]);

  const filteredCards = cards.filter(
    (card) =>
      (selectedOption === "ទាំងអស់" || card.category === selectedOption) &&
      (card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="w-full pt-[10px]">
      {loading ? (
        <Skeleton width="100%" height={50} borderRadius={10} className="mb-2 mt-10" />
      ) : (
        <input
          type="text"
          placeholder="ស្វែងរកនៅទីនេះ"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-full py-4 border rounded-md pl-4 outline-blue-700 w-full mb-2 mt-10 transition duration-500 ease-in-out"
        />
      )}

      <div className="flex mb-2 items-center gap-2 text-nowrap overflow-scroll w-auto">
        {loading ? (
          <>
            <Skeleton width={120} height={40} borderRadius={10} />
            <Skeleton width={120} height={40} borderRadius={10} />
            <Skeleton width={120} height={40} borderRadius={10} />
            <Skeleton width={120} height={40} borderRadius={10} />
          </>
        ) : (
          selectOptions.map((optionText, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(optionText)}
              className={`p-2 shadow-md mt-1 border rounded-md text-clip h-10 w-auto focus:outline-none transition-transform transform duration-300 ease-in-out ${
                selectedOption === optionText
                  ? "bg-blue-600 text-white"
                  : "bg-blue-200 text-black"
              } hover:scale-105`}
            >
              {optionText}
            </button>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 gap-[10px] mt-2">
        {loading ? (
          <>
            <Skeleton height={200} count={3} style={{ marginTop: "15px" }} borderRadius={15} />
          </>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <Link href={`/healthTips/${card._id}`} key={card._id}>
              <div className={`bg-white-100 rounded-[12px] p-[11px] border shadow-sm transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} hover:shadow-lg hover:scale-105 transform transition-transform duration-300`}>
                <img
                  src={card.img}
                  alt="Card Image"
                  className="w-full pt-1 rounded-[10px] transition-opacity duration-500"
                />
                <h4 className="font-bold mt-4 px-2 mb-2 truncate">
                  {card.title}
                </h4>
                <p className="text-gray-900 font-normal mt-1 px-2 pb-3 truncate">
                  {card.subtitle}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>មិនមានក្នុងការស្វែងរករបស់អ្នកទេ</p>
        )}
      </div>
    </div>
  );
};

export default CardListComponent;
