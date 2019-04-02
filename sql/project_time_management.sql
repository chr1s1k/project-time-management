-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2019 at 01:51 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_time_management`
--
CREATE DATABASE IF NOT EXISTS `project_time_management` DEFAULT CHARACTER SET utf8 COLLATE utf8_czech_ci;
USE `project_time_management`;

-- --------------------------------------------------------

--
-- Table structure for table `assigned_projects`
--

DROP TABLE IF EXISTS `assigned_projects`;
CREATE TABLE `assigned_projects` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `assigned_projects`
--

INSERT INTO `assigned_projects` (`id`, `project_id`, `user_id`) VALUES
(1, 1, 1),
(4, 7, 1),
(5, 8, 1),
(6, 9, 1),
(7, 10, 1),
(8, 11, 1),
(9, 12, 1),
(10, 13, 1),
(11, 14, 1),
(12, 15, 1),
(13, 16, 1),
(14, 17, 1),
(15, 18, 1),
(16, 19, 1),
(17, 20, 1),
(18, 21, 1),
(19, 22, 1),
(20, 23, 1),
(21, 24, 1),
(22, 25, 1),
(23, 26, 1),
(24, 27, 1),
(25, 28, 1),
(26, 29, 1),
(27, 30, 1),
(28, 31, 1),
(29, 34, 1),
(30, 35, 1);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `created` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `finished` tinyint(1) NOT NULL DEFAULT '0',
  `finishedBy` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `created`, `createdBy`, `finished`, `finishedBy`) VALUES
(1, 'Testovací projekt', '1549751430', 2, 0, NULL),
(13, 'Janička je boží!', '1549817639', 1, 0, NULL),
(12, 'Další projekt', '1549817442', 1, 0, NULL),
(11, 'Plaza Construction', '1549817328', 1, 1, 2),
(14, 'Koupit Janičce nové šaty!', '1549817654', 1, 0, NULL),
(21, 'Bla', '1553532316', 1, 0, NULL),
(24, 'Test 18', '1553532468', 1, 0, NULL),
(32, 'Vykoupat hydru', '1553808760', 1, 0, NULL),
(35, 'Copánky', '1553815795', 1, 0, NULL),
(33, 'Vykoupat hydru', '1553808771', 1, 0, NULL),
(34, 'Vykoupat hydru', '1553808808', 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `timesheets`
--

DROP TABLE IF EXISTS `timesheets`;
CREATE TABLE `timesheets` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hours` float NOT NULL,
  `date` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `note` text COLLATE utf8_czech_ci,
  `created` varchar(255) COLLATE utf8_czech_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `timesheets`
--

INSERT INTO `timesheets` (`id`, `project_id`, `user_id`, `hours`, `date`, `note`, `created`) VALUES
(3, 12, 1, 2, '2019-03-28', 'test poznámky', '1553794751'),
(2, 13, 1, 5, '2019-03-28', NULL, '1553794386'),
(4, 14, 1, 8, '2019-03-28', NULL, '1553794892'),
(5, 1, 1, 3, '2019-03-26', NULL, '1553795087'),
(6, 1, 1, 6, '2019-03-28', 'Ale moc se mi nechtělo NE!', '1553795137'),
(7, 14, 1, 4, '2019-03-28', NULL, '1553795210'),
(8, 12, 1, 1, '2019-03-28', NULL, '1553795377'),
(9, 12, 1, 1, '2019-03-28', 'To nechceš!', '1553795477'),
(10, 12, 1, 2, '2019-03-28', NULL, '1553795533'),
(11, 13, 1, 3, '2019-03-28', NULL, '1553795544'),
(12, 1, 1, 12, '2019-02-14', NULL, '1553795599'),
(13, 13, 1, 6, '2019-03-28', NULL, '1553795740'),
(14, 15, 1, 3, '2019-03-28', NULL, '1553795854'),
(15, 15, 1, 1, '2019-03-28', NULL, '1553795903'),
(16, 13, 1, 2, '2019-03-28', NULL, '1553795933'),
(17, 13, 1, 1, '2019-03-28', 'Tak teď už snad konečně.', '1553795973'),
(18, 13, 1, 1, '2019-03-25', NULL, '1553795983'),
(19, 1, 1, 5, '2019-03-27', NULL, '1553796005'),
(23, 1, 1, 3.5, '2019-03-28', NULL, '1553796256'),
(22, 14, 1, 0.05, '2019-03-28', NULL, '1553796235'),
(24, 14, 1, 0.054, '2019-03-28', NULL, '1553796272'),
(25, 14, 1, 3.5, '2019-03-28', NULL, '1553798692'),
(26, 19, 1, 0.5, '2019-03-28', 'Bylo to kurva těžký!', '1553808837'),
(27, 34, 1, 3, '2019-03-28', 'Hydra je mega líná!', '1553808986'),
(28, 34, 1, 6, '2019-03-28', NULL, '1553810668'),
(29, 34, 1, 1, '2019-03-28', NULL, '1553810765'),
(30, 34, 1, 2, '2019-03-29', 'Test poznámky', '1553815767'),
(31, 35, 1, 1, '2019-03-29', 'Od mého krásného tulipánka :-*', '1553815812');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `lastName` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `password` varchar(2048) COLLATE utf8_czech_ci DEFAULT NULL,
  `role` enum('worker','administrator') COLLATE utf8_czech_ci DEFAULT 'worker'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `password`, `role`) VALUES
(1, 'Radek', 'Sukup', 'test', '$2y$10$m51hDBjUEua6aTz3rkEdn.FBSBFAudwI7zpFlCWeIYxA0MsU4OTCa', 'worker'),
(2, 'Jaroslav', 'Vomáčka', 'manager', '$2y$10$m51hDBjUEua6aTz3rkEdn.FBSBFAudwI7zpFlCWeIYxA0MsU4OTCa', 'administrator');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assigned_projects`
--
ALTER TABLE `assigned_projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timesheets`
--
ALTER TABLE `timesheets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assigned_projects`
--
ALTER TABLE `assigned_projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `timesheets`
--
ALTER TABLE `timesheets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
