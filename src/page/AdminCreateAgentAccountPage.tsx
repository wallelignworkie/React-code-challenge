import AdminCreateAgentAccount from "@/components/admin/dashboard/AdminCreateAgentAccount";
import AdminDashboardHeader from "@/components/admin/dashboard/AdminDashboardHeader";
import AdminDashboardSidebarComponent from "@/components/admin/dashboard/AdminDashboardSidebarComponent";

const AdminCreateAgentAccountPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <AdminDashboardSidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <AdminDashboardHeader />
        <AdminCreateAgentAccount />
      </main>
    </div>
  );
};

export default AdminCreateAgentAccountPage;
