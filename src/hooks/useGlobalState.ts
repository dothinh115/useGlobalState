"use client";
import { GlobalStateContext } from "@/contexts/GlobalStateContext";
import { useContext } from "react";

// Create a custom hook to use the global state
export const useGlobalState = (key: string, initialValue?: any) => {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error(
      "useGlobalState phải được sử dụng bên trong GlobalStateProvider"
    );
  }

  const { state, setState } = context;

  // Get value
  const value = state[key] ?? initialValue;

  // Set value
  const setValue = (newValue: any) => {
    setState((prevState) => ({ ...prevState, [key]: newValue }));
  };

  return [value, setValue] as const;
};
