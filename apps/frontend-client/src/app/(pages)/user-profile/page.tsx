import React from "react";
import UserProfile from "./user-profile";
import { cookies } from "next/headers";

const Page = () => {
  const cookieStore = cookies();
  const username = cookieStore.get("username")?.value;

  return (
    <div>
      <UserProfile userId={username || ""} />
    </div>
  );
};

export default Page;
