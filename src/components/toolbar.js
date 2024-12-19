import React, { useState } from "react";
import {
  EditOutlined,
  PlusCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

const sidebar = [
  {
    key: "Finance",
    icon: <EyeOutlined />,
    label: "View Finance",
  },
  {
    key: "",
    icon: <PlusCircleOutlined />,
    label: "Edit transaction",
  },
];
