import prisma from '../config/prisma.js'
import fs from 'fs'
import path from 'path'

// GET /api/teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany({
      orderBy: { id: 'asc' }
    })
    res.json({ success: true, data: teachers })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/teachers/:id
export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params
    const teacher = await prisma.teacher.findUnique({
      where: { id: Number(id) }
    })
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Data guru tidak ditemukan' })
    }
    res.json({ success: true, data: teacher })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST /api/teachers
export const createTeacher = async (req, res) => {
  try {
    const { name, role, category, nip, subject } = req.body

    if (!name || !nip || !category) {
      return res.status(400).json({ success: false, message: 'Nama, NIP, dan kategori wajib diisi.' })
    }

    const photoPath = req.file ? `/uploads/${req.file.filename}` : null

    const teacher = await prisma.teacher.create({
      data: {
        name,
        role: role || 'Guru Mata Pelajaran',
        category,
        nip,
        subject: subject || '-',
        photo: photoPath
      }
    })

    res.status(201).json({ success: true, message: 'Data guru berhasil ditambahkan!', data: teacher })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// PUT /api/teachers/:id
export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params
    const { name, role, category, nip, subject } = req.body

    const existing = await prisma.teacher.findUnique({ where: { id: Number(id) } })
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Data guru tidak ditemukan.' })
    }

    let photoPath = existing.photo
    if (req.file) {
      photoPath = `/uploads/${req.file.filename}`
      if (existing.photo && existing.photo.startsWith('/uploads/')) {
        const oldPath = path.join(process.cwd(), existing.photo)
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      }
    }

    const updated = await prisma.teacher.update({
      where: { id: Number(id) },
      data: {
        name: name ?? existing.name,
        role: role ?? existing.role,
        category: category ?? existing.category,
        nip: nip ?? existing.nip,
        subject: subject ?? existing.subject,
        photo: photoPath
      }
    })

    res.json({ success: true, message: 'Data guru berhasil diperbarui!', data: updated })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// DELETE /api/teachers/:id
export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params
    const existing = await prisma.teacher.findUnique({ where: { id: Number(id) } })
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Data guru tidak ditemukan.' })
    }

    if (existing.photo && existing.photo.startsWith('/uploads/')) {
      const oldPath = path.join(process.cwd(), existing.photo)
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
    }

    await prisma.teacher.delete({ where: { id: Number(id) } })
    res.json({ success: true, message: 'Data guru berhasil dihapus!' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}