<script setup>
import { ref, onMounted } from 'vue'
import { getAdminUser, getToken } from '@/services/auth.js'
import { API_BASE_URL, getNews, formatImageUrl } from '@/services/api.js'
import { showAlert, showConfirm } from '@/utils/swal.js'

const admin = ref(getAdminUser() || { name: 'Administrator' })
const newsList = ref([])
const isNewsLoading = ref(false)
const isSubmittingNews = ref(false)
const showNewsModal = ref(false)
const editingNewsId = ref(null)
const newsImageFile = ref(null)
const newsImagePreview = ref(null)
const actionMessage = ref('')

const newsForm = ref({
  title: '',
  category: 'KEGIATAN',
  categoryColor: 'blue',
  author: admin.value.name || 'Admin',
  content: ''
})

const fetchNewsData = async () => {
  try {
    isNewsLoading.value = true
    newsList.value = await getNews()
  } catch (err) {
    console.error(err)
  } finally {
    isNewsLoading.value = false
  }
}

const handleNewsFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    newsImageFile.value = file
    newsImagePreview.value = URL.createObjectURL(file)
  }
}

const openNewsModal = () => {
  editingNewsId.value = null
  newsForm.value = {
    title: '',
    category: 'KEGIATAN',
    categoryColor: 'blue',
    author: admin.value.name || 'Admin',
    content: ''
  }
  newsImageFile.value = null
  newsImagePreview.value = null
  showNewsModal.value = true
}

const openEditNewsModal = (item) => {
  editingNewsId.value = item.id
  newsForm.value = {
    title: item.title,
    category: item.category,
    categoryColor: item.categoryColor || 'blue',
    author: item.author,
    content: item.content
  }
  newsImageFile.value = null
  newsImagePreview.value = item.image ? formatImageUrl(item.image) : null
  showNewsModal.value = true
}

const handleSubmitNews = async () => {
  if (!newsForm.value.title || !newsForm.value.content) {
    await showAlert({
      icon: 'warning',
      title: 'Perhatian',
      text: 'Judul dan konten berita wajib diisi!'
    })
    return
  }

  try {
    isSubmittingNews.value = true
    const token = getToken()
    const formData = new FormData()
    formData.append('title', newsForm.value.title)
    formData.append('category', newsForm.value.category)
    formData.append('categoryColor', newsForm.value.categoryColor)
    formData.append('author', newsForm.value.author)
    formData.append('content', newsForm.value.content)
    if (newsImageFile.value) {
      formData.append('image', newsImageFile.value)
    }

    const isEdit = !!editingNewsId.value
    const url = isEdit
      ? `${API_BASE_URL}/news/${editingNewsId.value}`
      : `${API_BASE_URL}/news`
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })

    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menyimpan berita')

    actionMessage.value = isEdit ? 'Berita berhasil diperbarui!' : 'Berita berhasil diterbitkan!'
    await showAlert({
      icon: 'success',
      title: 'Berhasil',
      text: actionMessage.value
    })
    setTimeout(() => (actionMessage.value = ''), 3000)
    showNewsModal.value = false
    fetchNewsData()
  } catch (err) {
    await showAlert({
      icon: 'error',
      title: 'Gagal',
      text: err.message
    })
  } finally {
    isSubmittingNews.value = false
  }
}

const handleDeleteNews = async (id) => {
  const confirmed = await showConfirm('Hapus berita?', 'Yakin ingin menghapus berita ini?')
  if (!confirmed) return
  try {
    const token = getToken()
    const res = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menghapus berita')

    actionMessage.value = 'Berita berhasil dihapus!'
    await showAlert({
      icon: 'success',
      title: 'Berhasil',
      text: actionMessage.value
    })
    setTimeout(() => (actionMessage.value = ''), 3000)
    fetchNewsData()
  } catch (err) {
    await showAlert({
      icon: 'error',
      title: 'Gagal',
      text: err.message
    })
  }
}

onMounted(() => {
  fetchNewsData()
})
</script>

<template>
  <div>
    <div v-if="actionMessage" class="alert-success">
      {{ actionMessage }}
    </div>

    <div class="card-panel">
      <div class="panel-header">
        <h3>Daftar Berita ({{ newsList.length }})</h3>
        <button @click="openNewsModal" class="btn-primary">+ Tambah Berita</button>
      </div>

      <div v-if="isNewsLoading" class="loading-state">Memuat data tabel...</div>
      <div v-else class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Judul</th>
              <th>Kategori</th>
              <th>Penulis</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in newsList" :key="item.id">
              <td style="width: 70px;">
                <img :src="formatImageUrl(item.image)" :alt="item.title" class="table-thumb" />
              </td>
              <td class="font-medium">{{ item.title }}</td>
              <td>
                <span class="tag" :class="item.categoryColor || 'blue'">{{ item.category }}</span>
              </td>
              <td>{{ item.author }}</td>
              <td>
                <div class="action-cell">
                  <button @click="openEditNewsModal(item)" class="btn-edit">Edit</button>
                  <button @click="handleDeleteNews(item.id)" class="btn-delete">Hapus</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL BERITA -->
    <div v-if="showNewsModal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ editingNewsId ? 'Edit Berita' : 'Tambah Berita Baru' }}</h3>
          <button @click="showNewsModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="handleSubmitNews" class="modal-body">
          <div class="form-group">
            <label>Judul Berita</label>
            <input v-model="newsForm.title" type="text" placeholder="Judul artikel" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Kategori</label>
              <select v-model="newsForm.category">
                <option value="KEGIATAN">KEGIATAN</option>
                <option value="PRESTASI">PRESTASI</option>
                <option value="PENGUMUMAN">PENGUMUMAN</option>
              </select>
            </div>
            <div class="form-group">
              <label>Warna Badge</label>
              <select v-model="newsForm.categoryColor">
                <option value="blue">Biru</option>
                <option value="green">Hijau</option>
                <option value="orange">Oranye</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Penulis</label>
            <input v-model="newsForm.author" type="text" />
          </div>
          <div class="form-group">
            <label>Unggah Gambar Cover {{ editingNewsId ? '(Kosongkan jika tidak diganti)' : '' }}</label>
            <input type="file" accept="image/*" @change="handleNewsFileChange" />
            <div v-if="newsImagePreview" class="preview-box">
              <img :src="newsImagePreview" alt="Preview" class="preview-img" />
            </div>
          </div>
          <div class="form-group">
            <label>Konten</label>
            <textarea v-model="newsForm.content" rows="4" required></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="showNewsModal = false" class="btn-secondary">Batal</button>
            <button type="submit" class="btn-primary" :disabled="isSubmittingNews">
              {{ isSubmittingNews ? 'Menyimpan...' : editingNewsId ? 'Simpan' : 'Terbitkan' }}
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
.table-thumb { width: 50px; height: 38px; object-fit: cover; border-radius: 6px; }
.tag { padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; white-space: nowrap; }
.tag.blue { background-color: #dbeafe; color: #1d4ed8; }
.tag.green { background-color: #d1fae5; color: #059669; }
.tag.orange { background-color: #ffedd5; color: #ea580c; }
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
.preview-img { width: 100%; height: 140px; object-fit: cover; border-radius: 6px; border: 1px solid #e2e8f0; }
.modal-footer { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; }
.loading-state { padding: 30px; text-align: center; color: #94a3b8; font-size: 13px; }

@media (max-width: 768px) {
  .form-row { grid-template-columns: 1fr; gap: 14px; }
}
</style>