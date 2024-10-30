"use client";
import { GlobalState, GlobalStateContext } from "@/contexts/GlobalStateContext";
import { TUser } from "@/types/user";
import { USER } from "@/utils/constant";
import { ReactNode, useState } from "react";

type TProps = {
  children: ReactNode;
  user: TUser | null;
};

function AppWrapper({ children, user }: TProps) {
  const [state, setState] = useState<GlobalState>({
    [USER]: user,
  });

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export default AppWrapper;
