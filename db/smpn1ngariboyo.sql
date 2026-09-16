-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db_smpn1ngariboyo
CREATE DATABASE IF NOT EXISTS `db_smpn1ngariboyo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_smpn1ngariboyo`;

-- Dumping structure for table db_smpn1ngariboyo.achievement
CREATE TABLE IF NOT EXISTS `achievement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `medal` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `medalLabel` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `student` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `organizer` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_smpn1ngariboyo.achievement: ~0 rows (approximately)
INSERT INTO `achievement` (`id`, `title`, `category`, `level`, `year`, `medal`, `medalLabel`, `student`, `organizer`, `desc`, `createdAt`, `updatedAt`) VALUES
	(1, 'Olimpiade Matematika', 'Akademik', 'Provinsi', '2025', 'silver', 'Juara 1', 'AYU', 'Kampus Elite Global', '', '2026-09-16 09:15:11.118', '2026-09-16 09:15:11.118');

-- Dumping structure for table db_smpn1ngariboyo.agenda
CREATE TABLE IF NOT EXISTS `agenda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateDay` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateMonth` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `period` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `endDate` datetime(3) DEFAULT NULL,
  `startDate` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_smpn1ngariboyo.agenda: ~2 rows (approximately)
INSERT INTO `agenda` (`id`, `dateDay`, `dateMonth`, `title`, `period`, `desc`, `createdAt`, `endDate`, `startDate`) VALUES
	(1, '10', 'JUN', 'Asesmen Sumatif Akhir Semester Genap', '10 – 17 Juni 2026', 'Kegiatan asesmen untuk seluruh siswa kelas VII dan VIII.', '2026-09-08 10:41:16.210', NULL, NULL),
	(2, '20', 'JUN', 'Class Meeting & Porseni', '20 – 24 Juni 2026', 'Berbagai perlombaan antarkelas setelah kegiatan asesmen.', '2026-09-08 10:41:16.210', NULL, NULL),
	(3, '17 ', 'Sep', 'Promo Fore', '17 -20 September 2026', 'Kegiatan dilakukan ditempat masing masing siswa', '2026-09-16 09:16:21.722', NULL, NULL);

-- Dumping structure for table db_smpn1ngariboyo.extracurriculars
CREATE TABLE IF NOT EXISTS `extracurriculars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coach` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `schedule` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_smpn1ngariboyo.extracurriculars: ~0 rows (approximately)
INSERT INTO `extracurriculars` (`id`, `name`, `category`, `coach`, `schedule`, `description`, `image`, `createdAt`, `updatedAt`) VALUES
	(2, 'PMR', 'Kepanduan', 'aku', 'SABTU', 'Latihan', NULL, '2026-09-16 08:18:27.854', '2026-09-16 08:18:27.854');

-- Dumping structure for table db_smpn1ngariboyo.gallery
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_smpn1ngariboyo.gallery: ~0 rows (approximately)
INSERT INTO `gallery` (`id`, `title`, `category`, `date`, `image`, `desc`, `createdAt`, `updatedAt`) VALUES
	(1, 'upacara', 'Upacara', '09 September 2026', '/uploads/image-1788933641325-727174395.png', '', '2026-09-09 06:00:41.396', '2026-09-09 06:00:41.396'),
	(2, 'hardikana', 'Pembelajaran', '16 September 2026', '/uploads/image-1789546829954-522701766.png', 'seru', '2026-09-16 08:20:30.024', '2026-09-16 08:20:30.024');

-- Dumping structure for table db_smpn1ngariboyo.news
CREATE TABLE IF NOT EXISTS `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryColor` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'blue',
  `author` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_smpn1ngariboyo.news: ~5 rows (approximately)
