import CreateCityComponent from "@/components/dashboard/cities/CreateCityComponent";
import HeaderComponent from "@/components/dashboard/layout/HeaderComponent";
import SidebarComponent from "@/components/dashboard/layout/SidebarComponent";

const CreateCityPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <HeaderComponent />
        <CreateCityComponent />
      </main>
    </div>
  );
};

export default CreateCityPage;
