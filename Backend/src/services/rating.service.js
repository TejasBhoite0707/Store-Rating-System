import prisma from "../config/db.js";

export const submitRating = async (
  userId,
  data
) => {
  const store =
    await prisma.store.findUnique({
      where: {
        id: data.storeId,
      },
    });

  if (!store) {
    throw new Error("Store not found");
  }

  const existingRating =
    await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId: data.storeId,
        },
      },
    });

  // Update existing rating
  if (existingRating) {
    return await prisma.rating.update({
      where: {
        id: existingRating.id,
      },
      data: {
        rating: data.rating,
      },
    });
  }

  // Create new rating
  return await prisma.rating.create({
    data: {
      rating: data.rating,
      userId,
      storeId: data.storeId,
    },
  });
};