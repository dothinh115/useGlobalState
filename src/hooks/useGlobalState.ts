"use client";
import { GlobalStateContext } from "@/contexts/GlobalStateContext";
import { useCallback, useContext, useEffect } from "react";

export const useGlobalState = <T = any>(
  key: string,
  initialValue?: T
): [T, (newValue: T) => void] => {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error(
      "useGlobalState phải được sử dụng bên trong GlobalStateProvider"
    );
  }

  const { state, setState } = context;

  const value: T = state[key] !== undefined ? state[key] : initialValue;

  const setValue = useCallback(
    (newValue: T) => {
      setState((prevState) => ({ ...prevState, [key]: newValue }));
    },
    [setState, key]
  );

  useEffect(() => {
    if (state[key] === undefined && initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [key, initialValue, state, setValue]);

  return [value, setValue];
};
