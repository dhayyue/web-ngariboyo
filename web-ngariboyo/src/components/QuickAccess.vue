<script setup>
import { RouterLink } from 'vue-router'

const quickLinks = [
  {
    title: 'Pengumuman',
    desc: 'Informasi terbaru sekolah',
    icon: 'bell',
    to: '/berita'
  },
  {
    title: 'Kurikulum',
    desc: 'Lihat Kurikulum',
    icon: 'book',
    to: '/akademik#kurikulum'
  },
  {
    title: 'Kalender Akademik',
    desc: 'Agenda kegiatan semester',
    icon: 'calendar',
    to: '/akademik#kalender'
  },
  {
    title: 'PPDB Online',
    desc: 'Pendaftaran calon siswa baru',
    icon: 'user',
    to: '/ppdb'
  },
  {
    title: 'Prestasi Siswa',
    desc: 'Rekam jejak kejuaraan siswa',
    icon: 'trophy',
    to: '/prestasi'
  }
]
</script>

<template>
  <section class="quick-access-wrapper">
    <div class="container">
      <div class="quick-grid">
        <RouterLink 
          v-for="(item, index) in quickLinks" 
          :key="index" 
          :to="item.to" 
          class="quick-card"
        >
          <div class="icon-wrapper">
            <!-- Icon Bell (Pengumuman) -->
            <svg v-if="item.icon === 'bell'" xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>

            <!-- Icon Book (Jadwal) -->
            <svg v-else-if="item.icon === 'book'" xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>

            <!-- Icon Calendar -->
            <svg v-else-if="item.icon === 'calendar'" xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <!-- Icon User (PPDB) -->
            <svg v-else-if="item.icon === 'user'" xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>

            <!-- Icon Trophy (Prestasi) -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>

          <div class="card-content">
            <h4 class="card-title">{{ item.title }}</h4>
            <p class="card-desc">{{ item.desc }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quick-access-wrapper {
  position: relative;
  margin-top: -36px;
  z-index: 20;
  padding: 0 16px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Menjadi 5 kolom */
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
  overflow: hidden;
}

.quick-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 14px;
  text-decoration: none;
  border-right: 1px solid #f1f5f9;
  transition: all 0.2s ease;
}

.quick-card:last-child {
  border-right: none;
}

.quick-card:hover {
  background-color: #f8fafc;
  transform: translateY(-2px);
}

.icon-wrapper {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background-color: #eff6ff;
  color: #1d4ed8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 20px;
  height: 20px;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.card-title {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: #0d3b66;
  line-height: 1.3;
}

.card-desc {
  margin: 2px 0 0 0;
  font-size: 11px;
  color: #64748b;
  line-height: 1.3;
}

/* Responsif */
@media (max-width: 1024px) {
  .quick-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .quick-card {
    border-bottom: 1px solid #f1f5f9;
  }
}

@media (max-width: 640px) {
  .quick-grid {
    grid-template-columns: 1fr;
  }
}
</style>