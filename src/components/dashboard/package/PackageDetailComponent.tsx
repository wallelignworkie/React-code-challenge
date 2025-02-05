import { PackageDetail } from "@/services/packageService";
import { Package } from "@/types/package";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const PackageDetailComponent = () => {
  const { id: packageId } = useParams<{ id: string }>();

  const {
    data: onePackage,
    isLoading,
    isError,
  } = useQuery<Package>({
    queryKey: ["onePackage", packageId],
    queryFn: () => PackageDetail(packageId as string),
    enabled: !!packageId, // Only run query if packageId exists
  });

  if (isLoading)
    return <p className="text-gray-500 animate-pulse">Loading...</p>;

  if (isError)
    return <p className=" text-red-600">Error fetching package details.</p>;

  // Ensure `onePackage` exists before accessing its properties
  if (!onePackage) return <p>No package data available.</p>;

  // Dynamic User Data
  const userData = [
    { label: "Tracking Number", value: onePackage.trackingNumber },
    { label: "Package Name", value: onePackage.packageName },
    {
      label: "Sender Name",
      value: `${onePackage.senderFirstName} ${onePackage.senderLastName}`,
    },
    { label: "Sender Phone", value: onePackage.senderPhoneNumber },
    {
      label: "Receiver Name",
      value: `${onePackage.receiverFirstName} ${onePackage.receiverLastName}`,
    },
    { label: "Receiver Phone", value: onePackage.receiverPhoneNumber },
    { label: "Price", value: `$${onePackage.price}` },
    {
      label: "Dimensions (L x W x H)",
      value: `${onePackage.length} x ${onePackage.width} x ${onePackage.height}`,
    },
    { label: "Weight", value: `${onePackage.weight} kg` },
    { label: "Priority", value: onePackage.priority },
    { label: "Status", value: onePackage.status },
    {
      label: "Created At",
      value: new Date(onePackage.createdAt).toLocaleString(),
    },
    {
      label: "Updated At",
      value: new Date(onePackage.updatedAt).toLocaleString(),
    },
    { label: "From City", value: onePackage.from?.name || "N/A" },
    { label: "To City", value: onePackage.to?.name || "N/A" },

    // agent
    {
      label: "Agent Name",
      value:
        onePackage.createdBy.firstName + " " + onePackage.createdBy.lastName ||
        "N/A",
    },
    {
      label: "Agent Email",
      value: onePackage.createdBy.email || "N/A",
    },
    {
      label: "Agent Phone",
      value: onePackage.createdBy.phone || "N/A",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-full  pb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {userData.map((item) => (
        <div key={item.label} className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">
            {item.label}
          </span>
          <span className="text-gray-700">{item.value || "N/A"}</span>
        </div>
      ))}
    </div>
  );
};

export default PackageDetailComponent;
