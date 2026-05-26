import { z } from "zod";

export const ratingSchema = z.object({
  storeId: z.coerce.number(),

  rating: z
    .number()
    .min(1)
    .max(5),
});