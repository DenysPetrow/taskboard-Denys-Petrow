Kody błędów HTTP (statusy odpowiedzi HTTP) to trzycyfrowe liczby wysyłane przez serwer w odpowiedzi na żądanie przeglądarki lub klienta, informujące o tym, czy operacja się powiodła, czy wystąpił problem.
Dzielą się na 5 głównych klas (pierwsza cyfra oznacza kategorię):

1xx – Informacyjne (Żądanie odebrane, trwa przetwarzanie)

• 100 Continue – serwer odebrał nagłówki żądania, klient może wysłać resztę danych.
• 101 Switching Protocols – serwer akceptuje zmianę protokołu (np. na WebSocket).

2xx – Sukces (Żądanie zostało pomyślnie odebrane, zrozumiane i zaakceptowane)

• 200 OK – standardowa odpowiedź dla poprawnych żądań (strona załadowała się prawidłowo).
• 201 Created – żądanie powiodło się i utworzono nowy zasób (np. po wysłaniu formularza rejestracji).
• 204 No Content – serwer przetworzył żądanie, ale nie zwraca żadnej treści.

3xx – Przekierowania (Wymagane podjęcie dalszych działań w celu ukończenia żądania)

• 301 Moved Permanently – zasób został trwale przeniesiony pod nowy adres URL (ważne dla SEO).
• 302 Found – tymczasowe przekierowanie na inny adres URL.
• 304 Not Modified – zasób nie zmienił się od ostatniego pobrania (przeglądarka może użyć wersji z pamięci podręcznej/cache).

4xx – Błędy klienta (Błąd po stronie użytkownika, przeglądarki lub niepoprawnego zapytania)

• 400 Bad Request – nieprawidłowa składnia zapytania, serwer nie może go zrozumieć.
• 401 Unauthorized – brak uwierzytelnienia (wymagane zalogowanie się).
• 403 Forbidden – serwer zrozumiał zapytanie, ale odmawia dostępu (brak uprawnień).
• 404 Not Found – nie znaleziono zasobu pod podanym adresem URL (najpopularniejszy błąd w sieci).
• 405 Method Not Allowed – użyto niedozwolonej metody HTTP (np. GET zamiast POST).
• 408 Request Timeout – przekroczono czas oczekiwania serwera na żądanie od klienta.
• 429 Too Many Requests – użytkownik wysłał zbyt wiele żądań w krótkim czasie (limitowanie zapytań).

5xx – Błędy serwera (Serwer nie był w stanie zrealizować poprawnego żądania)

• 500 Internal Server Error – ogólny błąd wewnętrzny serwera (np. błąd w kodzie aplikacji po stronie backendu).
• 502 Bad Gateway – serwer działający jako brama lub proxy otrzymał nieprawidłową odpowiedź od serwera nadrzędnego.
• 503 Service Unavailable – serwer jest tymczasowo niedostępny (np. z powodu przeciążenia lub prac konserwacyjnych).
• 504 Gateway Timeout – serwer bramy lub proxy nie otrzymał odpowiedzi na czas od serwera nadrzędnego.

