import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../css/Login.css'; // Stil dosyasını import edin
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find(user => user.username === values.username && user.password === values.password);
    
    if (user) {
      // Kullanıcı giriş yaptıysa isLoggedIn ayarla
      localStorage.setItem('isLoggedIn', 'true'); 
      // Kullanıcının e-posta ve şifresini localStorage'a kaydet
      localStorage.setItem('loggedInUser', JSON.stringify({ email: values.username, password: values.password }));
      navigate('/home');
    } else {
      alert('Geçersiz öğrenci no veya şifre');
    }
  };

  return (
    <div className='login-form-container'>
      <Form 
        form={form}
        onFinish={handleSubmit}
        className="login-form"
      >
        <h1>Giriş Yap</h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Öğrenci numaranızı girin' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Öğrenci No " />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Şifrenizi Girin' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Şifre" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" initialValue={true}>
          <Checkbox>Beni Hatırla</Checkbox>
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Şifremi Unuttum
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Giriş yap
          </Button>
          Veya <a href="/register">Kaydol!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
