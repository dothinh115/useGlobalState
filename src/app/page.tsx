"use client"
import { useGlobalState } from "@/hooks/useGlobalState";
import { useEffect } from "react";

export default function Home() {
  const [state_1, setState_1] = useGlobalState('state_1', true) //set giá trị mặc định cho state
  const [state_2, setState_2] = useGlobalState('state_2') //không có giá trị mặc định

  useEffect(() => {
    //thay đổi giá trị của state_1 sau 5s
    setTimeout(() => {
      setState_1(false);
    }, 5000)

    //Đổi giá trị của state_2
    setTimeout(() => {
      setState_2('Giá trị của state_2 nhé')
    }, 2000)
  }, [])

  return (
    <div>
      <div>
        Đây là state 1: {state_1 ? 'true' : 'false'}
      </div>
      <div>
        Đây là state 2: {state_2}
      </div>
    </div>
  );
}
