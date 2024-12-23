"use client"
import Header from "@/components/organisms/header";
import TitleBlock from "@/components/atoms/title-block";
import Cards from "@/components/organisms/card-statuses";
import Func from "@/components/organisms/funcs-block";
import Swiper from "@/components/molecules/tip";
import NavigationBar from "@/components/organisms/navigation-bar";
import { useEffect, useState } from "react";
import { TypewriterEffectSmooth } from "@/components/organisms/typewriter-effect";
//change for deploy
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mb-[90px]">
        <Header />
        <TitleBlock text={<TypewriterEffectSmooth words={[{ text: "លទ្ធផលចុងក្រោយបំផុត" }]} />} />
        <Cards />
        <TitleBlock text={<TypewriterEffectSmooth words={[{ text: "ពិនិត្យសុខភាពរបស់អ្នកឥលូវនេះ" }]} />} />
        <Func />
        <TitleBlock text={<TypewriterEffectSmooth words={[{ text: "គន្លឹះសុខភាព" }]} />} />
        <Swiper />
      </div>
      <NavigationBar />
    </main>
  );
}
