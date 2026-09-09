<script setup>
import { ref, computed, onMounted } from 'vue'
import { getTeachers, formatImageUrl } from '@/services/api.js'

const selectedCategory = ref('Semua')
const searchQuery = ref('')
const categories = ['Semua', 'Pimpinan', 'Guru Mata Pelajaran', 'Bimbingan Konseling', 'Tenaga Kependidikan']

// State reaktif dari backend
const teachers = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    isLoading.value = true
    const data = await getTeachers()
    // Normalisasi URL foto menggunakan helper formatImageUrl
    teachers.value = data.map((t) => ({
      ...t,
      photo: formatImageUrl(t.photo)
    }))
  } catch (err) {
    console.error('Error memuat guru:', err)
    errorMessage.value = 'Gagal memuat data dewan guru dari server.'
  } finally {
    isLoading.value = false
  }
})

const filteredTeachers = computed(() => {
  return teachers.value.filter((t) => {
    const matchCat = selectedCategory.value === 'Semua' || t.category === selectedCategory.value
    const matchSearch = (t.name || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        (t.subject || '').toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCat && matchSearch
  })
})
</script>

<template>
  <div class="teachers-page">
    <!-- Header Banner -->
    <header class="page-banner">
      <div class="banner-inner">
        <h1 class="page-title">Direktori Guru & Tenaga Kependidikan</h1>
        <p class="page-subtitle">
          Mengenal dewan guru berdedikasi dan tenaga kependidikan profesional yang membimbing peserta didik SMP Negeri 1 Ngariboyo.
        </p>
      </div>
    </header>

    <div class="teachers-container">
      <!-- Toolbar: Kategori & Search -->
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
            placeholder="Cari nama guru / mapel..."
            class="search-input"
          />
        </div>
      </div>

      <!-- State Loading -->
      <div v-if="isLoading" class="empty-state">
        <p>Memuat data guru...</p>
      </div>

      <!-- State Error -->
      <div v-else-if="errorMessage" class="empty-state" style="color: #ef4444;">
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Grid Guru Kosong -->
      <div v-else-if="filteredTeachers.length === 0" class="empty-state">
        <p>Data guru atau tenaga kependidikan tidak ditemukan.</p>
      </div>

      <!-- Grid Guru -->
      <div v-else class="teachers-grid">
        <div v-for="teacher in filteredTeachers" :key="teacher.id" class="teacher-card">
          <div class="photo-wrapper">
            <img :src="teacher.photo" :alt="teacher.name" class="teacher-img" />
          </div>
          <div class="card-body">
            <span class="badge-role">{{ teacher.role }}</span>
            <h3 class="teacher-name">{{ teacher.name }}</h3>
            <p class="teacher-subject">{{ teacher.subject }}</p>
            <div class="nip-box">
              <span class="nip-label">NIP:</span>
              <span class="nip-val">{{ teacher.nip }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.teachers-page {
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

.teachers-container {
  max-width: 1200px;
  margin: 36px auto 0;
  padding: 0 16px;
}

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
  width: 260px;
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

.teachers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

.teacher-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.teacher-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 16px -2px rgba(0, 0, 0, 0.08);
}

.photo-wrapper {
  width: 100%;
  height: 240px;
  background-color: #e2e8f0;
}

.teacher-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.badge-role {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: #1d4ed8;
  background-color: #eff6ff;
  padding: 3px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
  align-self: flex-start;
}

.teacher-name {
  margin: 0 0 4px 0;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.35;
}

.teacher-subject {
  margin: 0 0 12px 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
}

.nip-box {
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px dashed #e2e8f0;
  font-size: 11px;
  color: #94a3b8;
  display: flex;
  gap: 4px;
}

.nip-label {
  font-weight: 700;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #94a3b8;
}

@media (max-width: 1024px) {
  .teachers-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .teachers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .teachers-grid {
    grid-template-columns: 1fr;
  }
  .search-box {
    width: 100%;
  }
}
</style>