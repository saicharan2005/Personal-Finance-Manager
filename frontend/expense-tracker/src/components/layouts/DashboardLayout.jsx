import React, { useContext } from "react";
import Navbar from "./Navbar"; // Make sure the import is correct

import SideMenu from "./SideMenu"; // Adjust if it's in a different folder
import { UserContext } from "../../context/UserContext";


const DashboardLayout = ({ children, activeMenu }) => {

  const { user } = useContext(UserContext);
  console.log("User inside DashboardLayout:", user);
 
  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
