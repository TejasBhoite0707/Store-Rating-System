import {
  useForm,
} from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { signupUser } from "../../api/authApi";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const signupSchema = z.object({
  name: z
    .string()
    .min(
      20,
      "Name must be at least 20 characters"
    )
    .max(60),

  email: z
    .string()
    .email(),

  address: z
    .string()
    .max(400),

  password: z
    .string()
    .min(8)
    .max(16)
    .regex(
      /^(?=.*[A-Z])(?=.*[\W_]).+$/,
      "Password must contain uppercase and special character"
    ),
});

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:
      zodResolver(
        signupSchema
      ),
  });

  const onSubmit = async (
    data
  ) => {
    try {
      await signupUser(data);

      toast.success(
        "Signup successful"
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Signup failed"
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
          Signup
        </h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-2">
            Name
          </label>

          <input
            type="text"
            {...register("name")}
            className="w-full border px-4 py-2 rounded"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {
                errors.name
                  .message
              }
            </p>
          )}
        </div>

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

        {/* Address */}
        <div className="mb-4">
          <label className="block mb-2">
            Address
          </label>

          <textarea
            {...register(
              "address"
            )}
            className="w-full border px-4 py-2 rounded"
          />

          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {
                errors.address
                  .message
              }
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
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
            ? "Creating..."
            : "Signup"}
        </button>

        <p className="text-center mt-4">
          Already have account?
          <span
            onClick={() =>
              navigate("/login")
            }
            className="text-blue-500 cursor-pointer ml-1"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;