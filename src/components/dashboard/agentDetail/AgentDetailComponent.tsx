import { Button } from "@/components/ui/button";

const AgentDetailComponent = () => {
  const userData = [
    { label: "First Name", value: "96819544069" },
    { label: "Last Name", value: "Pending" },
    { label: "City", value: "96819544069" },
    { label: "Updated At", value: "96819544069" },
    { label: "City ID", value: "Addis ababa" },
    { label: "Handles Urgent", value: "False" },
    { label: "Address", value: "Addis ababa" },
    { label: "Phone", value: "+251012345678" },
    { label: "Email", value: "agent1@example.com" },
    { label: "Password", value: "96819544069" },
    { label: "Role", value: "Agent" },
    { label: "User ID", value: "Addis ababa" },
    { label: "Status", value: "False" },
    { label: "Gender", value: "Male" },
    { label: "Address", value: "Null" },
    { label: "Avatar Url", value: "Null" },
    { label: "Created At", value: "Addis" },
    { label: "Updated At", value: "96819544069" },
    { label: "City ID", value: "Addis ababa" },
    { label: "ID", value: "False" },
    { label: "Name", value: "Addis ababa" },
  ];

  return (
    <div className="p-12 bg-white rounded-xl shadow-md w-full grid grid-cols-3 gap-6">
      {userData.map((item, index) => (
        <div key={index} className="flex flex-col">
          <span className="text-sm/6 font-semibold text-gray-900">
            {item.label}
          </span>
          <span className="text-gray-900">{item.value}</span>
        </div>
      ))}
      <Button className=" mt-4 bg-red-600 hover:bg-red-700"> Block</Button>
    </div>
  );
};

export default AgentDetailComponent;
