import React, { useState } from 'react';
import axios from 'axios';
import "./register.css"

export default function Register() {
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => { 
    e.preventDefault();
    setMsg('');

    if (!form.email || !form.username || !form.password) {
      setMsg('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:10000/auth/register', form);
      setMsg(`Registered ✓  ${res.data.username}`);
      setForm({ email: '', username: '', password: '' });
    } catch (err) {
      setMsg(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || !form.email || !form.username || !form.password;

  return (
      <div className='register2'>
      <h2 className='Register3'>Create account</h2>

      <form onSubmit={onSubmit}>
        <div className='Email3'>
          <label >Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
            
          />
        </div>

        <div className='username'>
          <label >Username</label>
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="username"
          />
        </div>

        <div className='Password3'>
          <label >Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="••••••••"
          />
        </div>

        <button type="submit" disabled={disabled} className='submit' >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
<p>if you have account then login</p>
<a href="/">login</a>
      
    </div>
  );
}
