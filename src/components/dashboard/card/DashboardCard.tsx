import { Card, CardHeader } from "@/components/ui/card";
import {
  getAdminOverviewData,
  getAgentOverviewData,
} from "@/services/dashboardService";
import useUserStore from "@/store/useUserStore";
import formatNumber from "@/utils/formatNumber";
import { useQuery } from "@tanstack/react-query";

const DashboardCard = () => {
  const { role } = useUserStore();
  const effectiveRole = role ?? "guest"; // Fallback to "guest" if role is null

  // Fetch admin data only for admins
  const {
    data: adminOverviewData,
    isLoading: isAdminLoading,
    isError: isAdminError,
  } = useQuery({
    queryKey: ["adminOverviewData"],
    queryFn: getAdminOverviewData,
    enabled: effectiveRole === "ADMIN", // Only fetch if user is an admin
  });

  // Fetch agent data only for agents
  const {
    data: agentOverviewData,
    isLoading: isAgentLoading,
    isError: isAgentError,
  } = useQuery({
    queryKey: ["agentOverviewData"],
    queryFn: getAgentOverviewData,
    enabled: effectiveRole === "AGENT", // Only fetch if user is an agent
  });

  // Choose the correct data based on the role
  const overviewData =
    effectiveRole === "ADMIN" ? adminOverviewData : agentOverviewData;

  const getCardsByRole = (role: string, data: any) => {
    if (!data) return [];

    switch (role) {
      case "ADMIN":
        return [
          { name: "Users", count: formatNumber(data.users ?? 0) },
          { name: "Packages", count: formatNumber(data.packages ?? 0) },
          { name: "price", count: formatNumber(data.price ?? 0) },
        ];
      case "AGENT":
        return [
          { name: "Users", count: formatNumber(data.users ?? 0) },
          { name: "Packages", count: formatNumber(data.packages ?? 0) },
          { name: "Price", count: formatNumber(data.price ?? 0) },
        ];
      default:
        return []; // Default for unknown or guest roles
    }
  };

  // Show loading only when fetching the relevant data
  if (
    (isAdminLoading && effectiveRole === "ADMIN") ||
    (isAgentLoading && effectiveRole === "AGENT")
  ) {
    return <p>Loading...</p>;
  }

  // Show error only if the relevant query fails
  if (
    (isAdminError && effectiveRole === "ADMIN") ||
    (isAgentError && effectiveRole === "AGENT")
  ) {
    return <p>Error fetching data.</p>;
  }

  const cards = getCardsByRole(effectiveRole, overviewData); // Pass relevant data

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {cards.map((card) => (
          <Card key={card.name}>
            <CardHeader>{card.name}</CardHeader>
            <div className="p-4">
              <p className="text-xl font-bold">{card.count}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;
