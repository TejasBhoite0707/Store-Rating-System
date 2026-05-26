import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardStats,
} from "../../api/adminApi";

import AdminLayout from "../../layouts/AdminLayout";

const Dashboard = () => {
  const [stats, setStats] =
    useState(null);

  const fetchStats =
    async () => {
      try {
        const response =
          await getDashboardStats();

        setStats(
          response.data.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">
            Users
          </h2>

          <p className="text-4xl mt-3">
            {
              stats?.totalUsers
            }
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">
            Stores
          </h2>

          <p className="text-4xl mt-3">
            {
              stats?.totalStores
            }
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">
            Ratings
          </h2>

          <p className="text-4xl mt-3">
            {
              stats?.totalRatings
            }
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;