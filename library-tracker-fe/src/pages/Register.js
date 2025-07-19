import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../pages/register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const requestOtp = async () => {
    setError('');
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/otp/request-otp', { email });
      setStep(2);
    } catch (err) {
      setError('OTP send failed.');
    }
  };

  const verifyOtp = async () => {
    setError('');
    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/otp/verify-otp', {
        email,
        code: otp,
        forRegistration: true,
      });
      localStorage.setItem('registerEmail', email);
      navigate('/register/details');
    } catch (err) {
      setError('OTP verification failed.');
    }
  };

  return (
    <motion.div className="register-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div
        className="register-card"
        initial={{ y: 44, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.13, type: 'spring' }}
      >
        <h2 className="register-title">Register with Email</h2>
        <p className="register-subtitle">We'll send you a one-time code to get started!</p>

        <form
          className="register-form"
          onSubmit={e => {
            e.preventDefault();
            step === 1 ? requestOtp() : verifyOtp();
          }}
          autoComplete="off"
        >
          {step === 1 ? (
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={`floating-input ${email ? 'filled' : ''}`}
                id="register-email"
                autoFocus
              />
              <label htmlFor="register-email" className="floating-label">
                Email address
              </label>
            </div>
          ) : (
            <div className="input-group">
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
                maxLength={6}
                className={`floating-input ${otp ? 'filled' : ''}`}
                id="register-otp"
                autoFocus
              />
              <label htmlFor="register-otp" className="floating-label">
                Enter OTP
              </label>
            </div>
          )}
          {error && <div className="register-error">{error}</div>}

          <button type="submit" className="register-button glass-btn">
            {step === 1 ? 'Request OTP' : 'Verify OTP'}
          </button>
        </form>

        <p className="switch-text">
          Already have an account?
          <button className="switch-button" onClick={() => navigate('/login')}>
            Login
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Register;
