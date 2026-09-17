<script setup>
import { ref, onMounted } from 'vue'
import { getToken } from '@/services/auth.js'
import { API_BASE_URL, getAchievements } from '@/services/api.js'
import { showAlert, showConfirm } from '@/utils/swal.js'

const achievementList = ref([])
const isAchievementLoading = ref(false)
const isSubmittingAchievement = ref(false)
const showAchievementModal = ref(false)
const editingAchievementId = ref(null)
const actionMessage = ref('')

const achievementForm = ref({
  title: '',
  category: 'Akademik',
  level: 'Kabupaten',
  year: '2026',
  medal: 'gold',
  medalLabel: 'Juara 1',
  student: '',
  organizer: '',
  desc: ''
})

const fetchAchievementData = async () => {
  try {
    isAchievementLoading.value = true
    achievementList.value = await getAchievements()
  } catch (err) {
    console.error(err)
  } finally {
    isAchievementLoading.value = false
  }
}

const openAchievementModal = () => {
  editingAchievementId.value = null
  achievementForm.value = {
    title: '',
    category: 'Akademik',
    level: 'Kabupaten',
    year: '2026',
    medal: 'gold',
    medalLabel: 'Juara 1',
    student: '',
    organizer: '',
    desc: ''
  }
  showAchievementModal.value = true
}

const openEditAchievementModal = (ach) => {
  editingAchievementId.value = ach.id
  achievementForm.value = {
    title: ach.title,
    category: ach.category,
    level: ach.level,
    year: ach.year,
    medal: ach.medal,
    medalLabel: ach.medalLabel,
    student: ach.student,
    organizer: ach.organizer,
    desc: ach.desc
  }
  showAchievementModal.value = true
}

const handleSubmitAchievement = async () => {
  if (!achievementForm.value.title || !achievementForm.value.student) {
    await showAlert({
      icon: 'warning',
      title: 'Perhatian',
      text: 'Judul dan nama siswa peraih prestasi wajib diisi!'
    })
    return
  }

  try {
    isSubmittingAchievement.value = true
    const token = getToken()
    const isEdit = !!editingAchievementId.value
    const url = isEdit
      ? `${API_BASE_URL}/achievements/${editingAchievementId.value}`
      : `${API_BASE_URL}/achievements`
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(achievementForm.value)
    })

    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menyimpan prestasi')

    actionMessage.value = isEdit ? 'Prestasi berhasil diperbarui!' : 'Prestasi berhasil dicatat!'
    await showAlert({
      icon: 'success',
      title: 'Berhasil',
      text: actionMessage.value
    })
    setTimeout(() => (actionMessage.value = ''), 3000)
    showAchievementModal.value = false
    fetchAchievementData()
  } catch (err) {
    await showAlert({
      icon: 'error',
      title: 'Gagal',
      text: err.message
    })
  } finally {
    isSubmittingAchievement.value = false
  }
}

