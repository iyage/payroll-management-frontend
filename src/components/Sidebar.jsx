import React from "react";
import styled from "styled-components";
import logo from "../images/2jEZq4-LogoMakr.png";
import { Link } from "react-router-dom";
import verifyRoles from "../utils/verifyRoles";
import { roles } from "../utils/roles";
const Container = styled.div`
  position: sticky;
  background-color: #f9fbfa;
  left: 0;
  top: 0;
  height: 100vh;
`;
const SidebarHeader = styled.div`
  height: 70px;
  background-color: #00684a;
  width: 100%;
  display: flex;
  align-items: center;
`;
const LogoContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
`;
const Img = styled.img`
  object-fit: cover;
  width: 100%;
`;
const Info = styled.h3`
  color: white;
`;
function Sidebar() {
  return (
    <Container>
      <SidebarHeader>
        <LogoContainer>
          <Img src={logo} alt="" />
        </LogoContainer>
        <Info>Payroll management</Info>
      </SidebarHeader>
      <ul className="menus">
        <li
          className={
            verifyRoles(roles.adminRole) ? "menu-list" : "menu-list disable"
          }>
          <Link to={"/page"} className="menu">
            Dashboard
          </Link>
        </li>
        <li
          className={
            verifyRoles(roles.adminRole) ? "menu-list" : "menu-list disable"
          }>
          <Link to={"/page/admin_page"} className="menu">
            Admin
          </Link>
        </li>
      </ul>
    </Container>
  );
}

export default Sidebar;
