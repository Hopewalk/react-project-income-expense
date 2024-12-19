import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Finance Website</h1>
      <Link to="/login">
        <Button type="primary">Login</Button>
      </Link>
    </div>
  );
}

export default Home;
