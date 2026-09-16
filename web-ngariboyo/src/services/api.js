<<<<<<< HEAD
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '')
export const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '')
=======
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://backend.smpn1ngariboyo.sch.id/api'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://backend.smpn1ngariboyo.sch.id'
>>>>>>> 34c064d (Hapus backend-api dan db)

// Helper ekstraksi data respon (antisipasi json.data maupun json langsung)
const extractData = (json) => (json && json.data !== undefined ? json.data : json)

// Format URL gambar lokal vs URL luar
export const formatImageUrl = (imagePath) => {
  if (!imagePath) return 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop'
  if (imagePath.startsWith('http')) return imagePath
  return `${BACKEND_URL}${imagePath}`
}

// -------------------------------------------------------------
// 1. MODUL BERITA
// -------------------------------------------------------------
export const getNews = async () => {
  const res = await fetch(`${API_BASE_URL}/news`)
  if (!res.ok) throw new Error('Gagal mengambil data berita')
  const json = await res.json()
  return extractData(json)
}

export const getNewsById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/news/${id}`)
  if (!res.ok) throw new Error('Gagal mengambil detail berita')
  const json = await res.json()
  return extractData(json)
}

export const saveNews = async (formData, token, id = null) => {
  const url = id ? `${API_BASE_URL}/news/${id}` : `${API_BASE_URL}/news`
  const method = id ? 'PUT' : 'POST'
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Gagal menyimpan berita')
  return json
}

export const deleteNews = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/news/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Gagal menghapus berita')
  return json
}

// -------------------------------------------------------------
// 2. MODUL GURU & GTK
// -------------------------------------------------------------
export const getTeachers = async () => {
  const res = await fetch(`${API_BASE_URL}/teachers`)
  if (!res.ok) throw new Error('Gagal mengambil data guru')
  const json = await res.json()
  return extractData(json)
}

export const saveTeacher = async (formData, token, id = null) => {
  const url = id ? `${API_BASE_URL}/teachers/${id}` : `${API_BASE_URL}/teachers`
  const method = id ? 'PUT' : 'POST'
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Gagal menyimpan guru')
  return json
}

export const deleteTeacher = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/teachers/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Gagal menghapus guru')
  return json
}

// -------------------------------------------------------------
// 3. MODUL AGENDA
// -------------------------------------------------------------
export const getAgendas = async () => {
  const res = await fetch(`${API_BASE_URL}/agendas`)
  if (!res.ok) throw new Error('Gagal mengambil data agenda')
  const json = await res.json()
  return extractData(json)
}

export const saveAgenda = async (payload, token, id = null) => {
  const url = id ? `${API_BASE_URL}/agendas/${id}` : `${API_BASE_URL}/agendas`
  const method = id ? 'PUT' : 'POST'
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Gagal menyimpan agenda')
  return json
}

export const deleteAgenda = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/agendas/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Gagal menghapus agenda')
  return json
}

// -------------------------------------------------------------
// 4. MODUL PRESTASI
// -------------------------------------------------------------
export const getAchievements = async () => {
  const res = await fetch(`${API_BASE_URL}/achievements`)
  if (!res.ok) throw new Error('Gagal mengambil data prestasi')
  const json = await res.json()
  return extractData(json)
}

export const saveAchievement = async (payload, token, id = null) => {
  const url = id ? `${API_BASE_URL}/achievements/${id}` : `${API_BASE_URL}/achievements`
  const method = id ? 'PUT' : 'POST'
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Gagal menyimpan prestasi')
  return json
}

export const deleteAchievement = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/achievements/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Gagal menghapus prestasi')
  return json
}

// -------------------------------------------------------------
// 5. MODUL GALERI
// -------------------------------------------------------------
export const getGalleries = async () => {
  const res = await fetch(`${API_BASE_URL}/galleries`)
  if (!res.ok) throw new Error('Gagal mengambil data galeri')
  const json = await res.json()
  return extractData(json)
}

export const saveGallery = async (formData, token, id = null) => {
  const url = id ? `${API_BASE_URL}/galleries/${id}` : `${API_BASE_URL}/galleries`
  const method = id ? 'PUT' : 'POST'
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Gagal menyimpan galeri')
  return json
}

export const deleteGallery = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/galleries/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Gagal menghapus galeri')
  return json
}

// 6. Modul Ekstrakurikuler
export const getExtracurriculars = async () => {
  const res = await fetch(`${API_BASE_URL}/extracurriculars`)
  if (!res.ok) throw new Error('Gagal mengambil data ekstrakurikuler')
  const json = await res.json()
  return extractData(json)
}

// 7. Modul OSIS
export const getOsisPrograms = async () => {
  const res = await fetch(`${API_BASE_URL}/osis`)
  if (!res.ok) throw new Error('Gagal mengambil data program OSIS')
  const json = await res.json()
  return extractData(json)
}

export const saveOsisProgram = async (payload, token, id = null) => {
  const url = id ? `${API_BASE_URL}/osis/${id}` : `${API_BASE_URL}/osis`
  const method = id ? 'PUT' : 'POST'
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Gagal menyimpan program OSIS')
  return json
}

export const deleteOsisProgram = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/osis/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Gagal menghapus program OSIS')
  return json
}

export const saveExtracurricular = async (payload, token, id = null) => {
  const url = id ? `${API_BASE_URL}/extracurriculars/${id}` : `${API_BASE_URL}/extracurriculars`
  const method = id ? 'PUT' : 'POST'
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Gagal menyimpan ekstrakurikuler')
  return json
}

export const deleteExtracurricular = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/extracurriculars/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Gagal menghapus ekstrakurikuler')
  return json
}