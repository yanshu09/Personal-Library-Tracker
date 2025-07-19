import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../pages/login.css';

function LoginOtpPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1: request, 2: verify
  const [message, setMessage] = useState('');
  const [useOtp, setUseOtp] = useState(true); // toggle OTP vs password
  const navigate = useNavigate();

  const requestOtp = async () => {
    try {
      await axios.post('http://localhost:5000/api/otp/request-otp', { email });
      setStep(2);
      setMessage('OTP sent to your email.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/otp/verify-otp', { email, code: otp });
      setMessage('Login successful!');
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid OTP');
    }
  };

  const loginWithPassword = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setMessage('Login successful!');
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <motion.div 
      className="login-bg" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="login-card"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
      >
        <h2 className="login-title">Welcome Back <span role="img" aria-label="wave">👋</span></h2>
        <div className="login-toggle">
          <button 
            className={useOtp ? 'toggle-button active' : 'toggle-button'} 
            onClick={() => { setUseOtp(true); setStep(1); setMessage(''); }}
          >
            Login with OTP
          </button>
          <button 
            className={!useOtp ? 'toggle-button active' : 'toggle-button'} 
            onClick={() => { setUseOtp(false); setMessage(''); setStep(1); }}
          >
            Login with Password
          </button>
        </div>

        <form
          className="login-form"
          autoComplete="off"
          onSubmit={e => {
            e.preventDefault();
            if (useOtp) {
              step === 1 ? requestOtp() : verifyOtp();
            } else {
              loginWithPassword();
            }
          }}
        >
          <AnimatePresence mode="wait">
            {useOtp ? 
              (step === 1 ? (
                <motion.div
                  key="email-otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.38 }}
                  className="input-group"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className={`floating-input ${email ? 'filled' : ''}`}
                    id="login-email"
                    autoFocus
                  />
                  <label htmlFor="login-email" className="floating-label">Email address</label>
                </motion.div>
              ) : (
                <motion.div
                  key="otp-field"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.38 }}
                  className="input-group"
                >
                  <input
                    type="text"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    className={`floating-input ${otp ? 'filled' : ''}`}
                    id="login-otp"
                    autoFocus
                  />
                  <label htmlFor="login-otp" className="floating-label">Enter OTP</label>
                </motion.div>
              ))
              :
              <>
                <motion.div
                  key="pw-email"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.36 }}
                  className="input-group"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className={`floating-input ${email ? 'filled' : ''}`}
                    id="pw-email"
                    autoFocus
                  />
                  <label htmlFor="pw-email" className="floating-label">Email address</label>
                </motion.div>
                <motion.div
                  key="pw-password"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.36 }}
                  className="input-group"
                >
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className={`floating-input ${password ? 'filled' : ''}`}
                    id="pw-password"
                  />
                  <label htmlFor="pw-password" className="floating-label">Password</label>
                </motion.div>
                <div className="forgot-password">
                  <button 
                    className="forgot-button" 
                    type="button"
                    onClick={() => alert('Reset password feature coming soon.')}
                  >
                    Forgot Password?
                  </button>
                </div>
              </>
            }
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="login-button glass-btn"
          >
            {useOtp ? (step === 1 ? 'Send OTP' : 'Verify OTP') : 'Login'}
          </motion.button>
        </form>

        <motion.p
          className={`login-message ${message ? 'show' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: message ? 1 : 0 }}
        >
          {message}
        </motion.p>
        <p className="switch-text">
          Don’t have an account?
          <motion.button
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.97 }}
            className="switch-button"
            onClick={() => navigate('/register')}
            type="button"
          >
            Register
          </motion.button>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default LoginOtpPage;
