<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getNews, formatImageUrl } from '@/services/api.js'

// Kategori yang tersedia
const categories = ['Semua', 'KEGIATAN', 'PRESTASI', 'PENGUMUMAN']
const activeCategory = ref('Semua')
const searchQuery = ref('')

// State data dari backend
const allNews = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

// Helper format tanggal Indonesia
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

// Ambil data dari database backend MySQL
onMounted(async () => {
  try {
    isLoading.value = true
    const data = await getNews()
    
    // Normalisasi format data backend agar pas dengan template aslimu
    allNews.value = data.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      categoryColor: item.categoryColor || 'blue',
      date: formatDate(item.createdAt),
      excerpt: item.content,
      image: formatImageUrl(item.image)
    }))
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Gagal memuat berita dari server.'
  } finally {
    isLoading.value = false
  }
})

// Filter data berita berdasarkan pencarian & kategori aktif
const filteredNews = computed(() => {
  return allNews.value.filter((item) => {
    const matchesCategory =
      activeCategory.value === 'Semua' || item.category === activeCategory.value
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <div class="news-page">
    <!-- Header Banner Halaman -->
    <header class="page-banner">
      <div class="banner-inner">
        <h1 class="page-title">Berita & Informasi</h1>
        <p class="page-subtitle">
          Kumpulan kabar terbaru, prestasi, pengumuman resmi, dan dokumentasi agenda kegiatan SMP Negeri 1 Ngariboyo.
        </p>
      </div>
    </header>

    <div class="news-container">
      <!-- Toolbar: Filter Kategori & Pencarian -->
      <div class="news-toolbar">
        <div class="filter-tabs">
          <button
            v-for="cat in categories"
            :key="cat"
            class="tab-btn"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <div class="search-input-box">
          <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari judul berita..."
            class="search-field"
          />
        </div>
      </div>

      <!-- State Loading -->
      <div v-if="isLoading" class="empty-state">
        <p>Memuat data berita dari server...</p>
      </div>

      <!-- State Error -->
      <div v-else-if="errorMessage" class="empty-state" style="color: #ef4444;">
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Hasil Kosong -->
      <div v-else-if="filteredNews.length === 0" class="empty-state">
        <p>Berita yang kamu cari tidak ditemukan.</p>
      </div>

      <!-- Grid Daftar Berita -->
      <div v-else class="news-grid">
        <article v-for="item in filteredNews" :key="item.id" class="news-card">
          <div class="card-thumb">
            <img :src="item.image" :alt="item.title" class="news-img" />
            <span class="badge" :class="`badge-${item.categoryColor}`">
              {{ item.category }}
            </span>
          </div>

          <div class="card-body">
            <div class="meta-row">
              <svg xmlns="http://www.w3.org/2000/svg" class="meta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ item.date }}</span>
            </div>

            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-excerpt">{{ item.excerpt }}</p>

            <RouterLink :to="`/berita/${item.id}`" class="read-more">
              Baca Selengkapnya
              <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-page {
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

.news-container {
  max-width: 1200px;
  margin: 36px auto 0;
  padding: 0 16px;
}

.news-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.filter-tabs {
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
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background-color: #f1f5f9;
  border-color: #94a3b8;
}

.tab-btn.active {
  background-color: #0d3b66;
  border-color: #0d3b66;
  color: #ffffff;
}

.search-input-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 8px 14px;
  width: 260px;
}

.search-field {
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

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.news-card {
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 18px -3px rgba(0, 0, 0, 0.08);
}

.card-thumb {
  position: relative;
  width: 100%;
  height: 180px;
}

.news-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #ffffff;
}

.badge-blue { background-color: #1d4ed8; }
.badge-green { background-color: #059669; }
.badge-orange { background-color: #ea580c; }

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 8px;
}

.meta-icon {
  width: 14px;
  height: 14px;
}

.card-title {
  margin: 0 0 8px 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
  color: #0f172a;
}

.card-excerpt {
  margin: 0 0 18px 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #1d4ed8;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

.arrow-icon {
  width: 14px;
  height: 14px;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #94a3b8;
}

@media (max-width: 900px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
  .search-input-box {
    width: 100%;
  }
}
</style>