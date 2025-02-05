import React from "react";

import SidebarComponent from "./layout/SidebarComponent";
import { RecentActivity } from "./RecentActivity/RecentActivity";
import HeaderComponent from "./layout/HeaderComponent";
import DashboardCard from "./card/DashboardCard";

const DashboardComponent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Admin dashboard header */}
        <HeaderComponent />

        <DashboardCard />

        <div>
          <h3 className="text-2xl font-semibold mb-4">Login History</h3>
          <div className=" bg-white p-6">
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardComponent;
