import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../stylesheet/Login_Signup.css';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    if (isForgotPassword) {
      if (!email || !password || !confirmPassword) {
        toast.error('Please fill all fields');
        return;
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      try {
        const backend = 'https://capstone-a5ic.onrender.com:5000';
        const response = await fetch(`${backend}/api/auth/forgot-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        toast.success('Password reset successful');
        setError('');
        setIsForgotPassword(false);
        setIsLogin(true);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      }

      return;
    }

    try {
      const backend = 'https://capstone-a5ic.onrender.com:5000';
      const response = await fetch(
        isLogin ? `${backend}/api/auth/login` : `${backend}/api/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            isLogin
              ? { email, password }
              : { username, email, password, role }
          ),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success(isLogin ? 'Login successful' : 'Registration successful');
      setError('');

      if (isLogin) {
        login(data);
        if (data.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (data.role === 'organizer') {
          navigate('/organizer-dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="image-container">
        <img src="./eventBooking.jpg" alt="Event" />
      </div>
      <div className="form-container">
        <h2>Welcome to Event Innovators</h2>
        <p>Discover and book the best events near you.</p>
        <div className="toggle-container">
          <button onClick={() => { setIsLogin(true); setIsForgotPassword(false); }} className={isLogin && !isForgotPassword ? 'active' : ''}>Login</button>
          <button onClick={() => { setIsLogin(false); setIsForgotPassword(false); }} className={!isLogin && !isForgotPassword ? 'active' : ''}>Sign Up</button>
        </div>
        <form onSubmit={handleSubmit}>
          {isForgotPassword ? (
            <>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button className="submit-button" type="submit">Reset Password</button>
              <br/>
              <button className="back-login" type="button" onClick={() => setIsForgotPassword(false)}>Back to Login</button>
            </>
          ) : (
            <>
              {!isLogin && (
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              )}
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isLogin && (
                <div>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              )}
              {!isLogin && (
                <div>
                  <label>Role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="user">User</option>
                    <option value="organizer">Organizer</option>
                  </select>
                </div>
              )}
              <button className="submit-button" type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
              {isLogin && <p><a href="#" onClick={() => setIsForgotPassword(true)}>Forgot password?</a></p>}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