INSERT INTO `news` (`id`, `title`, `category`, `categoryColor`, `author`, `image`, `content`, `createdAt`, `updatedAt`) VALUES
	(1, 'Semarak HUT RI ke-81, SMPN 1 Ngariboyo Gelar Beragam Lomba', 'KEGIATAN', 'blue', 'Humas SMPN 1 Ngariboyo', '/uploads/image-1789050523811-605341499.png', 'SMPN 1 NGARIBOYO – turut memeriahkan HUT kemerdekaan Republik Indonesia KE-81 dengan menggunakan berbagai perlombaan pada 19 Agustus 2026 di lingkungan sekolah. Kegiatan ini di ikuti oleh siswa siswi kelas 7-9 bersama para guru,serta di awali apel pagi dan menyanyikan lagu Indonesia Raya yang dipimpin bersama ibu Aning S.Pd dan ibu Wiwin Kegiatan tersebut bertujuan untuk meningkatkan semangat kebersamaan, sportivitas, dan rasa cinta tanah air dalam rangka memperingati kemerdekaan Indonesia.\r\n      perlombaan pertama adalah lombaakan kerupuk yang diikuti oleh perwakilan kelas 7 hingga 9. Hasil perlombaan menempatkan 9E sebagai juara 1, 8B sebagai juara 2, 8D sebagai juara 3. Sebelum perlombaan dimulai para siswajuga mengikuti panduan suara yang di laksanakan secara meriah.', '2026-09-08 10:41:16.196', '2026-09-10 14:28:43.877'),
	(2, '13 Tahun Mengabdi, Ibu Vindy Berpamitan dan Siap Mengemban Amanah Baru', 'KEGIATAN', 'green', 'Admin', '/uploads/image-1789050614986-968899989.png', 'SMPN 1 Ngariboyo – Suasana upacara di SMP Negeri 1 Ngariboyo berlangsung penuh haru ketika salah satu guru, Ibu Vindy, menyampaikan salam perpisahan kepada seluruh warga sekolah. Dalam amanat yang disampaikan pada apel pagi, beliau berpamitan karena mendapat amanah baru sebagai Kepala SMP Negeri 2 Ngariboyo setelah Surat Keputusan (SK) penugasannya resmi diterbitkan. Momen tersebut sekaligus menjadi kesempatan bagi beliau untuk menyampaikan pesan kepada para siswa dan rekan guru sebelum memulai tugas di sekolah yang baru.', '2026-09-08 10:41:16.196', '2026-09-10 14:30:15.059'),
	(3, 'SMPN 1 Ngariboyo Gelar Peringatan Maulid Nabi Muhammad SAW dengan Khidmat dan Meriah', 'KEGIATAN', 'blue', 'Admin', '/uploads/image-1789050443001-313531807.png', 'SMP Negeri 1 Ngariboyo, Dalam suasana pagi yang cerah, keluarga besar SMP Negeri 1 Ngariboyo menggelar peringatan Hari Maulid Nabi Muhammad SAW. Serangkaian kegiatan keagamaan dan edukatif ini diikuti oleh seluruh siswa, guru, serta staf sekolah dengan penuh antusias.\r\n        Acara diawali di Aula Sandya Kala dengan pelaksanaan salat dhuha berjamaah dan pembacaan salawat bersama. Suasana semakin syahdu saat grup hadroh SMPN 1 Ngariboyo tampil menyambut para hadirin, dilanjutkan dengan lantunan ayat suci Al-Qur\'an yang dibacakan secara merdu oleh ananda Berlian dari kelas IX C.\r\n', '2026-09-08 11:27:44.562', '2026-09-10 14:27:23.044'),
	(4, 'CKG : PEDULI  SEHAT, PEDULI MASA DEPAN', 'KEGIATAN', 'green', 'Admin', '/uploads/image-1789050176176-262233162.png', 'SMPN 1 Ngariboyo – Suasana di SMPN 1 Ngariboyo hari ini terasa berbeda dari biasanya. Ruang Usaha Kesehatan Sekolah (UKS) tampak dipadati oleh siswa-siswi kelas 7, 8, dan 9 yang antusias mengikuti kegiatan Cek Kesehatan Gratis (CKG).\r\n     Sebelum pelaksanaan pemeriksaan, para siswa terlebih dahulu menjalankan pembiasaan sholat Dhuha berjamaah dan dilanjutkan Kegiatan Belajar Mengajar (KBM) seperti biasa. Begitu petugas kesehatan dari Puskesmas Ngariboyo tiba, siswa berkumpul di ruang UKS secara tertib.', '2026-09-08 11:29:36.235', '2026-09-10 14:33:03.371'),
	(5, ' Perjalanan Literasi SMPN 1 Ngariboyo', 'KEGIATAN', 'blue', 'Admin', '/uploads/image-1789050028387-498525655.png', 'Ngariboyo - SMPN 1 Ngariboyo sukses menyelenggarakan kegiatan study tour budaya ke Yogyakarta pada Sabtu (9/5/2026) sebagai bagian dari program OSIS dengan pendampingan penuh pihak sekolah. Kepala SMPN 1 Ngariboyo, Bapak Surono, S.Pd., M.Pd., menegaskan bahwa field trip ini merupakan momentum penting bagi siswa untuk "menjemput ilmu" secara langsung di lapangan melalui kunjungan ke berbagai lokasi strategi edukatif. Rangkaian perjalanan meliputi kawasan Gunung Merapi sebagai sarana edukasi mitigasi bencana, Taman Pintar untuk literasi sains, Sasono Budoyo sebagai pusat pengenalan seni Jawa, hingga eksplorasi ekonomi kreatif di Malioboro. Upaya penanaman karakter ini membuahkan hasil nyata, di mana pihak pemandu dari Prima Wisata memberikan penghargaan tinggi atas kedisiplinan dan sikap kooperatif rombongan siswa yang dinilai sangat tertib selama kegiatan berlangsung.', '2026-09-08 11:29:47.489', '2026-09-10 14:20:28.527'),
	(9, 'Sambut Keluarga Baru SNESNGA, Sambutan Bunda Nanik Bakar Semangat MPLS', 'KEGIATAN', 'green', 'Admin', '/uploads/image-1789050902828-737761839.png', 'Ngariboyo - Suasana khidmat dan antusiasme tinggi menyelimuti lapangan SMP Negeri 1 Ngariboyo pada Senin pagi, 13 Juli 2026. Dalam rangka menyambut kehadiran keluarga baru, sekolah menggelar Upacara Pembukaan Masa Pengenalan Lingkungan Sekolah (MPLS) bagi calon peserta didik baru kelas VII. Kegiatan ini menjadi simbol awal perjalanan akademis sekaligus pembentukan karakter siswa di jenjang sekolah menengah pertama.\r\n    Acara resmi dibuka melalui upacara bendera dan proses pelepasan burung merpati oleh Kepala SMPN 1 Ngariboyo, Bapak Surono, M.Pd. Proses ini bukan sekadar seremonial belaka, melainkan sebuah simbol dan filosofi mendalam agar para peserta didik baru termotivasi untuk terbang tinggi mengejar seluruh mimpi dan cita-citanya seperti burung merpati.', '2026-09-10 14:35:02.871', '2026-09-16 07:17:31.315');

