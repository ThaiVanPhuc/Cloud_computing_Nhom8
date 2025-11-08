import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import httpRequest from '../../../utils/httpRequest';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail()) {
      alert('Email không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    try {
      const response = await httpRequest.post("login", formData);
      // Nếu muốn lấy dữ liệu trả về:
      const data = response.data;
      console.log(data);

      if (response.status === 200 || response.status === 201) {
        const { token, user } = data;

        // ✅ Lưu thông tin người dùng và token
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        alert('Đăng nhập thành công!');

        // ✅ Điều hướng theo vai trò
        const role = user.role?.toLowerCase();
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        alert(`Đăng nhập thất bại: ${data.message || 'Sai thông tin đăng nhập'}`);
      }
    } catch (error) {
      console.error('Lỗi khi gọi API đăng nhập:', error);
      alert('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image" />
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          <span className="text-gray">Don't have an account? </span>
          <Link to="/signup" className="text-blue">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
