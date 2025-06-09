import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, Menu, LogOut, KeyRound } from "lucide-react";
import logo from "../../../assets/Q.svg";
import { logout } from "../../../Store/AuthanticationSlice/AuthSlice";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const toggleMobileMenu = (): void => setMobileMenuOpen((prev) => !prev);
  const user = useSelector((state) => state.auth.user);
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/questions":
        return "Questions";
      case "/dashboard/quizzes":
        return "Quizzes";
      case "/dashboard/students":
        return "Students";
      case "/dashboard/groups":
        return "Groups";
      case "/dashboard/results":
        return "Results";
      default:
        return "";
    }
  };
  const toggleDropdown = (): void => setDropdownOpen((prev) => !prev);
  const handleLogout = (): void => {
    dispatch(logout());
    navigate("/login");
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-2">
        {/* Left side (Logo + Page Title) */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-12 w-12 p-[3px]" />
          <h1 className="text-2xl font-semibold text-gray-800">
            {getPageTitle()}
          </h1>
        </div>
        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="h-6 w-px bg-gray-300" />
          <div ref={dropdownRef} className="relative text-right">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold uppercase text-green-700">
                  {user?.first_name?.[0]}
                  {user?.last_name?.[0]}
                </div>
                <div className="px-[5px] text-center">
                  <div className="font-semibold">
                    {user?.first_name} {user?.last_name}
                  </div>
                  <div className="text-sm text-green-500">{user?.role}</div>
                </div>
              </div>
              <ChevronDown className="text-sm text-gray-500" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                <button
                  className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => navigate("/change-password")}
                >
                  <KeyRound className="me-2" />
                  Change Password
                </button>
                <button
                  className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut className="me-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            <Menu className="text-2xl text-gray-700" />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="space-y-3 border-t border-gray-200 px-4 pb-4 md:hidden">
          <div className="text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold uppercase text-green-700">
                {user?.first_name?.[0]}
                {user?.last_name?.[0]}
              </div>
              <div className="text-left">
                <div className="font-semibold">
                  {user?.first_name} {user?.last_name}
                </div>
                <div className="text-sm text-green-500">{user?.role}</div>
              </div>
            </div>
            <button
              className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100"
              onClick={() => navigate("/change-password")}
            >
              <KeyRound className="me-2" />
              Change Password
            </button>
            <button
              className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut className="me-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
