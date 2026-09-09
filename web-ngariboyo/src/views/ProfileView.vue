<script setup>
const vision = 'Terwujudnya peserta didik yang beriman, berkarakter, unggul dalam prestasi, menguasai ilmu pengetahuan dan teknologi, serta berwawasan lingkungan.'

const missions = [
  'Menumbuhkan penghayatan dan pengamalan ajaran agama yang dianut serta budi pekerti luhur.',
  'Melaksanakan pembelajaran dan bimbingan secara efektif, kreatif, dan inovatif untuk mengoptimalkan potensi siswa.',
  'Mendorong semangat berprestasi di bidang akademik maupun non-akademik secara berkelanjutan.',
  'Mengembangkan keterampilan pemanfaatan teknologi informasi dan komunikasi dalam proses pembelajaran.',
  'Menciptakan lingkungan sekolah yang bersih, hijau, asri, sehat, aman, dan ramah anak.'
]

const facilities = [
  {
    name: 'Laboratorium Komputer',
    desc: 'Dilengkapi 35 unit PC modern berspesifikasi tinggi dengan akses internet serat optik berkecepatan tinggi untuk menunjang pembelajaran TIK dan asesmen nasional.',
    icon: 'desktop'
  },
  {
    name: 'Perpustakaan Digital & Konvensional',
    desc: 'Koleksi ribuan buku fiksi, referensi pelajaran, serta komputer katalog digital dengan ruang baca ber-AC yang nyaman.',
    icon: 'book'
  },
  {
    name: 'Laboratorium IPA',
    desc: 'Peralatan praktikum fisika dan biologi lengkap yang aman untuk menunjang penelitian dan pembelajaran berbasis sains.',
    icon: 'flask'
  },
  {
    name: 'Lapangan Olahraga Multifungsi',
    desc: 'Fasilitas lapangan basket, voli, dan futsal luar ruangan yang mendukung aktivitas fisik serta pembinaan minat bakat siswa.',
    icon: 'sport'
  }
]
</script>

<template>
  <div class="profile-page">
    <!-- Banner Atas -->
    <header class="page-banner">
      <div class="banner-inner">
        <h1 class="page-title">Profil SMP Negeri 1 Ngariboyo</h1>
        <p class="page-subtitle">
          Mengenal lebih dekat dedikasi, visi keunggulan, tenaga pendidik, dan fasilitas pendukung pendidikan terbaik.
        </p>
      </div>
    </header>

    <div class="content-container">
      <!-- 1. Sejarah Singkat -->
      <section id="sejarah" class="section-card">
        <div class="section-badge">SEJARAH</div>
        <h2 class="section-heading">Sejarah Singkat Sekolah</h2>
        <div class="text-content">
          <p>
            SMP Negeri 1 Ngariboyo didirikan sebagai komitmen mencerdaskan kehidupan generasi muda di wilayah Kecamatan Ngariboyo dan sekitarnya. Sejak awal berdirinya, sekolah ini terus bertumbuh menjadi salah satu lembaga pendidikan rujukan dengan tradisi disiplin, integritas, dan capaian prestasi yang terus meningkat.
          </p>
          <p>
            Melalui dukungan para pendidik berdedikasi, komite sekolah, dan sarana yang terus dimodernisasi, SMP Negeri 1 Ngariboyo senantiasa beradaptasi dengan kemajuan kurikulum nasional untuk mencetak lulusan yang tidak hanya unggul secara akademis, tetapi juga memiliki akhlak mulia dan kepedulian sosial yang tinggi.
          </p>
        </div>
      </section>

      <!-- 2. Visi & Misi -->
      <section id="visi-misi" class="section-card">
        <div class="section-badge">PANDUAN UTAMA</div>
        <h2 class="section-heading">Visi & Misi</h2>
        
        <div class="vision-box">
          <h3 class="box-title">Visi Sekolah</h3>
          <p class="vision-text">“{{ vision }}”</p>
        </div>

        <div class="mission-box">
          <h3 class="box-title">Misi Sekolah</h3>
          <ol class="mission-list">
            <li v-for="(item, idx) in missions" :key="idx">
              {{ item }}
            </li>
          </ol>
        </div>
      </section>

      <!-- 3. Fasilitas Sekolah -->
      <section id="fasilitas" class="section-card">
        <div class="section-badge">SARANA & PRASARANA</div>
        <h2 class="section-heading">Fasilitas Unggulan</h2>
        
        <div class="facility-grid">
          <div v-for="(item, idx) in facilities" :key="idx" class="facility-card">
            <div class="facility-icon">
              <!-- Lab Komputer -->
              <svg v-if="item.icon === 'desktop'" xmlns="http://www.w3.org/2000/svg" class="icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <!-- Perpustakaan -->
              <svg v-else-if="item.icon === 'book'" xmlns="http://www.w3.org/2000/svg" class="icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <!-- Lab IPA -->
              <svg v-else-if="item.icon === 'flask'" xmlns="http://www.w3.org/2000/svg" class="icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <!-- Olahraga -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 class="facility-name">{{ item.name }}</h4>
            <p class="facility-desc">{{ item.desc }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
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

.content-container {
  max-width: 1100px;
  margin: 36px auto 0;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
  scroll-margin-top: 100px;
}

.section-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: #1d4ed8;
  background: #eff6ff;
  padding: 4px 10px;
  border-radius: 4px;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.section-heading {
  margin: 0 0 20px 0;
  font-size: 22px;
  font-weight: 800;
  color: #0d3b66;
}

.text-content p {
  color: #475569;
  line-height: 1.7;
  font-size: 14px;
  margin: 0 0 14px 0;
}

.text-content p:last-child {
  margin-bottom: 0;
}

/* Visi & Misi */
.vision-box {
  background-color: #f8fafc;
  border-left: 4px solid #1d4ed8;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 24px;
}

.box-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}

.vision-text {
  margin: 0;
  font-size: 15px;
  font-style: italic;
  color: #1e293b;
  line-height: 1.6;
}

.mission-list {
  padding-left: 20px;
  margin: 0;
  color: #475569;
  line-height: 1.7;
  font-size: 14px;
}

.mission-list li {
  margin-bottom: 8px;
}

/* Fasilitas */
.facility-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.facility-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
}

.facility-icon {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background-color: #eff6ff;
  color: #1d4ed8;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.icon-svg {
  width: 24px;
  height: 24px;
}

.facility-name {
  margin: 0 0 8px 0;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.facility-desc {
  margin: 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
}

/* Responsif */
@media (max-width: 640px) {
  .facility-grid {
    grid-template-columns: 1fr;
  }
  .section-card {
    padding: 20px;
  }
}
</style>