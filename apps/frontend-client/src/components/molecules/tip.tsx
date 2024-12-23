"use client";

import React, { useEffect, useState } from "react";
import BloodPressureTips from "./swiper";

interface CardData {
  _id: string;
  CardDetailPage: any;
  healthTipsId: string;
  img: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
  category: string;
}

const Home: React.FC = () => {
  const [bloodPressureTipsData, setBloodPressureTipsData] = useState<
    CardData[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3005/health-tips")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setBloodPressureTipsData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>កំពុងផ្ទុកទិន្ន័យគន្លឹះថែរក្សាសុខភាព</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      {bloodPressureTipsData ? (
          <BloodPressureTips bloodPressureTipsData={bloodPressureTipsData} />
      ) : (
        <p>មិនមានទិន្ន័យ</p>
      )}
    </main>
  );
};

export default Home;
