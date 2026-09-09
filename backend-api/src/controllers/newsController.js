import prisma from '../config/prisma.js'
import fs from 'fs'
import path from 'path'

// GET /api/news (Semua Berita)
export const getAllNews = async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json({ success: true, data: news })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/news/:id (Detail Berita)
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params
    const newsItem = await prisma.news.findUnique({
      where: { id: Number(id) }
    })

    if (!newsItem) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan.' })
    }

    res.json({ success: true, data: newsItem })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST /api/news (Tambah Berita + Upload Gambar)
export const createNews = async (req, res) => {
  try {
    const { title, category, categoryColor, author, content } = req.body

    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: 'Judul, kategori, dan konten wajib diisi.'
      })
    }

    // Path gambar jika ada file diunggah
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null

    const newNews = await prisma.news.create({
      data: {
        title,
        category,
        categoryColor: categoryColor || 'blue',
        author: author || req.user.name || 'Admin',
        content,
        image: imagePath
      }
    })

    res.status(201).json({
      success: true,
      message: 'Berita berhasil diterbitkan!',
      data: newNews
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// PUT /api/news/:id (Update Berita)
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params
    const { title, category, categoryColor, author, content } = req.body

    const existingNews = await prisma.news.findUnique({
      where: { id: Number(id) }
    })

    if (!existingNews) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan.' })
    }

    let imagePath = existingNews.image
    // Jika upload gambar baru, ganti path dan hapus gambar lama
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`
      if (existingNews.image && existingNews.image.startsWith('/uploads/')) {
        const oldFilePath = path.join(process.cwd(), existingNews.image)
        if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath)
      }
    }

    const updatedNews = await prisma.news.update({
      where: { id: Number(id) },
      data: {
        title: title ?? existingNews.title,
        category: category ?? existingNews.category,
        categoryColor: categoryColor ?? existingNews.categoryColor,
        author: author ?? existingNews.author,
        content: content ?? existingNews.content,
        image: imagePath
      }
    })

    res.json({
      success: true,
      message: 'Berita berhasil diperbarui!',
      data: updatedNews
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// DELETE /api/news/:id (Hapus Berita)
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params

    const existingNews = await prisma.news.findUnique({
      where: { id: Number(id) }
    })

    if (!existingNews) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan.' })
    }

    // Hapus file fisik gambar jika ada
    if (existingNews.image && existingNews.image.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), existingNews.image)
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }

    await prisma.news.delete({
      where: { id: Number(id) }
    })

    res.json({
      success: true,
      message: 'Berita berhasil dihapus!'
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}