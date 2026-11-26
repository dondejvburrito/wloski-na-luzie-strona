# Zasady strony „Włoski na luzie”

Statyczna strona zapisów na kurs „Włoski offline” (GitHub Pages, gałąź `main`, katalog główny). Bez frameworków, bez kroku budowania, bez bibliotek JS i CSS z CDN.

## Struktura
- `index.html` (jedna strona z sekcjami), `regulamin.html`, `polityka-prywatnosci.html`.
- `assets/css/style.css` – wszystkie style; zmienne kolorów w `:root`. `assets/css/fonts.css` – lokalne czcionki.
- `assets/js/config.js` – dane prowadzącego, WhatsApp, `formEndpoint`, cena, wersja regulaminu. Teksty z tych danych wstawiamy przez `data-cfg="klucz"`, nigdy na sztywno w HTML.
- `assets/js/main.js` – menu, animacje przy przewijaniu, zakładki i wysyłka formularzy.
- `crm/apps-script.gs` – odbiór formularzy do Arkusza Google. Nowe pole formularza = nowa kolumna w `KOLUMNY` i w `appendRow`.

## Wygląd
- Paleta marki: czerwień pompejańska `#9E2B25`, ciemna czerwień `#6E1C19`, złoto `#C9A227`, trawertyn `#EFE6D6`, purpura tła `#43182B`; akcent trikoloru: zieleń `#1E6B45`, biel, czerwień. Nie dodawać nowych kolorów poza `:root`.
- Czcionki tylko dwie: Cinzel (nagłówki, wersaliki, rozstrzelenie) i Lato (reszta). Zawsze z podzbiorem `latin-ext` (polskie znaki). Hostowane lokalnie, nie z Google Fonts (RODO).
- Estetyka rzymska i elegancka, nie kiczowata: łuk, złota linia, trikolor jako cienki akcent. Bez flag na całe tło, bez pizzy i gondoli.
- Kolory w przykładach z kursu jak w materiałach: końcówki czerwone (`.end`), rodzaj męski niebieski (`.m`), żeński różowy (`.f`).
- Mobile first: wszystko musi wyglądać dobrze od szerokości 360 px, przyciski min. 46–52 px wysokości, pola formularzy 16 px (bez zoomu na iPhonie). Animacje tylko przez `transform`/`opacity` i z obsługą `prefers-reduced-motion`.

## Teksty
- Język polski, ton ciepły i konkretny, zwracamy się do ucznia na „Ty”. Formy neutralne płciowo wobec ucznia („samodzielnie”, „Akceptuję”), bo odbiorcy to głównie kobiety, ale nie tylko.
- Bez emotek, bez długich myślników (tylko „ - ” lub „–” w zakresach liczb), bez sztucznych pochwał i bez wzmianek o AI.
- Żadnych wymyślonych opinii ani liczb. Sekcja `#opinie` jest ukryta (`hidden`), dopóki nie ma prawdziwych opinii za zgodą uczniów.
- Fakty o kursie zgodne z wytycznymi offline: lekcja 0 (30 min, za darmo), obóz L1–3 (3 × 90 min 1:1), bloki 5 tygodni (ok. 4 h tygodniowo, korekta tekstu co tydzień), lekcja kontrolna 60 min, kontakt WhatsApp. Płatność dopiero po rozmowie (bez płatności na stronie).

## Prawo
- Prowadzący działa w ramach działalności nierejestrowanej. Regulamin i polityka prywatności muszą zgadzać się z tym, co robi strona i formularze (lista dostawców w polityce, okresy przechowywania).
- Każda zmiana regulaminu: nowa data w `termsVersion` w `config.js` (trafia też do arkusza przy każdym zgłoszeniu).
- Strona nie używa cookies ani analityki. Dodanie analityki wymaga banera zgody i zmiany polityki prywatności.
