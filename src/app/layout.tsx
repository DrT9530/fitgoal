import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({ 
  weight: ['300', '400', '700', '900'],
  subsets: ["latin"],
  variable: '--font-merriweather'
});

export const metadata: Metadata = {
  title: "FITGOAL - Fuzzy Intelligent Target Goal Calorie Advisor & Lifestyle",
  description: "Calculate your calorie needs using Mamdani Fuzzy Logic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} font-sans`}>{children}</body>
    </html>
  );
}
