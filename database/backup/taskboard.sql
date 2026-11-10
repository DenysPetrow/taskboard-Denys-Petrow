-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 09, 2026 at 10:19 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taskboard`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `boards`
--

CREATE TABLE `boards` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(80) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `ownerId` int(10) UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL,
  `deletedById` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `login` varchar(30) NOT NULL,
  `passwordHash` char(60) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `boards`
--
ALTER TABLE `boards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ownerId` (`ownerId`),
  ADD KEY `deletedById` (`deletedById`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `boards`
--
ALTER TABLE `boards`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `boards`
--
ALTER TABLE `boards`
  ADD CONSTRAINT `boards_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `boards_ibfk_2` FOREIGN KEY (`deletedById`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tasks`
--

CREATE TABLE `tasks` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('todo','in_progress','done') NOT NULL DEFAULT 'todo',
  `priority` enum('low','medium','high') NOT NULL DEFAULT 'medium',
  `deadline` date DEFAULT NULL,
  `boardId` int(10) UNSIGNED NOT NULL,
  `assigneeId` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL,
  `deletedById` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `boardId` (`boardId`),
  KEY `assigneeId` (`assigneeId`),
  KEY `deletedById` (`deletedById`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`boardId`) REFERENCES `boards` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`assigneeId`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`deletedById`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dane dla tabeli `tasks` (10 zadań testowych, w tym 2 usunięte miękko)
--

INSERT INTO `tasks` (`id`, `title`, `description`, `status`, `priority`, `deadline`, `boardId`, `assigneeId`, `isDeleted`, `deletedAt`, `deletedById`) VALUES
(1, 'Konfiguracja środowiska', 'Instalacja Node.js oraz MySQL', 'done', 'high', '2026-11-05', 1, 3, 0, NULL, NULL),
(2, 'Zaprojektowanie bazy danych', 'Stworzenie diagramu ERD dla tabeli tasks', 'done', 'high', '2026-11-09', 1, 3, 0, NULL, NULL),
(3, 'Utworzenie tabeli tasks', 'Dopisanie struktury tabeli do pliku sql', 'in_progress', 'medium', '2026-11-13', 1, 2, 0, NULL, NULL),
(4, 'Przygotowanie zapytań SQL', 'Napisanie 10 wymaganych zapytań w queries.sql', 'todo', 'medium', '2026-11-13', 1, 2, 0, NULL, NULL),
(5, 'Stworzenie kopii zapasowej', 'Wykonanie backupu bazy danych za pomocą mysqldump', 'todo', 'low', '2026-11-15', 1, NULL, 0, NULL, NULL),
(6, 'Debugowanie kodu bugs.js', 'Znalezienie 5 błędów w konsoli DevTools', 'in_progress', 'high', '2026-11-12', 2, 1, 0, NULL, NULL),
(7, 'Refaktoryzacja stylów CSS', 'Poprawa responsywności głównego widoku', 'todo', 'low', '2026-11-20', 2, NULL, 0, NULL, NULL),
(8, 'Testowanie integracyjne', 'Sprawdzenie połączenia między API a bazą danych', 'todo', 'medium', '2026-11-15', 2, 3, 0, NULL, NULL),
(9, 'Stary szkic interfejsu', 'Niepotrzebny plik makiety - usunięty soft', 'todo', 'low', '2026-10-01', 1, 1, 1, '2026-10-05 14:20:00', 3),
(10, 'Błędne zadanie testowe', 'Zadanie usunięte przez admina ponad 30 dni temu', 'todo', 'medium', '2026-09-01', 1, 2, 1, '2026-09-02 10:00:00', 4);
