<script setup>
import { ref, computed, onMounted } from 'vue'
import { getAchievements } from '@/services/api.js'

const achievements = ref([])
const isLoading = ref(true)
const errorMessage = ref('')
const selectedCategory = ref('Semua')
const searchQuery = ref('')

const categories = ['Semua', 'Akademik', 'Non-Akademik', 'Seni & Budaya', 'Olahraga']

onMounted(async () => {
  try {
    isLoading.value = true
    achievements.value = await getAchievements()
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Gagal memuat data prestasi.'
  } finally {
    isLoading.value = false
  }
})

// Hitung statistik dinamis langsung dari database
const stats = computed(() => {
  const list = achievements.value
  return {
    total: list.length,
    kabupaten: list.filter((i) => (i.level || '').toLowerCase().includes('kabupaten')).length,
    provinsi: list.filter((i) => (i.level || '').toLowerCase().includes('provinsi')).length,
    nasional: list.filter((i) => (i.level || '').toLowerCase().includes('nasional')).length
  }
})

// Filter data prestasi
const filteredAchievements = computed(() => {
  return achievements.value.filter((item) => {
    const matchCat =
      selectedCategory.value === 'Semua' ||
      item.category?.toLowerCase() === selectedCategory.value.toLowerCase()

    const matchSearch =
      (item.title || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (item.student || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (item.level || '').toLowerCase().includes(searchQuery.value.toLowerCase())

    return matchCat && matchSearch
  })
})
</script>

<template>
  <div class="achievements-page">
    <!-- Header Banner -->
    <header class="page-banner">
      <div class="banner-inner">
        <h1 class="page-title">Galeri Prestasi & Kejuaraan</h1>
        <p class="page-subtitle">
          Catatan kebanggaan, dedikasi, dan capaian gemilang peserta didik serta dewan guru SMP Negeri 1 Ngariboyo.
        </p>
      </div>
    </header>

    <div class="achieve-container">
      <!-- Statistik Ringkas Dinamis -->
      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-num">{{ stats.total }}</span>
          <span class="stat-label">Total Kejuaraan Tercatat</span>
        </div>
        <div class="stat-card">
          <span class="stat-num">{{ stats.kabupaten }}</span>
          <span class="stat-label">Tingkat Kabupaten</span>
        </div>
        <div class="stat-card">
          <span class="stat-num">{{ stats.provinsi }}</span>
          <span class="stat-label">Tingkat Provinsi</span>
        </div>
        <div class="stat-card">
          <span class="stat-num">{{ stats.nasional }}</span>
          <span class="stat-label">Tingkat Nasional</span>
        </div>
      </div>

      <!-- Toolbar Filter & Search -->
      <div class="toolbar">
        <div class="category-tabs">
          <button
            v-for="cat in categories"
            :key="cat"
            class="tab-btn"
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <div class="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari prestasi, siswa, tingkat..."
            class="search-input"
          />
        </div>
      </div>

      <!-- State Loading / Error -->
      <div v-if="isLoading" class="empty-state">
        <p>Memuat data prestasi...</p>
      </div>
      <div v-else-if="errorMessage" class="empty-state" style="color: #ef4444;">
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Grid Prestasi -->
      <div v-else-if="filteredAchievements.length === 0" class="empty-state">
        <p>Data prestasi tidak ditemukan.</p>
      </div>

      <div v-else class="achieve-grid">
        <div v-for="item in filteredAchievements" :key="item.id" class="achieve-card">
          <div class="card-top">
            <div class="medal-badge" :class="`badge-${item.medal}`">
              <svg xmlns="http://www.w3.org/2000/svg" class="trophy-icon" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A4.707 4.707 0 0010.5 15.75v1.5H8.25a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H13.5v-1.5c0-1.517-.723-2.866-1.892-3.926a6.73 6.73 0 002.743-1.346 6.753 6.753 0 006.138-5.6.75.75 0 00-.584-.86 47.78 47.78 0 00-3.07-.542V2.62a.75.75 0 00-.658-.744 49.28 49.28 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c1.923-.198 3.88-.316 5.86-.35v4.57a5.253 5.253 0 01-5.86-4.22zm7.36 0c1.98.034 3.937.152 5.86.35a5.253 5.253 0 01-5.86 4.22V5.25z" clip-rule="evenodd" />
              </svg>
              <span>{{ item.medalLabel }}</span>
            </div>
            <span class="year-tag">{{ item.year }}</span>
          </div>

          <h3 class="achieve-title">{{ item.title }}</h3>
          <p class="achieve-desc">{{ item.desc }}</p>

          <div class="meta-details">
            <div class="meta-row">
              <span class="meta-lbl">Tingkat:</span>
              <span class="meta-val highlight-blue">{{ item.level }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-lbl">Peserta:</span>
              <span class="meta-val font-semibold">{{ item.student }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-lbl">Penyelenggara:</span>
              <span class="meta-val">{{ item.organizer }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.achievements-page {
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

.achieve-container {
  max-width: 1200px;
  margin: 36px auto 0;
  padding: 0 16px;
}

/* Row Statistik */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  padding: 20px 16px;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
}

.stat-num {
  display: block;
  font-size: 26px;
  font-weight: 800;
  color: #1d4ed8;
  line-height: 1.2;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
  display: block;
}

/* Toolbar */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.category-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid #cbd5e1;
  background-color: #ffffff;
  color: #475569;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  background-color: #f1f5f9;
}

.tab-btn.active {
  background-color: #0d3b66;
  border-color: #0d3b66;
  color: #ffffff;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 8px 14px;
  width: 280px;
}

.search-input {
  border: none;
  outline: none;
  font-size: 13px;
  width: 100%;
}

.search-icon {
  width: 18px;
  height: 18px;
  color: #94a3b8;
}

/* Grid Kartu */
.achieve-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.achieve-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 22px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.achieve-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 18px -3px rgba(0, 0, 0, 0.08);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.medal-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
}

.badge-gold {
  background-color: #fefce8;
  color: #a16207;
  border: 1px solid #fef08a;
}

.badge-silver {
  background-color: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.badge-bronze {
  background-color: #fff7ed;
  color: #c2410c;
  border: 1px solid #fed7aa;
}

.trophy-icon {
  width: 16px;
  height: 16px;
}

.year-tag {
  font-size: 12px;
  font-weight: 700;
  color: #94a3b8;
}

.achieve-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.35;
}

.achieve-desc {
  margin: 0 0 16px 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
}

.meta-details {
  margin-top: auto;
  border-top: 1px solid #f1f5f9;
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.meta-lbl {
  color: #94a3b8;
  flex-shrink: 0;
}

.meta-val {
  color: #334155;
  text-align: right;
}

.highlight-blue {
  color: #1d4ed8;
  font-weight: 600;
}

.font-semibold {
  font-weight: 600;
  color: #0f172a;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #94a3b8;
}

@media (max-width: 1024px) {
  .achieve-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .achieve-grid {
    grid-template-columns: 1fr;
  }
  .stats-row {
    grid-template-columns: 1fr;
  }
  .search-box {
    width: 100%;
  }
}
</style>