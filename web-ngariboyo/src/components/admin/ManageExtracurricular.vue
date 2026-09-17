<script setup>
import { ref, onMounted } from 'vue'
import { getToken } from '@/services/auth.js'
import {
  getExtracurriculars,
  saveExtracurricular,
  deleteExtracurricular
} from '@/services/api.js'
import { showAlert, showConfirm } from '@/utils/swal.js'

const eskulList = ref([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const showModal = ref(false)
const editingId = ref(null)
const actionMessage = ref('')

const form = ref({
  name: '',
  category: 'Kepanduan',
  coach: '',
  schedule: '',
  description: ''
})

const fetchEskul = async () => {
  try {
    isLoading.value = true
    const res = await getExtracurriculars()
    eskulList.value = Array.isArray(res) ? res : (res?.data || [])
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const openModal = () => {
  editingId.value = null
  form.value = {
    name: '',
    category: 'Kepanduan',
    coach: '',
    schedule: '',
    description: ''
  }
  showModal.value = true
}

const openEditModal = (item) => {
  editingId.value = item.id
  form.value = {
    name: item.name,
    category: item.category,
    coach: item.coach || '',
    schedule: item.schedule || '',
    description: item.description || ''
  }
  showModal.value = true
}

const handleSubmit = async () => {
  if (!form.value.name) {
    await showAlert({
      icon: 'warning',
      title: 'Perhatian',
      text: 'Nama ekstrakurikuler wajib diisi!'
    })
    return
  }

  try {
    isSubmitting.value = true
    const token = getToken()
    await saveExtracurricular(form.value, token, editingId.value)

    actionMessage.value = editingId.value
      ? 'Ekstrakurikuler berhasil diperbarui!'
      : 'Ekstrakurikuler berhasil ditambahkan!'
    await showAlert({
      icon: 'success',
      title: 'Berhasil',
      text: actionMessage.value
    })
    setTimeout(() => (actionMessage.value = ''), 3000)

    showModal.value = false
    fetchEskul()
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
  const confirmed = await showConfirm('Hapus ekstrakurikuler?', 'Hapus ekstrakurikuler ini?')
  if (!confirmed) return
  try {
    const token = getToken()
    await deleteExtracurricular(id, token)
    actionMessage.value = 'Ekstrakurikuler berhasil dihapus!'
    await showAlert({
      icon: 'success',
      title: 'Berhasil',
      text: actionMessage.value
    })
    setTimeout(() => (actionMessage.value = ''), 3000)
    fetchEskul()
  } catch (err) {
    await showAlert({
      icon: 'error',
      title: 'Gagal',
      text: err.message
    })
  }
}

onMounted(() => {
  fetchEskul()
})
</script>

<template>
  <div>
    <div v-if="actionMessage" class="alert-success">
      {{ actionMessage }}
    </div>

    <div class="card-panel">
      <div class="panel-header">
        <h3>Daftar Ekstrakurikuler ({{ eskulList.length }})</h3>
        <button @click="openModal" class="btn-primary">+ Tambah Eskul</button>
      </div>

      <div v-if="isLoading" class="loading-state">Memuat data ekstrakurikuler...</div>
      <div v-else class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nama Eskul</th>
              <th>Kategori</th>
              <th>Pembina</th>
              <th>Jadwal</th>
              <th>Keterangan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in eskulList" :key="item.id">
              <td class="font-medium">{{ item.name }}</td>
              <td><span class="tag blue">{{ item.category }}</span></td>
              <td>{{ item.coach || '-' }}</td>
              <td>{{ item.schedule || '-' }}</td>
              <td>{{ item.description || '-' }}</td>
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

    <!-- MODAL ESKUL -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ editingId ? 'Edit Ekstrakurikuler' : 'Tambah Ekstrakurikuler' }}</h3>
          <button @click="showModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="handleSubmit" class="modal-body">
          <div class="form-group">
            <label>Nama Ekstrakurikuler</label>
            <input v-model="form.name" type="text" placeholder="Contoh: Palang Merah Remaja (PMR)" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Kategori</label>
              <select v-model="form.category">
                <option value="Kepanduan">Kepanduan</option>
                <option value="Kemanusiaan">Kemanusiaan</option>
                <option value="Olahraga">Olahraga</option>
                <option value="Seni & Budaya">Seni & Budaya</option>
                <option value="Sains & IT">Sains & IT</option>
              </select>
            </div>
            <div class="form-group">
              <label>Pembina / Pelatih</label>
              <input v-model="form.coach" type="text" placeholder="Contoh: Budi Santoso, S.Pd." />
            </div>
          </div>
          <div class="form-group">
            <label>Jadwal Latihan</label>
            <input v-model="form.schedule" type="text" placeholder="Contoh: Setiap Jumat, 14.30 WIB" />
          </div>
          <div class="form-group">
            <label>Deskripsi Singkat</label>
            <textarea v-model="form.description" rows="3" placeholder="Fokus kegiatan eskul..."></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="showModal = false" class="btn-secondary">Batal</button>
            <button type="submit" class="btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Menyimpan...' : editingId ? 'Simpan' : 'Tambah Eskul' }}
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
.data-table { width: 100%; min-width: 650px; border-collapse: collapse; text-align: left; font-size: 13px; }
.data-table th { background-color: #f8fafc; padding: 12px 16px; font-weight: 700; color: #475569; border-bottom: 1px solid #e2e8f0; white-space: nowrap; }
.data-table td { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; color: #334155; }
.tag { padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; white-space: nowrap; }
.tag.blue { background-color: #dbeafe; color: #1d4ed8; }
.modal-overlay { position: fixed; inset: 0; background-color: rgba(15, 23, 42, 0.6); display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 1000; }
.modal-card { background: #ffffff; border-radius: 12px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2); }
.modal-header { padding: 16px 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.modal-header h3 { margin: 0; font-size: 15px; font-weight: 700; }
.close-btn { background: none; border: none; font-size: 22px; line-height: 1; color: #94a3b8; cursor: pointer; }
.modal-body { padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-group label { font-size: 12px; font-weight: 600; color: #334155; }
.form-group input, .form-group select, .form-group textarea { padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; outline: none; font-family: inherit; width: 100%; box-sizing: border-box; }
.modal-footer { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; }
.loading-state { padding: 30px; text-align: center; color: #94a3b8; font-size: 13px; }
@media (max-width: 768px) { .form-row { grid-template-columns: 1fr; gap: 14px; } }
</style>