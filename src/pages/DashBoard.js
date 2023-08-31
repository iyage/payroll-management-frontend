import React, { useEffect } from "react";
import verifyRoles from "../utils/verifyRoles";
import { roles } from "../utils/roles";
import { useNavigate } from "react-router-dom";
import Employees from "./Employees";

function DashBoard() {
  const navigate = useNavigate();

  useEffect(() => {
    !verifyRoles(roles.adminRole) && navigate("/page/unauthorized_page");
  }, []);
  return (
    <div>
      <Employees />
    </div>
  );
}

export default DashBoard;
