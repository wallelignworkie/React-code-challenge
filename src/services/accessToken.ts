export const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token not found");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
