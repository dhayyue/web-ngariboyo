<script setup>
// Data Sambutan Kepala Sekolah
const principalData = {
  name: 'Surono, S.Pd., M.Pd',
  role: 'Kepala Sekolah',
  photo: '/profile.png',
  greeting: 'Assalamu\'alaikum Warahmatullahi Wabarakatuh,',
  message1: 'Selamat datang di website resmi SMP Negeri 1 Ngariboyo. Kami berkomitmen untuk memberikan pendidikan terbaik dan membentuk generasi yang berakhlak mulia, cerdas, serta siap menghadapi tantangan masa depan.',
  message2: 'Semoga website ini dapat menjadi media informasi dan komunikasi yang bermanfaat bagi seluruh warga sekolah dan masyarakat.'
}

// Data Profil Singkat (Grid 3x3)
const schoolStats = [
  { label: 'NPSN', value: '20509678', icon: 'shield' },
  { label: 'Akreditasi', value: 'A (Unggul)', icon: 'award' },
  { label: 'Tahun Berdiri', value: '1985', icon: 'calendar' },
  { label: 'Status', value: 'Negeri', icon: 'building' },
  { label: 'Jumlah Siswa', value: '756 Siswa', icon: 'users' },
  { label: 'Jumlah Guru', value: '48 Guru', icon: 'teacher' },
  { label: 'Kurikulum', value: 'Kurikulum Merdeka', icon: 'book' },
  { label: 'Visi Sekolah', value: 'Generasi unggul, berkarakter, berwawasan lingkungan.', icon: 'target' },
  { label: 'Misi Sekolah', value: 'Menyelenggarakan pendidikan berkualitas untuk membentuk generasi unggul.', icon: 'checklist' }
]
</script>

<template>
  <section class="profile-section">
    <div class="container">
      <div class="profile-grid">
        
        <!-- KOLOM KIRI: Sambutan Kepala Sekolah -->
        <div class="principal-card">
          <div class="principal-layout">
            <div class="principal-photo-wrapper">
              <img :src="principalData.photo" :alt="principalData.name" class="principal-photo" />
            </div>
            <div class="principal-body">
              <h2 class="section-title">Sambutan<br />Kepala Sekolah</h2>
              <p class="greeting">{{ principalData.greeting }}</p>
              <p class="message">{{ principalData.message1 }}</p>
              <p class="message secondary">{{ principalData.message2 }}</p>
              
              <div class="principal-sign">
                <h4 class="principal-name">{{ principalData.name }}</h4>
                <span class="principal-role">{{ principalData.role }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- KOLOM KANAN: Profil Singkat Sekolah -->
        <div class="school-info-card">
          <div class="school-info-header">
            <h2 class="section-title">Profil Singkat Sekolah</h2>
          </div>

          <div class="stats-grid">
            <div v-for="(stat, idx) in schoolStats" :key="idx" class="stat-item">
              <div class="stat-icon-box">
                <!-- Icon Shield (NPSN) -->
                <svg v-if="stat.icon === 'shield'" xmlns="http://www.w3.org/2000/svg" class="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <!-- Icon Award (Akreditasi) -->
                <svg v-else-if="stat.icon === 'award'" xmlns="http://www.w3.org/2000/svg" class="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <!-- Icon Calendar -->
                <svg v-else-if="stat.icon === 'calendar'" xmlns="http://www.w3.org/2000/svg" class="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <!-- Icon Building -->
                <svg v-else-if="stat.icon === 'building'" xmlns="http://www.w3.org/2000/svg" class="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <!-- Icon Users -->
                <svg v-else-if="stat.icon === 'users'" xmlns="http://www.w3.org/2000/svg" class="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <!-- Icon Teacher -->
                <svg v-else-if="stat.icon === 'teacher'" xmlns="http://www.w3.org/2000/svg" class="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <!-- Icon Book (Kurikulum) -->
                <svg v-else-if="stat.icon === 'book'" xmlns="http://www.w3.org/2000/svg" class="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <!-- Icon Target (Visi) -->
                <svg v-else-if="stat.icon === 'target'" xmlns="http://www.w3.org/2000/svg" class="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <!-- Icon Checklist (Misi) -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              
              <div class="stat-details">
                <span class="stat-label">{{ stat.label }}</span>
                <span class="stat-value">{{ stat.value }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.profile-section {
  padding: 48px 16px;
  background-color: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.profile-grid {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 24px;
}

/* KARTU SAMBUTAN KEPALA SEKOLAH */
.principal-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  display: flex;
}

.principal-layout {
  display: flex;
  gap: 20px;
  width: 100%;
}

.principal-photo-wrapper {
  flex-shrink: 0;
  width: 135px;
}

.principal-photo {
  width: 100%;
  height: 190px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.principal-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.section-title {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 800;
  color: #0d3b66;
  line-height: 1.25;
}

.greeting {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
}

.message {
  margin: 0 0 8px 0;
  font-size: 12px;
  line-height: 1.5;
  color: #64748b;
}

.message.secondary {
  margin-bottom: 16px;
}

.principal-sign {
  margin-top: auto;
}

.principal-name {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0d3b66;
}

.principal-role {
  font-size: 12px;
  color: #64748b;
}

/* KARTU PROFIL SINGKAT SEKOLAH */
.school-info-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.school-info-header {
  margin-bottom: 20px;
}

/* Grid 3 Kolom Data */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
}

.stat-icon-box {
  width: 32px;
  height: 32px;
  background-color: #eff6ff;
  color: #1d4ed8;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon {
  width: 18px;
  height: 18px;
}

.stat-details {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
}

.stat-value {
  font-size: 12px;
  color: #0f172a;
  font-weight: 700;
  line-height: 1.35;
  margin-top: 2px;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .principal-layout {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>