import React from "react";
import Image from "next/image";

export interface LogoProps {
  src: string;
  alt: string;
  text: JSX.Element | string; 
}
const Logo: React.FC<LogoProps> = ({ src, alt, text }) => {
  return (
    <div className=" flex items-center">
      <Image src={src} alt={alt} width={60} height={60} priority={true}  />
      <div className="ml-[10px] font-bold text-[20px]"> {text} </div>
    </div>
  );
};

export default Logo;
