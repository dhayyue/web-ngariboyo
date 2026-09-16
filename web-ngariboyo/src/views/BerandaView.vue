<script setup>
import { ref, onMounted } from 'vue'
import { getNews, getGalleries, getAchievements } from '@/services/api.js'

import HeroSection from '../components/HeroSection.vue'
import QuickAccess from '../components/QuickAccess.vue'
import ProfileSection from '../components/ProfileSection.vue'
import BeritaSection from '../components/BeritaSection.vue'
import PrestasiSection from '../components/PrestasiSection.vue'
import GalerySection from '../components/GalerySection.vue'
import BannerSection from '../components/BannerSection.vue'

const latestNews = ref([])
const galleries = ref([])
const topAchievements = ref([])

onMounted(async () => {
  try {
    const [newsData, galleryData, achData] = await Promise.all([
      getNews(),
      getGalleries(),
      getAchievements()
    ])
    latestNews.value = Array.isArray(newsData) ? newsData.slice(0, 3) : []
    galleries.value = Array.isArray(galleryData) ? galleryData.slice(0, 6) : []
    topAchievements.value = Array.isArray(achData) ? achData.slice(0, 3) : []
  } catch (err) {
    console.error('Gagal memuat konten beranda:', err)
  }
})
</script>

<template>
  <div>
    <HeroSection />
    <QuickAccess />
    <ProfileSection />
    <BeritaSection :news-list="latestNews" />
    <PrestasiSection :achievements="topAchievements" />
    <GalerySection :galleries="galleries" />
    <BannerSection />
  </div>
</template>