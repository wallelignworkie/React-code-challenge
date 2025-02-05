import HeaderComponent from "@/components/dashboard/layout/HeaderComponent";
import SidebarComponent from "@/components/dashboard/layout/SidebarComponent";
import PackageDetailComponent from "@/components/dashboard/package/PackageDetailComponent";

const PackageDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <HeaderComponent />
        <PackageDetailComponent />
      </main>
    </div>
  );
};

export default PackageDetailPage;
