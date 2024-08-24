"use client";
import React, { createContext } from "react";

// Define the shape of the global state
export type GlobalState = {
  [key: string]: any;
};

// Define the shape of the context value
interface GlobalStateContextValue {
  state: GlobalState;
  setState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

// Create a context with an initial value of undefined
export const GlobalStateContext = createContext<
  GlobalStateContextValue | undefined
>(undefined);
