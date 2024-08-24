"use client";
import React, { createContext } from "react";

export type GlobalState = {
  [key: string]: any;
};

interface GlobalStateContextValue {
  state: GlobalState;
  setState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

export const GlobalStateContext = createContext<
  GlobalStateContextValue | undefined
>(undefined);
