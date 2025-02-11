import HeaderComponent from "@/components/dashboard/layout/HeaderComponent";
import SidebarComponent from "@/components/dashboard/layout/SidebarComponent";
import ForwardPackagesComponent from "@/components/dashboard/package/ForwardPackagesComponent";

const ForwardPackages = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <HeaderComponent />
        <ForwardPackagesComponent />
      </main>
    </div>
  );
};

export default ForwardPackages;
