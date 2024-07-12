import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../css/Register.css'; // Stil dosyasını import edin

const RegisterForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    // Varolan kullanıcıları localStorage'dan al
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Yeni kullanıcıyı ekle
    const newUser = {
      username: values.username,
      password: values.password,
    };
    existingUsers.push(newUser);
    
    // Güncellenmiş kullanıcı listesini localStorage'a kaydet
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    // Kullanıcıya başarı mesajı gösterebilir veya başka bir işlem yapabilirsiniz
    alert('Başarıyla Kayıt Olundu!');
    
    // Formu sıfırla
    form.resetFields();
  };

  return (
    <div className='login-form-container'>
      <Form
        form={form}
        onFinish={handleSubmit}
        className="login-form"
      >
        <h1 className='login-form-h1'>Kaydol</h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" initialValue={true}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Kaydol
          </Button>
          Or <a href="/login">Login now</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