const handleDeleteAchievement = async (id) => {
  const confirmed = await showConfirm('Hapus prestasi?', 'Yakin ingin menghapus prestasi ini?')
  if (!confirmed) return
  try {
    const token = getToken()
    const res = await fetch(`${API_BASE_URL}/achievements/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menghapus prestasi')

    actionMessage.value = 'Prestasi berhasil dihapus!'
    await showAlert({
      icon: 'success',
      title: 'Berhasil',
      text: actionMessage.value
    })
    setTimeout(() => (actionMessage.value = ''), 3000)
    fetchAchievementData()
  } catch (err) {
    await showAlert({
      icon: 'error',
      title: 'Gagal',
      text: err.message
    })
  }
}

onMounted(() => {
  fetchAchievementData()
})
</script>

<template>
  <div>
    <div v-if="actionMessage" class="alert-success">
      {{ actionMessage }}
    </div>

    <div class="card-panel">
      <div class="panel-header">
        <h3>Daftar Prestasi ({{ achievementList.length }})</h3>
        <button @click="openAchievementModal" class="btn-primary">+ Catat Prestasi</button>
      </div>

      <div v-if="isAchievementLoading" class="loading-state">Memuat data prestasi...</div>
      <div v-else class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Perolehan</th>
              <th>Kejuaraan</th>
              <th>Siswa</th>
              <th>Tingkat</th>
              <th>Tahun</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ach in achievementList" :key="ach.id">
              <td>
                <span class="tag" :class="ach.medal === 'gold' ? 'orange' : 'green'">
                  {{ ach.medalLabel }}
                </span>
              </td>
              <td class="font-medium">{{ ach.title }}</td>
              <td>{{ ach.student }}</td>
              <td>{{ ach.level }}</td>
              <td>{{ ach.year }}</td>
              <td>
                <div class="action-cell">
                  <button @click="openEditAchievementModal(ach)" class="btn-edit">Edit</button>
                  <button @click="handleDeleteAchievement(ach.id)" class="btn-delete">Hapus</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL PRESTASI -->
    <div v-if="showAchievementModal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ editingAchievementId ? 'Edit Data Prestasi' : 'Catat Prestasi Baru' }}</h3>
          <button @click="showAchievementModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="handleSubmitAchievement" class="modal-body">
          <div class="form-group">
            <label>Nama Lomba / Kejuaraan</label>
            <input v-model="achievementForm.title" type="text" placeholder="Olimpiade Sains Nasional" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Peringkat (Medal Label)</label>
              <input v-model="achievementForm.medalLabel" type="text" placeholder="Juara 1" required />
            </div>
            <div class="form-group">
              <label>Warna Medali</label>
              <select v-model="achievementForm.medal">
                <option value="gold">Emas (Gold)</option>
                <option value="silver">Perak (Silver)</option>
                <option value="bronze">Perunggu (Bronze)</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Nama Siswa / Tim</label>
              <input v-model="achievementForm.student" type="text" required />
            </div>
            <div class="form-group">
              <label>Tingkat</label>
              <select v-model="achievementForm.level">
                <option value="Kecamatan">Kecamatan</option>
                <option value="Kabupaten">Kabupaten</option>
                <option value="Provinsi">Provinsi</option>
                <option value="Nasional">Nasional</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Tahun</label>
              <input v-model="achievementForm.year" type="text" placeholder="2026" />
            </div>
            <div class="form-group">
              <label>Penyelenggara</label>
              <input v-model="achievementForm.organizer" type="text" placeholder="Dinas Pendidikan" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="showAchievementModal = false" class="btn-secondary">Batal</button>
            <button type="submit" class="btn-primary" :disabled="isSubmittingAchievement">
              {{ isSubmittingAchievement ? 'Menyimpan...' : editingAchievementId ? 'Simpan' : 'Simpan Prestasi' }}
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
.tag { padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; white-space: nowrap; }
.tag.green { background-color: #d1fae5; color: #059669; }
.tag.orange { background-color: #ffedd5; color: #ea580c; }
.modal-overlay { position: fixed; inset: 0; background-color: rgba(15, 23, 42, 0.6); display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 1000; }
.modal-card { background: #ffffff; border-radius: 12px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2); }
.modal-header { padding: 16px 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.modal-header h3 { margin: 0; font-size: 15px; font-weight: 700; }
.close-btn { background: none; border: none; font-size: 22px; line-height: 1; color: #94a3b8; cursor: pointer; }
.modal-body { padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-group label { font-size: 12px; font-weight: 600; color: #334155; }
.form-group input, .form-group select { padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; outline: none; font-family: inherit; width: 100%; box-sizing: border-box; }
.modal-footer { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; }
.loading-state { padding: 30px; text-align: center; color: #94a3b8; font-size: 13px; }
@media (max-width: 768px) { .form-row { grid-template-columns: 1fr; gap: 14px; } }
</style>