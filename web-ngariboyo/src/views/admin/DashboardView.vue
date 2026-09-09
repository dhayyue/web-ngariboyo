<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAdminUser, logoutAdmin, getToken } from '@/services/auth.js'
import {
  getNews,
  getTeachers,
  getAgendas,
  getAchievements,
  getGalleries,
  formatImageUrl
} from '@/services/api.js'

const router = useRouter()
const admin = ref(getAdminUser() || { name: 'Administrator' })
const activeTab = ref('berita')
const actionMessage = ref('')
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const selectTab = (tab) => {
  activeTab.value = tab
  isSidebarOpen.value = false
}

// -------------------------------------------------------------
// 1. MODUL BERITA
// -------------------------------------------------------------
const newsList = ref([])
const isNewsLoading = ref(false)
const isSubmittingNews = ref(false)
const showNewsModal = ref(false)
const editingNewsId = ref(null)
const newsImageFile = ref(null)
const newsImagePreview = ref(null)

const newsForm = ref({
  title: '',
  category: 'KEGIATAN',
  categoryColor: 'blue',
  author: admin.value.name || 'Admin',
  content: ''
})

const fetchNewsData = async () => {
  try {
    isNewsLoading.value = true
    newsList.value = await getNews()
  } catch (err) {
    console.error(err)
  } finally {
    isNewsLoading.value = false
  }
}

const handleNewsFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    newsImageFile.value = file
    newsImagePreview.value = URL.createObjectURL(file)
  }
}

const openNewsModal = () => {
  editingNewsId.value = null
  newsForm.value = {
    title: '',
    category: 'KEGIATAN',
    categoryColor: 'blue',
    author: admin.value.name || 'Admin',
    content: ''
  }
  newsImageFile.value = null
  newsImagePreview.value = null
  showNewsModal.value = true
}

const openEditNewsModal = (item) => {
  editingNewsId.value = item.id
  newsForm.value = {
    title: item.title,
    category: item.category,
    categoryColor: item.categoryColor || 'blue',
    author: item.author,
    content: item.content
  }
  newsImageFile.value = null
  newsImagePreview.value = item.image ? formatImageUrl(item.image) : null
  showNewsModal.value = true
}

const handleSubmitNews = async () => {
  if (!newsForm.value.title || !newsForm.value.content) {
    alert('Judul dan konten berita wajib diisi!')
    return
  }

  try {
    isSubmittingNews.value = true
    const token = getToken()
    const formData = new FormData()
    formData.append('title', newsForm.value.title)
    formData.append('category', newsForm.value.category)
    formData.append('categoryColor', newsForm.value.categoryColor)
    formData.append('author', newsForm.value.author)
    formData.append('content', newsForm.value.content)
    if (newsImageFile.value) {
      formData.append('image', newsImageFile.value)
    }

    const isEdit = !!editingNewsId.value
    const url = isEdit
      ? `http://localhost:5000/api/news/${editingNewsId.value}`
      : 'http://localhost:5000/api/news'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })

    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menyimpan berita')

    actionMessage.value = isEdit ? 'Berita berhasil diperbarui!' : 'Berita berhasil diterbitkan!'
    setTimeout(() => (actionMessage.value = ''), 3000)
    showNewsModal.value = false
    fetchNewsData()
  } catch (err) {
    alert(err.message)
  } finally {
    isSubmittingNews.value = false
  }
}

