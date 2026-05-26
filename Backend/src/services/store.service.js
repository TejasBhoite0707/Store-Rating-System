import prisma from "../config/db.js";

export const getAllStores =
  async (
    search = "",
    userId
  ) => {
    const stores =
      await prisma.store.findMany({
        where: {
          OR: [
            {
              name: {
                contains:
                  search,
                mode:
                  "insensitive",
              },
            },
            {
              address: {
                contains:
                  search,
                mode:
                  "insensitive",
              },
            },
          ],
        },

        include: {
          ratings: true,
        },
      });

    return stores.map(
      (store) => {
        const totalRatings =
          store.ratings.length;

        const averageRating =
          totalRatings > 0
            ? (
                store.ratings.reduce(
                  (
                    acc,
                    item
                  ) =>
                    acc +
                    item.rating,
                  0
                ) /
                totalRatings
              ).toFixed(1)
            : 0;

        const userRating =
          store.ratings.find(
            (
              rating
            ) =>
              rating.userId ===
              userId
          );

        return {
          id: store.id,
          name: store.name,
          email: store.email,
          address:
            store.address,
          averageRating,
          userSubmittedRating:
            userRating
              ? userRating.rating
              : null,
        };
      }
    );
};

export const getStoreOwnerDashboard =
  async (ownerId) => {
    const stores =
      await prisma.store.findMany({
        where: {
          ownerId,
        },

        include: {
          ratings: {
            include: {
              user: true,
            },
          },
        },
      });

    return stores.map((store) => {
      const averageRating =
        store.ratings.length > 0
          ? (
              store.ratings.reduce(
                (acc, item) =>
                  acc + item.rating,
                0
              ) / store.ratings.length
            ).toFixed(1)
          : 0;

      return {
        storeId: store.id,
        storeName: store.name,
        averageRating,

        ratedUsers:
          store.ratings.map(
            (rating) => ({
              userId:
                rating.user.id,
              name:
                rating.user.name,
              email:
                rating.user.email,
              rating:
                rating.rating,
            })
          ),
      };
    });
};