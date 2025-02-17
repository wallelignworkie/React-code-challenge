import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import LogoImage from "../../assets/images/engida-express-logo2.jpg";
import { useNavigate } from "react-router-dom";
import { signIn } from "@/services/authService"; // API function
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../../store/authSlice";
import { RootState } from "@/store/store"; // RootState type
import Button from "@/components/button/Button";
import ErrorMessage from "../Alert/ErrorMessage";

// Define Login Form Types
interface LoginFormValues {
  phone: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth); // Get auth state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  // ✅ Use TanStack Query to handle login API call
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      return signIn(data); // API call
    },

    // ✅ Runs before the API call
    onMutate: () => {
      dispatch(loginRequest()); // Start loading state
    },

    onSuccess: (response) => {
      const { access_token, refresh_token, data } = response;

      const user = {
        id: data.id,
        firstName: data.firstName,
        email: data.email,
        role: data.role,
      };

      dispatch(
        loginSuccess({
          user,
          accessToken: access_token,
          refreshToken: refresh_token,
        })
      );

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate(
        user.role === "ADMIN" || user.role === "AGENT" ? "/dashboard" : "/"
      );
    },

    onError: (error: any) => {
      dispatch(loginFailure(error.message)); // Save error state
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data); // Trigger API call
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-10 pb-10 mb-4 max-w-lg w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-center pb-[30px] ">
          <img src={LogoImage} alt="logo" className="w-full h-32 rounded-md" />
        </div>

        {error && <ErrorMessage user_text={error} />}

        <div className="space-y-6 pb-8">
          {/* Phone Input */}
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Phone
            </label>
            <input
              id="phone"
              type="text"
              className="border p-3 w-full rounded"
              placeholder="Phone"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Password Input */}
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
              className="border p-3 w-full rounded"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          disabled={loginMutation.isPending}
          buttonText={loading ? "Loading..." : "Login"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default Login;
