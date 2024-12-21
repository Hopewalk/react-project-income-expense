import "./App.css";
import axios from "axios";
import { useState } from "react";
import LoginScreen from "./LoginScreen";
import FinanceScreen from "./FinanceScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Additempage from "./Page/Additempage";
import Nav from "./components/menubar";
import Edititempage from "./Page/Edititempage";
import { Layout } from "antd";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  const { Sider } = Layout;
  return (
    // <div className="App">
    //   <header className="App-header">
    //     {!isAuthenticated && (
    //       <LoginScreen onLoginSuccess={handleLoginSuccess} />
    //     )}
    //     {isAuthenticated && <FinanceScreen />}
    //   </header>
    //  </div>
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginScreen onLoginSuccess={handleLoginSuccess} />
            ) : (
              <Navigate to="/finance" />
            )
          }
        />
      </Routes>
      <Layout>
        <Sider>
          <div>{isAuthenticated ? <Nav /> : <Navigate to="/login" />}</div>
        </Sider>
        <Routes>
          <Route
            path="/finance"
            element={isAuthenticated ? <FinanceScreen /> : <Navigate to="/" />}
          />
          <Route path="/addtransaction" element={<Additempage />} />
          <Route path="/edittransaction" element={<Edititempage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
