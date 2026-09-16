<script setup>
import { ref, onMounted } from 'vue'
import { getToken } from '@/services/auth.js'
import { API_BASE_URL, getTeachers, formatImageUrl } from '@/services/api.js'

const teacherList = ref([])
const isTeacherLoading = ref(false)
const isSubmittingTeacher = ref(false)
const showTeacherModal = ref(false)
const editingTeacherId = ref(null)
const teacherPhotoFile = ref(null)
const teacherPhotoPreview = ref(null)
const actionMessage = ref('')

const teacherForm = ref({
  name: '',
  role: 'Guru Mata Pelajaran',
  category: 'Guru Mata Pelajaran',
  subject: ''
})

const fetchTeacherData = async () => {
  try {
    isTeacherLoading.value = true
    teacherList.value = await getTeachers()
  } catch (err) {
    console.error(err)
  } finally {
    isTeacherLoading.value = false
  }
}

const handleTeacherFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    teacherPhotoFile.value = file
    teacherPhotoPreview.value = URL.createObjectURL(file)
  }
}

const openTeacherModal = () => {
  editingTeacherId.value = null
  teacherForm.value = {
    name: '',
    role: 'Guru Mata Pelajaran',
    category: 'Guru Mata Pelajaran',
    subject: ''
  }
  teacherPhotoFile.value = null
  teacherPhotoPreview.value = null
  showTeacherModal.value = true
}

const openEditTeacherModal = (t) => {
  editingTeacherId.value = t.id
  teacherForm.value = {
    name: t.name,
    role: t.role,
    category: t.category,
    subject: t.subject
  }
  teacherPhotoFile.value = null
  teacherPhotoPreview.value = t.photo ? formatImageUrl(t.photo) : null
  showTeacherModal.value = true
}

const handleSubmitTeacher = async () => {
  if (!teacherForm.value.name) {
    alert('Nama guru wajib diisi!')
    return
  }

  try {
    isSubmittingTeacher.value = true
    const token = getToken()
    const formData = new FormData()
    formData.append('name', teacherForm.value.name)
    formData.append('role', teacherForm.value.role)
    formData.append('category', teacherForm.value.category)
    formData.append('subject', teacherForm.value.subject || '-')
    if (teacherPhotoFile.value) {
      formData.append('photo', teacherPhotoFile.value)
    }

    const isEdit = !!editingTeacherId.value
    const url = isEdit
      ? `${API_BASE_URL}/teachers/${editingTeacherId.value}`
      : `${API_BASE_URL}/teachers`
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })

    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menyimpan data guru')

    actionMessage.value = isEdit ? 'Data guru berhasil diperbarui!' : 'Data guru berhasil ditambahkan!'
    setTimeout(() => (actionMessage.value = ''), 3000)
    showTeacherModal.value = false
    fetchTeacherData()
  } catch (err) {
    alert(err.message)
  } finally {
    isSubmittingTeacher.value = false
  }
}

