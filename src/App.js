import "./App.css";
import axios from "axios";
import { useState } from "react";
import LoginScreen from "./LoginScreen";
import FinanceScreen from "./FinanceScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Page/Home";
import Additempage from "./Page/Additempage";
import Nav from "./components/menubar";
import Edititempage from "./Page/Edititempage";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

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
        <Route path="/" element={<Home />} />
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
        <Route
          path="/finance"
          element={isAuthenticated ? <FinanceScreen /> : <Navigate to="/" />}
        />
        <Route path="/addtransaction" element={<Additempage />} />
        <Route path="/edittransaction" element={<Edititempage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
