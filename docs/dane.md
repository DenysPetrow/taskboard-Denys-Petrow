# Dane aplikacji TaskBoard

Opis zgodny ze schematem bazy `taskboard` (`database/taskboard.sql`). Nazwy pól są w camelCase, tabele małymi literami.

## Tabela `users`

| Pole | Typ | Opis |
|---|---|---|
| `id` | INT UNSIGNED, PK, AUTO_INCREMENT | Identyfikator osoby |
| `login` | VARCHAR(30), UNIQUE | Login (3–30 znaków: litery, cyfry, kropka, myślnik, podkreślnik) |
| `passwordHash` | CHAR(60) | Hash hasła (bcrypt), nigdy jawne hasło |
| `firstName`, `lastName` | VARCHAR(50) | Imię i nazwisko |
| `createdAt` | DATETIME | Data utworzenia konta |

## Tabela `boards`

| Pole | Typ | Opis |
|---|---|---|
| `id` | INT UNSIGNED, PK | Identyfikator tablicy |
| `name` | VARCHAR(80) | Nazwa (1–80 znaków) |
| `description` | VARCHAR(255), NULL | Opis |
| `ownerId` | INT UNSIGNED, FK → `users.id` | Kto utworzył tablicę |
| `createdAt` | DATETIME | Data utworzenia |
| `isDeleted`, `deletedAt`, `deletedById` | TINYINT(1), DATETIME, FK → `users.id` | Soft delete |

## Tabela `tasks`

| Pole | Typ | Opis |
|---|---|---|
| `id` | INT UNSIGNED, PK | Identyfikator zadania |
| `title` | VARCHAR(100) | Tytuł (3–100 znaków) |
| `description` | TEXT, NULL | Opis |
| `status` | ENUM('todo','in_progress','done') | Status, domyślnie `todo` |
| `priority` | ENUM('low','medium','high') | Priorytet, domyślnie `medium` |
| `deadline` | DATE, NULL | Termin w formacie RRRR-MM-DD |
| `boardId` | INT UNSIGNED, FK → `boards.id` | Tablica zadania (`ON DELETE CASCADE`) |
| `assigneeId` | INT UNSIGNED, FK → `users.id`, NULL | Osoba odpowiedzialna (`ON DELETE SET NULL`) |
| `createdAt` | DATETIME | Data utworzenia |
| `isDeleted`, `deletedAt`, `deletedById` | TINYINT(1), DATETIME, FK → `users.id` | Soft delete |

## Wartości dozwolone

| Pole | Wartości w bazie i API | Etykieta w interfejsie |
|---|---|---|
| `status` | `todo`, `in_progress`, `done` | Do zrobienia, W trakcie, Gotowe |
| `priority` | `low`, `medium`, `high` | Niski, Średni, Wysoki |

## Soft delete

Usunięcie tablicy lub zadania ustawia razem `isDeleted = 1`, `deletedAt = NOW()` i `deletedById` (id osoby z sesji). Rekord zostaje w bazie, a aplikacja pokazuje tylko wiersze z `isDeleted = 0`.
