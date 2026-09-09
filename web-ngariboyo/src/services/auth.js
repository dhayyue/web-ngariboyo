const API_BASE_URL = 'http://localhost:5000/api'

// Login Admin
export const loginAdmin = async (username, password) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Login gagal')

  // Simpan token dan data profil ke browser
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