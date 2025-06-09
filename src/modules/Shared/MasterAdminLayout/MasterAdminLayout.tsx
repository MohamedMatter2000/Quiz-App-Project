import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";

const MasterAdminLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex h-full flex-1 flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterAdminLayout;
