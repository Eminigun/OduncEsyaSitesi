import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, InputNumber, Button } from 'antd';
import '../css/AddItem.css';

const AddItem = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(values);
    localStorage.setItem('items', JSON.stringify(items));
    navigate('/item-list');
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2 className="page-title">Eşya Ekle</h2>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="name" label="Eşya Adı" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Açıklama">
            <Input />
          </Form.Item>
          <Form.Item name="duration" label="Ödünç Verme Süresi (gün)" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="price" label="Değer (TL)" rules={[{ required: true, type: 'number', min: 0 }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Ekle
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddItem;
