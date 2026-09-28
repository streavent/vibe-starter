# Items, CTAs und Links

[Übersicht](../README.md) › [Elemente](README.md) › Items, CTAs und Links

## CTAs

Der primäre CTA ist die Ticket-Handlung ("Ticket kaufen", "Jetzt bewerben", "Warteliste"). Er steht
dort, wo Besucher gerade entschieden haben könnten: Header, mobiles Menü, Hero, Ende der Seite. Ein
sekundärer CTA führt weiter ("Programm ansehen", "Sponsor werden"), nicht weg. Ticket-CTA immer in
`<sv-capacity>` mit `data-sv-hide="atCapacity"` und Fallback "Ausgebucht"; Ziel ist `/shop`, nicht
eine eigene Seite. Ein Preisvorteil (Frühbucher) als abschaltbares Element. Eine Preistabelle steht
nicht auf der Website, sondern im Ticketshop; dort legt der Veranstalter auch Produkte, Add-ons und
Bundles selbst an, das ist für den Designer nicht relevant.

## Items

| Item                     | Was es ist                                                              | Wofür                                                                                    |
| ------------------------ | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Kicker / Eyebrow         | Kurzes Label über einer Überschrift, meist Mono-Versalien mit Laufweite | Ordnet die Section ein ("Programm", "Tag 2"); gut lesbar halten                          |
| Format-Pill              | Kleines Label wie Keynote, Panel, Workshop                              | Zeigt die Art eines Programmpunkts auf einen Blick                                       |
| Themen-Chip              | Label mit Farbe je Themenbereich                                        | Verbindet Programm, Bereiche und Speaker                                                 |
| Kategorie-Badge          | Label der Sponsoren- oder Speaker-Kategorie                             | Auf Partnerwand, im Profil, auf der Karte                                                |
| Speaker-Karte            | Foto, Name, Rolle, Organisation, Klick öffnet Detail                    | Gleiche Karte überall, wo Speaker vorkommen                                              |
| Popup / Panel            | Detail zu Speaker, Session oder Partner, ohne Seitenwechsel             | Schneller Blick ohne teilbare URL; für teilbare URLs Detailseite                         |
| Frei-Platz-Kachel        | Leere Kachel in der Partnerwand mit "Ihr Logo hier"                     | Freie Plätze als Aussage; führt zu Sponsor werden                                        |
| Ausgebucht-Hinweis       | Ersetzt den Ticket-Button, wenn die Kapazität erreicht ist              | Aus `<sv-capacity>`                                                                      |
| Countdown                | Tage, Stunden bis zum Event                                             | Dringlichkeit; nach dem Event umschalten                                                 |
| Termin speichern         | Button, der eine ICS-Datei liefert oder einen Kalender-Link öffnet      | Save-the-Date-Phase                                                                      |
| Download-Zeile           | Eine Zeile mit Dateiname, Format, Größe und Download-Button             | Für Media-Kit, Partner-Paket, Programm-PDF, Sponsoring-Booklet; Zips statt Einzeldateien |
| Kontaktkarte             | Foto, Name, Rolle, Mail, Telefon                                        | Zuständigkeit sichtbar machen                                                            |
| Zahlen-Kachel            | Eine große Zahl mit Beschriftung                                        | Beweis; nur echte Zahlen                                                                 |
| Zitat-Karte              | Zitat, Name, Rolle, Foto                                                | Stimme mit Gesicht                                                                       |
| Presse-Karte             | Screenshot oder Logo, Quelle, Datum, Link                               | Bericht als Beleg                                                                        |
| Bild-Karte / Tages-Karte | Bild mit Titel und Kurztext                                             | Programmübersicht, Bereiche, Rückblick                                                   |
| Filter-Leiste            | Buttons oder Chips, die eine Liste einschränken                         | Programm, Speaker, Aussteller, Galerie nach Jahr                                         |
| Tabs                     | Umschalter zwischen Tagen oder Ansichten                                | Programm, Rollen                                                                         |
| Lightbox                 | Video oder Bild im Overlay                                              | Videos nicht autoplay, mit Poster                                                        |
| Newsletter-Feld          | Mail-Eingabe, Button, Statuszeile                                       | Tool des Kunden, Double-Opt-in, kein Fremdskript vor Consent                             |
| Nach-oben-Button         | Erscheint beim Scrollen                                                 | Auf langen Seiten und One-Pagern                                                         |
| Sprachumschalter         | Links auf dieselbe Seite in anderer Sprache                             | Nur bei mehreren Sprachen                                                                |
| Loader / Intro           | Kurze Marken-Animation beim ersten Laden                                | Einmal pro Sitzung, abschaltbar                                                          |
| Login-Button             | "Login" oder "Bereits registriert?" im Header, führt in die Event-App   | Erst sichtbar, wenn die Registrierung läuft                                              |
| Livestream-Button        | "Zum Livestream", führt in die digitale Event-Plattform                 | Erst sichtbar, wenn gestreamt wird                                                       |
| Vormerken-Formular       | Mail und Rolle vor Ticketstart                                          | Zustand vor dem Shop                                                                     |
| Site-Suche               | Suchfeld über Programm, Speaker, Aussteller                             | Nur bei großen Seiten; reine Designer-Entscheidung                                       |

Items, die nur in einer Phase sichtbar sind (Countdown, Vormerken-Formular, Login-Button,
Livestream-Button, Frühbucher-Hinweis), werden als ausblendbare Abschnitte gebaut:
`data-sv-section`, dazu `data-sv-hidden` für alles, was erst später erscheint. Der Kunde schaltet
sie im Editor, ohne neues Bundle. Ein automatisches Umschalten nach Datum gibt es nicht.

## Links

Möglichst wenige Links führen von der Seite weg. Die Seite hat eine Aufgabe, und jeder Link nach
außen ist ein Ausgang.

- Nach außen führt der Ticket-Shop, sonst wenig. Wo ein externer Link sinnvoll ist (Karte,
  Hotelbuchung, Presseartikel, die Seite eines Hauptsponsors, wenn der Kunde das will), öffnet er in
  einem neuen Tab.
- Logos in Bändern und Wänden sind nicht nach außen verlinkt. Klick auf ein Logo öffnet, wenn
  überhaupt, das Partner-Profil auf der Partnerseite. Dort steht der Website-Button, gepflegt in
  Streavent. Auf der Startseite bleibt das Logo ohne Link oder führt zur Partnerseite.
- Speaker-Links (Website, LinkedIn) stehen im Speaker-Detail, nicht auf der Karte.
- Interne Links immer root-absolut, mit Anker, wo eine Section gemeint ist. Kein Link auf eine
  Seite, die noch leer ist.
- Mailto-Links für Kontakt und Call for Papers sind in Ordnung, mit vorbelegtem Betreff.

## Mikrotexte

Ohne KI-Klang: keine Antithesen-Slogans, keine Gedankenstriche, Sie oder Du wie im Workshop
festgelegt, gendern wie der Kunde.

---

Kapitel: [Übersicht](../README.md) · [Vorbereiten](../vorbereitung/README.md) · [Verstehen](../00-prinzip.md) · [Auswählen](../seiten/README.md) · [Bauen](../daten.md) · [Live gehen](../bauen/go-live.md) · [Glossar](../glossar.md)
