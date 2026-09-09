<script setup>
const contactInfo = {
  address: 'Jl. Karas, Ngariboyo, Kec. Ngariboyo, Kabupaten Magetan, Jawa Timur',
  phone: '(0351) 894537',
  email: 'smpn1ngariboyo@gmail.com',
  hours: 'Senin, 07:00'
}
</script>

<template>
  <div class="top-bar">
    <div class="container">
      <!-- Info Kiri (Alamat, Telp, Email) -->
      <div class="left-info">
        <span class="info-item">
          <!-- Icon Map Pin -->
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ contactInfo.address }}
        </span>

        <span class="info-item">
          <!-- Icon Phone -->
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {{ contactInfo.phone }}
        </span>

        <span class="info-item">
          <!-- Icon Mail -->
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {{ contactInfo.email }}
        </span>
      </div>

      <!-- Info Kanan (Jam Kerja) -->
      <div class="right-info">
        <span class="info-item">
          <!-- Icon Clock -->
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ contactInfo.hours }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-bar {
  background-color: #0d3b66; /* Warna biru navy */
  color: #e2e8f0;
  font-size: 12px;
  padding: 8px 0;
  font-family: inherit;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.left-info, .right-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
</style>