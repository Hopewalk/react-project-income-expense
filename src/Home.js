import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Finance</h1>
      <h2>Income & Expenses</h2>
      <Link to="/login">
        <Button type="primary">Sign In</Button>
      </Link>
    </div>
  );
}

export default Home;
