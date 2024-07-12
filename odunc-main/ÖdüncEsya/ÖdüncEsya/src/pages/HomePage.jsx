import React, { useState, useEffect } from 'react';
import { List, Card, Button, Input, message } from 'antd';
import '../css/HomePage.css';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
    setFilteredItems(storedItems);
  }, []);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    message.success(`${item.name} sepete eklendi!`);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === '') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.name.toLowerCase().includes(term.toLowerCase())));
    }
  };
const sendHandler = () => {
  alert("eşyalar mail olarak gönderildi")
}

  return (
    <div className="page-container">
      <button className="button-mail" onClick = {() => sendHandler()} >Ödünç Alınan Eşyaları Mail Olarak Gönder</button>
      <div className="item-list">
        <h1>Eşyalar</h1>
        <Input
          placeholder="Eşya adına göre ara"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: 20 }}
        />
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={filteredItems}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.name}>
                {item.description}
                <p>Ödünç Verme Süresi: {item.duration} gün</p>
                <p>Fiyat: {item.price} TL</p>
                <div style={{ marginTop: 10 }}>
                  <Button type="primary" onClick={() => addToCart(item)}>
                    Sepete Ekle
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

export default HomePage;
