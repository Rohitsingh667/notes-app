import { useState } from 'react'
import { useAuth } from './AuthContext'

function Login({ onToggleRegister, showRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { login, register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (showRegister && password !== confirmPassword) return
    
    const result = showRegister 
      ? await register(email, password)
      : await login(email, password)
    
    if (!result.success) return
  }

  return (
    <div className="auth">
      <div className="auth-card">
        <h2>{showRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {showRegister && (
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          )}
          <button type="submit">
            {showRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <button onClick={onToggleRegister} className="link">
          {showRegister ? 'Login' : 'Register'}
        </button>
      </div>
    </div>
  )
}

export default Login
