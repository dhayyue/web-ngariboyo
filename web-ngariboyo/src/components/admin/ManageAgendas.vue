<script setup>
import { ref, onMounted } from 'vue'
import { getToken } from '@/services/auth.js'
import { API_BASE_URL, getAgendas } from '@/services/api.js'
import { showAlert, showConfirm } from '@/utils/swal.js'

const agendaList = ref([])
const isAgendaLoading = ref(false)
const isSubmittingAgenda = ref(false)
const showAgendaModal = ref(false)
const editingAgendaId = ref(null)
const actionMessage = ref('')

const agendaForm = ref({
  dateDay: '',
  dateMonth: 'Sep',
  title: '',
  period: '',
  desc: ''
})

const fetchAgendaData = async () => {
  try {
    isAgendaLoading.value = true
    const res = await getAgendas()
    agendaList.value = Array.isArray(res) ? res : (res?.data || [])
  } catch (err) {
    console.error(err)
  } finally {
    isAgendaLoading.value = false
  }
}

const openAgendaModal = () => {
  editingAgendaId.value = null
  agendaForm.value = {
    dateDay: '',
    dateMonth: 'Sep',
    title: '',
    period: '',
    desc: ''
  }
  showAgendaModal.value = true
}

const openEditAgendaModal = (ag) => {
  editingAgendaId.value = ag.id
  agendaForm.value = {
    dateDay: ag.dateDay,
    dateMonth: ag.dateMonth,
    title: ag.title,
    period: ag.period,
    desc: ag.desc
  }
  showAgendaModal.value = true
}

const handleSubmitAgenda = async () => {
  if (!agendaForm.value.dateDay || !agendaForm.value.title) {
    await showAlert({
      icon: 'warning',
      title: 'Perhatian',
      text: 'Tanggal dan judul agenda wajib diisi!'
    })
    return
  }

  try {
    isSubmittingAgenda.value = true
    const token = getToken()
    const isEdit = !!editingAgendaId.value
    const url = isEdit
      ? `${API_BASE_URL}/agendas/${editingAgendaId.value}`
      : `${API_BASE_URL}/agendas`
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(agendaForm.value)
    })

    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menyimpan agenda')

    actionMessage.value = isEdit ? 'Agenda berhasil diperbarui!' : 'Agenda berhasil ditambahkan!'
    await showAlert({
      icon: 'success',
      title: 'Berhasil',
      text: actionMessage.value
    })
    setTimeout(() => (actionMessage.value = ''), 3000)
    showAgendaModal.value = false
    fetchAgendaData()
  } catch (err) {
    await showAlert({
      icon: 'error',
      title: 'Gagal',
      text: err.message
    })
  } finally {
    isSubmittingAgenda.value = false
  }
}

const handleDeleteAgenda = async (id) => {
  const confirmed = await showConfirm('Hapus agenda?', 'Yakin ingin menghapus agenda ini?')
  if (!confirmed) return
  try {
    const token = getToken()
    const res = await fetch(`${API_BASE_URL}/agendas/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menghapus agenda')

    actionMessage.value = 'Agenda berhasil dihapus!'
    await showAlert({
      icon: 'success',
      title: 'Berhasil',
      text: actionMessage.value
    })
    setTimeout(() => (actionMessage.value = ''), 3000)
    fetchAgendaData()
  } catch (err) {
    await showAlert({
      icon: 'error',
      title: 'Gagal',
      text: err.message
    })
  }
}

onMounted(() => {
  fetchAgendaData()
})
</script>

<template>
  <div>
    <div v-if="actionMessage" class="alert-success">
      {{ actionMessage }}
    </div>

    <div class="card-panel">
      <div class="panel-header">
        <h3>Jadwal Agenda Sekolah ({{ agendaList.length }})</h3>
        <button @click="openAgendaModal" class="btn-primary">+ Tambah Agenda</button>
      </div>

      <div v-if="isAgendaLoading" class="loading-state">Memuat agenda...</div>
      <div v-else class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Judul Agenda</th>
              <th>Waktu</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ag in agendaList" :key="ag.id">
              <td style="width: 80px; font-weight: 700; color: #1d4ed8;">
                {{ ag.dateDay }} {{ ag.dateMonth }}
              </td>
              <td class="font-medium">{{ ag.title }}</td>
              <td>{{ ag.period || '-' }}</td>
              <td>{{ ag.desc || '-' }}</td>
              <td>
                <div class="action-cell">
                  <button @click="openEditAgendaModal(ag)" class="btn-edit">Edit</button>
                  <button @click="handleDeleteAgenda(ag.id)" class="btn-delete">Hapus</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL AGENDA -->
    <div v-if="showAgendaModal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ editingAgendaId ? 'Edit Agenda' : 'Tambah Agenda Kegiatan' }}</h3>
          <button @click="showAgendaModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="handleSubmitAgenda" class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>Tanggal (Angka)</label>
              <input v-model="agendaForm.dateDay" type="text" placeholder="Contoh: 17" required />
            </div>
            <div class="form-group">
              <label>Bulan (Singkatan)</label>
              <input v-model="agendaForm.dateMonth" type="text" placeholder="Contoh: Agu atau Sep" required />
            </div>
          </div>
          <div class="form-group">
            <label>Nama Agenda</label>
            <input v-model="agendaForm.title" type="text" placeholder="Penilaian Tengah Semester" required />
          </div>
          <div class="form-group">
            <label>Rentang Waktu</label>
            <input v-model="agendaForm.period" type="text" placeholder="10 - 15 September 2026" />
          </div>
          <div class="form-group">
            <label>Keterangan Tambahan</label>
            <textarea v-model="agendaForm.desc" rows="3"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="showAgendaModal = false" class="btn-secondary">Batal</button>
            <button type="submit" class="btn-primary" :disabled="isSubmittingAgenda">
              {{ isSubmittingAgenda ? 'Menyimpan...' : editingAgendaId ? 'Simpan' : 'Simpan Agenda' }}
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
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-group label { font-size: 12px; font-weight: 600; color: #334155; }
.form-group input, .form-group textarea { padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; outline: none; font-family: inherit; width: 100%; box-sizing: border-box; }
.modal-footer { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; }
.loading-state { padding: 30px; text-align: center; color: #94a3b8; font-size: 13px; }
@media (max-width: 768px) { .form-row { grid-template-columns: 1fr; gap: 14px; } }
</style>