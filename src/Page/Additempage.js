import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Layout, theme } from "antd";
import AddItem from "../components/AddForm";
import axios from "axios";
import Nav from "../components/menubar";

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

  const { Header, Sider, Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null}>
        <div className="demo-logo-vertical" />
        <Nav />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "400px 40px",
            padding: 20,
            minHeight: 200,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <AddItem onItemAdded={addItem} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Additempage;
