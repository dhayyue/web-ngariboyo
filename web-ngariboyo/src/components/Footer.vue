<script setup>
import { RouterLink } from 'vue-router'

const schoolInfo = {
  name: 'SMP NEGERI 1',
  subName: 'NGARIBOYO',
  desc: 'Sekolah yang berkomitmen mencetak generasi unggul, berkarakter, berprestasi, dan berwawasan lingkungan.',
  address: 'Jl. Karas, Ngariboyo, Kec. Ngariboyo, Kabupaten Magetan, Jawa Timur',
  phone: '(0351) 894537',
  email: 'smpn1ngariboyo@gmail.com',
  hours: 'Senin, 07:00'
}

const quickLinks = [
  { name: 'Beranda', href: '/' },
  { name: 'Profil Sekolah', href: '/profil' },
  { name: 'Akademik', href: '/akademik' },
  { name: 'Kesiswaan', href: '/kesiswaan' },
  { name: 'Berita', href: '/berita' },
  { name: 'PPDB', href: '/ppdb' },
  { name: 'Kontak', href: '/kontak' }
]
</script>

<template>
  <footer class="footer-wrapper">
    <!-- Bagian Utama Footer -->
    <div class="footer-main">
      <div class="container footer-grid">
        
        <!-- KOLOM 1: Identitas Sekolah & Sosmed -->
        <div class="footer-col brand-col">
          <div class="school-brand">
            <div class="logo-box">
              <img src="/logo.png" alt="Logo SMPN 1 Ngariboyo" class="logo-img" />
            </div>
            <div class="brand-text">
              <span class="school-title">{{ schoolInfo.name }}</span>
              <span class="school-subtitle">{{ schoolInfo.subName }}</span>
            </div>
          </div>

          <p class="brand-desc">{{ schoolInfo.desc }}</p>

          <!-- Ikon Media Sosial -->
          <div class="social-links">
            <a href="https://www.instagram.com/smpn_1ngariboyo?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" class="social-icon" title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@smpn1ngariboyo" class="social-icon" title="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a href="mailto:smpn1ngariboyo@gmail.com" class="social-icon" title="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- KOLOM 2: Tautan Cepat (2 Sub-Kolom) -->
        <div class="footer-col">
  <h4 class="col-title">Tautan Cepat</h4>
  <div class="links-subgrid">
    <ul class="link-list">
      <li v-for="(item, idx) in quickLinks.slice(0, 5)" :key="idx">
        <RouterLink :to="item.href">{{ item.name }}</RouterLink>
      </li>
    </ul>
    <ul class="link-list">
      <li v-for="(item, idx) in quickLinks.slice(5)" :key="idx">
        <RouterLink :to="item.href">{{ item.name }}</RouterLink>
      </li>
    </ul>
  </div>
</div>

        <!-- KOLOM 3: Kontak Kami -->
        <div class="footer-col">
          <h4 class="col-title">Kontak Kami</h4>
          <ul class="contact-list">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{{ schoolInfo.address }}</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a11.042 11.042 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{{ schoolInfo.phone }}</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{{ schoolInfo.email }}</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="contact-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ schoolInfo.hours }}</span>
            </li>
          </ul>
        </div>

        <!-- KOLOM 4: Lokasi Google Maps -->
        <div class="footer-col">
          <h4 class="col-title">Lokasi Kami</h4>
          <div class="map-card">
            <iframe 
              src="https://maps.google.com/maps?q=SMPN%201%20Ngariboyo%20Magetan&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              class="map-frame" 
              loading="lazy"
              title="Peta Lokasi Sekolah"
            ></iframe>
          </div>
        </div>

      </div>
    </div>

    <!-- Copyright Bottom Bar -->
    <div class="footer-bottom">
      <div class="container text-center">
        <p>© 2026 SMP Negeri 1 Ngariboyo. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-wrapper {
  background-color: #08213b; /* Biru sangat gelap sesuai desain */
  color: #cbd5e1;
  font-size: 13px;
}

.footer-main {
  padding: 48px 16px 36px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1.2fr 1fr;
  gap: 32px;
}

.col-title {
  margin: 0 0 18px 0;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
}

/* Kolom 1 */
.school-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.logo-box {
  width: 70px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 0;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}


.logo-icon {
  width: 22px;
  height: 22px;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.school-title {
  font-size: 14px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
}

.school-subtitle {
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
}

.brand-desc {
  font-size: 12px;
  line-height: 1.6;
  color: #94a3b8;
  margin: 0 0 18px 0;
}

.social-links {
  display: flex;
  gap: 10px;
}

.social-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.2s;
}

.social-icon:hover {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
  color: #ffffff;
}

/* Kolom 2 */
.links-subgrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.link-list a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;
}

.link-list a:hover {
  color: #ffffff;
  padding-left: 2px;
}

/* Kolom 3 */
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 12px;
  line-height: 1.5;
  color: #94a3b8;
}

.contact-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 2px;
  color: #cbd5e1;
}

/* Kolom 4 */
.map-card {
  width: 100%;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.map-frame {
  width: 100%;
  height: 100%;
  border: none;
}

/* Bottom Bar */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px 0;
  font-size: 12px;
  color: #64748b;
  text-align: center;
}

.footer-bottom p {
  margin: 0;
}

/* Responsif */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>