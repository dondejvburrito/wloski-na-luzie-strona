# Mini CRM: zgłoszenia z formularzy do Arkusza Google

Każde zgłoszenie z formularza (zapis na lekcję 0 albo pytanie) trafia jako nowy wiersz do Twojego arkusza, ze statusem „Nowy”. Statusy zmieniasz z listy: Nowy, Kontakt, Lekcja 0 umówiona, Po lekcji 0, Uczeń, Rezygnacja. Wiersze same zmieniają kolor.

Za darmo, bez limitu zgłoszeń, dane zostają na Twoim koncie Google.

## Instalacja (ok. 10 minut, raz)

1. Wejdź na [sheets.new](https://sheets.new) i nazwij arkusz np. „Włoski offline - zgłoszenia”.
2. W menu: **Rozszerzenia → Apps Script**.
3. Usuń to, co jest w edytorze, i wklej całą zawartość pliku `crm/apps-script.gs`.
4. (Opcjonalnie) w linijce `var POWIADOMIENIA_EMAIL = "";` wpisz swój e-mail między cudzysłowy, żeby dostawać powiadomienie o każdym zgłoszeniu.
5. Kliknij ikonę dyskietki (Zapisz). Z listy funkcji u góry wybierz **setup** i kliknij **Uruchom**. Google poprosi o uprawnienia: wybierz swoje konto → „Zaawansowane” → „Przejdź do projektu (niebezpieczne)” → Zezwól. To normalne dla własnych skryptów.
6. Kliknij **Wdróż → Nowe wdrożenie**. Typ (ikona zębatki): **Aplikacja internetowa**.
   - Wykonaj jako: **Ja**
   - Kto ma dostęp: **Każdy**
7. Kliknij **Wdróż** i skopiuj **URL aplikacji internetowej** (kończy się na `/exec`).
8. W repozytorium otwórz `assets/js/config.js` i wklej ten adres do `formEndpoint: "..."`. Zapisz (commit).
9. Wyślij próbne zgłoszenie ze strony i sprawdź, czy pojawił się wiersz w arkuszu.

**Po zmianie skryptu** trzeba zrobić **Wdróż → Zarządzaj wdrożeniami → Edytuj → Wersja: nowa wersja**, inaczej działa stara wersja.

## Alternatywa: Formspree

Jeśli wolisz gotową usługę: załóż darmowe konto na formspree.io (limit 50 zgłoszeń miesięcznie), utwórz formularz i wklej jego adres (`https://formspree.io/f/xxxx`) do `formEndpoint`. Zgłoszenia przychodzą wtedy na e-mail i są widoczne w panelu Formspree. Strona rozpozna ten adres sama.

## Ochrona danych

Arkusz zawiera dane osobowe. Nie udostępniaj go nikomu, a zgłoszenia osób, które nie zostały uczniami, usuwaj po 12 miesiącach (tak obiecuje Polityka prywatności).
