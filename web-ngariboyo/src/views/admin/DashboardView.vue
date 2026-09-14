<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAdminUser, logoutAdmin } from '@/services/auth.js'

// Import modul komponen mandiri
import ManageNews from '@/components/admin/ManageNews.vue'
import ManageTeachers from '@/components/admin/ManageTeachers.vue'
import ManageAgendas from '@/components/admin/ManageAgendas.vue'
import ManageAchievements from '@/components/admin/ManageAchievements.vue'
import ManageGalleries from '@/components/admin/ManageGalleries.vue'

const router = useRouter()
const admin = ref(getAdminUser() || { name: 'Administrator' })
const activeTab = ref('berita')
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const selectTab = (tab) => {
  activeTab.value = tab
  isSidebarOpen.value = false
}

const handleLogout = () => {
  logoutAdmin()
  router.push('/admin/login')
}
</script>

<template>
  <div class="dashboard-layout">
    <!-- Backdrop Gelap di Layar HP saat Sidebar Muncul -->
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
          📰 Kelola Berita
        </button>
        <button
          class="nav-item"
          :class="{ active: activeTab === 'guru' }"
          @click="selectTab('guru')"
        >
          👨‍🏫 Kelola Guru & GTK
        </button>
        <button
          class="nav-item"
          :class="{ active: activeTab === 'agenda' }"
          @click="selectTab('agenda')"
        >
          📅 Kelola Agenda
        </button>
        <button
          class="nav-item"
          :class="{ active: activeTab === 'prestasi' }"
          @click="selectTab('prestasi')"
        >
          🏆 Kelola Prestasi
        </button>
        <button
          class="nav-item"
          :class="{ active: activeTab === 'galeri' }"
          @click="selectTab('galeri')"
        >
          📸 Kelola Galeri
        </button>
      </nav>

      <div class="sidebar-footer">
        <button @click="handleLogout" class="logout-btn">
          🚪 Keluar
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="topbar">
        <div class="topbar-left">
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

      <!-- Area Konten yang Berganti Sesuai Komponen -->
      <section class="content-body">
        <ManageNews v-if="activeTab === 'berita'" />
        <ManageTeachers v-else-if="activeTab === 'guru'" />
        <ManageAgendas v-else-if="activeTab === 'agenda'" />
        <ManageAchievements v-else-if="activeTab === 'prestasi'" />
        <ManageGalleries v-else-if="activeTab === 'galeri'" />
      </section>
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
  position: relative;
}

/* Sidebar */
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

/* Area Utama */
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

/* Breakpoint Mobile */
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

  .page-heading {
    font-size: 15px;
  }
}
</style>