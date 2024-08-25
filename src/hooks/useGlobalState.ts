"use client";
import { GlobalStateContext } from "@/contexts/GlobalStateContext";
import { useContext, useEffect } from "react";

export const useGlobalState = (
  key: string,
  initialValue?: any
): [any, Function] => {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error(
      "useGlobalState phải được sử dụng bên trong GlobalStateProvider"
    );
  }

  const { state, setState } = context;

  const value = state[key] ?? initialValue;

  const setValue = (newValue: any) => {
    setState((prevState) => ({ ...prevState, [key]: newValue }));
  };

  useEffect(() => {
    if (state[key] === undefined && initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [key, initialValue]);

  return [value, setValue];
};
