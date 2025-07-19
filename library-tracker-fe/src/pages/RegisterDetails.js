import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterDetails() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    profilePicture: null
  });

  const email = localStorage.getItem('registerEmail');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return alert('Email not found in session');

    const data = new FormData();
    data.append('username', form.username);
    data.append('email', email);
    data.append('password', form.password);
    if (form.profilePicture) {
      data.append('profilePicture', form.profilePicture);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', data);
      alert(res.data.message || 'Registered successfully!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Complete Registration</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
      <button type="submit">Create Account</button>
    </form>
  );
}

export default RegisterDetails;
