import { z } from "zod";

export const createUserSchema = z.object({
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
      "Password must contain one uppercase and one special character"
    ),

  role: z.enum([
    "ADMIN",
    "USER",
    "STORE_OWNER",
  ]),
});