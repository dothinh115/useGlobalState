"use client";
import { useGlobalState } from "@/hooks/useGlobalState";
import { TUser } from "@/types/user";
import { USER } from "@/utils/constant";

export default function HomePage() {
  const [user] = useGlobalState<TUser>(USER);
  return user?.email;
}
