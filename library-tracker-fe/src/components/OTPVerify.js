import React, { useState } from 'react';
import API from '../services/api';

function OTPVerify() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    try {
      const res = await API.post('/auth/verify-otp', { email, code });
      localStorage.setItem('token', res.data.token);
      alert('OTP Verified Successfully!');
    } catch (err) {
      alert('Verification failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleVerify();
      }}
      style={{
        maxWidth: 320,
        margin: '40px auto',
        padding: 20,
        border: '1px solid #ccc',
        borderRadius: 8,
        backgroundColor: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        gap: 15
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: 10 }}>Verify OTP</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ padding: 10, borderRadius: 4, border: '1px solid #ccc' }}
      />
      <input
        placeholder="Enter OTP"
        value={code}
        onChange={e => setCode(e.target.value)}
        required
        style={{ padding: 10, borderRadius: 4, border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        style={{
          padding: 10,
          borderRadius: 4,
          border: 'none',
          backgroundColor: '#007bff',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Verify
      </button>
    </form>
  );
}

export default OTPVerify;