const handleDeleteNews = async (id) => {
  if (!confirm('Yakin ingin menghapus berita ini?')) return
  try {
    const token = getToken()
    const res = await fetch(`http://localhost:5000/api/news/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menghapus berita')

    actionMessage.value = 'Berita berhasil dihapus!'
    setTimeout(() => (actionMessage.value = ''), 3000)
    fetchNewsData()
  } catch (err) {
    alert(err.message)
  }
}

// -------------------------------------------------------------
// 2. MODUL GURU & GTK
// -------------------------------------------------------------
const teacherList = ref([])
const isTeacherLoading = ref(false)
const isSubmittingTeacher = ref(false)
const showTeacherModal = ref(false)
const editingTeacherId = ref(null)
const teacherPhotoFile = ref(null)
const teacherPhotoPreview = ref(null)

const teacherForm = ref({
  name: '',
  role: 'Guru Mata Pelajaran',
  category: 'Guru Mata Pelajaran',
  nip: '',
  subject: ''
})

const fetchTeacherData = async () => {
  try {
    isTeacherLoading.value = true
    teacherList.value = await getTeachers()
  } catch (err) {
    console.error(err)
  } finally {
    isTeacherLoading.value = false
  }
}

const handleTeacherFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    teacherPhotoFile.value = file
    teacherPhotoPreview.value = URL.createObjectURL(file)
  }
}

const openTeacherModal = () => {
  editingTeacherId.value = null
  teacherForm.value = {
    name: '',
    role: 'Guru Mata Pelajaran',
    category: 'Guru Mata Pelajaran',
    nip: '',
    subject: ''
  }
  teacherPhotoFile.value = null
  teacherPhotoPreview.value = null
  showTeacherModal.value = true
}

const openEditTeacherModal = (t) => {
  editingTeacherId.value = t.id
  teacherForm.value = {
    name: t.name,
    role: t.role,
    category: t.category,
    nip: t.nip,
    subject: t.subject
  }
  teacherPhotoFile.value = null
  teacherPhotoPreview.value = t.photo ? formatImageUrl(t.photo) : null
  showTeacherModal.value = true
}

const handleSubmitTeacher = async () => {
  if (!teacherForm.value.name || !teacherForm.value.nip) {
    alert('Nama dan NIP guru wajib diisi!')
    return
  }

  try {
    isSubmittingTeacher.value = true
    const token = getToken()
    const formData = new FormData()
    formData.append('name', teacherForm.value.name)
    formData.append('role', teacherForm.value.role)
    formData.append('category', teacherForm.value.category)
    formData.append('nip', teacherForm.value.nip)
    formData.append('subject', teacherForm.value.subject || '-')
    if (teacherPhotoFile.value) {
      formData.append('photo', teacherPhotoFile.value)
    }

    const isEdit = !!editingTeacherId.value
    const url = isEdit
      ? `http://localhost:5000/api/teachers/${editingTeacherId.value}`
      : 'http://localhost:5000/api/teachers'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })

    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menyimpan data guru')

    actionMessage.value = isEdit ? 'Data guru berhasil diperbarui!' : 'Data guru berhasil ditambahkan!'
    setTimeout(() => (actionMessage.value = ''), 3000)
    showTeacherModal.value = false
    fetchTeacherData()
  } catch (err) {
    alert(err.message)
  } finally {
    isSubmittingTeacher.value = false
  }
}

const handleDeleteTeacher = async (id) => {
  if (!confirm('Yakin ingin menghapus data guru ini?')) return
  try {
    const token = getToken()
    const res = await fetch(`http://localhost:5000/api/teachers/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menghapus data guru')

    actionMessage.value = 'Data guru berhasil dihapus!'
    setTimeout(() => (actionMessage.value = ''), 3000)
    fetchTeacherData()
  } catch (err) {
    alert(err.message)
  }
}

// -------------------------------------------------------------
// 3. MODUL AGENDA
// -------------------------------------------------------------
const agendaList = ref([])
const isAgendaLoading = ref(false)
const isSubmittingAgenda = ref(false)
const showAgendaModal = ref(false)
const editingAgendaId = ref(null)

const agendaForm = ref({
  dateDay: '',
  dateMonth: 'Sep',
  title: '',
  period: '',
  desc: ''
})

const fetchAgendaData = async () => {
  try {
    isAgendaLoading.value = true
    agendaList.value = await getAgendas()
  } catch (err) {
    console.error(err)
  } finally {
    isAgendaLoading.value = false
  }
}

const openAgendaModal = () => {
  editingAgendaId.value = null
  agendaForm.value = {
    dateDay: '',
    dateMonth: 'Sep',
    title: '',
    period: '',
    desc: ''
  }
  showAgendaModal.value = true
}

const openEditAgendaModal = (ag) => {
  editingAgendaId.value = ag.id
  agendaForm.value = {
    dateDay: ag.dateDay,
    dateMonth: ag.dateMonth,
    title: ag.title,
    period: ag.period,
    desc: ag.desc
  }
  showAgendaModal.value = true
}

const handleSubmitAgenda = async () => {
  if (!agendaForm.value.dateDay || !agendaForm.value.title) {
    alert('Tanggal dan judul agenda wajib diisi!')
    return
  }

  try {
    isSubmittingAgenda.value = true
    const token = getToken()
    const isEdit = !!editingAgendaId.value
    const url = isEdit
      ? `http://localhost:5000/api/agendas/${editingAgendaId.value}`
      : 'http://localhost:5000/api/agendas'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(agendaForm.value)
    })

    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menyimpan agenda')

    actionMessage.value = isEdit ? 'Agenda berhasil diperbarui!' : 'Agenda berhasil ditambahkan!'
    setTimeout(() => (actionMessage.value = ''), 3000)
    showAgendaModal.value = false
    fetchAgendaData()
  } catch (err) {
    alert(err.message)
  } finally {
    isSubmittingAgenda.value = false
  }
}

