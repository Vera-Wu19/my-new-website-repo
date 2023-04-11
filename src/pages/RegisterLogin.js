import React, { useState } from "react";
import axios from "axios";

function RegisterLogin() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>注册</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          placeholder="用户名"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="邮箱"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="密码"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">注册</button>
      </form>
      <h1>登录</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="邮箱"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="密码"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">登录</button>
      </form>
    </div>
  );
}

export default RegisterLogin;
