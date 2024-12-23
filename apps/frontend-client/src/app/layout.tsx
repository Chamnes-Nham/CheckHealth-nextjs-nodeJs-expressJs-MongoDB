import type { Metadata } from "next";
import { Noto_Serif_Khmer } from "next/font/google";
import "./globals.css";

const notoSerifKhmer = Noto_Serif_Khmer({ subsets: ["khmer"] });

export const metadata: Metadata = {
  title: "Home | CheckMe",
  description:
    "We provide the function to check blood pressure and BMI calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSerifKhmer.className}>{children}</body>
    </html>
  );
}
