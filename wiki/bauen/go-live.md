# Go-Live-Checkliste

[Übersicht](../README.md) › [Bauen](README.md) › Go-Live-Checkliste

Zum Durchlaufen, bevor eine Seite live geht. Jede Zeile hat eine Prüfung, die man tatsächlich
ausführen kann. Vieles davon erledigt eine KI beim Bauen schon; die Punkte, bei denen es sich lohnt,
selbst hinzuschauen, sind markiert mit "selbst prüfen".

## Bundle und Struktur

- `npm run validate` läuft ohne Fehler; das ist derselbe Contract-Check, den die Plattform beim Upload fährt; Collection-Felder und Adressen prüft sie zusätzlich. Warnungen sind gelesen, vor allem `agenda-day-index` (fest verdrahtete Programmtage).
- Feldschlüssel stimmen: Derselbe Schlüssel auf mehreren Seiten ist derselbe Inhalt (Footer, Menü); kein Schlüssel ist zweimal auf einer Seite vergeben.
- Jede deklarierte Collection ist an mindestens eine Seite gebunden.
- Header, Menü und Footer stehen auf allen Seiten identisch (Partials frisch eingespielt).
- Alle internen Links sind root-absolut, ohne `.html`, und zeigen auf Seiten, die es gibt.
- Keine eigene Seite liegt auf einer reservierten Route (`shop`, `register`, `tickets` und weitere).
- Es gibt keinen Ordner `src/assets/`, und kein Name auf oberster Ebene ist zugleich Seite und Asset-Ordner.
- Alte Adressen der Vorgängerseite stehen als Redirects im Manifest und wurden getestet.
- Das Bundle enthält keine langen Filme und keine Rohbilder, nur kurze, komprimierte Startvideos; Ziel deutlich unter 30 MB.

## Inhalt

- Alle Platzhalter-Inhalte sind raus oder als Platzhalter benannt und erklären, was wann folgt.
- Kein erfundener Inhalt: keine ausgedachten Zitate, Zahlen, Pressemeldungen, Laufzeiten.
- Texte sind die des Kunden oder von ihm freigegeben, siehe [Text und Tonalität](text-tonalitaet.md).
- Jedes Bild hat einen konkreten Alt-Text; Bildrechte liegen schriftlich vor.
- Jede Liste aus Streavent wurde einmal mit Daten und einmal leer angesehen; der Empty-State ist Inhalt, nicht "Bald verfügbar".
- Der Übergang Vorjahr zu aktuellem Jahr ist festgelegt und funktioniert, siehe [Vorjahr](../vorjahr.md).
- Freie Sponsorenplätze zeigen die richtige Zahl je Kategorie.
- Datum, Ort und Ticketstart stimmen an allen Stellen überein: Hero, Footer, JSON-LD, ICS, Countdown.
- Rechtstexte (Impressum, Datenschutz, AGB, Code of Conduct) sind vollständig vom Kunden, mit allen Überschriften, und decken Hosting, Consent, Tracking, Event-Plattform und Foto- und Filmaufnahmen ab.

## Zustände und Zeitpunkte

- Ticket-CTA zeigt auf `/shop` und steht in `<sv-capacity>`; der Zustand "Ausgebucht" wurde einmal simuliert.
- Vor Ticketstart: Vormerken oder Warteliste statt Kaufen, und der Wechsel ist geplant.
- Login-Button erscheint erst ab Registrierungsstart; Livestream-Button erst, wenn gestreamt wird.
- Countdown: geprüft, was nach dem Event angezeigt wird.
- Menüpunkte und Footer-Links zeigen nur auf Seiten, die Inhalt haben; versteckte Seiten sind nirgends verlinkt.

## Meta und Auffindbarkeit

- Jede Seite hat einen eigenen `<title>` und eine eigene Description; das Manifest liefert nur den Titel-Suffix.
- OG-Titel, OG-Description und OG-Bild je Seite gesetzt; OG-Bild 1200×630, als Vorschau in einem Link-Checker angesehen.
- OG-Bild, Canonical-Angaben und JSON-LD-URL zeigen auf die Zieldomain, nicht auf Staging oder die alte Domain.
- JSON-LD `Event` mit Name, Datum, Ort, Veranstalter; FAQ-Schema auf der FAQ-Seite.
- `noindex` nur auf Rechtsseiten und internen Seiten, nirgends sonst.
- Favicon-Set und Apple-Touch-Icon liegen und werden geladen.
- `robots.txt` und `sitemap.xml` liegen im Root von `src/` und gehen mit dem Bundle hoch; die Plattform erzeugt sie nicht. Unbekannte Adressen landen in der Streavent-App; einmal eine falsche Adresse aufrufen und ansehen, was erscheint.

