import {
  Link,
  useNavigate,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { logout, user } =
    useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="w-64 bg-black text-white p-5">
      <h1 className="text-2xl font-bold mb-10">
        Store Rating App
      </h1>

      <nav className="flex flex-col gap-4">
        {/* Admin */}
        {user?.role ===
          "ADMIN" && (
          <>
            <Link to="/admin">
              Dashboard
            </Link>

            <Link to="/admin/users">
              Users
            </Link>

            <Link to="/admin/stores">
              Stores
            </Link>

            <Link to="/admin/add-user">
              Add User
            </Link>

            <Link to="/admin/add-store">
              Add Store
            </Link>
          </>
        )}

        {/* User */}
        {user?.role ===
          "USER" && (
          <Link to="/stores">
            Stores
          </Link>
        )}

        {/* Store Owner */}
        {user?.role ===
          "STORE_OWNER" && (
          <Link to="/owner">
            Dashboard
          </Link>
        )}

        <button
          onClick={
            handleLogout
          }
          className="text-left mt-10"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;