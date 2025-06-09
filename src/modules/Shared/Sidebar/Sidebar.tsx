import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Book,
  Layers,
  FileText,
  BarChart2,
  Menu as MenuIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
const SideBar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const userRole = useSelector((state) => state.auth.user);
  const toggleSidebar = () => {
    if (!isSmallScreen) {
      setCollapsed(!collapsed);
    }
  };
  const handleMouseEnter = (
    item: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (collapsed) {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        x: rect.right + 10,
        y: rect.top + rect.height / 2,
      });
      setHoveredItem(item);
    }
  };
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  const getActiveItem = () => {
    const path = location.pathname.split("/")[2] || "dashboard";
    return path;
  };
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Home size={24} />,
      active: "dashboard",
      roles: ["Instructor", "Student"],
    },
    {
      title: "Students",
      path: "students",
      icon: <Users size={24} />,
      active: "students",
      roles: ["Instructor"],
    },
    {
      title: "Questions",
      path: "questions",
      icon: <Book size={24} />,
      active: "questions",
      roles: ["Instructor"],
    },
    {
      title: "Groups",
      path: "groups",
      icon: <Layers size={24} />,
      active: "groups",
      roles: ["Instructor"],
    },
    {
      title: "Quizzes",
      path: "quizzes",
      icon: <FileText size={24} />,
      active: "quizzes",
      roles: ["Instructor", "Student"],
    },
    {
      title: "Results",
      path: "results",
      icon: <BarChart2 size={24} />,
      active: "results",
      roles: ["Instructor", "Student"],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth <= 800;
      setIsSmallScreen(smallScreen);

      if (smallScreen) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen">
      <Sidebar
        collapsed={collapsed}
        collapsedWidth="100px"
        className="flex h-full flex-col justify-between bg-white shadow-md"
      >
        <Menu>
          {/* Toggle Button */}
          <div className="relative">
            <MenuItem
              icon={
                <div
                  className={`flex size-full items-center justify-center rounded-full ${
                    isSmallScreen ? "bg-gray-400" : "bg-gray-200"
                  }`}
                >
                  <MenuIcon
                    size={24}
                    className={`${
                      isSmallScreen ? "text-gray-600" : "text-[#0D1321]"
                    }`}
                  />
                </div>
              }
              onClick={toggleSidebar}
              onMouseEnter={(e) =>
                handleMouseEnter(
                  isSmallScreen
                    ? "Toggle disabled on small screens"
                    : collapsed
                    ? "Expand sidebar"
                    : "Collapse sidebar",
                  e
                )
              }
              onMouseLeave={handleMouseLeave}
              className={`border border-gray-300 p-2 ${
                isSmallScreen
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:bg-gray-100"
              }`}
              disabled={isSmallScreen}
            ></MenuItem>
          </div>
          {/* Main Menu Items */}
          {menuItems.map((item) =>
            userRole && item.roles.includes(userRole.role) ? (
              <div key={item.title} className="relative">
                <MenuItem
                  icon={
                    <div
                      className={`flex size-full items-center justify-center rounded-full transition-all duration-200 ${
                        getActiveItem() === item.active
                          ? "bg-black"
                          : "bg-gray-200"
                      }`}
                    >
                      {React.cloneElement(item.icon, {
                        className: `text-2xl ${
                          getActiveItem() === item.active
                            ? "text-white"
                            : "text-black"
                        }`,
                      })}
                    </div>
                  }
                  component={<Link to={item.path} />}
                  onMouseEnter={(e) => handleMouseEnter(item.title, e)}
                  onMouseLeave={handleMouseLeave}
                  className={`border border-gray-300 p-2 transition-all duration-200 hover:bg-gray-100 ${
                    getActiveItem() === item.active
                      ? "border-r-4 border-r-[#0D1321] bg-gray-200"
                      : ""
                  }`}
                >
                  <span
                    className={`text-[#0D1321] ${
                      getActiveItem() === item.active ? "font-semibold" : ""
                    }`}
                  >
                    {item.title}
                  </span>
                </MenuItem>
              </div>
            ) : null
          )}
        </Menu>
      </Sidebar>

      {/* Tooltip */}
      {hoveredItem && collapsed && (
        <div
          className="pointer-events-none fixed z-50 whitespace-nowrap rounded-md bg-gray-800 px-3 py-2 text-sm text-white shadow-lg"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translateY(-50%)",
          }}
        >
          {hoveredItem}
          <div className="absolute right-full top-1/2 -translate-y-1/2 transform border-4 border-transparent border-r-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