const handleDeleteAgenda = async (id) => {
  if (!confirm('Yakin ingin menghapus agenda ini?')) return
  try {
    const token = getToken()
    const res = await fetch(`http://localhost:5000/api/agendas/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menghapus agenda')

    actionMessage.value = 'Agenda berhasil dihapus!'
    setTimeout(() => (actionMessage.value = ''), 3000)
    fetchAgendaData()
  } catch (err) {
    alert(err.message)
  }
}

// -------------------------------------------------------------
// 4. MODUL PRESTASI
// -------------------------------------------------------------
const achievementList = ref([])
const isAchievementLoading = ref(false)
const isSubmittingAchievement = ref(false)
const showAchievementModal = ref(false)
const editingAchievementId = ref(null)

const achievementForm = ref({
  title: '',
  category: 'Akademik',
  level: 'Kabupaten',
  year: '2026',
  medal: 'gold',
  medalLabel: 'Juara 1',
  student: '',
  organizer: '',
  desc: ''
})

const fetchAchievementData = async () => {
  try {
    isAchievementLoading.value = true
    achievementList.value = await getAchievements()
  } catch (err) {
    console.error(err)
  } finally {
    isAchievementLoading.value = false
  }
}

const openAchievementModal = () => {
  editingAchievementId.value = null
  achievementForm.value = {
    title: '',
    category: 'Akademik',
    level: 'Kabupaten',
    year: '2026',
    medal: 'gold',
    medalLabel: 'Juara 1',
    student: '',
    organizer: '',
    desc: ''
  }
  showAchievementModal.value = true
}

const openEditAchievementModal = (ach) => {
  editingAchievementId.value = ach.id
  achievementForm.value = {
    title: ach.title,
    category: ach.category,
    level: ach.level,
    year: ach.year,
    medal: ach.medal,
    medalLabel: ach.medalLabel,
    student: ach.student,
    organizer: ach.organizer,
    desc: ach.desc
  }
  showAchievementModal.value = true
}

const handleSubmitAchievement = async () => {
  if (!achievementForm.value.title || !achievementForm.value.student) {
    alert('Judul dan nama siswa peraih prestasi wajib diisi!')
    return
  }

  try {
    isSubmittingAchievement.value = true
    const token = getToken()
    const isEdit = !!editingAchievementId.value
    const url = isEdit
      ? `http://localhost:5000/api/achievements/${editingAchievementId.value}`
      : 'http://localhost:5000/api/achievements'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(achievementForm.value)
    })

    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menyimpan prestasi')

    actionMessage.value = isEdit ? 'Prestasi berhasil diperbarui!' : 'Prestasi berhasil dicatat!'
    setTimeout(() => (actionMessage.value = ''), 3000)
    showAchievementModal.value = false
    fetchAchievementData()
  } catch (err) {
    alert(err.message)
  } finally {
    isSubmittingAchievement.value = false
  }
}

