"use client";
import React, { useState } from "react";
import Image from "next/image";
import DownArrow from "@/../public/down-arrow.svg";

interface AccordionProps {
  title: string;
  contentHtml: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, contentHtml }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="overflow-hidden">
      <button
        onClick={() => setIsActive(!isActive)}
        className="flex items-center text-left gap-4"
      >
        <h3 className="font-medium text-gray-800">{title}</h3>
        <div>
          <Image
            src={DownArrow}
            width={10}
            height={10}
            alt="down arrow"
            className={`transform transition-transform duration-300 ${
              isActive ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isActive ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {" "}
        {isActive && (
          <div className="bg-gray-100">
            <p
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            ></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
