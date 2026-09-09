const API_BASE_URL = 'http://localhost:5000/api'
const BACKEND_URL = 'http://localhost:5000'

// Format URL gambar (jika upload lokal Express vs URL eksternal)
export const formatImageUrl = (imagePath) => {
  if (!imagePath) return 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop'
  if (imagePath.startsWith('http')) return imagePath
  return `${BACKEND_URL}${imagePath}`
}

// 1. Modul Berita
export const getNews = async () => {
  const res = await fetch(`${API_BASE_URL}/news`)
  if (!res.ok) throw new Error('Gagal mengambil data berita')
  const json = await res.json()
  return json.data
}

export const getNewsById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/news/${id}`)
  if (!res.ok) throw new Error('Gagal mengambil detail berita')
  const json = await res.json()
  return json.data
}

// 2. Modul Guru / GTK
export const getTeachers = async () => {
  const res = await fetch(`${API_BASE_URL}/teachers`)
  if (!res.ok) throw new Error('Gagal mengambil data guru')
  const json = await res.json()
  return json.data
}

// 3. Modul Prestasi
export const getAchievements = async () => {
  const res = await fetch(`${API_BASE_URL}/achievements`)
  if (!res.ok) throw new Error('Gagal mengambil data prestasi')
  const json = await res.json()
  return json.data
}

// 4. Modul Agenda
export const getAgendas = async () => {
  const res = await fetch(`${API_BASE_URL}/agendas`)
  if (!res.ok) throw new Error('Gagal mengambil data agenda')
  const json = await res.json()
  return json.data
}

// 5. Modul Galeri
export const getGalleries = async () => {
  const res = await fetch(`${API_BASE_URL}/galleries`)
  if (!res.ok) throw new Error('Gagal mengambil data galeri')
  const json = await res.json()
  return json.data
}