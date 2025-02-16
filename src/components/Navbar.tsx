import { useState } from "react";
import { mobileStockLogo, stockMarketLogo } from "../assets";
import { navlinks } from "../constants";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { FaUser, FaWindowClose, FaBars } from "react-icons/fa";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleScrollNavigation = (id: string) => {
    const pageSection = document.getElementById(id);
    if (pageSection) {
      pageSection.scrollIntoView({ behavior: "smooth" });
      setActiveLink(id);
    }
  };

  return (
    <div className="navbar-wrapper bg-[#F9FAFBE6]">
      <nav className="flex justify-between items-center w-full md:w-[95%] m-auto">
        {/* mobile view */}
        <div className="xl:hidden">
          <Link to="/">
            <img src={mobileStockLogo} alt="logo" className="logo" />
          </Link>{" "}
        </div>
        <div className="navbar-mobile overflow-hidden">
          <div className="lg:hidden flex flex-1 justify-end items-center py-3 ">
            <button
              onClick={() => setToggle(!toggle)}
              className="btn-toggle-mobile"
            >
              {toggle ? (
                <FaWindowClose className="text-2xl border" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>

            <div
              className={`${
                toggle ? "translate-x-0 " : "translate-x-full "
              } bg-[#0b022d] dropdown-menu fixed top-15 right-0 my-2 min-w-[140px] w-[100%] z-10 transition-transform duration-700 ease-in-out `}
            >
              <div className="sm:hidden">
                <SearchBar />
              </div>
              <ul className="list-none flex flex-col justify-center text-center">
                {navlinks.map((link) => (
                  <li
                    key={link.id}
                    className={`mobile-navlink text-[16px] cursor-pointer font-medium text-[#fff]`}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(link.title);
                    }}
                  >
                    <a className="">{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden xl:block">
          <Link to="/">
            <img src={stockMarketLogo} alt="logo" className="logo" />
          </Link>{" "}
        </div>
        <div className="xs:hidden lg:block">
          <ul className="flex nav-links ">
            {navlinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  activeLink === link.id
                    ? "bg-[#0b022d] text-[#fff]"
                    : "bg-transparent text-[#0b022d]"
                } nav-link`}
                onClick={() => {
                  handleScrollNavigation(link.id);
                }}
              >
                <Link to={link.ref}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:w-[40%] lg:w-[35%] xs:hidden sm:block">
          <SearchBar />
        </div>

        <div className="mobile-btn-login">
          <Link to={"/signup"} className="">
            <FaUser className="text-2xl" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
