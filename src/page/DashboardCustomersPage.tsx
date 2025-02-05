import CustomerComponents from "@/components/dashboard/Customers/CustomerComponents";
import HeaderComponent from "@/components/dashboard/layout/HeaderComponent";
import SidebarComponent from "@/components/dashboard/layout/SidebarComponent";

const DashboardCustomersPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <HeaderComponent />
        <CustomerComponents />
      </main>
    </div>
  );
};

export default DashboardCustomersPage;
