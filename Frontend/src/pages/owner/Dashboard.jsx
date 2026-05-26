import {
  useEffect,
  useState,
} from "react";

import {
  getOwnerDashboard,
} from "../../api/storeApi";

import toast from "react-hot-toast";

import OwnerLayout from "../../layouts/OwnerLayout";

import RatingStars from "../../components/common/RatingStars";

const Dashboard = () => {
  const [stores, setStores] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchDashboard =
    async () => {
      try {
        const response =
          await getOwnerDashboard();

        setStores(
          response.data.data
        );
      } catch (error) {
        toast.error(
          "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <OwnerLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">
          Store Owner Dashboard
        </h1>

        {stores.length === 0 ? (
          <div className="bg-white p-8 rounded shadow text-center">
            <h2 className="text-2xl font-semibold">
              No Stores Found
            </h2>

            <p className="text-gray-500 mt-2">
              No store assigned yet.
            </p>
          </div>
        ) : (
          stores.map((store) => (
            <div
              key={store.storeId}
              className="bg-white rounded shadow p-6"
            >
              {/* Store Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {
                      store.storeName
                    }
                  </h2>

                  <p className="text-gray-500">
                    Store Analytics
                  </p>
                </div>

                {/* Average Rating */}
                <div className="bg-gray-100 p-4 rounded">
                  <p className="text-sm text-gray-500 mb-1">
                    Average Rating
                  </p>

                  <div className="flex items-center gap-3">
                    <RatingStars
                      rating={Math.round(
                        store.averageRating
                      )}
                    />

                    <span className="text-2xl font-bold">
                      {
                        store.averageRating
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Rated Users */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Users Who Rated
                </h3>

                {store.ratedUsers
                  .length === 0 ? (
                  <div className="bg-gray-50 p-6 rounded text-center">
                    <p className="text-gray-500">
                      No ratings yet
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 text-left">
                            Name
                          </th>

                          <th className="p-3 text-left">
                            Email
                          </th>

                          <th className="p-3 text-left">
                            Rating
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {store.ratedUsers.map(
                          (user) => (
                            <tr
                              key={
                                user.userId
                              }
                              className="border-t"
                            >
                              <td className="p-3">
                                {
                                  user.name
                                }
                              </td>

                              <td className="p-3">
                                {
                                  user.email
                                }
                              </td>

                              <td className="p-3">
                                <div className="flex items-center gap-3">
                                  <RatingStars
                                    rating={
                                      user.rating
                                    }
                                  />

                                  <span className="font-semibold">
                                    {
                                      user.rating
                                    }
                                    /5
                                  </span>
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </OwnerLayout>
  );
};

export default Dashboard;