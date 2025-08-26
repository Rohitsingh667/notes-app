import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from './api'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsAuthenticated(authApi.isAuthenticated())
  }, [])

  const login = async (email, password) => {
    try {
      await authApi.login(email, password)
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (email, password) => {
    try {
      await authApi.register(email, password)
      return await login(email, password)
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    authApi.logout()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
