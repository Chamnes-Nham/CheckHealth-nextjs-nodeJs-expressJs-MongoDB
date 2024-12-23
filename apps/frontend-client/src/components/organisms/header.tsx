"use client";

import React, { useState, useEffect } from "react";
import Logo from "../atoms/logo";
import Image from "next/image";
import CheckMe from "../../../public/CheckMe.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const Header = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); 
    return () => clearTimeout(timer); 
  }, []);

  return (
    <nav className="w-auto h-[71px] mx-[20px]">
      <div className="">
        {loading ? (
          <Skeleton width={200} height={60} borderRadius={10} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Logo
              src={CheckMe}
              alt="CheckMe Logo"
              text="checkMe"
            />
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Header;
