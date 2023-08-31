import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { BiUserCircle } from "react-icons/bi";

const Header = styled.div`
  background-color: white;
  border-bottom: 1px solid #dedddd;
  height: 70px;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 5px 20px;
  gap: 20px;
  position: fixed;
  top: 0;
  right: 0;
  left: 300px;
  @media screen and (max-width: 761px) {
    display: none;
  }
`;
const Avatar = styled.span`
  font-size: 45px;
  color: #dedddd;
`;
const UserInfo = styled.span`
  color: #00684a;
`;
const Main = styled.div`
  flex: 80%;
`;
// const Footer = styled.div`
//   width: 100%;
//   height: 20vh;
//   background-color: #00684a;
//   color: white;
// `;
const Left = styled.div`
  flex: 300px;
  @media screen and (max-width: 761px) {
    display: none;
  }
`;
const Container = styled.div`
  display: flex;
`;
const MainBody = styled.div`
  min-height: calc(80vh - 70px);
  padding: 20px;
  margin-top: 70px;
`;
function Home() {
  return sessionStorage.getItem("logIn") ? (
    <Container>
      <Left>
        {" "}
        <Sidebar />
      </Left>
      <Main>
        <Header>
          <Avatar>
            <BiUserCircle />
          </Avatar>
          <UserInfo>
            {`${
              JSON.parse(sessionStorage.getItem("userInfo")).firstName
            }      ${JSON.parse(sessionStorage.getItem("userInfo")).lastName}`}
          </UserInfo>
        </Header>
        <MainBody>{<Outlet />}</MainBody>

        {/* <Footer>Footer</Footer> */}
      </Main>
    </Container>
  ) : (
    <Navigate to={"/"} />
  );
}

export default Home;
