# Technik-Pflichten, Tracking, SEO

[Übersicht](README.md) › Technik-Pflichten, Tracking, SEO

- Clean URLs, root-absolute Links und Assets, Partials für Header, Nav und Footer, Validator vor
  jeder Abgabe, Feldschlüssel-Prüfung. Reservierte Routen (`shop`, `register`, `tickets` und
  weitere) nur verlinken.
- Assets liegen in Unterordnern von `src/`, nie im Root; dort stehen nur `favicon.ico`,
  `robots.txt` und `sitemap.xml`. Kein Ordner `src/assets/`: `/assets` gehört der Streavent-App,
  die auf derselben Domain läuft. Ein Name auf oberster Ebene ist entweder Seite oder
  Asset-Ordner, nie beides.
- Consent und Tracking 1:1 vom Kunden, in jeder Seite, geblockte Skripte per `type="text/plain"` bis
  zur Einwilligung, cookielose Tools frei. Staging-Domain in der CMP freischalten.
- `<title>`, Description, OG, Twitter-Card je Seite, JSON-LD `Event` mit Ort und Veranstalter,
  FAQ-Schema auf der FAQ-Seite, `noindex` nur auf Rechts- und internen Seiten. Speaker- und
  Session-Seiten als indexierbare Detailseiten, wenn sie gebraucht werden. Canonical und
  OG-Bild setzt jede Seite selbst im `<head>`; `robots.txt` und `sitemap.xml` liefert das
  Bundle.
- Auffindbarkeit in Suche und KI-Antworten: eine Themenseite mit echtem Text, klare H1/H2, keine
  Consent-Wand vor dem Inhalt, Backlinks von Partnern und Speakern (Kundenaufgabe).
- Mehrsprachigkeit von Anfang an einplanen, wenn internationale Speaker oder Teilnehmende genannt
  werden: eine Seite sprachneutral bauen, die Plattform vervielfältigt. Vor der Zusage an den
  Kunden den Stand im `DESIGNER_CONTRACT.md` (Kapitel 7) prüfen: Gerendert werden alle Sprachen,
  live erreichbar ist derzeit nur die Standardsprache. Collections pflegt der Kunde je Sprache.

---

Kapitel: [Übersicht](README.md) · [Vorbereiten](vorbereitung/README.md) · [Verstehen](00-prinzip.md) · [Auswählen](seiten/README.md) · [Bauen](daten.md) · [Live gehen](bauen/go-live.md) · [Glossar](glossar.md)
