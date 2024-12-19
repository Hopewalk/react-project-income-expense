import React, { useState } from "react";
import {
  EditOutlined,
  PlusCircleOutlined,
  EyeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { Link, Navigate } from "react-router-dom";

const sidebar = [
  {
    key: "view",
    icon: <EyeOutlined />,
    label: <Link to="/finance">View Finance</Link>,
  },
  {
    key: "additem",
    icon: <PlusCircleOutlined />,
    label: <Link to="/addtransaction">Add Transaction</Link>,
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: <Link to="/">Logout</Link>,
  },
];

const Nav = () => {
  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    console.log("click", e);
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      selectedKeys={[current]}
      mode="inline"
      items={sidebar}
    />
  );
};

export default Nav;
