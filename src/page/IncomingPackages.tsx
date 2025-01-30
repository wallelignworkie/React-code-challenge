import IncomingPackage from "@/components/dashboard/IncomingPackage/IncomingPackage";
import HeaderComponent from "@/components/dashboard/layout/HeaderComponent";
import SidebarComponent from "@/components/dashboard/layout/SidebarComponent";

const IncomingPackages = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <HeaderComponent />
        <IncomingPackage />
      </main>
    </div>
  );
};

export default IncomingPackages;
