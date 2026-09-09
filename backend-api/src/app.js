import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Import router
import newsRoutes from './routes/newsRoutes.js'
import teacherRoutes from './routes/teacherRoutes.js'
import achievementRoutes from './routes/achievementRoutes.js'
import agendaRoutes from './routes/agendaRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Folder uploads statis
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Rute Default & Health Check
app.get('/', (req, res) => {
  res.send('Server Backend SMPN 1 Ngariboyo Berjalan!')
})

app.get('/api', (req, res) => {
  res.json({
    status: 'success',
    message: 'Backend API SMP Negeri 1 Ngariboyo sudah aktif 🚀'
  })
})

// Daftarkan semua router API
app.use('/api/auth', authRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/teachers', teacherRoutes)
app.use('/api/achievements', achievementRoutes)
app.use('/api/agendas', agendaRoutes)
app.use('/api/galleries', galleryRoutes)

app.listen(PORT, () => {
  console.log(`Server aktif di http://localhost:${PORT}`)
})