<script setup>
import { ref, onMounted } from 'vue'
import { getToken } from '@/services/auth.js'
import { getGalleries, formatImageUrl } from '@/services/api.js'

const galleryList = ref([])
const isGalleryLoading = ref(false)
const isSubmittingGallery = ref(false)
const showGalleryModal = ref(false)
const editingGalleryId = ref(null)
const galleryImageFile = ref(null)
const galleryImagePreview = ref(null)
const actionMessage = ref('')

const galleryForm = ref({
  title: '',
  category: 'Upacara',
  desc: ''
})

const fetchGalleryData = async () => {
  try {
    isGalleryLoading.value = true
    const res = await getGalleries()
    galleryList.value = Array.isArray(res) ? res : (res?.data || [])
  } catch (err) {
    console.error('Gagal memuat galeri di dashboard:', err)
  } finally {
    isGalleryLoading.value = false
  }
}

const handleGalleryFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    galleryImageFile.value = file
    galleryImagePreview.value = URL.createObjectURL(file)
  }
}

const openGalleryModal = () => {
  editingGalleryId.value = null
  galleryForm.value = {
    title: '',
    category: 'Upacara',
    desc: ''
  }
  galleryImageFile.value = null
  galleryImagePreview.value = null
  showGalleryModal.value = true
}

const openEditGalleryModal = (item) => {
  editingGalleryId.value = item.id
  galleryForm.value = {
    title: item.title,
    category: item.category,
    desc: item.desc || ''
  }
  galleryImageFile.value = null
  galleryImagePreview.value = item.image ? formatImageUrl(item.image) : null
  showGalleryModal.value = true
}

const handleSubmitGallery = async () => {
  if (!galleryForm.value.title) {
    alert('Judul dokumentasi wajib diisi!')
    return
  }

  try {
    isSubmittingGallery.value = true
    const token = getToken()
    const formData = new FormData()
    formData.append('title', galleryForm.value.title)
    formData.append('category', galleryForm.value.category)
    formData.append('desc', galleryForm.value.desc)
    if (galleryImageFile.value) {
      formData.append('image', galleryImageFile.value)
    }

    const isEdit = !!editingGalleryId.value
    const url = isEdit
      ? `http://localhost:5000/api/galleries/${editingGalleryId.value}`
      : 'http://localhost:5000/api/galleries'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })

    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menyimpan foto galeri')

    actionMessage.value = isEdit ? 'Foto galeri berhasil diperbarui!' : 'Foto berhasil diunggah ke galeri!'
    setTimeout(() => (actionMessage.value = ''), 3000)
    showGalleryModal.value = false
    fetchGalleryData()
  } catch (err) {
    alert(err.message)
  } finally {
    isSubmittingGallery.value = false
  }
}

const handleDeleteGallery = async (id) => {
  if (!confirm('Yakin ingin menghapus foto kegiatan ini?')) return
  try {
    const token = getToken()
    const res = await fetch(`http://localhost:5000/api/galleries/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message || 'Gagal menghapus foto')

    actionMessage.value = 'Foto berhasil dihapus dari galeri!'
    setTimeout(() => (actionMessage.value = ''), 3000)
    fetchGalleryData()
  } catch (err) {
    alert(err.message)
  }
}

onMounted(() => {
  fetchGalleryData()
})
</script>

<template>
  <div>
    <div v-if="actionMessage" class="alert-success">
      {{ actionMessage }}
    </div>

    <div class="card-panel">
      <div class="panel-header">
        <h3>Dokumentasi Kegiatan ({{ galleryList.length }})</h3>
        <button @click="openGalleryModal" class="btn-primary">+ Unggah Foto</button>
      </div>

      <div v-if="isGalleryLoading" class="loading-state">Memuat foto galeri...</div>
      <div v-else class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Judul Kegiatan</th>
              <th>Kategori</th>
              <th>Keterangan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in galleryList" :key="g.id">
              <td style="width: 70px;">
                <img :src="formatImageUrl(g.image)" :alt="g.title" class="table-thumb" />
              </td>
              <td class="font-medium">{{ g.title }}</td>
              <td><span class="tag blue">{{ g.category }}</span></td>
              <td>{{ g.desc }}</td>
              <td>
                <div class="action-cell">
                  <button @click="openEditGalleryModal(g)" class="btn-edit">Edit</button>
                  <button @click="handleDeleteGallery(g.id)" class="btn-delete">Hapus</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL GALERI -->
    <div v-if="showGalleryModal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ editingGalleryId ? 'Edit Dokumentasi Foto' : 'Unggah Foto Dokumentasi' }}</h3>
          <button @click="showGalleryModal = false" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="handleSubmitGallery" class="modal-body">
          <div class="form-group">
            <label>Judul Kegiatan / Momen</label>
            <input v-model="galleryForm.title" type="text" placeholder="Contoh: Upacara Hardiknas" required />
          </div>
          <div class="form-group">
            <label>Kategori</label>
            <select v-model="galleryForm.category">
              <option value="Upacara">Upacara</option>
              <option value="Pembelajaran">Pembelajaran</option>
              <option value="Ekstrakurikuler">Ekstrakurikuler</option>
              <option value="Lomba & Seni">Lomba & Seni</option>
            </select>
          </div>
          <div class="form-group">
            <label>Pilih File Foto {{ editingGalleryId ? '(Kosongkan jika tidak diganti)' : '' }}</label>
            <input type="file" accept="image/*" @change="handleGalleryFileChange" />
            <div v-if="galleryImagePreview" class="preview-box">
              <img :src="galleryImagePreview" alt="Preview Foto" class="preview-img" />
            </div>
          </div>
          <div class="form-group">
            <label>Deskripsi Singkat</label>
            <textarea v-model="galleryForm.desc" rows="3" placeholder="Ceritakan momen di balik foto ini..."></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="showGalleryModal = false" class="btn-secondary">Batal</button>
            <button type="submit" class="btn-primary" :disabled="isSubmittingGallery">
              {{ isSubmittingGallery ? 'Menyimpan...' : editingGalleryId ? 'Simpan Perubahan' : 'Unggah Foto' }}
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
.table-thumb { width: 50px; height: 38px; object-fit: cover; border-radius: 6px; }
.tag { padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; white-space: nowrap; }
.tag.blue { background-color: #dbeafe; color: #1d4ed8; }
.modal-overlay { position: fixed; inset: 0; background-color: rgba(15, 23, 42, 0.6); display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 1000; }
.modal-card { background: #ffffff; border-radius: 12px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2); }
.modal-header { padding: 16px 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.modal-header h3 { margin: 0; font-size: 15px; font-weight: 700; }
.close-btn { background: none; border: none; font-size: 22px; line-height: 1; color: #94a3b8; cursor: pointer; }
.modal-body { padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group label { font-size: 12px; font-weight: 600; color: #334155; }
.form-group input, .form-group select, .form-group textarea { padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; outline: none; font-family: inherit; width: 100%; box-sizing: border-box; }
.preview-box { margin-top: 6px; }
.preview-img { width: 100%; height: 140px; object-fit: cover; border-radius: 6px; border: 1px solid #e2e8f0; }
.modal-footer { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; }
.loading-state { padding: 30px; text-align: center; color: #94a3b8; font-size: 13px; }
</style>