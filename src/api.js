const API_BASE = 'http://localhost:8000'

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('access_token')
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  
  if (response.status === 204) return null
  const data = await response.json()
  if (!response.ok) throw new Error(data.detail || 'Request failed')
  return data
}

export const authApi = {
  register: (email, password) => request('/auth/register', {
    method: 'POST',
    body: { email, password },
  }),

  login: async (email, password) => {
    const response = await request('/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    localStorage.setItem('access_token', response.access_token)
    return response
  },

  logout: () => localStorage.removeItem('access_token'),
  isAuthenticated: () => !!localStorage.getItem('access_token'),
}

export const notesApi = {
  getNotes: () => request('/notes'),
  createNote: (title, content) => request('/notes', {
    method: 'POST',
    body: { title, content },
  }),
  deleteNote: (id) => request(`/notes/${id}`, { method: 'DELETE' }),
}
