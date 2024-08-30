import { headers } from "next/headers";

export const serverUserFetch = async () => {
  const clientHeaders = headers();
  const response = await fetch(`${process.env.API_URL}/api/me`, {
    cache: "no-store", // ngăn không cho next cache kết quả
    ...(clientHeaders && {
      headers: clientHeaders,
    }),
  });
  const json = await response.json();
  const user = json.data;
  return user;
};
