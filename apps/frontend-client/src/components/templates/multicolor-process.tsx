import { useSearchParams } from 'next/navigation';
import React from 'react';

type ProgressBarProps = {
  bmi: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ bmi }) => {
  const searchParams = useSearchParams();
  const bmii = parseFloat(searchParams.get('bmi') || '0');

  const getColorSegments = () => {
    return [
      'bg-teal-600 rounded-tl-[15px] rounded-bl-[15px]',
      'bg-green-400 ',
      'bg-sky-500',
      'bg-orange-400 ',
      'bg-red-600 rounded-tr-[15px] rounded-br-[15px]',
    ];
  };

  const getPosition = (bmi: number) => {
    if (bmi < 16) return '0%';
    if (bmi >= 16 && bmi < 18.5) return '25%';
    if (bmi >= 18.5 && bmi < 25) return '50%';
    if (bmi >= 25 && bmi < 30) return '70%';
    return '92.5%';
  };

  const colorSegments = getColorSegments();

  return (
    <div className="relative mt-14 m-[4%] w-11/12 h-[15px] ml-[7.6%] rounded">
      {colorSegments.map((color, index) => (
        <div
          key={index}
          className={`absolute top-0 h-full ${color}`}
          style={{ width: `${100 / colorSegments.length}%`, left: `${(100 / colorSegments.length) * index}%` }}
        ></div>
      ))}
      <div className="absolute -top-[50px] ml-[6%]" style={{ left: getPosition(bmi), transform: 'translateX(-50%)' }}>
        <div className="w-0 h-13 mt-[100%] text-[14px] -ml-[120%] text-bold font-semibold">bmi:{bmii}</div>
        <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-black"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
