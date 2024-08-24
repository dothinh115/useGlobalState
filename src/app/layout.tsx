"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalState, GlobalStateContext } from "@/contexts/GlobalStateContext";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [state, setState] = useState<GlobalState>({});

  return (
    <GlobalStateContext.Provider value={{state, setState}}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </GlobalStateContext.Provider>
  );
}
