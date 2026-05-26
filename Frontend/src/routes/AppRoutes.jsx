import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import AdminDashboard from "../pages/admin/Dashboard";

import UserStores from "../pages/user/Stores";

import OwnerDashboard from "../pages/owner/Dashboard";

import PrivateRoute from "./PrivateRoute";

import RoleRoute from "./RoleRoute";

import Users from "../pages/admin/Users";

import Stores from "../pages/admin/Stores";

import AddUser from "../pages/admin/AddUser";

import AddStore from "../pages/admin/AddStore";

import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Redirect */}
        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                ]}
              >
                <AdminDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Admin Users */}
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                ]}
              >
                <Users />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Admin Stores */}
        <Route
          path="/admin/stores"
          element={
            <PrivateRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                ]}
              >
                <Stores />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Add User */}
        <Route
          path="/admin/add-user"
          element={
            <PrivateRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                ]}
              >
                <AddUser />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Add Store */}
        <Route
          path="/admin/add-store"
          element={
            <PrivateRoute>
              <RoleRoute
                allowedRoles={[
                  "ADMIN",
                ]}
              >
                <AddStore />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* User Stores */}
        <Route
          path="/stores"
          element={
            <PrivateRoute>
              <RoleRoute
                allowedRoles={[
                  "USER",
                ]}
              >
                <UserStores />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Store Owner Dashboard */}
        <Route
          path="/owner"
          element={
            <PrivateRoute>
              <RoleRoute
                allowedRoles={[
                  "STORE_OWNER",
                ]}
              >
                <OwnerDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;