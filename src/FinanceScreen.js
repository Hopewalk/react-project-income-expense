import "./App.css";
import TransactionList from "./components/TransactionList";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Button, Divider, Spin, Typography, Form } from "antd";
import AddItem from "./components/AddItem";
import EditItem from "./components/Edititem";
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

  const handleNoteChanged = (id, note) => {
    setTransactionData(
      transactionData.map((transaction) => {
        transaction.note = transaction.id === id ? note : transaction.note;
        return transaction;
      })
    );
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

  const editItem = async (item) => {
    try {
      setIsLoading(true);
      const response = await axios.put(`${URL_TXACTIONS}/${item.id}`, {
        data: item,
      });
      fetchItems();
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

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Spin spinning={isLoading}>
          <Typography.Title>
            จำนวนเงินปัจุบัน {currentAmount} บาท
          </Typography.Title>
          <AddItem onItemAdded={addItem} />
          <Divider>บันทึก รายรับ - รายจ่าย</Divider>
          <TransactionList
            data={transactionData}
            onTransactionDeleted={deleteItem}
            onNoteChanged={handleNoteChanged}
            onEditTransaction={handleEditItem}
          />
          {isModalOpen && (
            <EditItem
              defaultItem={selectItem}
              onCancel={handleCancel}
              onEdit={editItem}
            />
          )}
        </Spin>
      </header>
    </div>
  );
}

export default FinanceScreen;
