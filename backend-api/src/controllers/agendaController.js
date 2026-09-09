import prisma from '../config/prisma.js'

export const getAllAgendas = async (req, res) => {
  try {
    const agendas = await prisma.agenda.findMany({
      orderBy: { id: 'desc' }
    })
    res.json({ success: true, data: agendas })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const createAgenda = async (req, res) => {
  try {
    const { dateDay, dateMonth, title, period, desc } = req.body
    if (!dateDay || !dateMonth || !title) {
      return res.status(400).json({ success: false, message: 'Tanggal, bulan, dan judul wajib diisi.' })
    }

    const agenda = await prisma.agenda.create({
      data: {
        dateDay,
        dateMonth,
        title,
        period: period || '-',
        desc: desc || ''
      }
    })

    res.status(201).json({ success: true, message: 'Agenda berhasil ditambahkan!', data: agenda })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateAgenda = async (req, res) => {
  try {
    const { id } = req.params
    const { dateDay, dateMonth, title, period, desc } = req.body

    const updated = await prisma.agenda.update({
      where: { id: Number(id) },
      data: { dateDay, dateMonth, title, period, desc }
    })

    res.json({ success: true, message: 'Agenda berhasil diperbarui!', data: updated })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteAgenda = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.agenda.delete({ where: { id: Number(id) } })
    res.json({ success: true, message: 'Agenda berhasil dihapus!' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}