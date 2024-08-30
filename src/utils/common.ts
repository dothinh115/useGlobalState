export const fetchUser = async () => {
  const response = await fetch(`${process.env.API_URL}/api/me`);
  const user = await response.json();
  return user;
};
