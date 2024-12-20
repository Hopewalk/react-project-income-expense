import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App-header">
      <div className="App">
        <h1>Finance</h1>
        <h2>Income & Expenses</h2>
        <Link to="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
