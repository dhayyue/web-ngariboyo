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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_smpn1ngariboyo.achievement: ~0 rows (approximately)

-- Dumping structure for table db_smpn1ngariboyo.agenda
CREATE TABLE IF NOT EXISTS `agenda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateDay` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateMonth` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `period` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_smpn1ngariboyo.agenda: ~2 rows (approximately)
INSERT INTO `agenda` (`id`, `dateDay`, `dateMonth`, `title`, `period`, `desc`, `createdAt`, `updatedAt`) VALUES
	(1, '10', 'JUN', 'Asesmen Sumatif Akhir Semester Genap', '10 – 17 Juni 2026', 'Kegiatan asesmen untuk seluruh siswa kelas VII dan VIII.', '2026-09-08 10:41:16.210', '2026-09-08 10:41:16.210'),
	(2, '20', 'JUN', 'Class Meeting & Porseni', '20 – 24 Juni 2026', 'Berbagai perlombaan antarkelas setelah kegiatan asesmen.', '2026-09-08 10:41:16.210', '2026-09-08 10:41:16.210');

-- Dumping structure for table db_smpn1ngariboyo.gallery
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_smpn1ngariboyo.gallery: ~0 rows (approximately)
INSERT INTO `gallery` (`id`, `title`, `category`, `date`, `image`, `desc`, `createdAt`, `updatedAt`) VALUES
	(1, 'upacara', 'Upacara', '09 September 2026', '/uploads/image-1788933641325-727174395.png', '', '2026-09-09 06:00:41.396', '2026-09-09 06:00:41.396');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db_smpn1ngariboyo.news: ~7 rows (approximately)
INSERT INTO `news` (`id`, `title`, `category`, `categoryColor`, `author`, `image`, `content`, `createdAt`, `updatedAt`) VALUES
	(1, 'Upacara Peringatan Hari Lahir Pancasila', 'KEGIATAN', 'blue', 'Humas SMPN 1 Ngariboyo', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop', 'SMP Negeri 1 Ngariboyo menggelar upacara peringatan Hari Lahir Pancasila dengan khidmat di lapangan utama sekolah. Kegiatan ini diikuti oleh seluruh jajaran dewan guru, staf tata usaha, serta peserta didik dari kelas VII hingga kelas IX.', '2026-09-08 10:41:16.196', '2026-09-08 10:41:16.196'),
	(2, 'Siswa SMPN 1 Ngariboyo Raih Juara 1 Lomba Karya Tulis Ilmiah', 'PRESTASI', 'green', 'Tim Jurnalistik', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop', 'Kabar membanggakan kembali datang dari peserta didik SMP Negeri 1 Ngariboyo. Delegasi siswa berhasil menyabet Juara 1 dalam Lomba Karya Tulis Ilmiah (LKTI) tingkat pelajar se-Kabupaten Magetan.', '2026-09-08 10:41:16.196', '2026-09-08 10:41:16.196'),
	(3, 'Peringatan Hari Pramuka SMPN 1 Ngariboyo', 'KEGIATAN', 'blue', 'Admin', NULL, 'perkemahan', '2026-09-08 11:27:44.562', '2026-09-08 11:27:44.562'),
	(4, 'Peringatan Hari Pramuka SMPN 1 Ngariboyo', 'KEGIATAN', 'blue', 'Admin', NULL, 'perkemahan', '2026-09-08 11:29:36.235', '2026-09-08 11:29:36.235'),
	(5, 'Peringatan Hari Pramuka SMPN 1 Ngariboyo', 'KEGIATAN', 'blue', 'Admin', NULL, 'perkemahan', '2026-09-08 11:29:47.489', '2026-09-08 11:29:47.489'),
	(6, 'Peringatan Hari Pramuka SMPN 1 Ngariboyo', 'KEGIATAN', 'blue', 'Admin', NULL, 'perkemahan', '2026-09-08 11:30:05.495', '2026-09-08 11:30:05.495'),
	(7, 'Peringatan Hari Pramuka SMPN 1 Ngariboyo', 'KEGIATAN', 'blue', 'Admin', NULL, 'perkemahan', '2026-09-08 11:30:29.669', '2026-09-08 11:30:29.669');

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
	(1, 'Drs. Budi Santoso, M.Pd.', 'Kepala Sekolah', 'Pimpinan', '196805121994031004', 'Manajemen Pendidikan', '/profile.png', '2026-09-08 10:41:16.226', '2026-09-08 10:41:16.226'),
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
