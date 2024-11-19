"use client"
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

import { DataFetchProvider } from "./context/DataFetchContext";
import { AddToCartProvider } from "./context/AddToCart";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Set Jost as the primary font
const jostFont = localFont({
  src: "./fonts/Jost-VariableFont_wght.ttf",
  variable: "--font-primary",
  weight: "100 900",
});

// export const metadata = {
//   title: "E-Commerce App",
//   description: "Welcome to E-Commerce app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${jostFont.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ fontFamily: `var(--font-primary), sans-serif` }}
      >
        <>
          <DataFetchProvider>
            <AddToCartProvider>
              <Header />
              <div className="selection:bg-pink-300 pt-[4rem] selection:text-white">
                {children}
              </div>
              <Footer />
            </AddToCartProvider>
          </DataFetchProvider>
        </>
      </body>
    </html>
  );
}
