/*
  USTAWIENIA STRONY - jedyne miejsce, które trzeba uzupełnić.
  Po zmianie zapisz plik i wypchnij na GitHuba; strona odświeży się sama.
*/
window.SITE_CONFIG = {
  // Dane prowadzącego (pojawiają się w stopce, regulaminie i polityce prywatności)
  ownerName: "[Imię i Nazwisko]",
  ownerPhone: "[+48 000 000 000]",
  ownerEmail: "[adres@email.pl]",
  // Adres do korespondencji: ustawa o prawach konsumenta wymaga go w regulaminie (może być adres do doręczeń, nie musi być domowy)
  ownerAddress: "[adres do korespondencji]",

  // Numer WhatsApp w formacie międzynarodowym, same cyfry, bez + i spacji (np. 48600123456)
  whatsapp: "48000000000",

  // Adres, pod który formularze wysyłają zgłoszenia.
  // Arkusz Google (zalecane): wklej adres aplikacji internetowej z Apps Script (instrukcja: crm/README.md),
  //   wygląda tak: https://script.google.com/macros/s/XXXXXXXX/exec
  // Formspree: https://formspree.io/f/XXXXXXXX
  // Puste = formularz pokaże prośbę o kontakt przez WhatsApp.
  formEndpoint: "",

  // Cena i wersja regulaminu (data w regulaminie musi się zgadzać)
  priceMonthly: "179",
  termsVersion: "26.11.2026"
};
