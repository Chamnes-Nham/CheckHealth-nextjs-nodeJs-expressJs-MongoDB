"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  FaBell,
  FaCamera,
  FaAngleRight,
  FaSignOutAlt,
  FaPen,
  FaCheck,
} from "react-icons/fa";
import { User } from "./types/types";
import Link from "next/link";
import Navigationbar from "@/components/organisms/navigation-bar";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; // Import Skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton styles

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [editingField, setEditingField] = useState<keyof User | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const getPlaceholder = (field: keyof User) => {
    switch (field) {
      case "name":
        return "ឈ្មោះ";
      case "gender":
        return "ភេទ";
      case "age":
        return "អាយុ";
      case "weight":
        return "ទម្ងន់";
      case "height":
        return "កម្ពស់";
      default:
        return "Enter value";
    }
  };
  //find user from database
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_PROXY_URL}/users/${userId}`, //user service route,
          {
            withCredentials: true,
          }
        );

        setTimeout(() => {
          setUserInfo(response.data);
          setLoading(false); // Set loading to false after data is fetched
        }, 500);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
          }, 500); // Retry after 3 seconds
        } else {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [userId, retryCount]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/logout`, // auth service route
        {},
        { withCredentials: true } // Ensure cookies are sent with the request
      );

      window.location.href = "/user-profile/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleEditClick = (field: keyof User) => {
    setEditingField(field);
    setInputValue(userInfo?.[field]?.toString() || "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  // update user in database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingField) {
      try {
        const updatedData = { [editingField]: inputValue };
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_PROXY_URL}/users/${userId}`, // user service route
          updatedData,
          {
            withCredentials: true,
          }
        );
        setUserInfo(response.data);
        setEditingField(null);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const defaultProfilePicture = "/profile-users/bunthorn.png";

  // if (loading) {
  //   return <div>Loading... Please wait.</div>;
  // }

  if (loading) {
    // Display skeletons while data is loading
    return (
      <div className="flex items-center justify-center p-4 ">
        <div className="text-center">
          <Skeleton circle={true} height={150} width={150} />
          <Skeleton height={40} width={200} className="mt-3 mb-4" borderRadius={15} />
          <Skeleton height={250} width={350} className="mt-4" borderRadius={15}/>
          <Skeleton height={60} width={350} className="mt-8" borderRadius={15}/>
          <Skeleton height={60} width={350} className="mt-2" borderRadius={15}/>
        </div>
      </div>
    );
  }

  // if (!userInfo) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       Loading...
  //     </div>
  //   );
  // }
  if (!userInfo) {
    return (
      <div className="mb-20">
        <div className="px-[20px] max-w-xl m-auto">
          {/* Profile Header Skeleton */}
          <div className="relative flex flex-col items-center rounded-3xl py-8 px-[20px]">
            {/* Profile Picture Skeleton */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-full animate-pulse"></div>

            {/* Camera Icon Skeleton */}
            <div className="absolute bottom-0 right-0 bg-gray-300 p-3 rounded-full shadow animate-pulse"></div>

            {/* Name Skeleton */}
            <div className="mt-4 w-3/4 h-6 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* User Information Skeleton */}
          <div className="bg-white rounded-3xl py-[20px] px-[20px] mt-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center ${
                    index < 3 ? "border-b border-gray-200 pb-4" : ""
                  }`}
                >
                  <div className="w-1/3 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-1/4 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="rounded-3xl py-6 space-y-4 mt-6">
            <div className="w-full h-10 bg-gray-300 rounded-2xl animate-pulse"></div>
            <div className="w-full h-10 bg-gray-300 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
    return <div>Failed to load user data. Please refresh the page.</div>;
  }

  return (
    <div className="mb-20">
      <div className="px-[20px] max-w-xl m-auto">
        {/* Profile Header */}
        <div className="relative flex flex-col items-center rounded-3xl py-8 px-[20px]">
          <div className="relative">
            <img
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
              src={
                selectedImage ||
                userInfo.profilePicture ||
                defaultProfilePicture
              }
              alt={`${userInfo.name || "User"}'s profile`}
            />
            <button
              className="absolute bottom-0 right-0 bg-white p-2 shadow rounded-full"
              onClick={handleImageClick}
            >
              <FaCamera className="text-black" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <h2 className="mt-4 font-bold text-xl text-gray-800 flex space-x-2 items-center">
            {editingField === "name" ? (
              <form onSubmit={handleSubmit} className="flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={getPlaceholder("name")}
                  autoFocus
                  style={{
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    padding: "0",
                    width: `${Math.max(inputValue.length, getPlaceholder("name").length) + 1}ch`,
                  }}
                  className="focus:outline-none bg-transparent"
                />
                <button type="submit" className="ml-2">
                  <FaCheck className="text-green-500 text-xl" />
                </button>
              </form>
            ) : (
              <>
                <span>{userInfo?.name ?? "Guest"}</span>
                <button onClick={() => handleEditClick("name")}>
                  <FaPen className="text-gray-500 text-sm" />
                </button>
              </>
            )}
          </h2>
        </div>

        {/* User Information */}
        <div className="bg-white rounded-3xl py-[20px] px-[20px]">
          <div className="space-y-4">
            {[
              { label: "ភេទ", field: "gender" as keyof User },
              { label: "អាយុ", field: "age" as keyof User },
              { label: "ទម្ងន់", field: "weight" as keyof User },
              { label: "កម្ពស់", field: "height" as keyof User },
            ].map((item, index, array) => (
              <div
                key={item.label}
                className={`flex justify-between items-center text-gray-700 ${index < array.length - 1 ? "border-b border-gray-200 pb-4" : ""}`}
              >
                <span>{item.label}</span>
                {editingField === item.field ? (
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center space-x-2 flex-grow justify-end"
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder={getPlaceholder(item.field)}
                      autoFocus
                      style={{
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        padding: "0",
                        width: `${Math.max(inputValue.length, getPlaceholder(item.field).length) + 1}ch`, // Adjust width based on content length
                        textAlign: "right",
                      }}
                      className="focus:outline-none bg-transparent"
                    />
                    <button type="submit">
                      <FaCheck className="text-green-500 text-xl" />
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-500">
                      {item.field === "age"
                        ? `${userInfo?.age ?? "N/A"} ឆ្នាំ`
                        : item.field === "weight"
                          ? `${userInfo?.weight ?? "N/A"} គីឡូក្រាម`
                          : item.field === "height"
                            ? `${userInfo?.height ?? "N/A"} ម៉ែត្រ`
                            : `${userInfo?.gender ?? "N/A"}`}
                    </span>
                    <button onClick={() => handleEditClick(item.field)}>
                      <FaPen className="text-gray-500 text-sm" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="rounded-3xl py-6 space-y-4">
          <Link href={"/user-profile/reminder"}>
            <button className="flex items-center justify-between text-gray-700 bg-white hover:shadow-lg shadow-sm cursor-pointer w-full py-4 px-4 rounded-2xl">
              <div className="flex items-center">
                <FaBell className="mr-3 text-blue-600" />
                <span className="font-medium">ការរំលឹក</span>
              </div>
              <FaAngleRight className="text-gray-400" />
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-between text-gray-700 bg-white hover:shadow-lg shadow-sm cursor-pointer w-full py-4 px-4 rounded-2xl"
          >
            <div className="flex items-center">
              <FaSignOutAlt className="mr-3 text-red-500" />
              <span className="font-medium text-red-500">ចាកចេញ</span>
            </div>
            <FaAngleRight className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Navigationbar at the bottom */}
      <Navigationbar />
    </div>
  );
};

export default UserProfile;