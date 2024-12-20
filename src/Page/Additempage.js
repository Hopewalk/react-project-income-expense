import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Tag, Table, Spin, Typography, Divider, Layout, theme } from "antd";
import AddItem from "../components/AddForm";
import axios from "axios";

const URL_TXACTIONS = "/api/txactions";

function TransactionList(props) {
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

function Additempage() {
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    setCurrentAmount(
      transactionData.reduce(
        (sum, transaction) =>
          transaction.type === "income"
            ? (sum += transaction.amount)
            : (sum -= transaction.amount),
        0
      )
    );
  }, [transactionData]);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL_TXACTIONS);
      setTransactionData(
        response.data.data.map((row) => ({
          id: row.id,
          key: row.id,
          ...row.attributes,
        }))
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (item) => {
    try {
      setIsLoading(true);
      const params = { ...item, action_datetime: dayjs() };
      const response = await axios.post(URL_TXACTIONS, { data: params });
      const { id, attributes } = response.data.data;
      setTransactionData([
        ...transactionData,
        { id: id, key: id, ...attributes },
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    addItem();
  }, []);
  const { Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        margin: "220px 40px",
        padding: 20,
        minHeight: 220,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Spin spinning={isLoading}>
        <Typography.Title>
          <AddItem onItemAdded={addItem} />
        </Typography.Title>
        <Divider>จำนวนเงินปัจุบัน {currentAmount}</Divider>
        <TransactionList data={transactionData} />
      </Spin>
    </Content>
  );
}

export default Additempage;
