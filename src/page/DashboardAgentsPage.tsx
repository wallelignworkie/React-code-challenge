import AgentsComponent from "@/components/dashboard/manageAgents/ManageAgents";
import HeaderComponent from "@/components/dashboard/layout/HeaderComponent";
import SidebarComponent from "@/components/dashboard/layout/SidebarComponent";

const DashboardAgentsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <HeaderComponent />
        <AgentsComponent />
      </main>
    </div>
  );
};

export default DashboardAgentsPage;
