import React from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";

export const EditItem = () => {
  const [form] = Form.useForm();
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
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};
