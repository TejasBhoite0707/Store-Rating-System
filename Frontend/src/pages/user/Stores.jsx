
import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  getStores,
} from "../../api/storeApi";

import {
  submitRating,
} from "../../api/ratingApi";

import RatingStars from "../../components/common/RatingStars";

import useAuth from "../../hooks/useAuth";

const Stores = () => {
  const [stores, setStores] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const { logout, user } =
    useAuth();

  const navigate =
    useNavigate();

  const fetchStores =
    async () => {
      try {
        const response =
          await getStores(
            search
          );

        setStores(
          response.data.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchStores();
  }, [search]);

  const handleRating =
    async (
      storeId,
      rating
    ) => {
      try {
        await submitRating({
          storeId,
          rating,
        });

        toast.success(
          "Rating submitted"
        );

        fetchStores();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to submit rating"
        );
      }
    };

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Store Rating App
          </h1>

          <p className="text-sm text-gray-300">
            Welcome{" "}
            {user?.name}
          </p>
        </div>

        <button
          onClick={
            handleLogout
          }
          className="bg-white text-black px-4 py-2 rounded font-medium"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Stores
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or address..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-6"
        />

        {/* Stores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stores.map(
            (store) => (
              <div
                key={store.id}
                className="bg-white p-6 rounded shadow"
              >
                <h2 className="text-2xl font-semibold mb-2">
                  {store.name}
                </h2>

                <p className="text-gray-600 mb-2">
                  {
                    store.address
                  }
                </p>

                {/* Overall Rating */}
                <div className="mb-3">
                  <p className="font-medium">
                    Overall Rating
                  </p>

                  <RatingStars
                    rating={Math.round(
                      store.averageRating
                    )}
                  />

                  <p className="text-sm text-gray-500 mt-1">
                    {
                      store.averageRating
                    }
                    /5
                  </p>
                </div>

                {/* User Rating */}
                <div className="mb-4">
                  <p className="font-medium">
                    Your Rating:
                  </p>

                  <p className="text-gray-700">
                    {store.userSubmittedRating ||
                      "Not Rated"}
                  </p>
                </div>

                {/* Submit Rating */}
                <div>
                  <p className="font-medium mb-2">
                    Submit Rating
                  </p>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(
                      (
                        star
                      ) => (
                        <button
                          key={
                            star
                          }
                          onClick={() =>
                            handleRating(
                              store.id,
                              star
                            )
                          }
                          className="text-2xl hover:scale-110 transition"
                        >
                          ⭐
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Stores;