const handleDeleteAchievement = async (id) => {
  if (!confirm('Yakin ingin menghapus prestasi ini?')) return
  try {
    const token = getToken()
    const res = await fetch(`http://localhost:5000/api/achievements/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menghapus prestasi')

    actionMessage.value = 'Prestasi berhasil dihapus!'
    setTimeout(() => (actionMessage.value = ''), 3000)
    fetchAchievementData()
  } catch (err) {
    alert(err.message)
  }
}

// -------------------------------------------------------------
// 5. MODUL GALERI
// -------------------------------------------------------------
const galleryList = ref([])
const isGalleryLoading = ref(false)
const isSubmittingGallery = ref(false)
const showGalleryModal = ref(false)
const editingGalleryId = ref(null)
const galleryImageFile = ref(null)
const galleryImagePreview = ref(null)

const galleryForm = ref({
  title: '',
  category: 'Upacara',
  desc: ''
})

const fetchGalleryData = async () => {
  try {
    isGalleryLoading.value = true
    const res = await getGalleries()
    galleryList.value = Array.isArray(res) ? res : (res?.data || [])
  } catch (err) {
    console.error('Gagal memuat galeri di dashboard:', err)
  } finally {
    isGalleryLoading.value = false
  }
}

const handleGalleryFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    galleryImageFile.value = file
    galleryImagePreview.value = URL.createObjectURL(file)
  }
}

const openGalleryModal = () => {
  editingGalleryId.value = null
  galleryForm.value = {
    title: '',
    category: 'Upacara',
    desc: ''
  }
  galleryImageFile.value = null
  galleryImagePreview.value = null
  showGalleryModal.value = true
}

const openEditGalleryModal = (item) => {
  editingGalleryId.value = item.id
  galleryForm.value = {
    title: item.title,
    category: item.category,
    desc: item.desc || ''
  }
  galleryImageFile.value = null
  galleryImagePreview.value = item.image ? formatImageUrl(item.image) : null
  showGalleryModal.value = true
}

const handleSubmitGallery = async () => {
  if (!galleryForm.value.title) {
    alert('Judul dokumentasi wajib diisi!')
    return
  }

  try {
    isSubmittingGallery.value = true
    const token = getToken()
    const formData = new FormData()
    formData.append('title', galleryForm.value.title)
    formData.append('category', galleryForm.value.category)
    formData.append('desc', galleryForm.value.desc)
    if (galleryImageFile.value) {
      formData.append('image', galleryImageFile.value)
    }

    const isEdit = !!editingGalleryId.value
    const url = isEdit
      ? `http://localhost:5000/api/galleries/${editingGalleryId.value}`
      : 'http://localhost:5000/api/galleries'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })

    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menyimpan foto galeri')

    actionMessage.value = isEdit ? 'Foto galeri berhasil diperbarui!' : 'Foto berhasil diunggah ke galeri!'
    setTimeout(() => (actionMessage.value = ''), 3000)
    showGalleryModal.value = false
    fetchGalleryData()
  } catch (err) {
    alert(err.message)
  } finally {
    isSubmittingGallery.value = false
  }
}

