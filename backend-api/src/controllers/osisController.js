import prisma from '../config/prisma.js'

// GET semua program kerja OSIS
export const getAllOsisPrograms = async (req, res) => {
  try {
    const data = await prisma.osisProgram.findMany({
      orderBy: { id: 'asc' }
    })
    res.json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST program kerja baru
export const createOsisProgram = async (req, res) => {
  try {
    const { title, desc } = req.body
    if (!title || !desc) {
      return res.status(400).json({ success: false, message: 'Judul dan deskripsi program kerja wajib diisi!' })
    }

    const newProg = await prisma.osisProgram.create({
      data: { title, desc }
    })
    res.status(201).json({ success: true, message: 'Program OSIS berhasil ditambahkan', data: newProg })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// PUT edit program kerja
export const updateOsisProgram = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { title, desc } = req.body

    const existing = await prisma.osisProgram.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Data program kerja tidak ditemukan' })
    }

    const updated = await prisma.osisProgram.update({
      where: { id },
      data: { title, desc }
    })
    res.json({ success: true, message: 'Program OSIS berhasil diperbarui', data: updated })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// DELETE hapus program kerja
export const deleteOsisProgram = async (req, res) => {
  try {
    const id = Number(req.params.id)
    await prisma.osisProgram.delete({ where: { id } })
    res.json({ success: true, message: 'Program OSIS berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}