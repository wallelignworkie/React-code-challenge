import { ManagePackageTable } from "../components/agent/ManagePackageTable";
import AgentDashboardSidebarComponent from "@/components/agent/AgentDashboardSidebarComponent";
import AgentDashboardHeader from "@/components/agent/AgentDashboardHeader";

const AgentManagePackagePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <AgentDashboardSidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <AgentDashboardHeader />
        <ManagePackageTable />
      </main>
    </div>
  );
};

export default AgentManagePackagePage;
