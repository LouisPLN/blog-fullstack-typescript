import { AppProps } from "next/app";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import Header from "@/components/Header/Header";
// import { AuthProvider } from '../contexts/AuthContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <NextUIProvider className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <Header />
      <Component {...pageProps} />
    </NextUIProvider>
  );
};

export default MyApp;
