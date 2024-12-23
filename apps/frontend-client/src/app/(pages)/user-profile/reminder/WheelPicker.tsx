
"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Skeleton from "react-loading-skeleton"; // Import the skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // Import the skeleton styles

interface WheelPickerProps {
  items?: string[];
  selectedIndex?: number;
  onChange: (index: number) => void;
  loop?: boolean;
  activeClassName?: string;
  inactiveClassName?: string;
}

const WheelPicker: React.FC<WheelPickerProps> = ({
  items = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  selectedIndex = 0,
  onChange,
  loop = false,
  activeClassName = "text-purpleColor text-6xl font-black",
  inactiveClassName = "text-6xl font-normal text-gray-300",
}) => {
  const itemHeight = 150;
  const scrollSpeedMultiplier = 2.5;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [localSelectedIndex, setLocalSelectedIndex] = useState(selectedIndex);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
     setTimeout(() => {  // Simulate loading delay
      setLoading(false); // Set loading to false after a delay
    }, 500); // 2 seconds delay for loading simulation

    const container = containerRef.current;
    if (container) {
      container.scrollTop = selectedIndex * itemHeight;
    }
  }, [selectedIndex, itemHeight]);

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleScroll = useCallback(
    debounce(() => {
      if (!isDragging) {
        const container = containerRef.current;
        if (container) {
          let newIndex = Math.round(container.scrollTop / itemHeight);
          if (loop) {
            if (newIndex >= items.length) {
              newIndex = 0;
              container.scrollTop = 0;
            } else if (newIndex < 0) {
              newIndex = items.length - 1;
              container.scrollTop = newIndex * itemHeight;
            }
          }
          setLocalSelectedIndex(newIndex);
          onChange(newIndex);
        }
      }
    }, 100),
    [isDragging, itemHeight, onChange, items.length, loop],
  );

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(event.clientY);
    setScrollTop(containerRef.current!.scrollTop);
    event.preventDefault();
  };

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        const container = containerRef.current;
        if (container) {
          const deltaY = (event.clientY - startY) * scrollSpeedMultiplier;
          container.scrollTop = scrollTop - deltaY;
        }
      }
    },
    [isDragging, startY, scrollSpeedMultiplier, scrollTop],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    const container = containerRef.current;
    if (container) {
      let newIndex = Math.round(container.scrollTop / itemHeight);
      if (loop) {
        if (newIndex >= items.length) {
          newIndex = 0;
        } else if (newIndex < 0) {
          newIndex = items.length - 1;
        }
      }
      container.scrollTo({
        top: newIndex * itemHeight,
        behavior: "smooth",
      });
      setLocalSelectedIndex(newIndex);
      onChange(newIndex);
    }
  }, [itemHeight, onChange, items.length, loop]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto h-[150px] w-[81px] pt-2 bg-gray-100 rounded-[10px] shadow-inner no-scrollbar"
      onScroll={handleScroll}
      onMouseDown={handleMouseDown}
      style={{
        scrollSnapType: "y mandatory",
        cursor: isDragging ? "grabbing" : "grab",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <style>
        {`
          ::-webkit-scrollbar {
            display: none; // For Chrome, Safari, and Opera
          }
          .item-transition {
            transition: transform 0.3s ease, opacity 0.3s ease, color 0.3s ease;
          }
        `}
      </style>
      <div className="relative" style={{ scrollBehavior: "smooth" }}>

      {loading ? (
          // Display skeletons while loading
          Array(5).fill(0).map((_, index) => (
            <Skeleton
              key={index}
              height={itemHeight}
              width={81}
              borderRadius={10}
              className="my-2"
            />
          ))
        ) : (
          
          // Display items after loading
        items.map((item, index) => (
          <div
            key={index}
            className={`item-transition flex items-center justify-center text-[30px] ${localSelectedIndex === index ? activeClassName : inactiveClassName}`}
            style={{
              scrollSnapAlign: "center",
              height: itemHeight,
            }}
          >
            {item}
          </div>
        ))
        )}
      </div>
    </div>
  );
};

export default WheelPicker;