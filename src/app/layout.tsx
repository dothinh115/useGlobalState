"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalState, GlobalStateContext } from "@/contexts/GlobalStateContext";
import { useEffect, useState } from "react";
import { USER } from "@/utils/constant";
import { useFetch } from "@/hooks/useFetch";
import { TUser } from "./api/me/route";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [state, setState] = useState<GlobalState>({});
  const {data} = useFetch<{data: TUser}>('/api/me');
  
  useEffect( () => {
    setState({
      [USER]: data?.data
    })
  }, [data])

  return (
    <GlobalStateContext.Provider value={{state, setState}}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </GlobalStateContext.Provider>
  );
}
