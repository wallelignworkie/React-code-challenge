import AdminDashboardHeader from "@/components/admin/dashboard/AdminDashboardHeader";
import AdminDashboardSidebarComponent from "@/components/admin/dashboard/AdminDashboardSidebarComponent";
import { AdminUsersComponent } from "@/components/admin/dashboard/AdminUsersComponent";

const AdminUsersPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <AdminDashboardSidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <AdminDashboardHeader />
        <AdminUsersComponent />
      </main>
    </div>
  );
};

export default AdminUsersPage;
