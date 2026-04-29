import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Eye, EyeOff } from 'lucide-react';
import './Login.css';

export default function Login() {
  const { loginWithGoogle, loginWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to log in with Google. Ensure you have enabled it in the Firebase Console.');
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailSignIn(e) {
    e.preventDefault();
    if (!email || !password) {
      return setError('Please enter both email and password.');
    }
    try {
      setError('');
      setLoading(true);
      await loginWithEmail(email, password);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to log in with email. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="lock-icon-wrapper">
            <Lock size={32} />
          </div>
          <h2>Sign In to Findit</h2>
          <p>Please safely authenticate yourself to access the campus portals securely.</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleEmailSignIn}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className="login-input" 
              placeholder="e.g. user@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                className="login-input" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="email-btn"
          >
            {loading ? 'Please wait...' : 'Sign in with Email'}
          </button>
        </form>

        <div className="divider">or</div>

        <button 
          type="button"
          onClick={handleGoogleSignIn} 
          disabled={loading} 
          className="google-btn"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" className="google-logo" />
          {loading ? 'Please wait...' : 'Sign in with Google'}
        </button>
        
        <p className="login-footer">
          Access is restricted strictly to verified campus individuals.<br/>
          By logging in, you agree to our Terms of Use.
        </p>
      </div>
    </div>
  );
}
