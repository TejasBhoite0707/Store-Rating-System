import {
  useEffect,
  useState,
} from "react";

import {
  getAllStores,
} from "../../api/adminApi";

import AdminLayout from "../../layouts/AdminLayout";

import Table from "../../components/common/Table";

const Stores = () => {
  const [stores, setStores] =
    useState([]);

  const fetchStores =
    async () => {
      try {
        const response =
          await getAllStores();

        setStores(
          response.data.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchStores();
  }, []);

  const columns = [
    {
      key: "name",
      title: "Name",
      sortable: true,
    },

    {
      key: "email",
      title: "Email",
      sortable: true,
    },

    {
      key: "address",
      title: "Address",
      sortable: true,
    },

    {
      key:
        "averageRating",
      title: "Rating",
      sortable: true,
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Stores
      </h1>

      <Table
        columns={columns}
        data={stores}
      />
    </AdminLayout>
  );
};

export default Stores;