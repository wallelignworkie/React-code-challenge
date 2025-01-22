import HeaderComponent from "@/components/dashboard/layout/HeaderComponent";
import SidebarComponent from "@/components/dashboard/layout/SidebarComponent";
import PackagesComponent from "@/components/dashboard/package/PackagesComponent";

const PackagePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <HeaderComponent />
        <PackagesComponent />
      </main>
    </div>
  );
};

export default PackagePage;
