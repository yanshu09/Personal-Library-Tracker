import React, { useState } from 'react';
import API from '../services/api';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    profilePicture: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', form.username);
    data.append('email', form.email);
    data.append('password', form.password);
    if (form.profilePicture) {
      data.append('profilePicture', form.profilePicture);
    }

    try {
      const res = await API.post('/auth/register', data);
      alert(res.data.message || 'Registered Successfully!');
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };

  // Simple inline styles (for demo)
  const styles = {
    formContainer: {
      maxWidth: '400px',
      margin: '40px auto',
      padding: '30px',
      boxShadow: '0 0 15px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      backgroundColor: '#fff',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      marginBottom: '20px',
      textAlign: 'center',
      color: '#333',
      fontWeight: '600',
      fontSize: '1.8rem',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      margin: '10px 0',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      transition: 'border-color 0.3s',
    },
    inputFocus: {
      borderColor: '#007BFF',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '12px',
      marginTop: '20px',
      backgroundColor: '#007BFF',
      color: '#fff',
      fontWeight: '600',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  // Track focus for input styles
  const [focusField, setFocusField] = useState(null);

  return (
    <form 
      onSubmit={handleSubmit} 
      encType="multipart/form-data" 
      style={styles.formContainer}
      noValidate
    >
      <h2 style={styles.heading}>Register</h2>

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
        style={{
          ...styles.input,
          ...(focusField === 'username' ? styles.inputFocus : {})
        }}
        onFocus={() => setFocusField('username')}
        onBlur={() => setFocusField(null)}
      />

      <input
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
        required
        style={{
          ...styles.input,
          ...(focusField === 'email' ? styles.inputFocus : {})
        }}
        onFocus={() => setFocusField('email')}
        onBlur={() => setFocusField(null)}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
        style={{
          ...styles.input,
          ...(focusField === 'password' ? styles.inputFocus : {})
        }}
        onFocus={() => setFocusField('password')}
        onBlur={() => setFocusField(null)}
      />

      <input
        type="file"
        name="profilePicture"
        accept="image/*"
        onChange={handleChange}
        style={{ marginTop: '10px' }}
      />

      <button
        type="submit"
        style={styles.button}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007BFF'}
      >
        Register
      </button>
    </form>
  );
}

export default Register;
