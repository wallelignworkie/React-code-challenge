import { AdminAgentsComponent } from "@/components/admin/dashboard/AdminAgentsComponent";
import AdminDashboardHeader from "@/components/admin/dashboard/AdminDashboardHeader";
import AdminDashboardSidebarComponent from "@/components/admin/dashboard/AdminDashboardSidebarComponent";

const AdminAgentDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <AdminDashboardSidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <AdminDashboardHeader />
        <AdminAgentsComponent />
      </main>
    </div>
  );
};

export default AdminAgentDashboardPage;
