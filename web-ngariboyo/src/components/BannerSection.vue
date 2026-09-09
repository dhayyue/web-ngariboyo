<script setup>
const ctaData = {
  titlePart1: 'Bergabung',
  titlePart2: 'Bersama Kami',
  desc: 'Daftarkan diri Anda sekarang dan jadilah bagian dari keluarga besar SMP Negeri 1 Ngariboyo.',
  buttonText: 'Daftar PPDB Sekarang',
  infoText: 'Informasi PPDB 2026/2027',
  link: '/ppdb'
}
</script>

<template>
  <section class="cta-section">
    <div class="container">
      <div class="cta-banner">
        <!-- Ilustrasi Siswa Kiri -->
        <div class="illustration-col">
          <svg class="student-illustration" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Siswa 1 (Kiri) -->
            <g id="student-left">
              <ellipse cx="65" cy="55" rx="22" ry="24" fill="#fed7aa" />
              <!-- Rambut Cowok -->
              <path d="M43 52C43 35 52 24 65 24C78 24 87 35 87 50C82 45 74 44 68 44C60 44 52 47 43 52Z" fill="#334155" />
              <!-- Seragam -->
              <path d="M38 180V120C38 104 50 90 65 90C80 90 92 104 92 120V180H38Z" fill="#ffffff" />
              <!-- Kerah Baju & Dasi Biru -->
              <path d="M57 90L65 106L73 90" fill="#e2e8f0" />
              <polygon points="65,98 69,125 65,135 61,125" fill="#1e40af" />
              <!-- Tali Ransel -->
              <rect x="42" y="105" width="8" height="50" rx="4" fill="#0f172a" />
            </g>

            <!-- Siswa 2 (Kanan) -->
            <g id="student-right">
              <ellipse cx="145" cy="58" rx="22" ry="24" fill="#fed7aa" />
              <!-- Rambut Cewek / Kuncir -->
              <path d="M123 55C123 36 133 25 145 25C157 25 167 36 167 52C161 47 154 46 148 46C140 46 132 49 123 55Z" fill="#1e293b" />
              <!-- Seragam -->
              <path d="M118 180V124C118 108 130 94 145 94C160 94 172 108 172 124V180H118Z" fill="#ffffff" />
              <!-- Dasi Biru SMP -->
              <polygon points="145,102 149,128 145,138 141,128" fill="#1e40af" />
              <path d="M137 94L145 110L153 94" fill="#e2e8f0" />
              <!-- Buku yang Didekap -->
              <rect x="130" y="130" width="30" height="40" rx="4" fill="#3b82f6" />
              <line x1="135" y1="142" x2="155" y2="142" stroke="#ffffff" stroke-width="2" />
            </g>
          </svg>
        </div>

        <!-- Teks Ajakan Tengah -->
        <div class="cta-content">
          <h2 class="cta-title">
            {{ ctaData.titlePart1 }} <span>{{ ctaData.titlePart2 }}</span>
          </h2>
          <p class="cta-desc">{{ ctaData.desc }}</p>
        </div>

        <!-- Tombol Aksi Kanan -->
        <div class="cta-actions">
          <RouterLink :to="ctaData.link" class="btn-ppdb">
  {{ ctaData.buttonText }}
  <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
</RouterLink>
          <span class="info-tag">{{ ctaData.infoText }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding: 10px 16px 40px;
  background-color: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.cta-banner {
  background-color: #0d3b66;
  border-radius: 16px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(13, 59, 102, 0.3);
  position: relative;
  min-height: 160px;
}

.illustration-col {
  width: 220px;
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  height: 160px;
}

.student-illustration {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.cta-content {
  flex-grow: 1;
  padding: 24px 30px;
  color: #ffffff;
}

.cta-title {
  margin: 0 0 8px 0;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.cta-title span {
  color: #facc15;
}

.cta-desc {
  margin: 0;
  font-size: 13px;
  color: #cbd5e1;
  max-width: 460px;
  line-height: 1.5;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;
}

.btn-ppdb {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #facc15;
  color: #0f172a;
  padding: 12px 24px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(250, 204, 21, 0.3);
  transition: all 0.2s ease;
}

.btn-ppdb:hover {
  background-color: #eab308;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(250, 204, 21, 0.4);
}

.arrow-icon {
  width: 16px;
  height: 16px;
}

.info-tag {
  font-size: 12px;
  color: #94a3b8;
}

/* Responsif */
@media (max-width: 1024px) {
  .cta-banner {
    flex-direction: column;
    text-align: center;
    padding: 32px 20px;
  }
  .illustration-col {
    display: none;
  }
  .cta-content {
    padding: 0 0 20px 0;
  }
  .cta-desc {
    margin: 0 auto;
  }
}
</style>