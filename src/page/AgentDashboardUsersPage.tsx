import AgentDashboardHeader from "@/components/agent/AgentDashboardHeader";
import AgentDashboardSidebarComponent from "@/components/agent/AgentDashboardSidebarComponent";
import { AgentDashboardUsersComponent } from "@/components/agent/AgentDashboardUsersComponent";

const AgentDashboardUsersPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <AgentDashboardSidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <AgentDashboardHeader />
        <AgentDashboardUsersComponent />
      </main>
    </div>
  );
};

export default AgentDashboardUsersPage;
