// IconBar.stories.tsx

import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { FaHome, FaCalendar, FaUser, FaLightbulb } from "react-icons/fa";
import { IconBaseProps } from "react-icons/lib";

// Define the icons array with type definitions
interface Icon {
  IconComponent: React.ComponentType<IconBaseProps>;
  text: string;
  activeColor: string;
  inactiveColor: string;
  href: string;
}

const icons: Icon[] = [
  {
    IconComponent: FaHome,
    text: "ទំព័រដើម",
    activeColor: "text-blue-600",
    inactiveColor: "text-gray-800",
    href: "/",
  },
  {
    IconComponent: FaCalendar,
    text: "ប្រវត្តិតេសន៍",
    activeColor: "text-blue-600",
    inactiveColor: "text-gray-800",
    href: "/allRecords",
  },
  {
    IconComponent: FaLightbulb,
    text: "គន្លឺះសុខភាព",
    activeColor: "text-blue-600",
    inactiveColor: "text-gray-800",
    href: "/healthTips",
  },
  {
    IconComponent: FaUser,
    text: "ប្រវត្តិរូប",
    activeColor: "text-blue-600",
    inactiveColor: "text-gray-800",
    href: "/userProfile",
  },
];

// Import the IconBar component from your project
const IconBar = ({ icons }: { icons: Icon[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleNavigation = (href: string, index: number) => {
    console.log("Navigating to:", href);
    setActiveIndex(index); // Set the active index when an icon is clicked
    // Implement navigation logic here
  };

  return (
    <div className="flex justify-around px-2 py-4 bg-gray-100">
      {icons.map((icon, index) => {
        const isActive = activeIndex === index;
        const textColorClass = isActive ? icon.activeColor : icon.inactiveColor;
        const bgColorClass = isActive ? "bg-blue-10" : "";

        return (
          <div
            key={icon.text}
            className={`text-center cursor-pointer p-2 rounded-lg ${bgColorClass}`}
            onClick={() => handleNavigation(icon.href, index)} // Pass index to identify which icon is active
          >
            <div className="flex flex-col items-center">
              <icon.IconComponent size={24} className={`mx-auto ${textColorClass}`} />
              <span className={`block mt-[5px] ${textColorClass}`}>{icon.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Storybook Meta information
export default {
  title: "organisms/navigation-bar",
  component: IconBar,
} as Meta;

// Template for Storybook control
const Template: StoryFn<{ icons: Icon[] }> = (args) => <IconBar {...args} />;

// Define the Default story
export const Default = Template.bind({});
Default.args = {
  icons: icons,
};
