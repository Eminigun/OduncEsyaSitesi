import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Modal } from 'antd';
import '../css/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
  }, []);

  const showCheckoutModal = () => {
    setVisible(true);
  };

  const handleCheckout = (values) => {
    console.log('Kart Bilgileri:', values);
    // İşlem tamamlandığında sepeti temizle
    setCartItems([]);
    localStorage.removeItem('cart');
    setVisible(false);
    // İşlemin başarıyla tamamlandığına dair kullanıcıya bir mesaj göster
    Modal.success({
      title: 'Başarılı',
      content: 'Ödünç alma işlemi başarıyla tamamlandı.',
    });
  };

  const handleEmptyCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart">
      <div className="cart-container">
        <h2>Sepet</h2>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Ödünç Verme Süresi: {item.duration} gün</p>
                <p>Fiyat: {item.price} TL</p>
              </div>
            ))}
            <div className="cart-total">
              <h3>Toplam Fiyat: {totalPrice} TL</h3>
            </div>
            <div className="cart-buttons">
              <Button type="primary" onClick={showCheckoutModal}>
                Ödünç Al
              </Button>
              <Button onClick={handleEmptyCart} danger>
                Sepeti Boşalt
              </Button>
            </div>
            <Modal
              title="Kart Bilgileri"
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <Form onFinish={handleCheckout}>
                <Form.Item
                  name="cardNumber"
                  label="Kart Numarası"
                  rules={[{ required: true, message: 'Lütfen kart numaranızı girin!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="expiryDate"
                  label="Son Kullanma Tarihi"
                  rules={[{ required: true, message: 'Lütfen son kullanma tarihini girin!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="cvv"
                  label="CVV"
                  rules={[{ required: true, message: 'Lütfen CVV kodunu girin!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Ödünç Al
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </>
        ) : (
          <p>Sepetinizde henüz bir eşya yok.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
