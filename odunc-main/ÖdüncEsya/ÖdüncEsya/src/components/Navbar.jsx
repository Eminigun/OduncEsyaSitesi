import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const Navbar = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link to="/home">Ana Sayfa</Link>
      </Menu.Item>
      <Menu.Item key="profile">
        <Link to="/profile">Profil</Link>
      </Menu.Item>
      <Menu.Item key="add-item">
        <Link to="/add-item">Eşya Ekle</Link>
      </Menu.Item>
      <Menu.Item key="item-list">
        <Link to="/item-list">Eşyalar</Link>
      </Menu.Item>
      <Menu.Item key="cart">
        <Link to="/cart">Sepet</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <Link to="/" onClick={() => localStorage.removeItem('user')}>Çıkış Yap</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
