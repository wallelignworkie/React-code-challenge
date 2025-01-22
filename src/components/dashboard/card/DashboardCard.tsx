import { Card, CardHeader } from "@/components/ui/card";
import useUserStore from "@/store/useUserStore";

const DashboardCard = () => {
  const { role } = useUserStore();
  const effectiveRole = role ?? "guest"; // Fallback to "guest" if role is null

  const getCardsByRole = (role: string) => {
    switch (role) {
      case "ADMIN":
        return [
          { name: "Users", count: "12k" },
          { name: "Packages", count: "15k" },
          { name: "Agents", count: "15k" },
        ];
      case "AGENT":
        return [
          { name: "Users", count: "12k" },
          { name: "Packages", count: "15k" },
          { name: "Orders", count: "15k" },
        ];
      // case "SUPER_ADMIN":
      //   return [
      //     { name: "Packages", count: "15k" },
      //     { name: "Orders", count: "15k" },
      //   ];
      default:
        return []; // Default for unknown or guest roles
    }
  };

  const cards = getCardsByRole(effectiveRole); // Use effectiveRole

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
