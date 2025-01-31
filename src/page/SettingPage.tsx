import HeaderComponent from "@/components/dashboard/layout/HeaderComponent";
import SidebarComponent from "@/components/dashboard/layout/SidebarComponent";
import SettingComponent from "@/components/setting/settingComponent";

const SettingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <HeaderComponent />
        <SettingComponent />
      </main>
    </div>
  );
};

export default SettingPage;
