import React, { useState } from 'react';
import API from '../services/api';

function Login() {
  const [email, setEmail] = useState('');

  const handleRequestOTP = async () => {
    try {
      const res = await API.post('/auth/request-otp', { email });
      alert(res.data.message || 'OTP sent!');
    } catch (err) {
      alert('Failed to send OTP: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleRequestOTP();
      }}
      style={{ maxWidth: 400, margin: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      <h2 style={{ textAlign: 'center' }}>Request OTP</h2>
      <input
        type="email"
        aria-label="Email address"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ padding: 10, fontSize: 16, borderRadius: 4, border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        style={{
          padding: 12,
          fontSize: 16,
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Send OTP
      </button>
    </form>
  );
}

export default Login;
