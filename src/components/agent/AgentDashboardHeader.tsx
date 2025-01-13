import AdminProfileComponent from "../admin/dashboard/AdminProfileComponent";

const AgentDashboardHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold font-sans "> Hi Agent Welcome !!</h2>
      {/* Profile Page  */}
      <AdminProfileComponent />
    </div>
  );
};

export default AgentDashboardHeader;
