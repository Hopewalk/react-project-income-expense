import "./App.css";
import TransactionList from "./components/TransactionList";
import { useState, useEffect } from "react";
import { Divider, Spin, Typography, Layout, theme } from "antd";
import axios from "axios";

import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_TXACTIONS = "/api/txactions";

function FinanceScreen() {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [selectItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    fetchItems();
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
          จำนวนเงินปัจุบัน {currentAmount} บาท
        </Typography.Title>
        <Divider>บันทึก รายรับ - รายจ่าย</Divider>
        <TransactionList data={transactionData} />
      </Spin>
    </Content>
  );
}

export default FinanceScreen;
