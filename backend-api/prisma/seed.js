import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Menjalankan seeder data...')

  // 1. Akun Admin Default
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'Administrator SMPN 1 Ngariboyo',
      role: 'ADMIN'
    }
  })

  // 2. Berita Awal
  await prisma.news.createMany({
    data: [
      {
        title: 'Upacara Peringatan Hari Lahir Pancasila',
        category: 'KEGIATAN',
        categoryColor: 'blue',
        author: 'Humas SMPN 1 Ngariboyo',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop',
        content: 'SMP Negeri 1 Ngariboyo menggelar upacara peringatan Hari Lahir Pancasila dengan khidmat di lapangan utama sekolah. Kegiatan ini diikuti oleh seluruh jajaran dewan guru, staf tata usaha, serta peserta didik dari kelas VII hingga kelas IX.'
      },
      {
        title: 'Siswa SMPN 1 Ngariboyo Raih Juara 1 Lomba Karya Tulis Ilmiah',
        category: 'PRESTASI',
        categoryColor: 'green',
        author: 'Tim Jurnalistik',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop',
        content: 'Kabar membanggakan kembali datang dari peserta didik SMP Negeri 1 Ngariboyo. Delegasi siswa berhasil menyabet Juara 1 dalam Lomba Karya Tulis Ilmiah (LKTI) tingkat pelajar se-Kabupaten Magetan.'
      }
    ]
  })

  // 3. Agenda Awal
  await prisma.agenda.createMany({
    data: [
      {
        dateDay: '10',
        dateMonth: 'JUN',
        title: 'Asesmen Sumatif Akhir Semester Genap',
        period: '10 – 17 Juni 2026',
        desc: 'Kegiatan asesmen untuk seluruh siswa kelas VII dan VIII.'
      },
      {
        dateDay: '20',
        dateMonth: 'JUN',
        title: 'Class Meeting & Porseni',
        period: '20 – 24 Juni 2026',
        desc: 'Berbagai perlombaan antarkelas setelah kegiatan asesmen.'
      }
    ]
  })

  // 4. Guru Awal
  await prisma.teacher.createMany({
    data: [
      {
        name: 'Drs. Budi Santoso, M.Pd.',
        role: 'Kepala Sekolah',
        category: 'Pimpinan',
        nip: '196805121994031004',
        subject: 'Manajemen Pendidikan',
        photo: '/profile.png'
      },
      {
        name: 'Sri Wahyuni, S.Pd., M.Pd.',
        role: 'Wakil Kepala Sekolah Bid. Kurikulum',
        category: 'Pimpinan',
        nip: '197508202000122001',
        subject: 'Bahasa Indonesia',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
      }
    ]
  })

  console.log('Seeder selesai dijalankan! Data awal berhasil dimasukkan.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })