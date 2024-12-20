import React from "react";
import { Button, Table, Space, Tag, Popconfirm, Modal } from "antd";
import { DeleteOutlined, BugOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export default function TransactionList(props) {
  const columns = [
    {
      title: "Date-Time",
      dataIndex: "action_datetime",
      key: "action_datetime",
      render: (_, record) =>
        dayjs(record.action_datetime).format("DD/MM/YYYY - HH:mm"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (_, record) => (
        <Tag color={record.type === "income" ? "green" : "red"}>
          {record.type}
        </Tag>
      ),
    },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Note", dataIndex: "note", key: "note" },
  ];

  return (
    <>
      <Table columns={columns} dataSource={props.data} rowKey="id" />
    </>
  );
}
