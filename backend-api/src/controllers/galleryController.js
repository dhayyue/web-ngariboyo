import prisma from '../config/prisma.js'
import fs from 'fs'
import path from 'path'

// GET: Ambil semua galeri
export const getAllGalleries = async (req, res) => {
  try {
    const galleries = await prisma.gallery.findMany({
      orderBy: { id: 'desc' }
    })
    res.json({ success: true, data: galleries })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST: Tambah foto galeri baru
export const createGallery = async (req, res) => {
  try {
    const { title, category, desc, date } = req.body
    const image = req.file ? `/uploads/${req.file.filename}` : null

    if (!title) {
      return res.status(400).json({ success: false, message: 'Judul dokumentasi wajib diisi!' })
    }

    // Buat format tanggal default jika tidak diisi form (Contoh: "09 September 2026")
    const defaultDate = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })

    const newGallery = await prisma.gallery.create({
      data: {
        title,
        category: category || 'Upacara',
        desc: desc || '',
        date: date || defaultDate, // Mengisi kolom date agar Prisma tidak komplain
        image
      }
    })

    res.status(201).json({
      success: true,
      message: 'Foto berhasil ditambahkan ke galeri',
      data: newGallery
    })
  } catch (error) {
    console.error('Error Prisma Gallery:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// PUT: Perbarui data galeri
export const updateGallery = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { title, category, desc } = req.body

    const existing = await prisma.gallery.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Data galeri tidak ditemukan' })
    }

    let image = existing.image
    if (req.file) {
      // Hapus file lama jika diganti
      if (existing.image) {
        const oldPath = path.join(process.cwd(), existing.image.replace(/^\//, ''))
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath)
        }
      }
      image = `/uploads/${req.file.filename}`
    }

    const updated = await prisma.gallery.update({
      where: { id },
      data: {
        title,
        category,
        desc: desc || '',
        image
      }
    })

    res.json({
      success: true,
      message: 'Data galeri berhasil diperbarui',
      data: updated
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// DELETE: Hapus galeri
export const deleteGallery = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const existing = await prisma.gallery.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Data galeri tidak ditemukan' })
    }

    // Hapus file fisik gambar jika ada
    if (existing.image) {
      const filePath = path.join(process.cwd(), existing.image.replace(/^\//, ''))
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }

    await prisma.gallery.delete({ where: { id } })

    res.json({ success: true, message: 'Foto galeri berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}