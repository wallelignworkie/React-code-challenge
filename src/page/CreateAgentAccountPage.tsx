import CreateAgentAccount from "@/components/dashboard/createAccount/CreateAgentAccount";
import HeaderComponent from "@/components/dashboard/layout/HeaderComponent";
import SidebarComponent from "@/components/dashboard/layout/SidebarComponent";

const CreateAgentAccountPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <HeaderComponent />
        <CreateAgentAccount />
      </main>
    </div>
  );
};

export default CreateAgentAccountPage;
