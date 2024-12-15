import "./App.css";
import TransactionList from "./components/TransactionList";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Divider, Spin, Typography } from "antd";
import AddItem from "./components/AddItem";
import { EditItem } from "./components/Edititem";
import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_TXACTIONS = "/api/txactions";

function FinanceScreen() {
  // const [transactionData, setTransactionData] = useState([
  //   { id: 1, created: "01/02/2021 - 08:30", type: "income", amount: 20000, note: "allowance" },
  //   { id: 2, created: "01/02/2021 - 10:30", type: "expense", amount: 150, note: "à¸­à¸²à¸«à¸²à¸£à¹€à¸—à¸µà¹ˆà¸¢à¸‡" }
  // ]);
  const [amount, setAmount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
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
  useEffect(() => {
    setAmount(
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

  const EditItem = async (item) => {
    try {
      setIsLoading(true);
      const params = { ...item };
      const response = await axios.update(URL_TXACTIONS, { data: params });
      const { id, attributes } = response.data.data;
      setTransactionData([
        ...transactionData,
        { id: id, key: id, ...attributes },
      ]);
      fetchItems();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      setIsLoading(true);
      await axios.delete(`${URL_TXACTIONS}/${itemId}`);
      fetchItems();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchItems();
    addItem();
    EditItem();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Spin spinning={isLoading}>
          <Typography.Title>
            จำนวนเงินปัจุบัน{currentAmount} บาท
          </Typography.Title>
          <AddItem onItemAdded={addItem} />
          <Divider>บันทึก รายรับ - รายจ่าย</Divider>
          <TransactionList
            data={transactionData}
            onTransactionDeleted={deleteItem}
            onItemEdited={EditItem}
          />
        </Spin>
      </header>
    </div>
  );
}

export default FinanceScreen;