## Consent und Tracking

- Consent-Banner erscheint beim ersten Besuch; Ablehnen und Annehmen wurden beide getestet.
- Skripte, die Consent brauchen, laden vor der Einwilligung nicht (Netzwerk-Tab prüfen).
- Staging- und Live-Domain sind im Consent-Tool freigeschaltet.
- Tracking-Snippets sind 1:1 die des Kunden; Klick-Events auf Ticket-CTA, Sponsor-CTA, Downloads und Videos kommen an.
- Newsletter-Formular sendet an das Tool des Kunden; Double-Opt-in-Mail ist angekommen.
- Eingebettete Karten und Videos laden erst nach Consent oder über datenschutzfreundliche Einbettung.

## Mobil, selbst prüfen

Nicht nur "funktioniert es", sondern "sieht es mobil richtig aus". Bei 390×844 und einem Tablet
durchgehen, jede Seite von oben bis unten.

- Kein Quer-Scroll auf keiner Seite: lange Wörter, Tabellen, Agenda-Spalten, Logo-Bänder.
- Header klebt, Burger öffnet ein Overlay, der Ticket-CTA steht dort als letztes Element; Safe Area der Notch bedacht.
- Überlegt, ob Elemente mobil zentriert werden sollen: Section-Köpfe, CTAs, Kicker.
- Überlegt, ob Buttons mobil untereinander und nach unten gehören statt nebeneinander in die Mitte.
- Überlegt, ob Raster mobil zu Listen werden: Speaker-Grid, Karten, Partnerwand, Agenda als Liste statt Zeitraster.
- Überlegt, ob Reihenfolgen mobil anders sein sollen: Bild vor Text, CTA vor dem langen Text.
- Bilderleisten auf eine Reihe, Speaker-Auszug gekürzt, Scroll-Effekte vereinfacht oder aus.
- Tipp-Ziele groß genug, Abstände zwischen Links ausreichend.
- Formulare mobil ausgefüllt: Tastatur verdeckt nichts, Fehlermeldungen sichtbar.
- Videos mobil: Poster sichtbar, kein Autoplay mit Ton, `preload="none"`.

## Kontrast und Lesbarkeit, selbst prüfen

- Jede Text-auf-Farbe-Kombination gemessen: Text 4,5:1, große Schrift 3:1. Vor allem Buttons auf Markenfarbe, Kicker in Akzentfarbe, Text auf Verlauf.
- Text auf Bildern und Videos: mit Scrim oder Abdunklung, und mit dem hellsten Bild geprüft, das der Kunde später hochladen könnte.
- Dunkle und helle Sections: Linkfarbe, Kicker und Buttons auf beiden Gründen lesbar.
- Fokus-Zustand sichtbar bei Tastaturbedienung; Skip-Link vorhanden.
- Keine Information nur über Farbe (Stufen, Bühnen, Zustände auch mit Text oder Symbol).
- Schriftgrößen: Fließtext nicht unter 15 bis 16 px, Kleinsttexte nicht unter 10 px.
- `prefers-reduced-motion` getestet: Loops, Marquees und Glows stehen still.

## Performance

- Startseite unter 3 MB Bilder; Bilder in Zielgröße, AVIF oder JPEG, Lazy-Load unterhalb des Hero.
- Lange Filme im Filestore oder bei einem Videodienst, Poster als Bild.
- Schriften selbst gehostet, nur die Schnitte, die gebraucht werden.
- Keine Konsolenfehler, keine 404 auf Assets, auf allen Seiten.

## Übergabe

- Der Kunde hat im Editor einmal einen Text und ein Bild geändert und einen Collection-Eintrag angelegt.
- Der Kunde kennt die Schalter im Editor (ausblendbare Abschnitte): Vorjahr aus, Menüpunkt ein, Platzhalter aus.
- Domain umgestellt, www-Redirect geprüft, alte Seite abgeschaltet oder weitergeleitet.
- Logo-Paket, Vorlagen und Downloads liegen an der verabredeten Stelle.

Siehe auch: [Mobil](../mobil.md) · [Kontrast und Performance](../barrierefrei-performance.md) · [Technik](../technik.md)

---

Kapitel: [Übersicht](../README.md) · [Vorbereiten](../vorbereitung/README.md) · [Verstehen](../00-prinzip.md) · [Auswählen](../seiten/README.md) · [Bauen](../daten.md) · **Live gehen** · [Glossar](../glossar.md)
