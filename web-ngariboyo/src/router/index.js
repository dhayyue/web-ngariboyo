import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/services/auth.js'

import BerandaView from '../views/BerandaView.vue'
import BeritaView from '../views/BeritaView.vue'
import DetailBeritaView from '../views/DetailBeritaView.vue'
import ProfileView from '../views/ProfileView.vue'
import PpdbView from '../views/PpdbView.vue'
import AkademikView from '../views/AkademikView.vue'
import MuridView from '../views/MuridView.vue'
import KontakView from '../views/KontakView.vue'
import GuruView from '../views/GuruView.vue'
import PrestasiView from '../views/PrestasiView.vue'
import GaleryView from '../views/GaleryView.vue'

const routes = [
  // Rute Publik
  {
    path: '/',
    name: 'home',
    component: BerandaView
  },
  {
    path: '/berita',
    name: 'news',
    component: BeritaView
  },
  {
    path: '/berita/:id',
    name: 'detail-berita',
    component: DetailBeritaView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/ppdb',
    name: 'ppdb',
    component: PpdbView
  },
  {
    path: '/akademik',
    name: 'akademik',
    component: AkademikView
  },
  {
    path: '/kesiswaan',
    name: 'kesiswaan',
    component: MuridView
  },
  {
    path: '/kontak',
    name: 'kontak',
    component: KontakView
  },
  {
    path: '/guru',
    name: 'guru',
    component: GuruView
  },
  {
    path: '/prestasi',
    name: 'prestasi',
    component: PrestasiView
  },
  {
    path: '/galeri',
    name: 'galeri',
    component: GaleryView
  },

  // Rute Administrator
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/admin/LoginView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import('../views/admin/DashboardView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
            top: 90
          })
        }, 100)
      })
    }
    return { top: 0 }
  }
})

// Navigation Guard: Proteksi akses rute admin
router.beforeEach((to, from, next) => {
  const loggedIn = isAuthenticated()

  // Jika mau ke halaman ber-meta requiresAuth tapi belum login -> lempar ke login
  if (to.meta.requiresAuth && !loggedIn) {
    next('/admin/login')
  } 
  // Jika sudah login tapi buka halaman login lagi -> lempar ke dashboard
  else if (to.meta.guestOnly && loggedIn) {
    next('/admin/dashboard')
  } 
  else {
    next()
  }
})

export default router