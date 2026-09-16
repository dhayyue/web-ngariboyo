import prisma from '../config/prisma.js'

// GET: Ambil semua data ekstrakurikuler
export const getAllExtracurriculars = async (req, res) => {
  try {
    const data = await prisma.extracurricular.findMany({
      orderBy: { id: 'asc' }
    })
    res.json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST: Tambah eskul baru
export const createExtracurricular = async (req, res) => {
  try {
    const { name, category, coach, schedule, description } = req.body

    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'Nama dan kategori eskul wajib diisi!' })
    }

    const newEskul = await prisma.extracurricular.create({
      data: {
        name,
        category,
        coach: coach || '-',
        schedule: schedule || '-',
        description: description || ''
      }
    })

    res.status(201).json({
      success: true,
      message: 'Ekstrakurikuler berhasil ditambahkan',
      data: newEskul
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// PUT: Perbarui eskul
export const updateExtracurricular = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { name, category, coach, schedule, description } = req.body

    const existing = await prisma.extracurricular.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Data eskul tidak ditemukan' })
    }

    const updated = await prisma.extracurricular.update({
      where: { id },
      data: {
        name,
        category,
        coach: coach || '-',
        schedule: schedule || '-',
        description: description || ''
      }
    })

    res.json({ success: true, message: 'Data eskul berhasil diperbarui', data: updated })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// DELETE: Hapus eskul
export const deleteExtracurricular = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const existing = await prisma.extracurricular.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Data eskul tidak ditemukan' })
    }

    await prisma.extracurricular.delete({ where: { id } })
    res.json({ success: true, message: 'Ekstrakurikuler berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}