<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router' // <-- 1. Import RouterLink

const schoolName = 'SMP NEGERI 1'
const schoolSub = 'NGARIBOYO'

// Ganti properti href menjadi to
const navLinks = [
  { name: 'Beranda', to: '/' },
  { 
    name: 'Profil', 
    to: '/profile',
    children: [
      { name: 'Sejarah', to: '/profile#sejarah' },
      { name: 'Visi & Misi', to: '/profile#visi-misi' },
      { name: 'Fasilitas', to: '/profile#fasilitas' },
      { name: 'Guru & Tenaga Kependidikan', to: '/guru' }
    ]
  },
  { 
    name: 'Akademik', 
    to: '/akademik',
    children: [
      { name: 'Kurikulum', to: '/akademik#kurikulum' },
      { name: 'Kalender Akademik', to: '/akademik#kalender' }
    ]
  },
  { 
    name: 'Kesiswaan', 
    to: '/kesiswaan',
    children: [
      { name: 'OSIS', to: '/kesiswaan#osis' },
      { name: 'Ekstrakurikuler', to: '/kesiswaan#ekskul' },
    ]
  },
  { name: 'Berita', to: '/berita' },
  { name: 'Prestasi', to: '/prestasi' },
  { name: 'Galeri', to: '/galeri' },
  { name: 'PPDB', to: '/ppdb' },
  { name: 'Kontak', to: '/kontak' }
]

// Desktop dropdown
const activeDropdown = ref(null)
const showDropdown = (index) => { activeDropdown.value = index }
const hideDropdown = () => { activeDropdown.value = null }

// Mobile drawer & accordion
const isMobileOpen = ref(false)
const activeMobileSub = ref(null)

const toggleMobileMenu = () => {
  isMobileOpen.value = !isMobileOpen.value
}

const closeMobileMenu = () => {
  isMobileOpen.value = false
  activeMobileSub.value = null
}

const toggleMobileSub = (index) => {
  activeMobileSub.value = activeMobileSub.value === index ? null : index
}
</script>

