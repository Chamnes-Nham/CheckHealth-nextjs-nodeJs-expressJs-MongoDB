
"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/atoms/button";
import Modal from "@/components/molecules/pop-up";
import { RiDeleteBinLine } from "react-icons/ri";

interface BloodPressureRecord {
  _id: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  status: string;
  category: string;
  time: string;
  date: string;
}

const BloodPressureCard = () => {
  const [bpHistory, setBpHistory] = useState<BloodPressureRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);

  useEffect(() => {
    const fetchBloodPressureHistory = async () => {
      try {
        const response = await fetch("http://localhost:3001/v1/bloodpressure/", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blood pressure data");
        }

        const data = await response.json();
        setBpHistory(data);
        setLoading(false);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchBloodPressureHistory();
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
        `http://localhost:3001/v1/bloodpressure/${selectedRecord}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!resDeleted.ok) {
        throw new Error("You cannot delete data, please check.");
      }
      console.log(`Deleted the record with ID: ${selectedRecord}`);
      setBpHistory((prevHistory) =>
        prevHistory.filter((record) => record._id !== selectedRecord)
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
            {bpHistory.map((bpRecord) => (
              <li
                key={bpRecord._id}
                className="m-[3px] mt-3 bg-blue-100 rounded-[10px] py-[10px] px-[10px] flex justify-between items-center"
              ><div className="flex items-center">
              <div className="border-r-[5px] p-2 border-green-500 ">
                <div className="text-lg font-semibold">{bpRecord.systolic}</div>
                <div className="text-lg font-semibold">{bpRecord.diastolic}</div>
                <div className="text-sm text-gray-600 -pl-[5px]">mmHg</div>
              </div>
              <div className="pl-3">
                <div className="text-lg font-bold">{bpRecord.status}</div>
                <div className="text-sm text-gray-600"></div>
                <div className="text-sm text-gray-600">{bpRecord.date}</div>
                <div className="text-sm text-gray-600">{bpRecord.time}</div>
              </div>
            </div>
                <button
                  onClick={() => handleDeleteClick(bpRecord._id)}
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

export default BloodPressureCard;
