// components/IconBar.tsx
"use client";
import { usePathname, useRouter } from "next/navigation";
import { IconBaseProps } from "react-icons";
import { FaHome, FaClock, FaUser, FaLightbulb } from "react-icons/fa";

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
    activeColor: "text-blue-500",
    inactiveColor: "text-gray-500",
    href: "/",
  },
  {
    IconComponent: FaClock,
    text: "ប្រវត្តិតេសន៍",
    activeColor: "text-blue-500",
    inactiveColor: "text-gray-500",
    href: "/allRecords",
  },
  {
    IconComponent: FaLightbulb,
    text: "គន្លឺះសុខភាព",
    activeColor: "text-blue-500",
    inactiveColor: "text-gray-500",
    href: "/healthTips",
  },
  {
    IconComponent: FaUser,
    text: "ប្រវត្តិរូប",
    activeColor: "text-blue-500",
    inactiveColor: "text-gray-500",
    href: "/user-profile", // Corrected URL
  },
];

const Navigationbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="w-auto h-auto fixed bottom-0 left-0 right-0 flex justify-around px-2 py-2 mt-10 bg-gray-100 z-50 ">
      {icons.map((icon) => {
        const isActive = pathname === icon.href;
        const textColorClass = isActive ? icon.activeColor : icon.inactiveColor;
        const bgColorClass = isActive ? "bg-blue-10" : "bg-transparent"; // Apply background color when active
        return (
          <div
            key={icon.text}
            className={`text-center cursor-pointer p-2 rounded-lg ${bgColorClass}`} // Apply background color and padding
            onClick={() => handleNavigation(icon.href)}
          >
            <div className="flex flex-col items-center">
              <icon.IconComponent
                size={24}
                className={`mx-auto ${textColorClass}`}
              />
              <span className={`block mt-[5px] ${textColorClass}`}>
                {icon.text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Navigationbar;
