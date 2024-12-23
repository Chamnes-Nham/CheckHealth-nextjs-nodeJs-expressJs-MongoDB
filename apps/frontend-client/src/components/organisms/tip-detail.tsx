"use client";
import React, { useState } from "react";

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

interface ButtonItem {
  text: string;
  dropdownItems: DropdownItem[];
}

export interface TipDetailProps {
  img?: string;
  title: string;
  content: string;
  subtitle: string;
  detail: string;
  buttons?: ButtonItem[];
  details: Detail;
}

const TipDetail: React.FC<TipDetailProps> = ({
  img,
  title,
  subtitle,
  detail,
  content,
  buttons = [],
  details,
}) => {
  const [activeIndexes, setActiveIndexes] = useState<{ [key: number]: string }>({});

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const value = e.target.value;
    setActiveIndexes((prev) => ({ ...prev, [index]: value }));
  };

  return (
    <div>
      {img && <img src={img} alt={title} className="w-full rounded-md mb-4" />}
      <h4 className="font-bold mt-6">{title}</h4>
      <p className="text-gray-800 text-base leading-6 mt-4">{content}</p>
      <p className="text-gray-800 mt-4">{details.content}</p>

      {details.detailTitle.map((detailTitle, index) => (
        <div
          key={detailTitle._id}
          className="relative mt-4 inline-block w-full mb-1"
        >
          <label className="mt-1 text-left py-2 px-1">{detailTitle.text}</label>
          <select
            className="block w-full py-2 px-1 mt-2 outline-blue-500 mb-4"
            onChange={(e) => handleSelectChange(e, index)}
            value={activeIndexes[index] || ""}
          >
            <option value="">ជម្រើសក្នុងការអាន</option>
            {detailTitle.dropdownItem.map((item) => (
              <option key={item._id} value={item.text}>
                {item.text}
              </option>
            ))}
          </select>
          {activeIndexes[index] && (
            <div className="mt-4">
              <h5 className="font-bold mb-4">{detailTitle.text}</h5>
              <p className="text-gray-700 mb-10">
                {detailTitle.dropdownItem
                  .filter((item) => item.text === activeIndexes[index])
                  .map((item) => (
                    <span key={item._id || item.text}>
                       {item.href}
                    </span>
                  ))}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TipDetail;