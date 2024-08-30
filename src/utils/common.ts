export const fetchUser = async () => {
  const response = await fetch(`${process.env.API_URL}/api/me`, {
    cache: "no-store", // Điều này ngăn không cho Next.js cache kết quả
  });
  const json = await response.json();
  const user = json.data;
  return user;
};
