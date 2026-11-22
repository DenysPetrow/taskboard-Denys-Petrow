# Testy TaskBoard

Przed testami: baza odtworzona z `database/taskboard.sql` i `database/konta.sql`, serwer uruchomiony (`npm start` w `backend`), dane testowe: `anna.nowak` / `Test1234!`.
Kolumnę „Wynik” wypełnij po wykonaniu każdego przypadku (Zgodny / Niezgodny).

## Testy API (Postman)

| ID | Scenariusz | Kroki | Oczekiwany wynik | Wynik |
|---|---|---|---|---|
| T-01 | Lista tablic bez logowania | `GET /api/boards` bez sesji (najpierw `POST /api/auth/logout`) | 401, „Zaloguj się, aby kontynuować”|Zgodny |
| T-02 | Logowanie błędnym hasłem | `POST /api/auth/login`, hasło `zle` | 401, „Nieprawidłowy login lub hasło” |Zgodny |
| T-03 | Logowanie poprawne | `POST /api/auth/login`, `anna.nowak` / `Test1234!` | 200, odpowiedź z `id`, `login`, `firstName`, `lastName`, bez `passwordHash` | |
| T-04 | Rejestracja na zajęty login | `POST /api/auth/register` z loginem `anna.nowak` | 409, „Ten login jest już zajęty” |Zgodny |
| T-05 | Zadanie bez tytułu | `POST /api/tasks` z pustym tytułem (po zalogowaniu) | 400, komunikat o tytule | Zgodny|
| T-06 | Nieprawidłowy filtr priorytetu | `GET /api/boards/1/tasks?priority=pilne` | 400, „Nieprawidłowy priorytet” |Zgodny |
| T-07 | Zmiana zadania, którego nie ma | `PUT /api/tasks/9999` z poprawnymi danymi | 404, „Nie znaleziono zadania” |Zgodny |
| T-08 | Wylogowanie i sprawdzenie sesji | `POST /api/auth/logout`, potem `GET /api/auth/me` | 204, potem 401 |Zgodny |
| T-09 | Soft delete zadania | `DELETE /api/tasks/{id}` nowego zadania, potem w bazie `SELECT isDeleted, deletedById FROM tasks WHERE id = {id}` | 204; w bazie `isDeleted = 1` i `deletedById` równe id zalogowanej osoby |Zgodny |
| T-10 | Lista osób bez hasha | `GET /api/users` po zalogowaniu | 200, w odpowiedzi brak pola `passwordHash` |Zgodny |

## Testy interfejsu (przeglądarka)

| ID | Scenariusz | Kroki | Oczekiwany wynik | Wynik |
|---|---|---|---|---|
| U-01 | Przekierowanie bez logowania | Wyloguj się, otwórz `boards.html` | Przejście na `login.html` |Zgodny |

| U-02 | Błędne logowanie | Wpisz `anna.nowak` i złe hasło, „Zaloguj się” | Czerwony komunikat „Nieprawidłowy login lub hasło” |Zgodny |

| U-03 | Rejestracja z błędnymi danymi | Zakładka „Rejestracja”: login `x`, puste imię i nazwisko, hasło 3 znaki, różne hasła | Pola podświetlone na czerwono z komunikatami przy każdym polu |Zgodny |

| U-04 | Dodanie tablicy | „Nowa tablica”, nazwa, „Zapisz tablicę” | Karta tablicy na liście, „Utworzył(a)” z imieniem zalogowanej osoby |Zgodny |

| U-05 | Tytuł zadania za krótki | W tablicy „Dodaj zadanie”, tytuł `ab`, „Zapisz zadanie” | Komunikat „Tytuł musi mieć od 3 do 100 znaków”, zadanie nie powstaje |Zgodny |

| U-06 | Zmiana statusu przyciskiem | Przy zadaniu „Do zrobienia” kliknij „Przenieś do: W trakcie” | Zadanie w kolumnie „W trakcie”, liczniki kolumn się zmieniają |Zgodny |

| U-07 | Usuwanie z potwierdzeniem | Kliknij „Usuń” przy zadaniu, najpierw „Anuluj”, potem „OK” | Po „Anuluj” zadanie zostaje, po „OK” znika z kolumny | Zgodny|

| U-08 | Filtry | Wybierz priorytet „Wysoki”, wpisz fragment tytułu, potem „Wyczyść filtry” | Kolumny pokazują tylko pasujące zadania, po wyczyszczeniu wszystkie |Zgodny |

| U-09 | Wylogowanie | Kliknij „Wyloguj”, potem „Wstecz” w przeglądarce | Przejście na logowanie, dane tablic się nie pokazują |Zgodny |

| U-10 | Widok na telefonie | DevTools, tryb telefonu (Ctrl+Shift+M), otwórz tablicę | Kolumny i filtry jedna pod drugą, treść bez poziomego przewijania |Zgodny |
