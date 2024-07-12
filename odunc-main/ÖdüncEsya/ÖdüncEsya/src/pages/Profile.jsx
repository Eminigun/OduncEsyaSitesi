import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import '../css/Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [user, setUser] = useState({});
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      // Kullanıcının giriş yaptığı e-posta ve şifreyi state'e ve form'a set ediyoruz
      setUser({ email: storedUser.email, password: storedUser.password });
      form.setFieldsValue({
        email: storedUser.email,
        password: storedUser.password,
        phone: '',
        address: '',
      });
    }
  }, [form]);

  const onFinish = (values) => {
    localStorage.setItem('loggedInUser', JSON.stringify({ email: values.email, password: values.password }));
    setUser({ email: values.email, password: values.password });
    setEditable(false); // Düzenleme modunu kapat
    alert('Profil bilgileri güncellendi');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isLoggedIn'); // Kullanıcı çıkış yapınca isLoggedIn'i kaldır
    navigate('/');
  };

  const toggleEditable = () => {
    setEditable(!editable);
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2 className="page-title">Profil Bilgileri</h2>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="email" label="Email">
            <Input disabled={!editable} />
          </Form.Item>
          <Form.Item name="password" label="Şifre">
            <Input.Password disabled={!editable} />
          </Form.Item>
          <Form.Item name="phone" label="Telefon Numarası" rules={[{ required: true }]}>
            <Input disabled={!editable} />
          </Form.Item>
          <Form.Item name="address" label="Adres" rules={[{ required: true }]}>
            <Input disabled={!editable} />
          </Form.Item>
          {editable ? (
            <Form.Item>
              <Button type="primary" htmlType="submit" block>Güncelle</Button>
              <Button onClick={() => setEditable(false)} block>İptal</Button>
            </Form.Item>
          ) : (
            <Form.Item>
              <Button type="primary" onClick={toggleEditable} block>Düzenle</Button>
            </Form.Item>
          )}
        </Form>
        <Button type="primary" onClick={handleLogout} block>Çıkış Yap</Button>
      </div>
    </div>
  );
};

export default Profile;
