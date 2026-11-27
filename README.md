# Włoski na luzie · strona zapisów na kurs „Włoski offline”

Prosta, statyczna strona (HTML, CSS, JavaScript bez bibliotek) do zapisów na bezpłatną lekcję 0 i pytań o kurs. Działa za darmo na GitHub Pages.

- `index.html` - strona główna (hero, dla kogo, jak to działa, materiały, cena, o mnie, FAQ, formularze)
- `regulamin.html` - regulamin z 14-dniowym odstąpieniem i zgodą na wcześniejszy start
- `polityka-prywatnosci.html` - polityka prywatności (RODO)
- `assets/js/config.js` - **jedyny plik do uzupełnienia**: imię i nazwisko, telefon, e-mail, adres do korespondencji, numer WhatsApp, adres formularza, cena
- `crm/` - mini CRM w Arkuszu Google (skrypt i instrukcja)

## Pierwsze uruchomienie

1. **Uzupełnij dane** w `assets/js/config.js` (na GitHubie: otwórz plik → ikona ołówka → zmień → „Commit changes”).
2. **Podłącz formularze** do Arkusza Google według `crm/README.md` i wklej adres do `formEndpoint`.
3. **Włącz GitHub Pages:** w repozytorium **Settings → Pages → Build and deployment**: Source „Deploy from a branch”, Branch `main`, folder `/ (root)` → Save. Po 1–2 minutach strona będzie pod adresem
   **https://dondejvburrito.github.io/wloski-na-luzie-strona/**
4. **Zdjęcie:** wgraj swoje zdjęcie jako `assets/img/portret.jpg` (na GitHubie: wejdź do folderu `assets/img` → „Add file” → „Upload files” → przeciągnij plik → „Commit changes”). Najlepiej pionowe 4:5 (np. 800 × 1000 px), do ok. 300 KB, nazwa pliku dokładnie `portret.jpg`, małymi literami. Dopóki go nie ma, strona pokazuje zaślepkę. Logo podmieniasz tak samo: `assets/img/logo.svg` i `favicon.svg`.

Własna domena później: Settings → Pages → Custom domain.

## Podgląd lokalny

Otwórz `index.html` w przeglądarce albo uruchom `python3 -m http.server` w folderze repozytorium i wejdź na http://localhost:8000.

## Licencje i inspiracje

- Kod napisany od zera dla tego projektu. Układ sekcji (hero, kroki, cennik, FAQ, formularz) luźno inspirowany otwartymi szablonami stron typu landing page na licencji MIT z rodziny [Start Bootstrap](https://github.com/StartBootstrap) - bez kopiowania ich kodu i bez Bootstrapa.
- Czcionki [Cinzel](https://fonts.google.com/specimen/Cinzel) i [Lato](https://fonts.google.com/specimen/Lato) - SIL Open Font License 1.1, hostowane lokalnie w `assets/fonts/`.
