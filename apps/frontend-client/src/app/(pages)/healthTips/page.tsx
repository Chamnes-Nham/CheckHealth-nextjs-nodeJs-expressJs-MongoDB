"use client";

import BackArrow from "@/components/atoms/back-arrow";
import Link from "next/link";
import CardListComponent from "./card-list";
import NavigationBar from "@/components/organisms/navigation-bar";

const HealthTipsPage = () => {
  return (
    <div>
      <div className="max-w-screen-2xl mx-auto bg-gray-100 p-[20px] min-h-screen flex flex-col mb-[65px]">
        <Link href={"/"}>
          <BackArrow text={"គន្លឹះក្នុងថែរក្សាសុខភាព"} />
        </Link>
        <CardListComponent />
      </div>
      <NavigationBar />
    </div>
  );
};

export default HealthTipsPage;
