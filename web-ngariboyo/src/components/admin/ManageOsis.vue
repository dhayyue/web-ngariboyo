<script setup>
import { ref, onMounted } from 'vue'
import { getToken } from '@/services/auth.js'
import {
  getOsisPrograms,
  saveOsisProgram,
  deleteOsisProgram
} from '@/services/api.js'
import { showAlert, showConfirm } from '@/utils/swal.js'

const programs = ref([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const showModal = ref(false)
const editingId = ref(null)
const actionMessage = ref('')

const form = ref({
  title: '',
  desc: ''
})

const fetchPrograms = async () => {
  try {
    isLoading.value = true
    const res = await getOsisPrograms()
    programs.value = Array.isArray(res) ? res : (res?.data || [])
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const openModal = () => {
  editingId.value = null
  form.value = { title: '', desc: '' }
  showModal.value = true
}

const openEditModal = (item) => {
  editingId.value = item.id
  form.value = {
    title: item.title,
    desc: item.desc
  }
  showModal.value = true
}

const handleSubmit = async () => {
  if (!form.value.title || !form.value.desc) {
    await showAlert({
      icon: 'warning',
      title: 'Perhatian',
      text: 'Judul dan deskripsi program wajib diisi!'
    })
    return
  }

  try {
    isSubmitting.value = true
    const token = getToken()
    await saveOsisProgram(form.value, token, editingId.value)
    actionMessage.value = editingId.value
      ? 'Program OSIS berhasil diperbarui!'
      : 'Program OSIS berhasil ditambahkan!'
    await showAlert({
      icon: 'success',
      title: 'Berhasil',
      text: actionMessage.value
    })
    setTimeout(() => (actionMessage.value = ''), 3000)
    showModal.value = false
    fetchPrograms()
  } catch (err) {
    await showAlert({
      icon: 'error',
      title: 'Gagal',
      text: err.message
    })
  } finally {
    isSubmitting.value = false
  }
}

const handleDelete = async (id) => {
  const confirmed = await showConfirm('Hapus program?', 'Hapus program kerja ini?')
  if (!confirmed) return
  try {
    const token = getToken()
    await deleteOsisProgram(id, token)
    actionMessage.value = 'Program OSIS berhasil dihapus!'
    await showAlert({
      icon: 'success',
      title: 'Berhasil',
      text: actionMessage.value
    })
    setTimeout(() => (actionMessage.value = ''), 3000)
    fetchPrograms()
  } catch (err) {
    await showAlert({
      icon: 'error',
      title: 'Gagal',
      text: err.message
    })
  }
}

onMounted(() => {
  fetchPrograms()
})
</script>

<template>
  <div>
    <div v-if="actionMessage" class="alert-success">
      {{ actionMessage }}
    </div>

    <div class="card-panel">
      <div class="panel-header">
        <h3>Program Kerja OSIS ({{ programs.length }})</h3>
        <button @click="openModal" class="btn-primary">+ Tambah Program</button>
      </div>

      <div v-if="isLoading" class="loading-state">Memuat data program OSIS...</div>
      <div v-else class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 50px;">No</th>
              <th>Nama Program</th>
              <th>Deskripsi / Penjelasan</th>
              <th style="width: 140px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in programs" :key="item.id">
              <td class="font-medium" style="color: #1d4ed8;">0{{ idx + 1 }}</td>
              <td class="font-medium">{{ item.title }}</td>
              <td>{{ item.desc }}</td>
              <td>
                <div class="action-cell">
                  <button @click="openEditModal(item)" class="btn-edit">Edit</button>
                  <button @click="handleDelete(item.id)" class="btn-delete">Hapus</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL OSIS -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ editingId ? 'Edit Program OSIS' : 'Tambah Program OSIS Baru' }}</h3>
          <button @click="showModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="handleSubmit" class="modal-body">
          <div class="form-group">
            <label>Nama Program Kerja</label>
            <input v-model="form.title" type="text" placeholder="Contoh: Latihan Dasar Kepemimpinan Siswa (LDKS)" required />
          </div>
          <div class="form-group">
            <label>Deskripsi Program</label>
            <textarea v-model="form.desc" rows="4" placeholder="Jelaskan tujuan dan gambaran program ini..." required></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="showModal = false" class="btn-secondary">Batal</button>
            <button type="submit" class="btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Menyimpan...' : editingId ? 'Simpan' : 'Simpan Program' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alert-success { background-color: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 18px; }
.card-panel { background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); }
.panel-header { padding: 16px 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.panel-header h3 { margin: 0; font-size: 15px; font-weight: 700; color: #0f172a; }
.btn-primary { background-color: #0d3b66; color: #ffffff; border: none; padding: 8px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap; }
.btn-primary:hover { background-color: #08213b; }
.btn-secondary { background-color: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; }
.action-cell { display: flex; gap: 6px; align-items: center; }
.btn-edit { background: #e0f2fe; color: #0284c7; border: none; padding: 5px 10px; border-radius: 5px; font-size: 11px; font-weight: 600; cursor: pointer; }
.btn-edit:hover { background: #bae6fd; }
.btn-delete { background: #fee2e2; color: #dc2626; border: none; padding: 5px 10px; border-radius: 5px; font-size: 11px; font-weight: 600; cursor: pointer; }
.btn-delete:hover { background: #fca5a5; }
.table-responsive { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.data-table { width: 100%; min-width: 600px; border-collapse: collapse; text-align: left; font-size: 13px; }
.data-table th { background-color: #f8fafc; padding: 12px 16px; font-weight: 700; color: #475569; border-bottom: 1px solid #e2e8f0; white-space: nowrap; }
.data-table td { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; color: #334155; }
.modal-overlay { position: fixed; inset: 0; background-color: rgba(15, 23, 42, 0.6); display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 1000; }
.modal-card { background: #ffffff; border-radius: 12px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2); }
.modal-header { padding: 16px 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.modal-header h3 { margin: 0; font-size: 15px; font-weight: 700; }
.close-btn { background: none; border: none; font-size: 22px; line-height: 1; color: #94a3b8; cursor: pointer; }
.modal-body { padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group label { font-size: 12px; font-weight: 600; color: #334155; }
.form-group input, .form-group textarea { padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; outline: none; font-family: inherit; width: 100%; box-sizing: border-box; }
.modal-footer { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; }
.loading-state { padding: 30px; text-align: center; color: #94a3b8; font-size: 13px; }
</style>