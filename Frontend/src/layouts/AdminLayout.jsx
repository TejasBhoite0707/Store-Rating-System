import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
const AdminLayout = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

     <div className="flex-1">
        <Navbar />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;