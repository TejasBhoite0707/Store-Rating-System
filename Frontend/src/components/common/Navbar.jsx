import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user } =
    useAuth();

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        Store Rating Platform
      </h1>

      <div>
        <p className="font-medium">
          {user?.name}
        </p>

        <p className="text-sm text-gray-500">
          {user?.role}
        </p>
      </div>
    </div>
  );
};

export default Navbar;