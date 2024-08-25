"use client";
import { GlobalStateContext } from "@/contexts/GlobalStateContext";
import { useContext, useEffect } from "react";

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

  // Xác định giá trị hiện tại từ state hoặc sử dụng giá trị khởi tạo nếu không tồn tại.
  const value: T = state[key] !== undefined ? state[key] : initialValue;

  // Hàm để cập nhật giá trị trong state.
  const setValue = (newValue: T) => {
    setState((prevState) => ({ ...prevState, [key]: newValue }));
  };

  // Sử dụng useEffect để thiết lập giá trị ban đầu nếu nó chưa được thiết lập.
  useEffect(() => {
    if (state[key] === undefined && initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [key, initialValue]);

  return [value, setValue];
};
