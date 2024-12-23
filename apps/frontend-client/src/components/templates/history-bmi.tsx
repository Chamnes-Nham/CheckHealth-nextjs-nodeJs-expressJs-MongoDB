"use client"

import React, { useEffect, useState } from "react";
import Button from "@/components/atoms/button";
import Modal from "@/components/molecules/pop-up";
import { RiDeleteBinLine } from "react-icons/ri";

interface BmiRecord {
  _id: string;
  weight: number;
  height: number;
  bmi: number;
  category: string;
  createdDate: string;
  createdTime: string;
}

const BmiCard = () => {
  const [bmiHistory, setBmiHistory] = useState<BmiRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);

  useEffect(() => {
    const fetchBMIHistory = async () => {
      try {
        const response = await fetch("http://localhost:3001/v1/bmi/", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch BMI data");
        }

        const data = await response.json();
        setBmiHistory(data);
        setLoading(false);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchBMIHistory();
  }, []);

  const handleDeleteClick = (id: string) => {
    setSelectedRecord(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRecord) return;
    try {
      const resDeleted = await fetch(
        `http://localhost:3001/v1/bmi/${selectedRecord}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      if (!resDeleted.ok) {
        throw new Error("You cannot delete data check please check.");
      }
      console.log(`Deleted the record with ID: ${selectedRecord}`);
      setBmiHistory((prevHistory) =>
        prevHistory.filter((record) => record._id !== selectedRecord),
      );
    } catch (error) {
      console.error("Error deleting the record: ", error);
    } finally {
      setIsModalOpen(false);
      setSelectedRecord(null);
    }
  };

  return (
    <div className="container mx-auto">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div>
          <ul>
            {bmiHistory.map((bmiRecord) => (
              <li
                key={bmiRecord._id}
                className="mt-[10px] bg-blue-100 rounded-[10px] py-[10px] px-[20px] flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className="border-r-4 border-green-500 pr-3">
                    <div className="text-lg font-semibold">
                      {bmiRecord.height}
                    </div>
                    <div className="text-sm text-gray-600">cm</div>
                    <div className="text-lg font-semibold">
                      {bmiRecord.weight}
                    </div>
                    <div className="text-sm text-gray-600">kg</div>
                  </div>
                  <div className="pl-3">
                    <div className="text-lg font-bold">
                      {bmiRecord.category}
                    </div>
                    <div className="text-sm text-gray-600">
                      BMI: {bmiRecord.bmi}
                    </div>
                    <div className="text-sm text-gray-600">
                      {bmiRecord.createdDate}
                    </div>
                    <div className="text-sm text-gray-600">
                      {bmiRecord.createdTime}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteClick(bmiRecord._id)}
                  className="cursor-pointer hover:text-red-500 transition-colors pb-[50px] text-gray-600"
                >
                  <RiDeleteBinLine size={22} />
                </button>
              </li>
            ))}
          </ul>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="">
            <p className="text-center">
              ចុចប៊ូតុងខាងក្រោមដើម្បីបញ្ជាក់ការលុបប្រវត្តិរបស់អ្នក
            </p>
            <div className="flex justify-center mt-4">
              <Button
                onClick={handleConfirmDelete}
                label="លុបប្រវត្តិ"
                size="large"
                height="39px"
                width="258px"
                backgroundColor="#EF3333"
                textColor="white"
              />
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default BmiCard;


