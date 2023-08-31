import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import DashBoard from "./pages/DashBoard";
import Unauthorized from "./pages/Unauthorized";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/page" element={<Home />}>
            <Route index element={<DashBoard />} />
            <Route path="/page/employee/:id" element={<Employee />} />
            <Route path="/page/admin_page" element={<AdminPage />} />
            <Route path="/page/unauthorized_page" element={<Unauthorized />} />
          </Route>
        </Routes>
      </>
    </>
  );
}

export default App;
