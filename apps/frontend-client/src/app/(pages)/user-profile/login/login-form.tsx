"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import InputField from "@/components/molecules/input-field"; // No modification to InputField
import Button from "@/components/atoms/button";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import BackArrow from "@/components/atoms/back-arrow";
import Image from "next/image";
import GoogleIcon from "@/../public/google-icon.svg";
import { useRouter } from "next/navigation";
import CheckMarkIcon from "@/../public/checkmark-icon.svg";
import WrongIcon from "@/../public/wrong-icon.svg";
import NavigationBar from "@/components/organisms/navigation-bar";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css"; 

interface LoginFormProps {
  className?: string;
  loginEmail?: string;
  showPassword?: false;
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); 

  const router = useRouter();

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_PROXY_URL}/auth/signin`,
        { username: loginEmail, password: loginPassword },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setMessage("ចូលគណនីបានជោគជ័យ");
        setIsSuccess(true);
        setLoading(false);
        router.push("/user-profile");
      }
    } catch (error: any) {
      setMessage(error.response.data.message);
      setIsSuccess(false);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col pt-[71px]">
      <div className="w-full pl-[20px] pr-[20px]">
        <Link href="/">
          <BackArrow text={"ថយក្រោយ"} />
        </Link>

        <form onSubmit={handleLoginSubmit} className="mt-6 pl-[20px] pr-[20px]">
          <div className="flex justify-center">
            {loading ? (
              <Skeleton height={60} width={200} borderRadius={15} className="mb-5" />
            ) : (
              <h2 className="text-2xl mb-6 text-center text-gray-700 transition-opacity duration-500 ease-in-out">
                បញ្ជូលគណនី
              </h2>
            )}
          </div>

          {/* Wrap InputField in a div and apply the className here */}
          <div className="mb-4 transition-opacity duration-500 ease-in-out">
            {loading ? (
              <Skeleton height={60} borderRadius={15} />
            ) : (
              <div className="transition-opacity duration-500 ease-in-out">
                <InputField
                  label="អុីម៉ែល"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="mb-6 relative transition-opacity duration-500 ease-in-out">
            {loading ? (
              <Skeleton height={60} borderRadius={15} />
            ) : (
              <div className="transition-opacity duration-500 ease-in-out">
                <InputField
                  label="ពាក្យសម្ងាត់"
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
            )}
            {!loading && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 transition-transform duration-300 ease-in-out"
              >
                {showPassword ? (
                  <MdVisibility size={20} />
                ) : (
                  <MdVisibilityOff size={20} />
                )}
              </button>
            )}
          </div>

          <div className="flex items-center justify-between mb-6">
            <Link href="/user-profile/sign-up">
              <span className="text-blue-500 ml-2 cursor-pointer hover:underline transition-all duration-300 ease-in-out">
                បង្កើតគណនី
              </span>
            </Link>
          </div>

          {message && (
            <div
              className={`rounded-[10px] p-3 mb-4 mt-[20px] flex items-center transition-all duration-500 ease-in-out ${
                isSuccess ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              }`}
            >
              <div className="mr-3">
                <Image
                  src={isSuccess ? CheckMarkIcon : WrongIcon}
                  alt="Status Icon"
                  width={24}
                  height={24}
                />
              </div>
              <div>{message}</div>
            </div>
          )}

          {loading ? (
            <Skeleton height={60} width="100%" borderRadius={15} />
          ) : (
            <div  className="transition-all duration-500 ease-in-out hover:bg-blue-700">
            <Button
              label="បញ្ជូលគណនី"
              size="medium"
              backgroundColor="#3385FF"
              width="100%"
              textColor="white"
              height="45px"
              type="submit"
            />
            </div>
          )}

          <div className="border-t border-gray-400 w-3/4 mt-[20px] mb-[20px] mx-auto transition-all duration-500 ease-in-out"></div>

          <div className="mt-[20px]">
            {loading ? (
              <Skeleton height={60} width="100%" borderRadius={15} />
            ) : (
              <button className="flex justify-center items-center w-full h-[50px] border border-gray-500 rounded-[10px] hover:bg-gray-100 transition-all duration-300 ease-in-out">
                <div className="mr-1">
                  <Image src={GoogleIcon} alt="google-icon" width={34} height={34} />
                </div>
                <div>Login ជាមួយ​ Google</div>
              </button>
            )}
          </div>
        </form>
      </div>
      <NavigationBar />
    </div>
  );
};

export default LoginForm;
