<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getNews, formatImageUrl } from '@/services/api.js'

const newsList = ref([])
const isLoading = ref(true)

// Helper format tanggal Indonesia
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(async () => {
  try {
    isLoading.value = true
    const data = await getNews()
    // Ambil 4 berita teratas/terbaru
    newsList.value = data.slice(0, 4).map((item) => ({
      ...item,
      date: formatDate(item.createdAt),
      image: formatImageUrl(item.image),
      // Buat kutipan singkat dari isi berita jika field excerpt tidak ada di database
      excerpt: item.excerpt || (item.content ? item.content.substring(0, 95) + '...' : '')
    }))
  } catch (err) {
    console.error('Gagal memuat berita beranda:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="news-section">
    <div class="container">
      <!-- Header Section -->
      <div class="section-header">
        <h2 class="section-title">Berita Terbaru</h2>
        <RouterLink to="/berita" class="link-more">
          Lihat Semua Berita
          <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </RouterLink>
      </div>

      <!-- State Loading -->
      <div v-if="isLoading" class="loading-state">
        <p>Memuat berita terbaru...</p>
      </div>

      <!-- State Kosong -->
      <div v-else-if="newsList.length === 0" class="empty-state">
        <p>Belum ada berita yang diterbitkan.</p>
      </div>

      <!-- Grid 4 Card Berita -->
      <div v-else class="news-grid">
        <article v-for="item in newsList" :key="item.id" class="news-card">
          <!-- Thumbnail & Badge -->
          <div class="thumbnail-wrapper">
            <img :src="item.image" :alt="item.title" class="news-image" />
            <span class="badge" :class="`badge-${item.categoryColor || 'blue'}`">
              {{ item.category }}
            </span>
          </div>

          <!-- Konten Card -->
          <div class="card-content">
            <div class="date-meta">
              <svg xmlns="http://www.w3.org/2000/svg" class="calendar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ item.date }}</span>
            </div>

            <h3 class="news-title">
              <RouterLink :to="`/berita/${item.id}`">{{ item.title }}</RouterLink>
            </h3>

            <p class="news-excerpt">{{ item.excerpt }}</p>

            <RouterLink :to="`/berita/${item.id}`" class="btn-read">
              Baca Selengkapnya
              <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-section {
  padding: 40px 16px;
  background-color: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  margin: 0;
  font-size: 22px;
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

/* Grid Berita */
.news-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.news-card {
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
}

.thumbnail-wrapper {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Badge Kategori */
.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #ffffff;
}

.badge-blue {
  background-color: #1d4ed8;
}

.badge-green {
  background-color: #059669;
}

.badge-orange {
  background-color: #ea580c;
}

/* Isi Teks Berita */
.card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.date-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 8px;
}

.calendar-icon {
  width: 13px;
  height: 13px;
}

.news-title {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
}

.news-title a {
  color: #0f172a;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-title a:hover {
  color: #1d4ed8;
}

.news-excerpt {
  margin: 0 0 16px 0;
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn-read {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #1d4ed8;
  text-decoration: none;
}

.btn-read:hover {
  text-decoration: underline;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #94a3b8;
  font-size: 13px;
}

/* Responsif */
@media (max-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>