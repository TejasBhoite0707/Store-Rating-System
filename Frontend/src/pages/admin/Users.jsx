import {
  useEffect,
  useState,
} from "react";

import {
  getAllUsers,
} from "../../api/adminApi";

import AdminLayout from "../../layouts/AdminLayout";

import Table from "../../components/common/Table";

const Users = () => {
  const [users, setUsers] =
    useState([]);

  const fetchUsers =
    async () => {
      try {
        const response =
          await getAllUsers();

        setUsers(
          response.data.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchUsers();
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
      key: "role",
      title: "Role",
      sortable: true,
    },

    {
      key: "address",
      title: "Address",
      sortable: true,
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Users
      </h1>

      <Table
        columns={columns}
        data={users}
      />
    </AdminLayout>
  );
};

export default Users;