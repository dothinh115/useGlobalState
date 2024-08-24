"use client"
import { useGlobalState } from "@/hooks/useGlobalState";
import { useEffect } from "react";

export default function Home() {
  const [test1, setTest1] = useGlobalState('test');
  const [test2, setTest2] = useGlobalState('test2');


  useEffect(() => {
    //set state 1 sau 5s
    setTimeout(() => {
      setTest1('Nội dung của state 1');
    }, 5000)

    // set state 2 sau 2s
    setTimeout(() => {
      setTest2('Nội dung của state 2');
    }, 2000)
  }, [])

  return (
    <div>
      <div>
        Đây là state 1: {test1}
      </div>
      <div>
        Đây là state 2: {test2}
      </div>
    </div>
  );
}
