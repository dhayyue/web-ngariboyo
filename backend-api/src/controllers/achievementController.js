import prisma from '../config/prisma.js'

export const getAllAchievements = async (req, res) => {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { id: 'desc' }
    })
    res.json({ success: true, data: achievements })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const createAchievement = async (req, res) => {
  try {
    const { title, category, level, year, medal, medalLabel, student, organizer, desc } = req.body

    if (!title || !category || !student) {
      return res.status(400).json({ success: false, message: 'Judul, kategori, dan nama siswa wajib diisi.' })
    }

    const item = await prisma.achievement.create({
      data: {
        title,
        category,
        level: level || 'Kabupaten',
        year: year || '2026',
        medal: medal || 'gold',
        medalLabel: medalLabel || 'Juara 1',
        student,
        organizer: organizer || '-',
        desc: desc || ''
      }
    })

    res.status(201).json({ success: true, message: 'Prestasi berhasil dicatat!', data: item })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.achievement.delete({ where: { id: Number(id) } })
    res.json({ success: true, message: 'Prestasi berhasil dihapus!' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}