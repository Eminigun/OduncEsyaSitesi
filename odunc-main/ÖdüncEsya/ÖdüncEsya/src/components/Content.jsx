import React from 'react';
import { Layout, theme } from 'antd';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Profile from '../pages/Profile';
import AddItem from '../components/AddItem';
import ItemList from '../components/ItemList';
import Cart from '../components/Cart';

const { Content } = Layout;

const AppContent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content style={{ padding: '0 24px', minHeight: 280 }}>
      <div
        style={{
          background: colorBgContainer,
          minHeight: 360,
          padding: 24,
          borderRadius: borderRadiusLG,
        }}
      >
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/item-list" element={<ItemList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<HomePage/>} /> {/* Varsayılan rota */}
        </Routes>
      </div>
    </Content>
  );
};

export default AppContent;
