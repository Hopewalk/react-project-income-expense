import "./App.css";
import axios from "axios";
import { useState } from "react";
import LoginScreen from "./LoginScreen";
import FinanceScreen from "./FinanceScreen";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => setIsAuthenticated(true);

  return (
    // <div className="App">
    //   <header className="App-header">
    //     {!isAuthenticated && (
    //       <LoginScreen onLoginSuccess={handleLoginSuccess} />
    //     )}
    //     {isAuthenticated && <FinanceScreen />}
    //   </header>
    //  </div>
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/Finance" />
                ) : (
                  <LoginScreen onLoginSuccess={handleLoginSuccess} />
                )
              }
            />
            <Route
              path="/Finance"
              element={
                isAuthenticated ? <FinanceScreen /> : <Navigate to="/" />
              }
            />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
