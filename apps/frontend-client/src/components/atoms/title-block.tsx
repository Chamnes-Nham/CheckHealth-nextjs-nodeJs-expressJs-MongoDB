import React from "react";

interface TextProps {
  text: string  | JSX.Element;
  color?: string;
}

const titleBlock: React.FC<TextProps> = ({ text, color }) => {
  return (
    <div className="w-auto mx-[20px] mt-[10px]">
      <h1 className="text-[16px]" style={{ color }}>
        {text}
      </h1>
    </div>
  );
};

export default titleBlock;
