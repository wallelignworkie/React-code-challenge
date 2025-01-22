import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import { signIn } from "@/services/authService";
import LogoImage from "../../assets/images/engida-express-logo2.jpg";
import Button from "@/components/button/Button";
import ErrorMessage from "../Alert/ErrorMessage";
import { baseUrl } from "@/services/url";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setRole } = useUserStore();
  const navigate = useNavigate();
  console.log({ baseUrl });
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await signIn(credentials, setLoading);

      // Extract data from the API response
      const { role } = response.data;
      const { access_token, refresh_token } = response;

      console.log("Role:", role);

      // Save tokens in localStorage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      // Set role in Zustand state
      setRole(role);

      // Navigate based on role
      if (role === "ADMIN" || role === "AGENT") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      console.error("Error during login:", err.response?.data || err.message);
      setError("Invalid phone or password"); // Show a user-friendly error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-10 pb-10 mb-4 max-w-lg w-full min-h-[540px] space-y-6"
        onSubmit={handleLogin} // Attach the corrected handler
      >
        <div className="flex justify-center pb-[30px]">
          <img src={LogoImage} alt="logo" className="w-full h-32" />
        </div>
        {error && <ErrorMessage user_text={error} />}

        <div className="space-y-6 pb-8">
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Phone
            </label>
            <input
              id="phone"
              type="phone"
              className="border p-3 w-full rounded placeholder-gray-500"
              placeholder="Phone"
              value={credentials.phone}
              onChange={(e) =>
                setCredentials({ ...credentials, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="border p-3 w-full rounded placeholder-gray-400 placeholder:text-md"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <Button
            disabled={loading}
            buttonText={loading ? "Loading..." : "Login"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
