import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Button, Divider, Spin, Typography } from "antd";
import AddItem from "./AddForm";
import EditItem from "./Edititem";
import axios from "axios";
import Nav from "./menubar";

const URL_TXACTIONS = "/api/txactions";

function Additempage() {
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // const handleNoteChanged = (id, note) => {
  //   setTransactionData(
  //     transactionData.map((transaction) => {
  //       transaction.note = transaction.id === id ? note : transaction.note;
  //       return transaction;
  //     })
  //   );
  // };

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

  return (
    <div className="App">
      <header>
        <Nav />
      </header>
      <body>
        <AddItem onItemAdded={addItem} />
      </body>
    </div>
  );
}

export default Additempage;
