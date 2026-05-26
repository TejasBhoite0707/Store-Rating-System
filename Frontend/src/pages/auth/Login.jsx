import {
  useForm,
} from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginUser } from "../../api/authApi";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email(),

  password: z.string(),
});

const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:
      zodResolver(loginSchema),
  });

  const onSubmit = async (
    data
  ) => {
    try {
      const response =
        await loginUser(data);

      localStorage.setItem(
        "token",
        response.data.data.token
      );

      setUser(
        response.data.data.user
      );

      toast.success(
        "Login successful"
      );

      const role =
        response.data.data.user
          .role;

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (
        role === "STORE_OWNER"
      ) {
        navigate("/owner");
      } else {
        navigate("/stores");
      }
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2">
            Email
          </label>

          <input
            type="email"
            {...register("email")}
            className="w-full border px-4 py-2 rounded"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {
                errors.email
                  .message
              }
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-2">
            Password
          </label>

          <input
            type="password"
            {...register(
              "password"
            )}
            className="w-full border px-4 py-2 rounded"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {
                errors.password
                  .message
              }
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded"
        >
          {isSubmitting
            ? "Logging in..."
            : "Login"}
        </button>

        <p className="text-center mt-4">
          Don’t have an account?
          <span
            onClick={() =>
              navigate("/signup")
            }
            className="text-blue-500 cursor-pointer ml-1"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;