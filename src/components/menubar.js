import React, { useState } from "react";
import {
  EditOutlined,
  PlusCircleOutlined,
  EyeOutlined,
  LogoutOutlined,
  LineHeightOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

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
    key: "edititem",
    icon: <EditOutlined />,
    label: <Link to="/edittransaction">Edit Transaction</Link>,
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: <Link to="/">Logout</Link>,
  },
];

function logout() {
  localStorage.clear();
  window.location.href = "/";
}
const Nav = () => {
  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    if (e.key === "logout") {
      logout();
    } else {
      setCurrent(e.key);
    }
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      theme="dark"
      mode="inline"
      items={sidebar}
    />
  );
};

export default Nav;
