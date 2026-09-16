<script setup>
import { RouterLink } from 'vue-router'
import { formatImageUrl } from '@/services/api.js'

defineProps({
  galleries: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <section class="gallery-section">
    <div class="container">
      <!-- Header Section -->
      <div class="section-header">
        <h2 class="section-title">Galeri Kegiatan</h2>
        <RouterLink to="/galeri" class="link-more">
  Lihat Semua Foto
  <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
</RouterLink>
      </div>

      <!-- Grid 6 Kolom Foto -->
      <div class="gallery-grid">
        <div v-for="item in galleries" :key="item.id" class="gallery-card">
          <div class="img-wrapper">
            <img :src="formatImageUrl(item.image)" :alt="item.title" class="gallery-img" />
          </div>
          <p class="gallery-caption">{{ item.title }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-section {
  padding: 30px 16px 50px;
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
  margin-bottom: 20px;
}

.section-title {
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

/* Grid 6 Gambar */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.gallery-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.img-wrapper {
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-card:hover .gallery-img {
  transform: scale(1.08);
}

.gallery-caption {
  margin: 8px 0 0 0;
  font-size: 12px;
  font-weight: 600;
  color: #334155;
  line-height: 1.35;
}

/* Responsif */
@media (max-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  .img-wrapper {
    height: 140px;
  }
}

@media (max-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>