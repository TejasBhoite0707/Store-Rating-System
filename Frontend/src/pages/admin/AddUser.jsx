import {
  useForm,
} from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import {
  createUser,
} from "../../api/adminApi";

import AdminLayout from "../../layouts/AdminLayout";

const schema = z.object({
  name: z
    .string()
    .min(20)
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

  role: z.enum([
    "ADMIN",
    "USER",
    "STORE_OWNER",
  ]),
});

const AddUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver:
      zodResolver(schema),
  });

  const onSubmit = async (
    data
  ) => {
    try {
      await createUser(data);

      toast.success(
        "User created successfully"
      );

      reset();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to create user"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-6">
          Create User
        </h1>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="w-full border p-3 rounded"
          />

          <p className="text-red-500 text-sm">
            {
              errors.name
                ?.message
            }
          </p>

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full border p-3 rounded"
          />

          <p className="text-red-500 text-sm">
            {
              errors.email
                ?.message
            }
          </p>

          <textarea
            placeholder="Address"
            {...register(
              "address"
            )}
            className="w-full border p-3 rounded"
          />

          <p className="text-red-500 text-sm">
            {
              errors.address
                ?.message
            }
          </p>

          <input
            type="password"
            placeholder="Password"
            {...register(
              "password"
            )}
            className="w-full border p-3 rounded"
          />

          <p className="text-red-500 text-sm">
            {
              errors.password
                ?.message
            }
          </p>

          <select
            {...register("role")}
            className="w-full border p-3 rounded"
          >
            <option value="">
              Select Role
            </option>

            <option value="ADMIN">
              ADMIN
            </option>

            <option value="USER">
              USER
            </option>

            <option value="STORE_OWNER">
              STORE OWNER
            </option>
          </select>

          <button
            type="submit"
            disabled={
              isSubmitting
            }
            className="bg-black text-white px-6 py-3 rounded"
          >
            {isSubmitting
              ? "Creating..."
              : "Create User"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddUser;