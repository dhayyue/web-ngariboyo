<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getNewsById, getNews, formatImageUrl } from '@/services/api.js'

const route = useRoute()

// State data berita
const currentNews = ref(null)
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

// Memuat data berita aktif dan berita terkait
const loadArticleData = async (id) => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    // Ambil detail berita dari backend
    const data = await getNewsById(id)
    currentNews.value = {
      ...data,
      date: formatDate(data.createdAt),
      image: formatImageUrl(data.image),
      // Pecah string teks dari database menjadi paragraf
      contentParagraphs: data.content
        ? data.content.split(/\r?\n\r?\n|\r?\n/).filter(p => p.trim() !== '')
        : []
    }

    // Ambil semua berita jika belum ada (untuk sidebar)
    if (allNews.value.length === 0) {
      const list = await getNews()
      allNews.value = list.map(item => ({
        ...item,
        date: formatDate(item.createdAt),
        image: formatImageUrl(item.image)
      }))
    }
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Berita tidak ditemukan atau gagal dimuat dari server.'
  } finally {
    isLoading.value = false
  }
}

// Muat data saat halaman dibuka
onMounted(() => {
  loadArticleData(route.params.id)
})

// Pantau jika user klik link berita lain di sidebar
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadArticleData(newId)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
)

// Berita sampingan / terkait (kecuali berita yang sedang dibaca)
const relatedNews = computed(() => {
  if (!currentNews.value) return []
  return allNews.value
    .filter(item => item.id !== currentNews.value.id)
    .slice(0, 4)
})
</script>

<template>
  <div class="news-detail-page">
    <div class="container">
      <!-- Navigasi Breadcrumb -->
      <nav class="breadcrumb">
        <RouterLink to="/">Beranda</RouterLink>
        <span>/</span>
        <RouterLink to="/berita">Berita</RouterLink>
        <span>/</span>
        <span class="current">Detail</span>
      </nav>

      <!-- State Loading -->
      <div v-if="isLoading" class="state-box">
        <p>Memuat isi berita...</p>
      </div>

      <!-- State Error -->
      <div v-else-if="errorMessage || !currentNews" class="state-box error">
        <p>{{ errorMessage || 'Berita tidak ditemukan.' }}</p>
        <RouterLink to="/berita" class="btn-back">Kembali ke Berita</RouterLink>
      </div>

      <!-- Tampilan Utama Berita -->
      <div v-else class="detail-grid">
        <!-- Kolom Utama: Isi Berita -->
        <article class="article-main">
          <div class="article-header">
            <span class="badge" :class="`badge-${currentNews.categoryColor || 'blue'}`">
              {{ currentNews.category }}
            </span>
            <h1 class="article-title">{{ currentNews.title }}</h1>
            <div class="article-meta">
              <span>Oleh: <strong>{{ currentNews.author }}</strong></span>
              <span>•</span>
              <span>{{ currentNews.date }}</span>
            </div>
          </div>

          <div class="featured-img-wrap">
            <img :src="currentNews.image" :alt="currentNews.title" class="featured-img" />
          </div>

          <div class="article-body">
            <p v-for="(paragraph, idx) in currentNews.contentParagraphs" :key="idx">
              {{ paragraph }}
            </p>
          </div>

          <div class="article-footer">
            <RouterLink to="/berita" class="btn-back">
              <svg xmlns="http://www.w3.org/2000/svg" class="back-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Arsip Berita
            </RouterLink>
          </div>
        </article>

        <!-- Kolom Samping: Berita Lainnya -->
        <aside class="sidebar">
          <h3 class="sidebar-title">Berita Lainnya</h3>
          <div v-if="relatedNews.length === 0" class="empty-sidebar">
            Belum ada berita lainnya.
          </div>
          <div v-else class="sidebar-list">
            <RouterLink 
              v-for="item in relatedNews" 
              :key="item.id" 
              :to="`/berita/${item.id}`"
              class="sidebar-item"
            >
              <img :src="item.image" :alt="item.title" class="sidebar-img" />
              <div class="sidebar-text">
                <span class="sidebar-date">{{ item.date }}</span>
                <h4 class="sidebar-news-title">{{ item.title }}</h4>
              </div>
            </RouterLink>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-detail-page {
  padding: 32px 16px 60px;
  background-color: #f8fafc;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 24px;
}

.breadcrumb a {
  color: #1d4ed8;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb .current {
  color: #0f172a;
  font-weight: 600;
}

.detail-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
}

.article-main {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 32px;
}

.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.badge-blue { background-color: #1d4ed8; }
.badge-green { background-color: #059669; }
.badge-orange { background-color: #ea580c; }

.article-title {
  font-size: 26px;
  font-weight: 800;
  color: #0d3b66;
  line-height: 1.35;
  margin: 0 0 12px 0;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 24px;
}

.featured-img-wrap {
  width: 100%;
  height: 380px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 28px;
}

.featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-body p {
  font-size: 15px;
  line-height: 1.8;
  color: #334155;
  margin: 0 0 18px 0;
}

.article-footer {
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #1d4ed8;
  text-decoration: none;
}

.btn-back:hover {
  text-decoration: underline;
}

.back-icon {
  width: 18px;
  height: 18px;
}

/* Sidebar */
.sidebar {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  height: fit-content;
}

.sidebar-title {
  margin: 0 0 18px 0;
  font-size: 17px;
  font-weight: 800;
  color: #0d3b66;
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 10px;
}

.sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-item {
  display: flex;
  gap: 12px;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s;
}

.sidebar-item:hover {
  opacity: 0.85;
}

.sidebar-img {
  width: 80px;
  height: 64px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.sidebar-text {
  display: flex;
  flex-direction: column;
}

.sidebar-date {
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 4px;
}

.sidebar-news-title {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.state-box {
  background: #ffffff;
  border-radius: 12px;
  padding: 60px 20px;
  text-align: center;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.state-box.error {
  color: #ef4444;
}

.empty-sidebar {
  font-size: 13px;
  color: #94a3b8;
  text-align: center;
  padding: 20px 0;
}

@media (max-width: 900px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
  .featured-img-wrap {
    height: 240px;
  }
  .article-title {
    font-size: 22px;
  }
}
</style>