<template>
  <header class="main-navbar">
    <div class="nav-container">
      <!-- 1. Logo & Brand -->
      <RouterLink to="/" class="brand">
        <div class="logo-box">
          <img src="/logo.png" alt="Logo SMPN 1 Ngariboyo" class="logo-img" />
        </div>
        <div class="brand-text">
          <span class="school-title">{{ schoolName }}</span>
          <span class="school-subtitle">{{ schoolSub }}</span>
        </div>
      </RouterLink>

      <!-- 2. Navigasi Desktop -->
      <nav class="nav-links desktop-only">
        <div 
          v-for="(item, index) in navLinks" 
          :key="index" 
          class="nav-item"
          @mouseenter="item.children ? showDropdown(index) : null"
          @mouseleave="hideDropdown"
        >
          <!-- Link Menu Biasa -->
          <RouterLink 
            v-if="!item.children" 
            :to="item.to" 
            class="nav-link" 
            active-class="active"
          >
            {{ item.name }}
          </RouterLink>

          <!-- Dropdown Header (Button) -->
          <button v-else class="nav-link nav-btn-dropdown">
            {{ item.name }}
            <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Submenu Dropdown -->
          <ul v-if="item.children && activeDropdown === index" class="dropdown-menu">
            <li v-for="(sub, subIdx) in item.children" :key="subIdx">
              <RouterLink :to="sub.to" class="dropdown-link">{{ sub.name }}</RouterLink>
            </li>
          </ul>
        </div>
      </nav>

      <!-- 3. Aksi: Cari & Tombol Hamburger -->
      <div class="header-actions">
        <button class="search-btn" title="Pencarian">
          <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <button class="hamburger-btn mobile-only" @click="toggleMobileMenu" aria-label="Toggle Menu">
          <svg v-if="!isMobileOpen" xmlns="http://www.w3.org/2000/svg" class="bar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="bar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 4. Backdrop Mobile Menu -->
    <div v-if="isMobileOpen" class="mobile-backdrop" @click="closeMobileMenu"></div>

    <!-- 5. Drawer Menu Mobile -->
    <aside class="mobile-drawer" :class="{ 'open': isMobileOpen }">
      <div class="drawer-header">
        <div class="brand">
          <div class="logo-box-mobile">
            <img src="/logo.png" alt="Logo SMPN 1 Ngariboyo" class="logo-img" />
          </div>
          <div class="brand-text">
            <span class="school-title">{{ schoolName }}</span>
            <span class="school-subtitle">{{ schoolSub }}</span>
          </div>
        </div>
        <button class="close-btn" @click="closeMobileMenu">
          <svg xmlns="http://www.w3.org/2000/svg" class="close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="mobile-nav">
        <div v-for="(item, index) in navLinks" :key="index" class="mobile-nav-item">
          <!-- Link Tunggal Mobile -->
          <RouterLink 
            v-if="!item.children" 
            :to="item.to" 
            class="mobile-link"
            active-class="active"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </RouterLink>

          <!-- Accordion Menu Mobile -->
          <div v-else class="mobile-accordion">
            <button class="mobile-accordion-btn" @click="toggleMobileSub(index)">
              <span>{{ item.name }}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="chevron-icon" 
                :class="{ 'rotated': activeMobileSub === index }"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <ul v-if="activeMobileSub === index" class="mobile-sub-list">
              <li v-for="(sub, subIdx) in item.children" :key="subIdx">
                <RouterLink :to="sub.to" class="mobile-sub-link" @click="closeMobileMenu">
                  {{ sub.name }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </aside>
  </header>
</template>

<style scoped>
.main-navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.logo-box {
  width: 70px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 0;
}

.logo-box-mobile {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.school-title {
  font-size: 15px;
  font-weight: 800;
  color: #0d3b66;
  line-height: 1.2;
}

.school-subtitle {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 18px;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  text-decoration: none;
  padding: 10px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.2s;
}

.nav-link:hover, .nav-link.active {
  color: #1d4ed8;
  font-weight: 600;
}

.nav-link.active {
  border-bottom: 2px solid #1d4ed8;
}

.arrow-icon {
  width: 12px;
  height: 12px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #ffffff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  padding: 6px 0;
  list-style: none;
  margin: 0;
  min-width: 190px;
  z-index: 50;
  border: 1px solid #f1f5f9;
}

.dropdown-link {
  display: block;
  padding: 8px 16px;
  color: #334155;
  font-size: 13px;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.dropdown-link:hover {
  background-color: #f8fafc;
  color: #1d4ed8;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-btn, .hamburger-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
}

.search-btn:hover, .hamburger-btn:hover {
  background-color: #f1f5f9;
  color: #1d4ed8;
}

.search-icon, .bar-icon {
  width: 22px;
  height: 22px;
}

.mobile-only {
  display: none;
}

/* Mobile Drawer */
.mobile-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.5);
  z-index: 998;
}

.mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background-color: #ffffff;
  z-index: 999;
  box-shadow: 4px 0 16px rgba(0, 0, 0, 0.15);
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.mobile-drawer.open {
  transform: translateX(0);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.close-btn {
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  color: #64748b;
  display: flex;
}

.close-icon {
  width: 22px;
  height: 22px;
}

.mobile-nav {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
}

.mobile-nav-item {
  border-bottom: 1px solid #f8fafc;
}

.mobile-link {
  display: block;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  text-decoration: none;
}

.mobile-link.active {
  color: #1d4ed8;
  font-weight: 700;
}

.mobile-accordion-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  cursor: pointer;
  text-align: left;
}

.chevron-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

.mobile-sub-list {
  list-style: none;
  padding: 0 0 8px 16px;
  margin: 0;
}

.mobile-sub-link {
  display: block;
  padding: 8px 0;
  font-size: 13px;
  color: #64748b;
  text-decoration: none;
}

/* Breakpoint Responsif */
@media (max-width: 992px) {
  .desktop-only {
    display: none;
  }
  .mobile-only {
    display: flex;
  }
}
</style>