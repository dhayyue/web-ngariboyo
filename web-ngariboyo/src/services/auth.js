import { API_BASE_URL } from './api.js'

const parseResponse = async (res) => {
  const json = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(json.message || 'Permintaan ke server gagal')
  }

  return json
}

// Login Admin
export const loginAdmin = async (username, password) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  const json = await parseResponse(res)

  localStorage.setItem('admin_token', json.token)
  localStorage.setItem('admin_user', JSON.stringify(json.admin))

  return json
}

// Ambil token aktif
export const getToken = () => {
  return localStorage.getItem('admin_token')
}

// Ambil data user admin
export const getAdminUser = () => {
  const user = localStorage.getItem('admin_user')

  return user ? JSON.parse(user) : null
}

// Cek apakah sedang login
export const isAuthenticated = () => {
  return !!localStorage.getItem('admin_token')
}

// Logout
export const logoutAdmin = () => {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
}

// Ambil profil admin dari token aktif
export const getAdminProfile = async () => {
  const token = getToken()

  if (!token) return null

  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  try {
    const json = await parseResponse(res)
    const user = json.data

    localStorage.setItem('admin_user', JSON.stringify(user))
    return user
  } catch (error) {
    if (res.status === 401 || res.status === 403) {
      logoutAdmin()
    }
    throw error
  }
}