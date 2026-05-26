import {
  useEffect,
  useState,
} from "react";

import {
  useForm,
} from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import {
  createStore,
  getStoreOwners,
} from "../../api/adminApi";

import AdminLayout from "../../layouts/AdminLayout";

const schema = z.object({
  name: z.string().min(3),

  email: z.string().email(),

  address: z.string().max(400),

  ownerId:
    z.coerce.number(),
});

const AddStore = () => {
  const [owners, setOwners] =
    useState([]);

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

  const fetchOwners =
    async () => {
      try {
        const response =
          await getStoreOwners();

        setOwners(
          response.data.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchOwners();
  }, []);

  const onSubmit = async (
    data
  ) => {
    try {
      await createStore(data);

      toast.success(
        "Store created successfully"
      );

      reset();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to create store"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-6">
          Create Store
        </h1>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Store Name"
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
            placeholder="Store Email"
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

          <select
            {...register(
              "ownerId"
            )}
            className="w-full border p-3 rounded"
          >
            <option value="">
              Select Store Owner
            </option>

            {owners.map(
              (owner) => (
                <option
                  key={owner.id}
                  value={
                    owner.id
                  }
                >
                  {owner.name}
                </option>
              )
            )}
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
              : "Create Store"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddStore;