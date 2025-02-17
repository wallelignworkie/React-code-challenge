import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import profileImage from "../../../assets/images/engida-express-logo1.jpg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

const ProfileComponent = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin"); // Redirect to login page
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 bg-gray-200 rounded-lg p-2"
        onClick={handleProfileClick}
      >
        <img
          src={profileImage}
          alt="Admin Profile"
          className="w-8 h-8 rounded-full"
        />
      </button>

      {isDropdownOpen && (
        <Card className="absolute right-0 mt-2 w-56 z-50 bg-white rounded-md shadow-lg">
          <div className="px-4 pt-3">
            <span className="text-black font-semibold">{user?.email}</span>
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
                onClick={handleLogout}
                className="block w-full h-full text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </Card>
      )}
    </div>
  );
};

export default ProfileComponent;
