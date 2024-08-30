import { headers } from "next/headers";

export const fetchUser = async () => {
  const response = await fetch(`${process.env.API_URL}/api/me`, {
    cache: "no-store", // ngăn không cho next cache kết quả
    headers: headers(),
  });
  const json = await response.json();
  const user = json.data;
  return user;
};
