<script setup>
import { ref } from 'vue'

// Data slider hero
const slides = [
  {
    welcome: 'Selamat Datang di',
    title: 'SMP NEGERI 1 NGARIBOYO',
    desc: 'Membangun generasi unggul, berkarakter, berprestasi, dan berwawasan lingkungan.',
    btnPrimary: 'Tentang Kami',
    btnSecondary: 'PPDB 2026/2027',
    bgImage: '/sekolah.png'
  },
  {
    welcome: 'Pendidikan Berkualitas',
    title: 'WUJUDKAN IMPIAN & PRESTASI',
    desc: 'Mendukung bakat dan potensi peserta didik melalui kegiatan akademik dan ekstrakurikuler yang inspiratif.',
    btnPrimary: 'Lihat Prestasi',
    btnSecondary: 'PPDB 2026/2027',
    bgImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop'
  }
]

const currentSlide = ref(0)

const setSlide = (index) => {
  currentSlide.value = index
}
</script>

<template>
  <section 
    class="hero-section"
    :style="{ backgroundImage: `url(${slides[currentSlide].bgImage})` }"
  >
    <!-- Overlay gelap agar teks terbaca jelas -->
    <div class="overlay"></div>

    <div class="hero-container">
      <div class="hero-content">
        <span class="badge-welcome">{{ slides[currentSlide].welcome }}</span>
        <h1 class="hero-title">{{ slides[currentSlide].title }}</h1>
        <p class="hero-desc">{{ slides[currentSlide].desc }}</p>

        <!-- Tombol CTA -->
        <div class="hero-actions">
          <a href="/profile" class="btn btn-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {{ slides[currentSlide].btnPrimary }}
          </a>

          <a href="/ppdb" class="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            {{ slides[currentSlide].btnSecondary }}
          </a>
        </div>
      </div>

      <!-- Pagination Slider -->
      <div class="slider-dots">
        <button 
          v-for="(slide, index) in slides" 
          :key="index"
          class="dot-indicator"
          :class="{ 'active': currentSlide === index }"
          @click="setSlide(index)"
          :aria-label="'Slide ' + (index + 1)"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 480px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  transition: background-image 0.5s ease-in-out;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(8, 25, 48, 0.88) 0%, rgba(13, 59, 102, 0.7) 60%, rgba(13, 59, 102, 0.4) 100%);
}

.hero-container {
  position: relative;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 60px 16px;
  box-sizing: border-box;
}

.hero-content {
  max-width: 620px;
  color: #ffffff;
}

.badge-welcome {
  display: inline-block;
  font-size: 15px;
  letter-spacing: 0.5px;
  color: #cbd5e1;
  margin-bottom: 8px;
}

.hero-title {
  font-size: 38px;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-desc {
  font-size: 15px;
  line-height: 1.6;
  color: #e2e8f0;
  margin: 0 0 28px 0;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.btn-yellow {
  background-color: #eab308;
  color: #0f172a;
  border: 1px solid #eab308;
}

.btn-yellow:hover {
  background-color: #ca8a04;
  border-color: #ca8a04;
}

.btn-outline {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
}

.btn-outline:hover {
  background-color: #ffffff;
  color: #0d3b66;
}

/* Dots */
.slider-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot-indicator {
  width: 28px;
  height: 6px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s;
}

.dot-indicator.active {
  width: 44px;
  background-color: #eab308;
}
</style>