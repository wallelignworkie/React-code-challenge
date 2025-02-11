import { getMyProfile } from "@/services/settingSrvice";

import { useQuery } from "@tanstack/react-query";
import { MyProfile } from "@/types/profile";
import EditSettingComponent from "./EditSettingComponent";

const SettingComponent = () => {
  const { data, isLoading, isError } = useQuery<MyProfile>({
    queryKey: ["myProfile"],
    queryFn: () => getMyProfile(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className=" min-h-screen w-full">
      <div className="w-4xl bg-white rounded-xl shadow-md p-6 sm:p-8">
        <div className=" flex justify-between">
          <h1 className="text-2xl  text-gray-900 font-semibold">
            Account Settings
          </h1>
          <div className="flex justify-center ">
            <EditSettingComponent />
          </div>
        </div>
        <hr className="my-6" />

        <div>
          <span className="text-sm text-gray-900  font-bold">Email</span>
          <p className="text-gray-700 font-medium">{data?.email}</p>
        </div>
        <div className=" mt-8">
          <span className="text-sm text-gray-900  font-bold">Phone</span>
          <p className="text-gray-700 font-medium">{data?.phone}</p>
        </div>

        <hr className="my-6" />

        <div>
          <span className="text-sm text-gray-900  font-bold">First Name</span>
          <p className="text-gray-700 font-medium">{data?.firstName}</p>
        </div>
        <div className=" mt-8">
          <span className="text-sm text-gray-900  font-bold">Last Name</span>
          <p className="text-gray-700 font-medium">{data?.lastName}</p>
        </div>

        <hr className="my-6" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <span className="text-sm text-gray-900  font-bold">Address</span>
            <p className="text-gray-700 font-medium">{data?.address}</p>
          </div>
          <div>
            <span className="text-sm text-gray-900  font-bold">Gender</span>
            <p className="text-gray-700 font-medium">{data?.gender}</p>
          </div>
          <div>
            <span className="text-sm text-gray-900  font-bold">
              Handles Urgent Requests
            </span>
            <p className="text-gray-700 font-medium">
              {data?.agent?.handles_urgent ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingComponent;
