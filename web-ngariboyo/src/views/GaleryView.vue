<script setup>
import { ref, computed, onMounted } from 'vue'
import { getGalleries, formatImageUrl } from '@/services/api.js'

const activeCategory = ref('Semua')
const selectedImage = ref(null)
const galleryItems = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

const categories = ['Semua', 'Upacara', 'Pembelajaran', 'Ekstrakurikuler', 'Lomba & Seni']

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
    const data = await getGalleries()
    galleryItems.value = data.map((item) => ({
      ...item,
      date: formatDate(item.createdAt || item.date),
      image: formatImageUrl(item.image)
    }))
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Gagal memuat galeri dokumentasi.'
  } finally {
    isLoading.value = false
  }
})

const filteredGallery = computed(() => {
  if (activeCategory.value === 'Semua') return galleryItems.value
  return galleryItems.value.filter((item) => item.category === activeCategory.value)
})

const openLightbox = (item) => {
  selectedImage.value = item
}

const closeLightbox = () => {
  selectedImage.value = null
}
</script>

<template>
  <div class="gallery-page">
    <!-- Header Banner -->
    <header class="page-banner">
      <div class="banner-inner">
        <h1 class="page-title">Galeri Dokumentasi Kegiatan</h1>
        <p class="page-subtitle">
          Potret kebersamaan, semangat belajar, aktivitas ekstrakurikuler, dan momen berharga civitas akademika SMP Negeri 1 Ngariboyo.
        </p>
      </div>
    </header>

    <div class="gallery-container">
      <!-- Filter Tabs -->
      <div class="filter-wrapper">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-tab"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- State Loading / Error -->
      <div v-if="isLoading" class="empty-state">
        <p>Memuat dokumentasi foto...</p>
      </div>
      <div v-else-if="errorMessage" class="empty-state" style="color: #ef4444;">
        <p>{{ errorMessage }}</p>
      </div>
      <div v-else-if="filteredGallery.length === 0" class="empty-state">
        <p>Belum ada foto dalam kategori ini.</p>
      </div>

      <!-- Grid Foto -->
      <div v-else class="photo-grid">
        <div 
          v-for="item in filteredGallery" 
          :key="item.id" 
          class="photo-card"
          @click="openLightbox(item)"
        >
          <img :src="item.image" :alt="item.title" class="card-img" loading="lazy" />
          
          <div class="photo-overlay">
            <span class="photo-cat">{{ item.category }}</span>
            <h3 class="photo-title">{{ item.title }}</h3>
            <span class="photo-date">{{ item.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal Popup -->
    <div v-if="selectedImage" class="lightbox-backdrop" @click="closeLightbox">
      <div class="lightbox-modal" @click.stop>
        <button class="close-lightbox" @click="closeLightbox" aria-label="Tutup Pratinjau">
          <svg xmlns="http://www.w3.org/2000/svg" class="close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="modal-img-wrap">
          <img :src="selectedImage.image" :alt="selectedImage.title" class="modal-img" />
        </div>

        <div class="modal-info">
          <div class="modal-badge">{{ selectedImage.category }}</div>
          <h3 class="modal-title">{{ selectedImage.title }}</h3>
          <p class="modal-date">{{ selectedImage.date }}</p>
          <p class="modal-desc">{{ selectedImage.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-page {
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

.gallery-container {
  max-width: 1200px;
  margin: 36px auto 0;
  padding: 0 16px;
}

.filter-wrapper {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.filter-tab {
  padding: 8px 18px;
  border-radius: 9999px;
  border: 1px solid #cbd5e1;
  background-color: #ffffff;
  color: #475569;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-tab:hover {
  background-color: #f1f5f9;
}

.filter-tab.active {
  background-color: #0d3b66;
  border-color: #0d3b66;
  color: #ffffff;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #94a3b8;
  font-size: 14px;
}

/* Grid Foto */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.photo-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  height: 240px;
  cursor: pointer;
  background-color: #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.photo-card:hover .card-img {
  transform: scale(1.06);
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13, 59, 102, 0.9) 0%, rgba(13, 59, 102, 0.2) 60%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.photo-card:hover .photo-overlay {
  opacity: 1;
}

.photo-cat {
  font-size: 10px;
  font-weight: 700;
  color: #93c5fd;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.photo-title {
  margin: 4px 0;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.35;
}

.photo-date {
  font-size: 11px;
  color: #cbd5e1;
}

/* Lightbox Modal */
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.lightbox-modal {
  background: #ffffff;
  border-radius: 12px;
  max-width: 720px;
  width: 100%;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  animation: zoomIn 0.2s ease-out;
}

@keyframes zoomIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.close-lightbox {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(15, 23, 42, 0.6);
  border: none;
  color: #ffffff;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s;
}

.close-lightbox:hover {
  background: rgba(15, 23, 42, 0.9);
}

.close-icon {
  width: 20px;
  height: 20px;
}

.modal-img-wrap {
  width: 100%;
  height: 380px;
  background-color: #0f172a;
}

.modal-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-info {
  padding: 24px;
}

.modal-badge {
  display: inline-block;
  background-color: #eff6ff;
  color: #1d4ed8;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 8px;
}

.modal-title {
  margin: 0 0 6px 0;
  font-size: 18px;
  font-weight: 800;
  color: #0d3b66;
}

.modal-date {
  margin: 0 0 12px 0;
  font-size: 12px;
  color: #94a3b8;
}

.modal-desc {
  margin: 0;
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .photo-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 768px) {
  .photo-grid { grid-template-columns: repeat(2, 1fr); }
  .modal-img-wrap { height: 260px; }
}

@media (max-width: 480px) {
  .photo-grid { grid-template-columns: 1fr; }
}
</style>