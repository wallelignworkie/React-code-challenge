import AdminDashboardHeader from "@/components/admin/dashboard/AdminDashboardHeader";
import AdminDashboardSidebarComponent from "@/components/admin/dashboard/AdminDashboardSidebarComponent";
import { AdminPackagesComponent } from "@/components/admin/dashboard/AdminPackagesComponent";

const AdminPackagePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <AdminDashboardSidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <AdminDashboardHeader />
        <AdminPackagesComponent />
      </main>
    </div>
  );
};

export default AdminPackagePage;
