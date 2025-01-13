import AdminProfileComponent from "./AdminProfileComponent";

const AdminDashboardHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold font-sans "> Hi Admin Welcome !!</h2>
      {/* Profile Page  */}
      <AdminProfileComponent />
    </div>
  );
};

export default AdminDashboardHeader;
