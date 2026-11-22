# TB-2: Baza danych i API zadań

## Część 1 (poniedziałek 2)

**Termin:** piątek 18:00, zmiany scalone do `main`.

### Plan dni

- Wtorek: tabela `tasks` i 10 zadań testowych; ćwiczenie z debuggerem `bugs.js`.
- Środa: `queries.sql` i kopia zapasowa; część 2 na Teams.

### Do zrobienia

- Tabela `tasks` w `database/taskboard.sql`, napisana samodzielnie według diagramu ERD (`materialy/erd.md`): typy, klucze obce do `boards` i `users`, dozwolone wartości `status` i `priority`, wartości domyślne.
- Skrypt odtwarza całą bazę od zera (`DROP DATABASE IF EXISTS` na początku).
- 10 zadań testowych w różnych statusach i priorytetach, w tym 1–2 usunięte miękko.
- `database/queries.sql` z 10 zapytaniami, każde z komentarzem:
    1. zadania o priorytecie `high` według terminu;
    2. zadania po terminie i niezakończone;
    3. zadanie z nazwą tablicy i loginem osoby (JOIN trzech tabel);
    4. liczba zadań w każdym statusie dla wybranej tablicy (GROUP BY);
    5. usunięte zadania z loginem osoby, która je usunęła;
    6. użytkownicy bez żadnego zadania (LEFT JOIN);
    7. zadania z tytułem zawierającym słowo (LIKE);
    8. zmiana statusu zadania (UPDATE);
    9. soft delete zadania (`isDeleted`, `deletedAt`, `deletedById`);
    10. trwałe usunięcie zadań usuniętych ponad 30 dni temu (DELETE, konto administratora).
- Aktualny backup w `database/backup/` i wynik jego sprawdzenia w README.
- Ćwiczenie z debuggerem: 5 błędów w `materialy/bugs/bugs.js` znalezionych w DevTools, każda poprawka opisana komentarzem.
- Treść tego zadania w `docs/zadania/TB-2.md`.

### Gotowe, gdy

- [ ] Skrypt odtwarza bazę bez błędów na czystym MySQL.
- [ ] Wszystkie zapytania działają i mają komentarze.
- [ ] Pull request z branchu `feature/tb-2-baza` ma zielony workflow i jest scalony przez merge commit.

## Część 2 (środa): API zadań

**Termin:** piątek 18:00, zmiany scalone do `main`.

### Plan dni

- Czwartek: API zadań i `GET /api/users`.
- Piątek: walidacja, kolekcja Postman, opis bazy w README; termin 18:00.

### Do zrobienia

- Nowy branch `feature/tb-2-api`.
- `backend/routes/tasks.js` na wzór `routes/boards.js`:
  - `GET /api/boards/:boardId/tasks` (200, 404),
  - `GET /api/tasks/:id` (200, 404),
  - `POST /api/tasks` (201, 400),
  - `PUT /api/tasks/:id` (200, 400, 404),
  - `DELETE /api/tasks/:id` – soft delete (204, 404).
- `backend/routes/users.js` z `GET /api/users` bez pola `passwordHash`.
- Walidacja: tytuł 3–100 znaków, `status` i `priority` z listy, `deadline` jako `RRRR-MM-DD` albo puste, tablica i osoba muszą istnieć.
- Kolekcja Postman w `docs/postman/` z przypadkami 400 i 404.
- Sekcja „Baza danych” w README: tabele, relacje, soft delete, jak odtworzyć bazę.
- Dopisz tę część do `docs/zadania/TB-2.md`.

### Gotowe, gdy

- [ ] Wszystkie trasy działają w Postmanie i zwracają właściwe kody.
- [ ] Usunięte zadanie znika z listy, ale zostaje w bazie z `isDeleted = 1`.
- [ ] `GET /api/users` nie zwraca `passwordHash`.
- [ ] Pull request z branchu `feature/tb-2-api` jest scalony do piątku 18:00.