const handleDeleteGallery = async (id) => {
  if (!confirm('Yakin ingin menghapus foto kegiatan ini?')) return
  try {
    const token = getToken()
    const res = await fetch(`http://localhost:5000/api/galleries/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menghapus foto')

    actionMessage.value = 'Foto berhasil dihapus dari galeri!'
    setTimeout(() => (actionMessage.value = ''), 3000)
    fetchGalleryData()
  } catch (err) {
    alert(err.message)
  }
}

// -------------------------------------------------------------
// SIKLUS & LOGOUT
// -------------------------------------------------------------
onMounted(() => {
  fetchNewsData()
  fetchTeacherData()
  fetchAgendaData()
  fetchAchievementData()
  fetchGalleryData()
})

const handleLogout = () => {
  logoutAdmin()
  router.push('/admin/login')
}
</script>

<template>
  <div class="dashboard-layout">
    <!-- Backdrop Gelap di HP saat Sidebar Muncul -->
    <div
      v-if="isSidebarOpen"
      class="sidebar-backdrop"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <div class="sidebar-brand">
        <div class="brand-text">
          <h2>SMPN 1 Ngariboyo</h2>
          <span class="sub-brand">Panel Administrator</span>
        </div>
        <button class="close-sidebar-btn" @click="isSidebarOpen = false" aria-label="Tutup Menu">
          &times;
        </button>
      </div>

      <nav class="sidebar-nav">
        <button
          class="nav-item"
          :class="{ active: activeTab === 'berita' }"
          @click="selectTab('berita')"
        >
          Kelola Berita
        </button>
        <button
          class="nav-item"
          :class="{ active: activeTab === 'guru' }"
          @click="selectTab('guru')"
        >
          Kelola Guru & GTK
        </button>
        <button
          class="nav-item"
          :class="{ active: activeTab === 'agenda' }"
          @click="selectTab('agenda')"
        >
          Kelola Agenda
        </button>
        <button
          class="nav-item"
          :class="{ active: activeTab === 'prestasi' }"
          @click="selectTab('prestasi')"
        >
          Kelola Prestasi
        </button>
        <button
          class="nav-item"
          :class="{ active: activeTab === 'galeri' }"
          @click="selectTab('galeri')"
        >
          Kelola Galeri
        </button>
      </nav>

      <div class="sidebar-footer">
        <button @click="handleLogout" class="logout-btn">
          Keluar
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="topbar">
        <div class="topbar-left">
          <!-- Tombol Hamburger (Layar HP & Tablet) -->
          <button class="hamburger-btn" @click="toggleSidebar" aria-label="Buka Menu Sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" class="hamburger-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 class="page-heading">
            {{
              activeTab === 'berita'
                ? 'Manajemen Berita & Pengumuman'
                : activeTab === 'guru'
                ? 'Direktori Guru & GTK'
                : activeTab === 'agenda'
                ? 'Kalender Agenda Sekolah'
                : activeTab === 'prestasi'
                ? 'Daftar Prestasi Peserta Didik'
                : 'Dokumentasi Galeri Kegiatan'
            }}
          </h1>
        </div>

        <div class="user-profile">
          <div class="avatar">{{ admin.name ? admin.name.charAt(0) : 'A' }}</div>
          <span class="user-name">{{ admin.name }}</span>
        </div>
      </header>

      <section class="content-body">
        <div v-if="actionMessage" class="alert-success">
          {{ actionMessage }}
        </div>

        <!-- 1. TAB BERITA -->
        <div v-if="activeTab === 'berita'" class="card-panel">
          <div class="panel-header">
            <h3>Daftar Berita ({{ newsList.length }})</h3>
            <button @click="openNewsModal" class="btn-primary">+ Tambah Berita</button>
          </div>

          <div v-if="isNewsLoading" class="loading-state">Memuat data tabel...</div>
          <div v-else class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Gambar</th>
                  <th>Judul</th>
                  <th>Kategori</th>
                  <th>Penulis</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in newsList" :key="item.id">
                  <td style="width: 70px;">
                    <img :src="formatImageUrl(item.image)" :alt="item.title" class="table-thumb" />
                  </td>
                  <td class="font-medium">{{ item.title }}</td>
                  <td>
                    <span class="tag" :class="item.categoryColor || 'blue'">{{ item.category }}</span>
                  </td>
                  <td>{{ item.author }}</td>
                  <td>
                    <div class="action-cell">
                      <button @click="openEditNewsModal(item)" class="btn-edit">Edit</button>
                      <button @click="handleDeleteNews(item.id)" class="btn-delete">Hapus</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 2. TAB GURU -->
        <div v-else-if="activeTab === 'guru'" class="card-panel">
          <div class="panel-header">
            <h3>Daftar Guru & GTK ({{ teacherList.length }})</h3>
            <button @click="openTeacherModal" class="btn-primary">+ Tambah Guru</button>
          </div>

          <div v-if="isTeacherLoading" class="loading-state">Memuat data guru...</div>
          <div v-else class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Nama Lengkap</th>
                  <th>NIP</th>
                  <th>Jabatan</th>
                  <th>Mata Pelajaran</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in teacherList" :key="t.id">
                  <td style="width: 60px;">
                    <img :src="formatImageUrl(t.photo)" :alt="t.name" class="table-avatar" />
                  </td>
                  <td class="font-medium">{{ t.name }}</td>
                  <td>{{ t.nip }}</td>
                  <td><span class="tag blue">{{ t.role }}</span></td>
                  <td>{{ t.subject }}</td>
                  <td>
                    <div class="action-cell">
                      <button @click="openEditTeacherModal(t)" class="btn-edit">Edit</button>
                      <button @click="handleDeleteTeacher(t.id)" class="btn-delete">Hapus</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 3. TAB AGENDA -->
        <div v-else-if="activeTab === 'agenda'" class="card-panel">
          <div class="panel-header">
            <h3>Jadwal Agenda Sekolah ({{ agendaList.length }})</h3>
            <button @click="openAgendaModal" class="btn-primary">+ Tambah Agenda</button>
          </div>

          <div v-if="isAgendaLoading" class="loading-state">Memuat agenda...</div>
          <div v-else class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Judul Agenda</th>
                  <th>Waktu</th>
                  <th>Deskripsi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ag in agendaList" :key="ag.id">
                  <td style="width: 80px; font-weight: 700; color: #1d4ed8;">
                    {{ ag.dateDay }} {{ ag.dateMonth }}
                  </td>
                  <td class="font-medium">{{ ag.title }}</td>
                  <td>{{ ag.period }}</td>
                  <td>{{ ag.desc }}</td>
                  <td>
                    <div class="action-cell">
                      <button @click="openEditAgendaModal(ag)" class="btn-edit">Edit</button>
                      <button @click="handleDeleteAgenda(ag.id)" class="btn-delete">Hapus</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 4. TAB PRESTASI -->
        <div v-else-if="activeTab === 'prestasi'" class="card-panel">
          <div class="panel-header">
            <h3>Daftar Prestasi ({{ achievementList.length }})</h3>
            <button @click="openAchievementModal" class="btn-primary">+ Catat Prestasi</button>
          </div>

          <div v-if="isAchievementLoading" class="loading-state">Memuat data prestasi...</div>
          <div v-else class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Perolehan</th>
                  <th>Kejuaraan</th>
                  <th>Siswa</th>
                  <th>Tingkat</th>
                  <th>Tahun</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ach in achievementList" :key="ach.id">
                  <td>
                    <span class="tag" :class="ach.medal === 'gold' ? 'orange' : 'green'">
                      {{ ach.medalLabel }}
                    </span>
                  </td>
                  <td class="font-medium">{{ ach.title }}</td>
                  <td>{{ ach.student }}</td>
                  <td>{{ ach.level }}</td>
                  <td>{{ ach.year }}</td>
                  <td>
                    <div class="action-cell">
                      <button @click="openEditAchievementModal(ach)" class="btn-edit">Edit</button>
                      <button @click="handleDeleteAchievement(ach.id)" class="btn-delete">Hapus</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 5. TAB GALERI -->
        <div v-else-if="activeTab === 'galeri'" class="card-panel">
          <div class="panel-header">
            <h3>Dokumentasi Kegiatan ({{ galleryList.length }})</h3>
            <button @click="openGalleryModal" class="btn-primary">+ Unggah Foto</button>
          </div>

          <div v-if="isGalleryLoading" class="loading-state">Memuat foto galeri...</div>
          <div v-else class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Judul Kegiatan</th>
                  <th>Kategori</th>
                  <th>Keterangan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="g in galleryList" :key="g.id">
                  <td style="width: 70px;">
                    <img :src="formatImageUrl(g.image)" :alt="g.title" class="table-thumb" />
                  </td>
                  <td class="font-medium">{{ g.title }}</td>
                  <td><span class="tag blue">{{ g.category }}</span></td>
                  <td>{{ g.desc }}</td>
                  <td>
                    <div class="action-cell">
                      <button @click="openEditGalleryModal(g)" class="btn-edit">Edit</button>
                      <button @click="handleDeleteGallery(g.id)" class="btn-delete">Hapus</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>

    <!-- MODAL BERITA -->
    <div v-if="showNewsModal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ editingNewsId ? 'Edit Berita' : 'Tambah Berita Baru' }}</h3>
          <button @click="showNewsModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="handleSubmitNews" class="modal-body">
          <div class="form-group">
            <label>Judul Berita</label>
            <input v-model="newsForm.title" type="text" placeholder="Judul artikel" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Kategori</label>
              <select v-model="newsForm.category">
                <option value="KEGIATAN">KEGIATAN</option>
                <option value="PRESTASI">PRESTASI</option>
                <option value="PENGUMUMAN">PENGUMUMAN</option>
              </select>
            </div>
            <div class="form-group">
              <label>Warna Badge</label>
              <select v-model="newsForm.categoryColor">
                <option value="blue">Biru</option>
                <option value="green">Hijau</option>
                <option value="orange">Oranye</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Penulis</label>
            <input v-model="newsForm.author" type="text" />
          </div>
          <div class="form-group">
            <label>Unggah Gambar Cover {{ editingNewsId ? '(Kosongkan jika tidak diganti)' : '' }}</label>
            <input type="file" accept="image/*" @change="handleNewsFileChange" />
            <div v-if="newsImagePreview" class="preview-box">
              <img :src="newsImagePreview" alt="Preview" class="preview-img" />
            </div>
          </div>
          <div class="form-group">
            <label>Konten</label>
            <textarea v-model="newsForm.content" rows="4" required></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="showNewsModal = false" class="btn-secondary">Batal</button>
            <button type="submit" class="btn-primary" :disabled="isSubmittingNews">
              {{ isSubmittingNews ? 'Menyimpan...' : editingNewsId ? 'Simpan' : 'Terbitkan' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL GURU -->
    <div v-if="showTeacherModal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ editingTeacherId ? 'Edit Data Guru' : 'Tambah Guru & GTK' }}</h3>
          <button @click="showTeacherModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="handleSubmitTeacher" class="modal-body">
          <div class="form-group">
            <label>Nama Lengkap</label>
            <input v-model="teacherForm.name" type="text" placeholder="Nama beserta gelar" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>NIP</label>
              <input v-model="teacherForm.nip" type="text" placeholder="Nomor Induk Pegawai" required />
            </div>
            <div class="form-group">
              <label>Kategori</label>
              <select v-model="teacherForm.category">
                <option value="Pimpinan">Pimpinan</option>
                <option value="Guru Mata Pelajaran">Guru Mata Pelajaran</option>
                <option value="Bimbingan Konseling">Bimbingan Konseling</option>
                <option value="Tenaga Kependidikan">Tenaga Kependidikan</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Jabatan / Peran</label>
              <input v-model="teacherForm.role" type="text" placeholder="Guru Matematika" />
            </div>
            <div class="form-group">
              <label>Mata Pelajaran</label>
              <input v-model="teacherForm.subject" type="text" placeholder="Matematika" />
            </div>
          </div>
          <div class="form-group">
            <label>Foto Profil {{ editingTeacherId ? '(Kosongkan jika tidak diganti)' : '' }}</label>
            <input type="file" accept="image/*" @change="handleTeacherFileChange" />
            <div v-if="teacherPhotoPreview" class="preview-box">
              <img :src="teacherPhotoPreview" alt="Preview Foto" class="preview-avatar" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="showTeacherModal = false" class="btn-secondary">Batal</button>
            <button type="submit" class="btn-primary" :disabled="isSubmittingTeacher">
              {{ isSubmittingTeacher ? 'Menyimpan...' : editingTeacherId ? 'Simpan' : 'Simpan Guru' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL AGENDA -->
    <div v-if="showAgendaModal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ editingAgendaId ? 'Edit Agenda' : 'Tambah Agenda Kegiatan' }}</h3>
          <button @click="showAgendaModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="handleSubmitAgenda" class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>Tanggal (Angka)</label>
              <input v-model="agendaForm.dateDay" type="text" placeholder="Contoh: 17" required />
            </div>
            <div class="form-group">
              <label>Bulan (Singkatan)</label>
              <input v-model="agendaForm.dateMonth" type="text" placeholder="Contoh: Agu atau Sep" required />
            </div>
          </div>
          <div class="form-group">
            <label>Nama Agenda</label>
            <input v-model="agendaForm.title" type="text" placeholder="Penilaian Tengah Semester" required />
          </div>
          <div class="form-group">
            <label>Rentang Waktu</label>
            <input v-model="agendaForm.period" type="text" placeholder="10 - 15 September 2026" />
          </div>
          <div class="form-group">
            <label>Keterangan Tambahan</label>
            <textarea v-model="agendaForm.desc" rows="3"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="showAgendaModal = false" class="btn-secondary">Batal</button>
            <button type="submit" class="btn-primary" :disabled="isSubmittingAgenda">
              {{ isSubmittingAgenda ? 'Menyimpan...' : editingAgendaId ? 'Simpan' : 'Simpan Agenda' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL PRESTASI -->
    <div v-if="showAchievementModal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ editingAchievementId ? 'Edit Data Prestasi' : 'Catat Prestasi Baru' }}</h3>
          <button @click="showAchievementModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="handleSubmitAchievement" class="modal-body">
          <div class="form-group">
            <label>Nama Lomba / Kejuaraan</label>
            <input v-model="achievementForm.title" type="text" placeholder="Olimpiade Sains Nasional" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Peringkat (Medal Label)</label>
              <input v-model="achievementForm.medalLabel" type="text" placeholder="Juara 1" required />
            </div>
            <div class="form-group">
              <label>Warna Medali</label>
              <select v-model="achievementForm.medal">
                <option value="gold">Emas (Gold)</option>
                <option value="silver">Perak (Silver)</option>
                <option value="bronze">Perunggu (Bronze)</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Nama Siswa / Tim</label>
              <input v-model="achievementForm.student" type="text" required />
            </div>
            <div class="form-group">
              <label>Tingkat</label>
              <select v-model="achievementForm.level">
                <option value="Kecamatan">Kecamatan</option>
                <option value="Kabupaten">Kabupaten</option>
                <option value="Provinsi">Provinsi</option>
                <option value="Nasional">Nasional</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Tahun</label>
              <input v-model="achievementForm.year" type="text" placeholder="2026" />
            </div>
            <div class="form-group">
              <label>Penyelenggara</label>
              <input v-model="achievementForm.organizer" type="text" placeholder="Dinas Pendidikan" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="showAchievementModal = false" class="btn-secondary">Batal</button>
            <button type="submit" class="btn-primary" :disabled="isSubmittingAchievement">
              {{ isSubmittingAchievement ? 'Menyimpan...' : editingAchievementId ? 'Simpan' : 'Simpan Prestasi' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL GALERI -->
    <div v-if="showGalleryModal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ editingGalleryId ? 'Edit Dokumentasi Foto' : 'Unggah Foto Dokumentasi' }}</h3>
          <button @click="showGalleryModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="handleSubmitGallery" class="modal-body">
          <div class="form-group">
            <label>Judul Kegiatan / Momen</label>
            <input v-model="galleryForm.title" type="text" placeholder="Contoh: Upacara Hardiknas" required />
          </div>
          <div class="form-group">
            <label>Kategori</label>
            <select v-model="galleryForm.category">
              <option value="Upacara">Upacara</option>
              <option value="Pembelajaran">Pembelajaran</option>
              <option value="Ekstrakurikuler">Ekstrakurikuler</option>
              <option value="Lomba & Seni">Lomba & Seni</option>
            </select>
          </div>
          <div class="form-group">
            <label>Pilih File Foto {{ editingGalleryId ? '(Kosongkan jika tidak diganti)' : '' }}</label>
            <input type="file" accept="image/*" @change="handleGalleryFileChange" />
            <div v-if="galleryImagePreview" class="preview-box">
              <img :src="galleryImagePreview" alt="Preview Foto" class="preview-img" />
            </div>
          </div>
          <div class="form-group">
            <label>Deskripsi Singkat</label>
            <textarea v-model="galleryForm.desc" rows="3" placeholder="Ceritakan momen di balik foto ini..."></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="showGalleryModal = false" class="btn-secondary">Batal</button>
            <button type="submit" class="btn-primary" :disabled="isSubmittingGallery">
              {{ isSubmittingGallery ? 'Menyimpan...' : editingGalleryId ? 'Simpan Perubahan' : 'Unggah Foto' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
  position: relative;
}

/* Sidebar Desktop */
.sidebar {
  width: 250px;
  background-color: #0f172a;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  z-index: 100;
}

.sidebar-brand {
  padding: 20px;
  border-bottom: 1px solid #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-text h2 {
  font-size: 16px;
  font-weight: 800;
  margin: 0;
}

.sub-brand {
  font-size: 11px;
  color: #94a3b8;
}

.close-sidebar-btn {
  display: none;
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 12px;
  flex-grow: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  background: transparent;
  color: #94a3b8;
  border: none;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: #1e293b;
  color: #ffffff;
}

.nav-item.active {
  background-color: #2563eb;
  color: #ffffff;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #1e293b;
}

.logout-btn {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #ef4444;
  color: #ffffff;
}

/* Area Konten Utama */
.main-content {
  flex-grow: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.topbar {
  background: #ffffff;
  padding: 14px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hamburger-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #0f172a;
}

.hamburger-icon {
  width: 24px;
  height: 24px;
}

.page-heading {
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.avatar {
  width: 34px;
  height: 34px;
  background-color: #2563eb;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
}

.user-name {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
}

.content-body {
  padding: 24px;
}

.alert-success {
  background-color: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 18px;
}

.card-panel {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.panel-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.panel-header h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.btn-primary {
  background-color: #0d3b66;
  color: #ffffff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-primary:hover {
  background-color: #08213b;
}

.btn-secondary {
  background-color: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.action-cell {
  display: flex;
  gap: 6px;
  align-items: center;
}

.btn-edit {
  background: #e0f2fe;
  color: #0284c7;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}

.btn-edit:hover {
  background: #bae6fd;
}

.btn-delete {
  background: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}

.btn-delete:hover {
  background: #fca5a5;
}

/* Wrapper tabel responsif */
.table-responsive {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.data-table {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
}

.data-table th {
  background-color: #f8fafc;
  padding: 12px 16px;
  font-weight: 700;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}

.data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
}

.table-thumb {
  width: 50px;
  height: 38px;
  object-fit: cover;
  border-radius: 6px;
}

.table-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
}

.tag {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.tag.blue { background-color: #dbeafe; color: #1d4ed8; }
.tag.green { background-color: #d1fae5; color: #059669; }
.tag.orange { background-color: #ffedd5; color: #ea580c; }

/* Modal Box */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 1000;
}

.modal-card {
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  font-size: 22px;
  line-height: 1;
  color: #94a3b8;
  cursor: pointer;
}

.modal-body {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  color: #334155;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 9px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
}

.preview-box {
  margin-top: 6px;
}

.preview-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.preview-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2563eb;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 10px;
}

.loading-state {
  padding: 30px;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
}

/* Breakpoint Mobile (HP & Tablet) */
@media (max-width: 768px) {
  .hamburger-btn {
    display: inline-flex;
  }

  .close-sidebar-btn {
    display: block;
  }

  .user-name {
    display: none;
  }

  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 260px;
    transform: translateX(-100%);
    box-shadow: 10px 0 25px rgba(0, 0, 0, 0.3);
  }

  .sidebar.sidebar-open {
    transform: translateX(0);
  }

  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(15, 23, 42, 0.5);
    z-index: 90;
  }

  .content-body {
    padding: 16px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .page-heading {
    font-size: 15px;
  }
}
</style>