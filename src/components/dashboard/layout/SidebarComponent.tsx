import useUserStore from "@/store/useUserStore";
import Logo from "../../../assets/images/engida-express-logo2.jpg";
import { getSidebarElementsByRole } from "./SidebarElements";

const SidebarComponent = () => {
  const { role } = useUserStore();

  // Dynamically filter sidebar elements based on role
  const sidebarElements = getSidebarElementsByRole(role);
  return (
    <aside className="w-64 bg-white shadow-lg pt-4 min-h-full h-auto">
      <div className="flex p-3">
        <img className="rounded-full w-10 h-10" src={Logo} alt="logo" />
        <h1 className="text-2xl font-bold mb-6 pl-1">Tamagn Express</h1>
      </div>
      <nav>
        <ul className="border-t-2 pt-2 pl-2">
          {sidebarElements.map((item, index) => (
            <li key={index} className="mb-2">
              <a
                href={item.link}
                className="flex items-center pl-6 py-2 rounded-lg hover:bg-EPrimary hover:text-white"
              >
                <span className="pt-1 mt-1">{item.icon}</span>
                <span className="px-4 font-semibold text-base">
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarComponent;
