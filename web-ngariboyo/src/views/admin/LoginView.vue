<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginAdmin } from '@/services/auth.js'

const router = useRouter()
const username = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Silakan isi username dan password.'
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''
    await loginAdmin(username.value, password.value)
    // Berhasil login, arahkan ke dashboard admin
    router.push('/admin/dashboard')
  } catch (err) {
    errorMessage.value = err.message || 'Username atau password tidak sesuai.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-header">
        <div class="brand-badge">SMPN 1 Ngariboyo</div>
        <h2 class="title">Portal Administrator</h2>
        <p class="subtitle">Masuk untuk mengelola data website sekolah</p>
      </div>

      <div v-if="errorMessage" class="alert-box">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin" class="form-body">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Masukkan username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="isLoading">Memproses...</span>
          <span v-else>Masuk ke Dashboard</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f172a;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 16px;
  padding: 36px 30px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 24px;
}

.brand-badge {
  display: inline-block;
  background-color: #eff6ff;
  color: #1d4ed8;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 9999px;
  margin-bottom: 12px;
}

.title {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
}

.subtitle {
  margin: 6px 0 0;
  font-size: 13px;
  color: #64748b;
}

.alert-box {
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 18px;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  color: #334155;
}

.form-group input {
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: #2563eb;
}

.submit-btn {
  margin-top: 8px;
  padding: 12px;
  background-color: #0d3b66;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #08213b;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>