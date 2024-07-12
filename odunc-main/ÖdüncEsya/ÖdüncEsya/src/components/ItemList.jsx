import React, { useState, useEffect } from 'react';
import { List, Card, Button, message, Modal } from 'antd';
import '../css/ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    message.success(`${item.name} sepete eklendi!`);
  };

  const handleDelete = (item) => {
    Modal.confirm({
      title: 'Eşyayı Sil',
      content: `Emin misiniz? "${item.name}" silinecek.`,
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: () => confirmDelete(item.id),
    });
  };

  const confirmDelete = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    message.success('Eşya başarıyla silindi.');
  };

  return (
    <div className="page-container">
      <div className="item-list">
        <h1>Eşyalar</h1>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={items}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.name}>
                <p>{item.description}</p>
                <p>Ödünç Verme Süresi: {item.duration} gün</p>
                <p>Fiyat: {item.price} TL</p>
                <div style={{ marginTop: 10 }}>
                  <Button type="primary" onClick={() => addToCart(item)}>
                    Sepete Ekle
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={() => handleDelete(item)}>
                    Sil
                  </Button>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ItemList;
