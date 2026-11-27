/*
  USTAWIENIA STRONY - jedyne miejsce, które trzeba uzupełnić.
  Po zmianie zapisz plik i wypchnij na GitHuba; strona odświeży się sama.
*/
window.SITE_CONFIG = {
  // Dane prowadzącego (pojawiają się w stopce, regulaminie i polityce prywatności)
  ownerName: "Dawid Grzelczyk",
  ownerPhone: "+48 789 598 758",
  ownerEmail: "dawid.wloskinaluzie@gmail.com",
  // Adres do korespondencji: ustawa o prawach konsumenta wymaga go w regulaminie (może być adres do doręczeń, nie musi być domowy)
  ownerAddress: "[adres do korespondencji]",

  // Numer WhatsApp w formacie międzynarodowym, same cyfry, bez + i spacji (np. 48600123456)
  whatsapp: "48789598758",

  // Adres, pod który formularze wysyłają zgłoszenia.
  // Arkusz Google (zalecane): wklej adres aplikacji internetowej z Apps Script (instrukcja: crm/README.md),
  //   wygląda tak: https://script.google.com/macros/s/XXXXXXXX/exec
  // Formspree: https://formspree.io/f/XXXXXXXX
  // Puste = formularz pokaże prośbę o kontakt przez WhatsApp.
  formEndpoint: "https://script.google.com/macros/s/AKfycby94653YbspZrwopyc5HyMhgnDWz94Osuc8cJ1d6RmzDG1P0dXYjweZiiNwTTzQYjsV/exec",

  // Ceny i wersja regulaminu (data w regulaminie musi się zgadzać)
  priceMonthly: "179",   // kurs offline, zł miesięcznie
  priceLesson: "80",     // lekcja 1:1 online, zł za 60 minut
  termsVersion: "27.11.2026"
};
