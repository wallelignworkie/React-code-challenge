import { useState } from "react";
import Logo from "../../assets/images/engida-express-logo2.jpg";
const navbar = [
  {
    name: "Track",
    href: "/",
    icon: "track",
  },
  {
    name: "About Us",
    href: "/about-us",
    icon: "info",
  },
  // {
  //   name: "Services",
  //   href: "/services",
  //   icon: "service",
  // },
  {
    name: "Packages",
    href: "/packages",
    icon: "package",
  },
  {
    name: "Customer Service",
    href: "/contact",
    icon: "contact",
  },
];
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className="bg-gray-100 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="flex ">
              <img className="rounded-sm w-36 h-12" src={Logo} alt="logo" />
            </div>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse pl-6">
            <button
              type="button"
              className="text-white bg-EPrimary hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              For Business
            </button>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              isMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1 ml-auto`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-100 dark:bg-gray-200 md:dark:bg-gray-200 dark:border-gray-300">
              {navbar.map((nav) => (
                <li key={nav.name}>
                  <a
                    href={nav.href}
                    className="block py-2 px-3 text-black hover:bg-gray-200 md:hover:bg-transparent md:hover:text-gray-800 bg-gray-100 rounded md:bg-transparent md:text-gray-800 md:p-0 md:dark:text-gray-800"
                    aria-current="page"
                  >
                    {nav.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
