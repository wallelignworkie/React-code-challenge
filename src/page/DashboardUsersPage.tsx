import HeaderComponent from "@/components/dashboard/layout/HeaderComponent";
import SidebarComponent from "@/components/dashboard/layout/SidebarComponent";
import UsersComponent from "@/components/dashboard/users/UsersComponent";

const DashboardAgentsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <HeaderComponent />
        <UsersComponent />
      </main>
    </div>
  );
};

export default DashboardAgentsPage;
