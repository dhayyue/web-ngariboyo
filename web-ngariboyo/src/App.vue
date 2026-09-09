<script setup>
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import TopBar from './components/TopBar.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

// Bernilai true jika URL aktif diawali dengan '/admin'
const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})
</script>

<template>
  <div class="page-wrapper">
    <!-- Header Global (Hanya untuk halaman publik) -->
    <TopBar v-if="!isAdminRoute" />
    <Navbar v-if="!isAdminRoute" />

    <!-- Area Halaman Dinamis -->
    <main>
      <RouterView />
    </main>

    <!-- Footer Global (Hanya untuk halaman publik) -->
    <Footer v-if="!isAdminRoute" />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #f8fafc;
}
.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex-grow: 1;
}
</style>