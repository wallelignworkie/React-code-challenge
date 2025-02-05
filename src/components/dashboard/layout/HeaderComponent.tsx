// HeaderComponent
import ProfileComponent from "./ProfileComponent";
import useUserStore from "@/store/useUserStore";

const HeaderComponent = () => {
  const { user } = useUserStore();
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold font-sans ">
        {" "}
        Hi {user?.firstName} Welcome !!
      </h2>
      {/* Profile Page  */}
      <ProfileComponent />
    </div>
  );
};

export default HeaderComponent;
