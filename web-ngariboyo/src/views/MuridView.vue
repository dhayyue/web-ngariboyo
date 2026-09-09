<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeTab = ref('osis')

// Sinkronisasi tab dengan hash URL
const syncTabWithHash = () => {
  if (route.hash === '#ekskul') {
    activeTab.value = 'ekskul'
  } else if (route.hash === '#osis') {
    activeTab.value = 'osis'
  }
}

onMounted(() => {
  syncTabWithHash()
})

watch(() => route.hash, () => {
  syncTabWithHash()
})

const osisPrograms = [
  {
    title: 'Latihan Dasar Kepemimpinan Siswa (LDKS)',
    desc: 'Pelatihan tahunan bagi pengurus OSIS dan perwakilan kelas guna membangun jiwa kepemimpinan, kedisiplinan, dan tanggung jawab organisasi.'
  },
  {
    title: 'Porseni & Class Meeting',
    desc: 'Ajang kompetisi olahraga dan kreativitas antarkelas yang diselenggarakan setiap pasca asesmen akhir semester.'
  },
  {
    title: 'Peringatan Hari Besar Nasional & Keagamaan',
    desc: 'Penyelenggaraan berbagai kegiatan apresiasi seni budaya, bakti sosial, dan ibadah bersama memperingati momentum penting.'
  },
  {
    title: 'Gerakan Sekolah Bersih & Ramah Lingkungan',
    desc: 'Inisiatif rutin piket pelestarian taman sekolah serta kampanye pengurangan sampah plastik.'
  }
]

const extracurriculars = [
  {
    name: 'Pramuka (Wajib)',
    category: 'Kepanduan',
    badgeColor: 'blue',
    desc: 'Membentuk kedisiplinan, kemandirian, kecakapan bertahan hidup, dan patriotisme generasi muda.'
  },
  {
    name: 'Palang Merah Remaja (PMR)',
    category: 'Kemanusiaan',
    badgeColor: 'red',
    desc: 'Pelatihan pertolongan pertama pada kecelakaan (P3K), kesiapsiagaan bencana, dan kepedulian sosial.'
  },
  {
    name: 'Futsal & Sepak Bola',
    category: 'Olahraga',
    badgeColor: 'green',
    desc: 'Pembinaan fisik, taktik beregu, dan persiapan menghadapi turnamen pelajar daerah.'
  },
  {
    name: 'Bola Voli',
    category: 'Olahraga',
    badgeColor: 'green',
    desc: 'Pengasahan teknik passing, servis, dan kekompakan tim dalam kejuaraan sekolah.'
  },
  {
    name: 'Seni Tari Tradisional',
    category: 'Seni & Budaya',
    badgeColor: 'purple',
    desc: 'Melestarikan seni tari daerah Jawa Timur serta tampil pada acara resmi dan festival kebudayaan.'
  },
  {
    name: 'Klub Komputer & Robotika',
    category: 'Sains & IT',
    badgeColor: 'blue',
    desc: 'Eksplorasi dasar coding, desain grafis, dan pemanfaatan teknologi digital kreatif.'
  }
]
</script>

<template>
  <div class="student-page">
    <!-- Banner Header -->
    <header class="page-banner">
      <div class="banner-inner">
        <h1 class="page-title">Kesiswaan & Ekstrakurikuler</h1>
        <p class="page-subtitle">
          Wadah pengembangan potensi, kepemimpinan, minat bakat, dan pembentukan karakter peserta didik SMP Negeri 1 Ngariboyo.
        </p>
      </div>
    </header>

    <div class="student-container">
      <!-- Navigasi Tab -->
      <div class="tab-header">
        <button 
          class="tab-item" 
          :class="{ active: activeTab === 'osis' }"
          @click="activeTab = 'osis'"
        >
          OSIS & Kepemimpinan
        </button>
        <button 
          class="tab-item" 
          :class="{ active: activeTab === 'ekskul' }"
          @click="activeTab = 'ekskul'"
        >
          Pilihan Ekstrakurikuler
        </button>
      </div>

      <!-- Tab 1: OSIS -->
      <section v-if="activeTab === 'osis'" id="osis" class="card-content">
        <div class="intro-box">
          <h2>Organisasi Siswa Intra Sekolah (OSIS)</h2>
          <p>
            OSIS SMP Negeri 1 Ngariboyo merupakan induk wadah pembinaan organisasi peserta didik. Dipimpin oleh perwakilan siswa terpilih melalui pemilihan umum raya (Pemilos), OSIS menjadi jembatan kreativitas aspirasi dan penggerak beragam program positif sekolah.
          </p>
        </div>

        <h3 class="sub-title">Program Kerja Unggulan</h3>
        <div class="program-grid">
          <div v-for="(item, idx) in osisPrograms" :key="idx" class="program-card">
            <div class="card-header">
              <span class="program-num">0{{ idx + 1 }}</span>
              <h4>{{ item.title }}</h4>
            </div>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Tab 2: Ekstrakurikuler -->
      <section v-if="activeTab === 'ekskul'" id="ekskul" class="card-content">
        <h2>Katalog Ekstrakurikuler</h2>
        <p class="section-desc">
          Setiap siswa diwajibkan mengikuti Gerakan Pramuka dan didorong memilih minimal satu ekstrakurikuler minat bakat:
        </p>

        <div class="ekskul-grid">
          <div v-for="(ekskul, idx) in extracurriculars" :key="idx" class="ekskul-card">
            <div class="ekskul-top">
              <span class="category-pill" :class="`pill-${ekskul.badgeColor}`">{{ ekskul.category }}</span>
            </div>
            <h3 class="ekskul-name">{{ ekskul.name }}</h3>
            <p class="ekskul-desc">{{ ekskul.desc }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.student-page {
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

.student-container {
  max-width: 1050px;
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
  padding: 12px 22px;
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

.sub-title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 24px 0 16px 0;
}

.section-desc {
  margin: 0 0 24px 0;
  color: #64748b;
  font-size: 13px;
}

.intro-box p {
  color: #475569;
  line-height: 1.6;
  font-size: 14px;
}

/* Grid Program OSIS */
.program-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.program-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.program-num {
  font-size: 16px;
  font-weight: 800;
  color: #1d4ed8;
}

.card-header h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.program-card p {
  margin: 0;
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
}

/* Grid Ekskul */
.ekskul-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.ekskul-card {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  background: #ffffff;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.ekskul-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px -2px rgba(0, 0, 0, 0.05);
}

.category-pill {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 9999px;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.pill-blue { background: #eff6ff; color: #1d4ed8; }
.pill-red { background: #fef2f2; color: #dc2626; }
.pill-green { background: #f0fdf4; color: #16a34a; }
.pill-purple { background: #faf5ff; color: #9333ea; }

.ekskul-name {
  margin: 0 0 8px 0;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.ekskul-desc {
  margin: 0;
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .ekskul-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .program-grid, .ekskul-grid {
    grid-template-columns: 1fr;
  }
  .section-card {
    padding: 20px;
  }
}
</style>