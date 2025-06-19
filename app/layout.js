"use client"
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { ApiContext } from "./context/APIContext";
import { DataFetchProvider } from "./context/DataFetchContext";
import GlobalState, { AddToCartProvider } from "./context/AddToCart";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

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
          <ApiContext >

            <DataFetchProvider>
              <GlobalState>
                <Header />
                <div className="selection:bg-pink-300 pt-[4rem] selection:text-white">
                  <div className="relative">
                    {children}
                    <div className="absolute bottom-2 right-5">
                      <ScrollToTop />
                    </div>
                  </div>
                </div>
                <Footer />
              </GlobalState>
            </DataFetchProvider>
          </ApiContext>
        </>
      </body>
    </html>
  );
}
