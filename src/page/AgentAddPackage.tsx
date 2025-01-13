import AgentDashboardSidebarComponent from "@/components/agent/AgentDashboardSidebarComponent";
import AddPackage from "../components/agent/AddPackage";
import AgentDashboardHeader from "@/components/agent/AgentDashboardHeader";

const AgentAddPackage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <AgentDashboardSidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <AgentDashboardHeader />
        <AddPackage />
      </main>
    </div>
  );
};

export default AgentAddPackage;
