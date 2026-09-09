<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getAgendas } from '@/services/api.js'

const route = useRoute()
const activeTab = ref('kurikulum')

// State data agenda dari API
const agendas = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

// Sinkronisasi tab berdasarkan hash URL (#kalender atau #kurikulum)
const syncTabWithHash = () => {
  if (route.hash === '#kalender') {
    activeTab.value = 'kalender'
  } else if (route.hash === '#kurikulum') {
    activeTab.value = 'kurikulum'
  }
}

// Ambil data agenda dari backend
const fetchAgendaList = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    const data = await getAgendas()
    agendas.value = Array.isArray(data) ? data : (data?.data || [])
  } catch (err) {
    console.error('Gagal mengambil data agenda:', err)
    errorMessage.value = 'Gagal memuat jadwal kalender akademik dari server.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  syncTabWithHash()
  fetchAgendaList()
})

watch(() => route.hash, () => {
  syncTabWithHash()
})

const curriculumHighlights = [
  {
    title: 'Intrakurikuler Terstruktur',
    desc: 'Pembelajaran berbasis kompetensi mendalam dengan pendekatan diferensiasi sesuai minat dan kesiapan belajar siswa.'
  },
  {
    title: 'Projek Penguatan Profil Pelajar Pancasila (P5)',
    desc: 'Kegiatan kokurikuler lintas disiplin ilmu untuk menumbuhkan karakter beriman, berkebinekaan global, gotong royong, mandiri, bernalar kritis, dan kreatif.'
  },
  {
    title: 'Ekstrakurikuler Pilihan',
    desc: 'Wadah pengembangan bakat sains, seni budaya, olahraga, kepanduan, dan teknologi informasi.'
  }
]
</script>

<template>
  <div class="academic-page">
    <!-- Banner Header -->
    <header class="page-banner">
      <div class="banner-inner">
        <h1 class="page-title">Informasi Akademik</h1>
        <p class="page-subtitle">
          Pedoman kurikulum pembelajaran dan agenda kalender pendidikan SMP Negeri 1 Ngariboyo.
        </p>
      </div>
    </header>

    <div class="academic-container">
      <!-- Navigasi Tab -->
      <div class="tab-header">
        <button 
          class="tab-item" 
          :class="{ active: activeTab === 'kurikulum' }"
          @click="activeTab = 'kurikulum'"
        >
          Kurikulum Merdeka
        </button>
        <button 
          class="tab-item" 
          :class="{ active: activeTab === 'kalender' }"
          @click="activeTab = 'kalender'"
        >
          Kalender Akademik
        </button>
      </div>

      <!-- Tab 1: Kurikulum -->
      <section v-if="activeTab === 'kurikulum'" class="card-content">
        <div class="intro-box">
          <h2>Penerapan Kurikulum Merdeka</h2>
          <p>
            SMP Negeri 1 Ngariboyo menerapkan Kurikulum Merdeka secara menyeluruh guna memberi ruang lebih leluasa bagi guru dalam menyajikan materi kontekstual serta memberi kesempatan luas bagi peserta didik untuk mengeksplorasi potensi terbaiknya.
          </p>
        </div>

        <div class="highlight-grid">
          <div v-for="(item, idx) in curriculumHighlights" :key="idx" class="highlight-card">
            <span class="number-tag">0{{ idx + 1 }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Tab 2: Kalender -->
      <section v-if="activeTab === 'kalender'" class="card-content">
        <h2>Kalender & Agenda Akademik Sekolah</h2>
        <p class="section-desc">Jadwal kegiatan penting sepanjang tahun ajaran berjalan:</p>

        <!-- Loading State -->
        <div v-if="isLoading" class="state-box">
          <p>Memuat kalender akademik...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="errorMessage" class="state-box error">
          <p>{{ errorMessage }}</p>
        </div>

        <!-- Kosong -->
        <div v-else-if="agendas.length === 0" class="state-box">
          <p>Belum ada agenda kegiatan yang dijadwalkan.</p>
        </div>

        <!-- Daftar Agenda Dinamis -->
        <div v-else class="calendar-list">
          <div v-for="item in agendas" :key="item.id" class="calendar-row">
            <div class="calendar-date-badge">
              <span class="badge-day">{{ item.dateDay }}</span>
              <span class="badge-month">{{ item.dateMonth }}</span>
            </div>
            <div class="calendar-info">
              <h3 class="calendar-title">{{ item.title }}</h3>
              <div v-if="item.period" class="calendar-period">
                🗓️ {{ item.period }}
              </div>
              <p v-if="item.desc" class="calendar-desc">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.academic-page {
  padding-bottom: 60px;
}

.page-banner {
  background: linear-gradient(135deg, #08213b 0%, #0d3b66 100%);
  color: #ffffff;
  padding: 48px 16px;
  text-align: center;
}

.banner-inner {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  margin: 0 0 10px 0;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.page-subtitle {
  margin: 0;
  font-size: 14px;
  color: #cbd5e1;
  line-height: 1.6;
}

.academic-container {
  max-width: 1000px;
  margin: 36px auto 0;
  padding: 0 16px;
}

.tab-header {
  display: flex;
  gap: 10px;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 24px;
}

.tab-item {
  padding: 12px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  margin-bottom: -2px;
  transition: all 0.2s;
}

.tab-item:hover {
  color: #0d3b66;
}

.tab-item.active {
  color: #1d4ed8;
  border-bottom-color: #1d4ed8;
}

.card-content {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
}

.card-content h2 {
  margin: 0 0 10px 0;
  font-size: 20px;
  font-weight: 800;
  color: #0d3b66;
}

.section-desc {
  margin: 0 0 20px 0;
  color: #64748b;
  font-size: 13px;
}

.intro-box p {
  color: #475569;
  line-height: 1.6;
  font-size: 14px;
  margin-bottom: 24px;
}

.highlight-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.highlight-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
}

.number-tag {
  font-size: 18px;
  font-weight: 800;
  color: #1d4ed8;
}

.highlight-card h3 {
  margin: 8px 0 6px 0;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.highlight-card p {
  margin: 0;
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
}

/* Daftar Kalender */
.calendar-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.calendar-row {
  display: flex;
  align-items: flex-start;
  padding: 16px 20px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #0d3b66;
  gap: 18px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.calendar-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.calendar-date-badge {
  flex-shrink: 0;
  width: 54px;
  background-color: #0d3b66;
  color: #ffffff;
  border-radius: 8px;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.badge-day {
  font-size: 20px;
  font-weight: 800;
  line-height: 1;
}

.badge-month {
  font-size: 11px;
  font-weight: 700;
  color: #93c5fd;
  text-transform: uppercase;
  margin-top: 2px;
}

.calendar-info {
  flex-grow: 1;
}

.calendar-title {
  margin: 0 0 4px 0;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.calendar-period {
  font-size: 12px;
  font-weight: 600;
  color: #1d4ed8;
  margin-bottom: 4px;
}

.calendar-desc {
  margin: 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
}

.state-box {
  padding: 40px 0;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
}

.state-box.error {
  color: #ef4444;
}

@media (max-width: 800px) {
  .highlight-grid {
    grid-template-columns: 1fr;
  }
  .card-content {
    padding: 20px;
  }
}

@media (max-width: 540px) {
  .calendar-row {
    flex-direction: column;
    gap: 12px;
  }
}
</style>