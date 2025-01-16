import AdminCreateCity from "@/components/admin/dashboard/AdminCreateCity";
import AdminDashboardHeader from "@/components/admin/dashboard/AdminDashboardHeader";
import AdminDashboardSidebarComponent from "@/components/admin/dashboard/AdminDashboardSidebarComponent";

const AdminCreateCityPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <AdminDashboardSidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <AdminDashboardHeader />
        <AdminCreateCity />
      </main>
    </div>
  );
};

export default AdminCreateCityPage;
