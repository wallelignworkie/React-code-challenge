import AgentDetailComponent from "@/components/dashboard/agentDetail/AgentDetailComponent";
import HeaderComponent from "@/components/dashboard/layout/HeaderComponent";
import SidebarComponent from "@/components/dashboard/layout/SidebarComponent";

const AgentDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <HeaderComponent />
        <AgentDetailComponent />
      </main>
    </div>
  );
};

export default AgentDetailPage;
