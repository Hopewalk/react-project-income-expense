import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, Modal } from "antd";

const EditItem = ({ onEdit, defaultItem, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (defaultItem) {
      form.setFieldsValue({
        id: defaultItem.id,
        type: defaultItem.type,
        note: defaultItem.note,
        amount: defaultItem.amount,
      });
    }
  }, [defaultItem, form]);

  const ConfirmEdit = () => {
    form.validateFields().then((item) => {
      const updatedItem = {
        ...defaultItem,
        ...item,
      };
      onEdit(updatedItem);
      onCancel();
    });
  };

  return (
    <Modal
      open={true}
      title="แก้ไข"
      onOk={onEdit}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={ConfirmEdit}>
          Edit
        </Button>,
      ]}
    >
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
          <InputNumber placeholder="จำนวนเงิน" />
        </Form.Item>

        <Form.Item name="note" label="หมายเหตุ" rules={[{ required: true }]}>
          <Input.TextArea rows={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditItem;
