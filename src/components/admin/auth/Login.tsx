import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import { signIn } from "@/services/authService";
import LogoImage from "../../../assets/images/engida-express-logo3.jpg";
import Button from "@/components/button/Button";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { setRole } = useUserStore();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await signIn(credentials);
      const role = response.data.role;
      console.log("Role:", role);
      setRole(role); // Update global state with role

      // Navigate based on role
      if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (role === "AGENT") {
        navigate("/agent-dashboard");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      console.error("Error during login:", err.response?.data || err.message);
      setError("Invalid email or password"); // Show a user-friendly error
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

        <div className="space-y-6 pb-8">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border p-3 w-full rounded placeholder-gray-500"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
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
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>

        <div>
          <Button buttonText="Login" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
