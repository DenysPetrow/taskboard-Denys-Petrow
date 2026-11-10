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



