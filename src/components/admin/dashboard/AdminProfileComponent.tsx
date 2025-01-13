import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import profileImage from "../../../assets/images/engida-express-logo1.jpg";
import useUserStore from "@/store/useUserStore";
const AdminProfileComponent = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { clearRole } = useUserStore();

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
    e.stopPropagation(); // Prevents the event from propagating to the window
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
          <Card className="absolute right-0 mt-2 w-48 bg-white shadow-lg">
            <div className=" px-4 pt-3">
              <span className="  text-black font-semibold">walleman</span>
            </div>
            <ul className="py-2 -pt-1">
              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="#">Home</a>
              </li>

              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="#">Profile</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="#">Settings</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <button onClick={clearRole}>Logout</button>
              </li>
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminProfileComponent;