-- Dumping structure for table db_smpn1ngariboyo.osisprogram
CREATE TABLE IF NOT EXISTS `osisprogram` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_smpn1ngariboyo.osisprogram: ~1 rows (approximately)
INSERT INTO `osisprogram` (`id`, `title`, `desc`, `createdAt`) VALUES
	(1, 'Latihan Dasar Kepemimpinan Siswa (LDKS)', 'program pelatihan kepemimpinan yang dirancang secara khusus untuk membentuk karakter, mental, dan keterampilan organisatoris para pengurus OSIS baru. Kegiatan ini berfungsi sebagai wadah penempaan diri agar para calon pemimpin sekolah mampu menjalankan roda organisasi secara efektif, disiplin, dan penuh tanggung jawab selama satu masa bakti ke depan.', '2026-09-16 09:14:27.722');

-- Dumping structure for table db_smpn1ngariboyo.teacher
CREATE TABLE IF NOT EXISTS `teacher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nip` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Teacher_nip_key` (`nip`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_smpn1ngariboyo.teacher: ~2 rows (approximately)
INSERT INTO `teacher` (`id`, `name`, `role`, `category`, `nip`, `subject`, `photo`, `createdAt`, `updatedAt`) VALUES
	(1, ' Surono, S.Pd., M.Pd', 'Kepala Sekolah', 'Pimpinan', '196805121994031004', 'Manajemen Pendidikan', '/uploads/photo-1789537946781-906029854.png', '2026-09-08 10:41:16.226', '2026-09-16 05:52:56.022'),
	(2, 'Sri Wahyuni, S.Pd., M.Pd.', 'Wakil Kepala Sekolah Bid. Kurikulum', 'Pimpinan', '197508202000122001', 'Bahasa Indonesia', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop', '2026-09-08 10:41:16.226', '2026-09-08 10:41:16.226');

-- Dumping structure for table db_smpn1ngariboyo.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ADMIN',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_smpn1ngariboyo.user: ~0 rows (approximately)
INSERT INTO `user` (`id`, `username`, `password`, `name`, `role`, `createdAt`, `updatedAt`) VALUES
	(1, 'admin', '$2b$10$4EkhYJ7PUHyz/.3QaBARjO.RF0uWB4BP6UhUtxE3zDhWEJSmgTNdS', 'Administrator SMPN 1 Ngariboyo', 'ADMIN', '2026-09-08 10:41:16.081', '2026-09-08 10:41:16.081');

-- Dumping structure for table db_smpn1ngariboyo._prisma_migrations
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_smpn1ngariboyo._prisma_migrations: ~1 rows (approximately)
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
	('2efbf8bb-7d80-4d7a-84b5-9eace681f92b', 'c03bb91d0cc8ef5728858d6159cac7cc86d88fd611683f16c66eb3cfefa322d3', '2026-09-08 10:29:41.226', '20260908102940_init', NULL, NULL, '2026-09-08 10:29:40.989', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
