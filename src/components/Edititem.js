import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";

const EditItem = ({ defaultItem, onEdit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (defaultItem) {
      form.setFieldsValue({
        id: defaultItem.id,
        note: defaultItem.note,
        amount: defaultItem.amount,
      });
    }
  }, [defaultItem, form]);

  const handleEdit = () => {
    form.validateFields().then((values) => {
      const updatedItem = {
        ...defaultItem,
        ...values,
      };
      onEdit(updatedItem);
    });
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item name="id" label="ID" hidden>
        <Input disabled />
      </Form.Item>

      <Form.Item
        name="type"
        label="ชนิด"
        rules={[{ required: true }]}
        layout="horizontal"
      >
        <Select
          allowClear
          style={{ width: "100px" }}
          options={[
            { value: "income", label: "รายรับ" },
            { value: "expense", label: "รายจ่าย" },
          ]}
        />
      </Form.Item>

      <Form.Item name="amount" label="จำนวนเงิน" rules={[{ required: true }]}>
        <InputNumber placeholder="จํานวนเงิน" />
      </Form.Item>

      <Form.Item name="note" label="หมายเหตุ" rules={[{ required: true }]}>
        <Input.TextArea rows={1} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleEdit}>
          Edit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditItem;
