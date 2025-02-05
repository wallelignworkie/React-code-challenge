import { Button } from "@/components/ui/button";
import { getAgent } from "@/services/agentService";
import { Agent } from "@/types/agent";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const AgentDetailComponent = () => {
  const { id: agentId } = useParams<{ id: string }>();

  const {
    data: agent,
    isLoading,
    isError,
  } = useQuery<Agent>({
    queryKey: ["oneAgent", agentId],
    queryFn: () => getAgent(agentId as string),
    enabled: !!agentId, // Run query only if agentId exists
  });

  if (isLoading)
    return <p className="text-gray-500 animate-pulse">Loading...</p>;

  if (isError)
    return <p className="text-red-600">Error fetching agent details.</p>;

  if (!agent) return <p>No agent data available.</p>;

  const userData = [
    { label: "Agent ID", value: agent.user.id },
    { label: "First Name", value: agent.user.firstName },
    { label: "Last Name", value: agent.user.lastName },
    { label: "Email", value: agent.user.email },
    { label: "Phone", value: agent.user.phone },
    { label: "Role", value: agent.user.role },
    { label: "Gender", value: agent.user.gender },
    { label: "Status", value: agent.status },
    { label: "City", value: agent.city.name },
    { label: "City ID", value: agent.city.id },
    { label: "Handles Urgent", value: agent.handles_urgent ? "Yes" : "No" },
    { label: "Created At", value: new Date(agent.createdAt).toLocaleString() },
    { label: "Updated At", value: new Date(agent.updatedAt).toLocaleString() },
    { label: "Address", value: agent.address || "N/A" },
  ];
  const handleBack = () => {
    history.back();
  };

  return (
    <div className="bg-white rounded-xl shadow-md w-full ">
      <Button className=" bg-EPrimary px-4 py-2 ml-4 mt-6" onClick={handleBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
      </Button>

      <div className="p-6 pb-36 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userData.map((item) => (
          <div key={item.label} className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              {item.label}
            </span>
            <span className="text-gray-700">{item.value || "N/A"}</span>
          </div>
        ))}

        <Button className="mt-4 bg-red-600 hover:bg-red-700 mx-24">
          Block
        </Button>
      </div>
    </div>
  );
};

export default AgentDetailComponent;
