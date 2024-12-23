"use client";
import InputField from "@/components/molecules/input-field";
import TextAreaField from "@/components/molecules/textarea-field";
import ToggleButton from "@/components/molecules/toggle-button";
import React, { useState, useRef } from "react";
import Button from "@/components/atoms/button";
import Image from "next/image";
import PlaceHolderImage from "@/../public/placeholder-image.jpg";
import CameraPlaceHolder from "@/../public/camera-placeholder.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CameraComponent: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultSystolic: number = 100;
  const defaultDiastolic: number = 90;

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRetake = () => {
    setImageSrc(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // choose a file feature

  const fileInputReff = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  const handleButtonClick = () => {
    fileInputReff.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result as string);

       // router.push("/bloodPressure/bloodPressureResult");
      };

      reader.readAsDataURL(file);
    }
  };

  const [systolic, setSystolic] = useState<number | string>("");
  const [diastolic, setDiastolic] = useState<number | string>("");
  const [note, setNote] = useState<string>("");

  const postBloodPressureData = async () => {
    try {
      const response = await fetch("http://localhost:3001/v1/bloodPressure/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systolic,
          diastolic
        }),
        credentials: "include", 
      });

      console.log("systolic", systolic)
      console.log("diastolic", diastolic)
      console.log("status", status)

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      console.log("Blood pressure data successfully posted");
    } catch (error) {
      console.error("Error posting blood pressure data:", error);
    }
  };

  return (
    <div className="pt-[52px]">
      <ToggleButton
        button1Label={"ពិនិត្យសម្ពាធឈាម"}
        button2Label={"ស្កេនតាមកាំមេរា"}
        content1={
          <div className="mt-[20px]">
            <InputField
              label={"សម្ពាធខ្ពស់"}
              value={systolic}
              onChange={(e) =>
                setSystolic(
                  e.target.value === "" ? "" : parseFloat(e.target.value),
                )
              }
              type={"number"}
            />
            <InputField
              label={"សម្ពាធទាប"}
              value={diastolic}
              onChange={(e) =>
                setDiastolic(
                  e.target.value === "" ? "" : parseFloat(e.target.value),
                )
              }
              type={"number"}
            />
            <TextAreaField
              label={"កំណត់ចំណាំ"}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Link
              href={{
                pathname: "/bloodPressure/bloodPressureResult",
                query: {
                  systolic: systolic === "" ? defaultSystolic : systolic,
                  diastolic: diastolic === "" ? defaultDiastolic : diastolic,
                },
              }}
            >
              <Button
                label={"ពិនិត្យ"}
                width={"100%"}
                height="47px"
                textColor={"white"}
                backgroundColor={"#3385FF"}
                onClick={postBloodPressureData}
              />
            </Link>
            <div
              onClick={() => {
                setDiastolic("");
                setSystolic("");
                setNote("");
              }}
            >
              <Button
                label={"សម្អាត"}
                width={"100%"}
                height="47px"
                textColor={"black"}
                backgroundColor={"white"}
              />
            </div>
          </div>
        }
        content2={
          <div className=" mt-[20px] ">
            {/* -----------------------------------Scan Feature -------------------------------*/}
            <div className="flex flex-col items-center">
              <div>
                {imageSrc === null ? (
                  <Image src={CameraPlaceHolder} alt={"camera"} />
                ) : (
                  ""
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleCapture}
                ref={fileInputRef}
                className="hidden"
                placeholder="abc"
              />
              {imageSrc ? (
                <div className="w-full">
                  <Image
                    src={imageSrc}
                    alt="Captured"
                    className="w-full max-w-md rounded-lg shadow-lg"
                  />
                  <div>
                    <Link
                      href={{
                        pathname: "/bloodPressure/bloodPressureResult",
                        query: {
                          systolic: defaultSystolic,
                          diastolic: defaultDiastolic,
                        },
                      }}
                    >
                      <Button
                        label={"យល់ព្រម"}
                        width="100%"
                        height="47px"
                        textColor="white"
                        backgroundColor="#3385FF"
                      />
                    </Link>
                  </div>
                  <div onClick={handleRetake}>
                    <Button
                      label={"ចាប់យកម្ដងទៀត"}
                      width="100%"
                      height="47px"
                      textColor="black"
                      backgroundColor="white"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  {/* -------------------------choose file-------------------------------- */}
                  <div className="flex flex-row pt-[30px]">
                    <div className="w-[100px] h-[100px] relative overflow-hidden">
                      <Image
                        src={selectedImage ? selectedImage : PlaceHolderImage}
                        alt="Selected"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex flex-col flex-auto pl-[37px]">
                      <div className="h-1/2 flex items-center">
                        <p className="text-sm">
                          បញ្ចូលរូបភាពមានទំហំ តិចជាង ២០០ គីឡូបី
                        </p>
                      </div>
                      <div className="h-1/2 flex items-center">
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputReff}
                          onChange={handleFileChange}
                          className="hidden"
                          placeholder="abc"
                        />
                        <button
                          onClick={handleButtonClick}
                          className="border-emerald-500 border pl-[10px] pr-[10px] pt-[5px] pb-[5px] text-[12px] font-medium text-emerald-500 rounded-lg hover:bg-blue-500 transition duration-200 ease-in-out"
                        >
                          ជ្រើសរើស​ឯកសារ
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------end choose file-------------------------------- */}
                  <div onClick={handleStartCamera}>
                    <Button
                      label={"ចាប់យក"}
                      width="100%"
                      height="47px"
                      textColor="white"
                      backgroundColor="#3385FF"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        }
      />
    </div>
    //change for deploy
  );
};

export default CameraComponent;
