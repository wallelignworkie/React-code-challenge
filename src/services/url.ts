export const baseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://tamagn-express-api.onrender.com/api/v1";
  }
  return "https://tamagn-express-api.onrender.com/api/v1";
};
