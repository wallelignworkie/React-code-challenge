import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import profileImage from "../../../assets/images/engida-express-logo1.jpg";
import useUserStore from "@/store/useUserStore";
const ProfileComponent = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { clearAuth, user } = useUserStore();

  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
    };

    if (isDropdownOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <div className="relative">
        <button
          className="flex items-center space-x-2 bg-gray-200  rounded-lg"
          onClick={handleProfileClick}
        >
          <img
            src={profileImage}
            alt="Admin Profile"
            className="w-8 h-8 rounded-full"
          />
          {/* <span>Admin</span> */}
        </button>
        {isDropdownOpen && (
          <Card className="absolute right-0 mt-2 w-56  z-50 bg-white  rounded-md shadow-lg">
            <div className=" px-4 pt-3">
              <span className="  text-black font-semibold">{user?.email}</span>
            </div>
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <a href="/dashboard" className="block w-full h-full text-left">
                  Home
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <a href="#" className="block w-full h-full text-left">
                  Profile
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <a href="/setting" className="block w-full h-full text-left">
                  Settings
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <button
                  onClick={clearAuth}
                  className="block w-full h-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;