const handleDeleteTeacher = async (id) => {
  if (!confirm('Yakin ingin menghapus data guru ini?')) return
  try {
    const token = getToken()
    const res = await fetch(`${API_BASE_URL}/teachers/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menghapus data guru')

    actionMessage.value = 'Data guru berhasil dihapus!'
    setTimeout(() => (actionMessage.value = ''), 3000)
    fetchTeacherData()
  } catch (err) {
    alert(err.message)
  }
}

onMounted(() => {
  fetchTeacherData()
})
</script>

<template>
  <div>
    <div v-if="actionMessage" class="alert-success">
      {{ actionMessage }}
    </div>

    <div class="card-panel">
      <div class="panel-header">
        <h3>Daftar Guru & Tenaga Kependidikan ({{ teacherList.length }})</h3>
        <button @click="openTeacherModal" class="btn-primary">+ Tambah Guru</button>
      </div>

      <div v-if="isTeacherLoading" class="loading-state">Memuat data guru...</div>
      <div v-else class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nama Lengkap</th>
              <th>Jabatan</th>
              <th>Mata Pelajaran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in teacherList" :key="t.id">
              <td style="width: 60px;">
                <img :src="formatImageUrl(t.photo)" :alt="t.name" class="table-avatar" />
              </td>
              <td class="font-medium">{{ t.name }}</td>
              <td><span class="tag blue">{{ t.role }}</span></td>
              <td>{{ t.subject }}</td>
              <td>
                <div class="action-cell">
                  <button @click="openEditTeacherModal(t)" class="btn-edit">Edit</button>
                  <button @click="handleDeleteTeacher(t.id)" class="btn-delete">Hapus</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL GURU -->
    <div v-if="showTeacherModal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ editingTeacherId ? 'Edit Data Guru' : 'Tambah Guru & Tenaga Kependidikan' }}</h3>
          <button @click="showTeacherModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="handleSubmitTeacher" class="modal-body">
          <div class="form-group">
            <label>Nama Lengkap</label>
            <input v-model="teacherForm.name" type="text" placeholder="Nama beserta gelar" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <input type="text" placeholder="Nomor Induk Pegawai" required />
            </div>
            <div class="form-group">
              <label>Kategori</label>
              <select v-model="teacherForm.category">
                <option value="Pimpinan">Pimpinan</option>
                <option value="Guru Mata Pelajaran">Guru Mata Pelajaran</option>
                <option value="Bimbingan Konseling">Bimbingan Konseling</option>
                <option value="Tenaga Kependidikan">Tenaga Kependidikan</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Jabatan / Peran</label>
              <input v-model="teacherForm.role" type="text" placeholder="Guru Matematika" />
            </div>
            <div class="form-group">
              <label>Mata Pelajaran</label>
              <input v-model="teacherForm.subject" type="text" placeholder="Matematika" />
            </div>
          </div>
          <div class="form-group">
            <label>Foto Profil {{ editingTeacherId ? '(Kosongkan jika tidak diganti)' : '' }}</label>
            <input type="file" accept="image/*" @change="handleTeacherFileChange" />
            <div v-if="teacherPhotoPreview" class="preview-box">
              <img :src="teacherPhotoPreview" alt="Preview Foto" class="preview-avatar" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="showTeacherModal = false" class="btn-secondary">Batal</button>
            <button type="submit" class="btn-primary" :disabled="isSubmittingTeacher">
              {{ isSubmittingTeacher ? 'Menyimpan...' : editingTeacherId ? 'Simpan' : 'Simpan Guru' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alert-success {
  background-color: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 18px;
}
.card-panel {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.panel-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.panel-header h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}
.btn-primary {
  background-color: #0d3b66;
  color: #ffffff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.btn-primary:hover { background-color: #08213b; }
.btn-secondary {
  background-color: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.action-cell { display: flex; gap: 6px; align-items: center; }
.btn-edit {
  background: #e0f2fe;
  color: #0284c7;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}
.btn-edit:hover { background: #bae6fd; }
.btn-delete {
  background: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}
.btn-delete:hover { background: #fca5a5; }
.table-responsive { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.data-table {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
}
.data-table th {
  background-color: #f8fafc;
  padding: 12px 16px;
  font-weight: 700;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}
.data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
}
.table-avatar { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; }
.tag { padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; white-space: nowrap; }
.tag.blue { background-color: #dbeafe; color: #1d4ed8; }
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 1000;
}
.modal-card {
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}
.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header h3 { margin: 0; font-size: 15px; font-weight: 700; }
.close-btn { background: none; border: none; font-size: 22px; line-height: 1; color: #94a3b8; cursor: pointer; }
.modal-body { padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-group label { font-size: 12px; font-weight: 600; color: #334155; }
.form-group input, .form-group select, .form-group textarea {
  padding: 9px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
}
.preview-box { margin-top: 6px; }
.preview-avatar { width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 2px solid #2563eb; }
.modal-footer { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; }
.loading-state { padding: 30px; text-align: center; color: #94a3b8; font-size: 13px; }

@media (max-width: 768px) {
  .form-row { grid-template-columns: 1fr; gap: 14px; }
}
</style>