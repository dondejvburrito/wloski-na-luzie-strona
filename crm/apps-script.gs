/**
 * Włoski na luzie - mini CRM w Arkuszu Google
 * Odbiera zgłoszenia z formularzy strony i dopisuje je jako wiersze.
 * Instrukcja instalacji: crm/README.md
 */

// Adres, na który przychodzi powiadomienie o nowym zgłoszeniu (zostaw puste, żeby wyłączyć)
var POWIADOMIENIA_EMAIL = "";

var ARKUSZ = "Zgłoszenia";
var KOLUMNY = [
  "Data", "Typ", "Status", "Imię", "Nazwisko", "E-mail", "Telefon", "Poziom", "Wiadomość",
  "Zgoda regulamin", "Zgoda RODO", "Zgoda kontakt", "Wersja regulaminu", "Lekcja 0 (termin)", "Notatki"
];
var STATUSY = ["Nowy", "Kontakt", "Lekcja 0 umówiona", "Po lekcji 0", "Uczeń", "Rezygnacja"];

/** Uruchom raz ręcznie: tworzy arkusz, nagłówki i listę statusów. */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(ARKUSZ) || ss.insertSheet(ARKUSZ);
  sh.getRange(1, 1, 1, KOLUMNY.length).setValues([KOLUMNY])
    .setFontWeight("bold").setBackground("#EFE6D6").setFontColor("#6E1C19");
  sh.setFrozenRows(1);
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSY, true).build();
  sh.getRange(2, 3, 1000, 1).setDataValidation(rule);
  sh.setColumnWidth(9, 320);
  // Kolory statusów
  var rng = sh.getRange(2, 1, 1000, KOLUMNY.length);
  var kolory = { "Nowy": "#FDECEA", "Lekcja 0 umówiona": "#FFF6D6", "Uczeń": "#E3F1E8", "Rezygnacja": "#EEEEEE" };
  var rules = Object.keys(kolory).map(function (s) {
    return SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$C2="' + s + '"').setBackground(kolory[s]).setRanges([rng]).build();
  });
  sh.setConditionalFormatRules(rules);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var p = (e && e.parameter) || {};
    if (p._gotcha) return out_({ ok: true }); // bot
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ARKUSZ);
    if (!sh) { setup(); sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ARKUSZ); }
    var clip = function (v, n) { return String(v || "").slice(0, n || 200); };
    sh.appendRow([
      new Date(), clip(p.typ, 40), "Nowy", clip(p.imie, 80), clip(p.nazwisko, 80), clip(p.email, 120),
      "'" + clip(p.telefon, 40), clip(p.poziom, 80), clip(p.wiadomosc, 3000),
      clip(p.zgoda_regulamin, 5), clip(p.zgoda_rodo, 5), clip(p.zgoda_kontakt, 5), clip(p.wersja_regulaminu, 20), "", ""
    ]);
    if (POWIADOMIENIA_EMAIL) {
      MailApp.sendEmail(POWIADOMIENIA_EMAIL, "Nowe zgłoszenie: " + clip(p.typ, 40) + " - " + clip(p.imie, 80),
        "Imię: " + clip(p.imie) + " " + clip(p.nazwisko) + "\nE-mail: " + clip(p.email) + "\nTelefon: " + clip(p.telefon) +
        "\nPoziom: " + clip(p.poziom) + "\n\n" + clip(p.wiadomosc, 3000));
    }
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
