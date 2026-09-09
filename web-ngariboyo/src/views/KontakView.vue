<script setup>
import { reactive, ref } from 'vue'

const schoolContact = {
  address: 'Jl. Raya Karas, Ngariboyo, Kec. Ngariboyo, Kabupaten Magetan, Jawa Timur 63351',
  phone: '(0351) 894537',
  whatsapp: '+62 812-3456-7890',
  email: 'info@smpn1ngariboyo.sch.id',
  hours: 'Senin – Jum\'at: 07.00 – 15.00 WIB (Sabtu & Minggu Libur)'
}

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: 'Pertanyaan Umum',
  message: ''
})

const isSent = ref(false)

const handleSend = () => {
  isSent.value = true
  // Reset setelah beberapa saat
  setTimeout(() => {
    form.name = ''
    form.email = ''
    form.phone = ''
    form.subject = 'Pertanyaan Umum'
    form.message = ''
  }, 500)
}
</script>

<template>
  <div class="contact-page">
    <!-- Header Banner -->
    <header class="page-banner">
      <div class="banner-inner">
        <h1 class="page-title">Hubungi Kami</h1>
        <p class="page-subtitle">
          Pusat layanan informasi, pengaduan, dan aspirasi masyarakat untuk SMP Negeri 1 Ngariboyo.
        </p>
      </div>
    </header>

    <div class="contact-container">
      <div class="two-col-layout">
        
        <!-- KOLOM 1: Informasi Kontak -->
        <div class="contact-info-card">
          <span class="badge-sub">LAYANAN INFORMASI</span>
          <h2>SMP Negeri 1 Ngariboyo</h2>
          <p class="info-desc">
            Silakan hubungi kami atau kunjungi kantor tata usaha sekolah pada jam operasional kerja resmi.
          </p>

          <div class="info-items">
            <div class="info-row">
              <div class="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="text-group">
                <label>Alamat Sekolah</label>
                <span>{{ schoolContact.address }}</span>
              </div>
            </div>

            <div class="info-row">
              <div class="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a11.042 11.042 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div class="text-group">
                <label>Telepon & WhatsApp</label>
                <span>{{ schoolContact.phone }} / {{ schoolContact.whatsapp }}</span>
              </div>
            </div>

            <div class="info-row">
              <div class="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="text-group">
                <label>Email Resmi</label>
                <span>{{ schoolContact.email }}</span>
              </div>
            </div>

            <div class="info-row">
              <div class="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-group">
                <label>Jam Pelayanan</label>
                <span>{{ schoolContact.hours }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- KOLOM 2: Formulir Pesan -->
        <div class="contact-form-card">
          <h2>Kirim Pesan / Pengaduan</h2>
          
          <div v-if="isSent" class="sent-banner">
            <svg xmlns="http://www.w3.org/2000/svg" class="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h4>Pesan Berhasil Terkirim!</h4>
              <p>Terima kasih. Pesan atau aspirasi Anda telah kami terima dan akan segera ditindaklanjuti.</p>
              <button class="btn-resend" @click="isSent = false">Kirim Pesan Lain</button>
            </div>
          </div>

          <form v-else class="form-body" @submit.prevent="handleSend">
            <div class="form-group">
              <label>Nama Lengkap *</label>
              <input v-model="form.name" type="text" required placeholder="Masukkan nama Anda" />
            </div>

            <div class="two-inputs">
              <div class="form-group">
                <label>Email *</label>
                <input v-model="form.email" type="email" required placeholder="alamat@email.com" />
              </div>
              <div class="form-group">
                <label>Nomor WhatsApp / HP</label>
                <input v-model="form.phone" type="tel" placeholder="08xxxxxxxxxx" />
              </div>
            </div>

            <div class="form-group">
              <label>Kategori Pesan</label>
              <select v-model="form.subject">
                <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                <option value="Informasi PPDB">Informasi PPDB</option>
                <option value="Akademik & Siswa">Akademik & Siswa</option>
                <option value="Saran & Kritik">Saran, Kritik, atau Pengaduan</option>
              </select>
            </div>

            <div class="form-group">
              <label>Isi Pesan *</label>
              <textarea v-model="form.message" rows="4" required placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."></textarea>
            </div>

            <button type="submit" class="btn-send">
              Kirim Pesan Sekarang
            </button>
          </form>
        </div>

      </div>

      <!-- PETA SEKOLAH -->
      <div class="map-section">
        <h3>Lokasi SMP Negeri 1 Ngariboyo di Google Maps</h3>
        <div class="map-frame-box">
          <iframe 
            src="https://maps.google.com/maps?q=SMPN%201%20Ngariboyo%20Magetan&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            class="full-map" 
            loading="lazy"
            title="Lokasi Sekolah SMPN 1 Ngariboyo"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
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

.contact-container {
  max-width: 1100px;
  margin: 36px auto 0;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.two-col-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 28px;
}

.contact-info-card, .contact-form-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
}

.badge-sub {
  font-size: 11px;
  font-weight: 700;
  color: #1d4ed8;
  background: #eff6ff;
  padding: 4px 10px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.contact-info-card h2 {
  margin: 12px 0 8px 0;
  font-size: 20px;
  font-weight: 800;
  color: #0d3b66;
}

.info-desc {
  color: #64748b;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 24px;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #eff6ff;
  color: #1d4ed8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon {
  width: 20px;
  height: 20px;
}

.text-group {
  display: flex;
  flex-direction: column;
}

.text-group label {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.text-group span {
  font-size: 13px;
  font-weight: 500;
  color: #1e293b;
  line-height: 1.4;
}

/* Form */
.contact-form-card h2 {
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 800;
  color: #0d3b66;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.two-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 13px;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #1d4ed8;
}

.btn-send {
  background-color: #0d3b66;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  margin-top: 4px;
  transition: background-color 0.2s;
}

.btn-send:hover {
  background-color: #1d4ed8;
}

/* Sent Alert */
.sent-banner {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.check-icon {
  width: 24px;
  height: 24px;
  color: #16a34a;
  flex-shrink: 0;
}

.sent-banner h4 {
  margin: 0 0 4px 0;
  color: #15803d;
  font-size: 15px;
}

.sent-banner p {
  margin: 0 0 12px 0;
  color: #166534;
  font-size: 13px;
}

.btn-resend {
  background: #16a34a;
  color: #ffffff;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

/* Map Section */
.map-section {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 24px;
}

.map-section h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0d3b66;
}

.map-frame-box {
  width: 100%;
  height: 360px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #cbd5e1;
}

.full-map {
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 850px) {
  .two-col-layout {
    grid-template-columns: 1fr;
  }
  .two-inputs {
    grid-template-columns: 1fr;
  }
  .contact-info-card, .contact-form-card {
    padding: 20px;
  }
}
</style>