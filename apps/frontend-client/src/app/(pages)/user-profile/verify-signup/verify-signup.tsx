"use client";
import BackArrow from "@/components/atoms/back-arrow";
import Button from "@/components/atoms/button";
import InputField from "@/components/molecules/input-field";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CheckMarkIcon from "@/../public/checkmark-icon.svg";
import WrongIcon from "@/../public/wrong-icon.svg";
import { useRouter } from "next/navigation";
import NavigationBar from "@/components/organisms/navigation-bar";
import axios from "axios";

const VerifySignUp = () => {
  const [verifyCode, setVerifyCode] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  console.log(email);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from submitting the default way

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/verifications`,
        {
          username: email,
          verifyCode: verifyCode,
        },
        {
          withCredentials: true,
        }
      );

      const data = response.data;

      if (response.status === 201) {
        setMessage(data.message);
        setIsSuccess(true);
        router.push("/user-profile/login");
      }
    } catch (error: any) {
      setMessage(error.response.data.message);
      setIsSuccess(false);
    }
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/resend-verification`,
        { username: email },
        {
          withCredentials: true,
        }
      );

      const data = response.data;

      if (response.status === 201) {
        router.push("/user-profile/sign-in");
        setMessage(data.message);
        setIsSuccess(true);
      }
    } catch (error: any) {
      setMessage(error.response.data.message);
      setIsSuccess(false);
    }
  };

  return (
    <div className="mt-[71px] pl-[20px] pr-[20px]">
      <div onClick={router.back}>
        <BackArrow text={"ថយក្រោយ"} />
      </div>

      <form onSubmit={handleVerify}>
        <div className="ml-[20px] mr-[20px]">
          <h1 className="text-center text-2xl pt-[34px]">បញ្ជាក់លេខកូដ</h1>
          <p className="text-center text-[14px] mt-[10px] text-gray-500">
            សូមបញ្ជូលលេខកូដ ៦ខ្ទង់ ដែលបានផ្ញើទៅកាន់ ​​​​ អ៊ីម៉ែល របស់អ្នក
          </p>
          <div className="mt-[20px] w-full">
            <InputField
              label={"លេខកូដ ៦ខ្ទង់"}
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              type={"text"}
            />
          </div>
          {message && (
            <div
              className={`rounded-[10px] p-3 ${isSuccess ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} flex items-center`}
            >
              <div className="mr-3">
                <Image
                  src={isSuccess ? CheckMarkIcon : WrongIcon}
                  alt={"Sign Icon"}
                  width={24}
                  height={24}
                />
              </div>
              <div>{message}</div>
            </div>
          )}
          <div className="flex justify-center mt-[20px]">
            <p className="text-[14px] text-gray-500">បើអ្នកមិនទទួលបានលេខទេ?</p>
            <button
              onClick={handleResendVerification}
              className="text-[14px] text-blue-500 ml-1 focus:outline-none"
            >
              {isResending ? "ផ្ញើម្តងទៀត..." : "ផ្ញើម្តងទៀត"}
            </button>
          </div>

          <Button
            label={"បញ្ជាក់លេខកូដដើម្បីបន្ត"}
            backgroundColor="#3b82f6"
            textColor="white"
            width="100%"
            height="47px"
            type="submit"
          />
        </div>
      </form>
      <NavigationBar />
    </div>
  );
};

export default VerifySignUp;
