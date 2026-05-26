import Sidebar from "../components/common/Sidebar";

const OwnerLayout = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default OwnerLayout;