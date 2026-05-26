import prisma from "../config/db.js";

import { hashPassword } from "../utils/hashPassword.js";

export const createUserByAdmin = async (
  data
) => {
  const existingUser =
    await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword =
    await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      address: data.address,
      password: hashedPassword,
      role: data.role,
    },
  });

  return user;
};

export const createStore = async (
  data
) => {
  const owner =
    await prisma.user.findUnique({
      where: {
        id: Number(data.ownerId),
      },
    });

  if (!owner) {
    throw new Error(
      "Store owner not found"
    );
  }

  if (
    owner.role !== "STORE_OWNER"
  ) {
    throw new Error(
      "Selected user is not a store owner"
    );
  }

  const store =
    await prisma.store.create({
      data: {
        name: data.name,
        email: data.email,
        address: data.address,
        ownerId: Number(data.ownerId),
      },
    });

  return store;
};

export const getDashboardStats =
  async () => {
    const totalUsers =
      await prisma.user.count();

    const totalStores =
      await prisma.store.count();

    const totalRatings =
      await prisma.rating.count();

    return {
      totalUsers,
      totalStores,
      totalRatings,
    };
  };

export const getAllUsers =
  async (filters) => {
    return await prisma.user.findMany({
      where: {
        ...(filters.role && {
          role: filters.role,
        }),

        ...(filters.name && {
          name: {
            contains:
              filters.name,
            mode: "insensitive",
          },
        }),

        ...(filters.email && {
          email: {
            contains:
              filters.email,
            mode: "insensitive",
          },
        }),
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  };

export const getAllStores =
  async () => {
    const stores =
      await prisma.store.findMany({
        include: {
          ratings: true,
        },
      });

    return stores.map((store) => {
      const totalRatings =
        store.ratings.length;

      const averageRating =
        totalRatings > 0
          ? (
              store.ratings.reduce(
                (acc, item) =>
                  acc + item.rating,
                0
              ) / totalRatings
            ).toFixed(1)
          : 0;

      return {
        ...store,
        averageRating,
      };
    });
  };