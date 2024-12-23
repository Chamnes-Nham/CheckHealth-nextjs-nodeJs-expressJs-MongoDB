"use client";
import BackArrow from "@/components/atoms/back-arrow";
import Button from "@/components/atoms/button";
import InputField from "@/components/molecules/input-field";
import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Image from "next/image";
import CheckMarkIcon from "@/../public/checkmark-icon.svg";
import WrongIcon from "@/../public/wrong-icon.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavigationBar from "@/components/organisms/navigation-bar";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; // Import the skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // Import the skeleton styles

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/signup`,
        {
          username: email,
          password: loginPassword,
          role: "User",
        },
        {
          withCredentials: true,
        }
      );

      const data = response.data; // Parse the response body as JSON

      if (response.status === 201) {
        localStorage.setItem("email", email);
        router.push("/user-profile/verify-signup"); // Store email in localStorage so i can use in the verify
        setMessage(data.message); // Show success message if response is OK
        setIsSuccess(true);
      }
    } catch (error: any) {
      setMessage(error.response.data.message); // Fallback message for unexpected errors
      setIsSuccess(false);
    }
  };

  return (
    <div className="pl-[20px] pr-[20px] pt-[71px]">
      <div onClick={router.back}>
        <BackArrow text={"ថយក្រោយ"} />
      </div>

      <form onSubmit={handleLogin}>
        <div className="mt-[31px] pl-[20px] pr-[20px]">
          <div className="flex justify-center">
            {loading ? (
              <Skeleton height={60} width={200} borderRadius={20} /> // Show skeleton while loading
            ) : (
              <h2 className="text-2xl mb-6 text-center text-gray-700">
                បង្កើតគណនី
              </h2>
            )}
          </div>

          {loading ? (
            // Display loading skeletons while submitting
            <>
              <div className="pt-[30px]">
                <Skeleton height={60} borderRadius={20} />
              </div>
              <div className="pt-[20px]">
                <Skeleton height={60} borderRadius={20} />
              </div>
            </>
          ) : (
            // Show form inputs when not loading
            <>
              <div className="pt-[40px]">
                <InputField
                  label={"អ៊ីមែល"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type={"email"}
                />
              </div>
              <div className="relative">
                <InputField
                  label="ពាក្យសម្ងាត់"
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <MdVisibility size={20} />
                  ) : (
                    <MdVisibilityOff size={20} />
                  )}
                </button>
              </div>
            </>
          )}

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

          <div>
            {loading ? (
              <Skeleton
                height={60}
                width="100%"
                borderRadius={15}
                className="mt-10"
              /> // Show skeleton for button while loading
            ) : (
              <Button label={"​បង្កើតគណនី"} width="100%" type="submit" />
            )}
          </div>
        </div>
      </form>
      <div className="border-t border-gray-400 w-3/4 mt-[20px] mb-[20px] mx-auto"></div>
      <div className="text-center">
        {loading ? (
          <Skeleton height={30} width={150} borderRadius={10} /> // Skeleton for the "Login" link
        ) : (
          <>
            មានគណនីហើយ?{" "}
            <Link href={"/user-profile/login"}>
              <span className="text-blue-500">Login</span>
            </Link>
          </>
        )}
      </div>
      <NavigationBar />
    </div>
  );
};

export default SignUpForm;