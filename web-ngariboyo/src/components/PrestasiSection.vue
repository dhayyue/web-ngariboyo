<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getAchievements, getAgendas } from '@/services/api.js'

const achievements = ref([])
const agendas = ref([])
const isLoading = ref(true)

// Helper penentuan warna trofi berdasarkan medali
const getTrophyColor = (medal) => {
  switch (medal) {
    case 'silver':
      return '#94a3b8' // Perak
    case 'bronze':
      return '#d97706' // Perunggu
    case 'gold':
    default:
      return '#eab308' // Emas
  }
}

onMounted(async () => {
  try {
    isLoading.value = true
    const [achievementsData, agendasData] = await Promise.all([
      getAchievements(),
      getAgendas()
    ])

    // Ambil 4 prestasi terbaru
    achievements.value = achievementsData.slice(0, 4).map((item) => ({
      id: item.id,
      title: item.title,
      level: item.level ? `Tingkat ${item.level}` : 'Tingkat Sekolah',
      period: item.year || '-',
      iconColor: getTrophyColor(item.medal)
    }))

    // Ambil 4 agenda terdekat
    agendas.value = agendasData.slice(0, 4)
  } catch (err) {
    console.error('Gagal memuat prestasi dan agenda beranda:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="achieve-agenda-section">
    <div class="container">
      <div class="two-col-grid">
        
        <!-- KOLOM KIRI: Prestasi Terbaru -->
        <div class="col-card">
          <div class="col-header">
            <h2 class="col-title">Prestasi Terbaru</h2>
            <RouterLink to="/prestasi" class="link-more">
              Lihat Semua Prestasi
              <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </RouterLink>
          </div>

          <div v-if="isLoading" class="state-text">
            Memuat prestasi...
          </div>
          <div v-else-if="achievements.length === 0" class="state-text">
            Belum ada catatan prestasi terbaru.
          </div>
          <div v-else class="achieve-list">
            <div v-for="item in achievements" :key="item.id" class="achieve-item">
              <div class="trophy-badge" :style="{ color: item.iconColor }">
                <svg xmlns="http://www.w3.org/2000/svg" class="trophy-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A4.707 4.707 0 0010.5 15.75v1.5H8.25a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H13.5v-1.5c0-1.517-.723-2.866-1.892-3.926a6.73 6.73 0 002.743-1.346 6.753 6.753 0 006.138-5.6.75.75 0 00-.584-.86 47.78 47.78 0 00-3.07-.542V2.62a.75.75 0 00-.658-.744 49.28 49.28 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c1.923-.198 3.88-.316 5.86-.35v4.57a5.253 5.253 0 01-5.86-4.22zm7.36 0c1.98.034 3.937.152 5.86.35a5.253 5.253 0 01-5.86 4.22V5.25z" clip-rule="evenodd" />
                </svg>
              </div>

              <div class="item-body">
                <h4 class="item-title">{{ item.title }}</h4>
                <div class="item-meta">
                  <span>{{ item.level }}</span>
                  <span class="dot-separator">•</span>
                  <span>{{ item.period }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- KOLOM KANAN: Agenda Kegiatan -->
        <div class="col-card">
          <div class="col-header">
            <h2 class="col-title">Agenda Kegiatan</h2>
            <RouterLink to="/akademik#kalender" class="link-more">
              Lihat Semua Agenda
              <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </RouterLink>
          </div>

          <div v-if="isLoading" class="state-text">
            Memuat agenda...
          </div>
          <div v-else-if="agendas.length === 0" class="state-text">
            Belum ada agenda terdekat.
          </div>
          <div v-else class="agenda-list">
            <div v-for="agenda in agendas" :key="agenda.id" class="agenda-item">
              <div class="date-box">
                <span class="day-number">{{ agenda.dateDay }}</span>
                <span class="month-label">{{ agenda.dateMonth }}</span>
              </div>

              <div class="item-body">
                <h4 class="item-title">{{ agenda.title }}</h4>
                <div class="agenda-period">{{ agenda.period }}</div>
                <p class="agenda-desc">{{ agenda.desc }}</p>
              </div>

              <div class="agenda-icon-end">
                <svg xmlns="http://www.w3.org/2000/svg" class="cal-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.achieve-agenda-section {
  padding: 36px 16px 48px;
  background-color: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.two-col-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.col-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
}

.col-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.col-title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #0d3b66;
}

.link-more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #1d4ed8;
  text-decoration: none;
}

.link-more:hover {
  text-decoration: underline;
}

.arrow-icon {
  width: 14px;
  height: 14px;
}

/* LIST PRESTASI */
.achieve-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.achieve-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 12px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.achieve-item:hover {
  background-color: #f8fafc;
}

.trophy-badge {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background-color: #fefce8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trophy-icon {
  width: 24px;
  height: 24px;
}

.item-body {
  flex-grow: 1;
}

.item-title {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.35;
}

.item-meta {
  font-size: 12px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot-separator {
  color: #cbd5e1;
}

/* LIST AGENDA */
.agenda-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.agenda-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 10px 12px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.agenda-item:hover {
  background-color: #f8fafc;
}

.date-box {
  flex-shrink: 0;
  width: 48px;
  background-color: #0d3b66;
  color: #ffffff;
  border-radius: 8px;
  padding: 6px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.day-number {
  font-size: 18px;
  font-weight: 800;
  line-height: 1;
}

.month-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-top: 2px;
  color: #93c5fd;
}

.agenda-period {
  font-size: 11px;
  font-weight: 600;
  color: #1d4ed8;
  margin-bottom: 3px;
}

.agenda-desc {
  margin: 0;
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
}

.agenda-icon-end {
  flex-shrink: 0;
  color: #cbd5e1;
  display: flex;
  align-items: center;
}

.cal-icon {
  width: 18px;
  height: 18px;
}

.state-text {
  padding: 24px 0;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
}

/* Responsif */
@media (max-width: 900px) {
  .two-col-grid {
    grid-template-columns: 1fr;
  }
}
</style>