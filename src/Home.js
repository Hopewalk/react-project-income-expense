import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Finance Website</h1>
      <Button type="primary">
        <Link to="/login">Login</Link>
      </Button>
    </div>
  );
}

export default Home;
