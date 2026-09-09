<script setup>
const channels = [
  { name: 'Jalur Zonasi', quota: '50%', desc: 'Diperuntukkan bagi calon peserta didik yang berdomisili di dalam wilayah zonasi SMPN 1 Ngariboyo.' },
  { name: 'Jalur Afirmasi', quota: '15%', desc: 'Bagi peserta didik dari keluarga ekonomi tidak mampu dan penyandang disabilitas.' },
  { name: 'Jalur Prestasi', quota: '30%', desc: 'Berdasarkan nilai rapor akumulatif serta sertifikat kejuaraan akademik maupun non-akademik.' },
  { name: 'Jalur Mutasi Tugas', quota: '5%', desc: 'Diperuntukkan bagi calon peserta didik yang orang tua/walinya berpindah tugas resmi.' }
]

const schedules = [
  { date: '15 – 20 Juni 2026', title: 'Sosialisasi & Pembuatan Akun', desc: 'Pengambilan token dan pembuatan akun calon peserta didik baru.' },
  { date: '22 – 26 Juni 2026', title: 'Pendaftaran Jalur Zonasi & Afirmasi', desc: 'Pemilihan sekolah dan verifikasi berkas secara online.' },
  { date: '29 Juni – 02 Juli 2026', title: 'Pendaftaran Jalur Prestasi & Mutasi', desc: 'Pengunggahan bukti prestasi serta validasi berkas fisik.' },
  { date: '06 Juli 2026', title: 'Pengumuman Resmi', desc: 'Hasil seleksi akhir dapat dilihat melalui portal web sekolah.' },
  { date: '07 – 09 Juli 2026', title: 'Daftar Ulang', desc: 'Lapor diri calon siswa baru yang dinyatakan diterima.' }
]
</script>

<template>
  <div class="ppdb-page">
    <!-- Banner Header -->
    <header class="page-banner">
      <div class="banner-inner">
        <h1 class="page-title">Penerimaan Peserta Didik Baru (PPDB)</h1>
        <p class="page-subtitle">
          Tahun Ajaran 2026/2027 — Bergabunglah menjadi bagian dari generasi berkarakter dan berprestasi di SMP Negeri 1 Ngariboyo.
        </p>
      </div>
    </header>

    <div class="ppdb-container">
      <!-- 1. Ringkasan Jalur Pendaftaran -->
      <section class="section-block">
        <h2 class="block-title">Jalur Pendaftaran & Kuota</h2>
        <div class="channel-grid">
          <div v-for="(item, idx) in channels" :key="idx" class="channel-card">
            <div class="quota-badge">{{ item.quota }}</div>
            <h3 class="channel-name">{{ item.name }}</h3>
            <p class="channel-desc">{{ item.desc }}</p>
          </div>
        </div>
      </section>

      <!-- 2. Jadwal Alur PPDB -->
      <section class="section-block">
        <h2 class="block-title">Jadwal & Agenda Pelaksanaan</h2>
        <div class="timeline-list">
          <div v-for="(sch, idx) in schedules" :key="idx" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-date">{{ sch.date }}</div>
            <div class="timeline-content">
              <h4>{{ sch.title }}</h4>
              <p>{{ sch.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.ppdb-page {
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

.ppdb-container {
  max-width: 1100px;
  margin: 36px auto 0;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.section-block {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
}

.block-title {
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 800;
  color: #0d3b66;
}

/* Grid Jalur */
.channel-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.channel-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px 16px;
  position: relative;
}

.quota-badge {
  display: inline-block;
  background-color: #1d4ed8;
  color: #ffffff;
  font-size: 12px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 9999px;
  margin-bottom: 12px;
}

.channel-name {
  margin: 0 0 8px 0;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.channel-desc {
  margin: 0;
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
}

/* Timeline Jadwal */
.timeline-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-left: 2px solid #e2e8f0;
  padding-left: 20px;
  margin-left: 10px;
}

.timeline-item {
  position: relative;
}

.timeline-dot {
  position: absolute;
  left: -27px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #1d4ed8;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 2px #bfdbfe;
}

.timeline-date {
  font-size: 12px;
  font-weight: 700;
  color: #1d4ed8;
  margin-bottom: 2px;
}

.timeline-content h4 {
  margin: 0 0 4px 0;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.timeline-content p {
  margin: 0;
  font-size: 13px;
  color: #64748b;
}

/* Responsif */
@media (max-width: 900px) {
  .channel-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .channel-grid {
    grid-template-columns: 1fr;
  }
  .section-block {
    padding: 20px;
  }
}
</style>