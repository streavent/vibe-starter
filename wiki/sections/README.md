# Section-Katalog

[Übersicht](../README.md) › Section-Katalog

**Was eine Section ist.** Ein Baustein, der auf jeder Seite stehen kann, in anderer Reihenfolge und
anderer Größe. Dieselbe Section kann eins zu eins auf mehreren Seiten vorkommen.

**Best Practice, die sich in den Projekten bestätigt hat:**

- Eine Section, die auf mehreren Seiten vorkommt, ist einmal gebaut und überall gleich gestylt:
  gleiche Klasse, gleiches Markup. Speaker sehen auf der Startseite aus wie auf der Speaker-Seite.
  Das gibt Wiedererkennung, hält den Code klein, und wenn der Kunde das Speaker-Design ändern will,
  ändert man eine Klasse und nicht fünf Seiten.
- Wiederholte Elemente wie CTA-Box, Seitenkopf, Ansprechpersonen oder Newsletter sind eigene
  Sections, die identisch auf mehreren Seiten eingesetzt werden, nicht Kopien mit kleinen
  Abweichungen. Die SDK kennt kein Include, das Markup steht in jeder Seite. Wer es an einer
  Stelle pflegen will, nutzt dafür sein eigenes Werkzeug, etwa ein Partial-Skript, das vor dem
  Packen läuft.
- Der Inhalt einer Section kann je Seite anders sein (eine andere Auswahl Speaker, ein anderer
  CTA-Text), die Form bleibt.

## Einstieg und Kopf

| Section                                 | Wofür                                                                                                                                                            | Typisch auf                                                                                                 |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [Hero / Seitenkopf](hero.md)            | Auf der Startseite: ein Satz, Datum, Ort, primärer und sekundärer CTA, ein Bild oder Video. Auf Unterseiten: kleinerer Seitenkopf mit H1, Kicker, Bild und CTAs. | Startseite, Programm, Speaker / Referenten, Sponsoren & Partner, Teilnehmen / Tickets, Service / Ihr Besuch |
| [Countdown](countdown.md)               | Tage bis zum Event, wahlweise mit Frühbucher-Frist.                                                                                                              | Startseite, Teilnehmen / Tickets                                                                            |
| [Termin speichern](termin-speichern.md) | ICS-Datei oder Kalender-Link.                                                                                                                                    | Startseite, Programm                                                                                        |
| [Warum / Story](warum-story.md)         | Die Antwort auf "was wäre schlechter ohne dieses Event", in Akten, Säulen oder Bereichen.                                                                        | Startseite, Thema / Warum, Sponsor werden                                                                   |
| [Für wen](fuer-wen.md)                  | Zielgruppen, je mit dem, was sie mitnehmen. Wahlweise als Umschalter "Ich bin … und will …".                                                                     | Startseite, Für wen (je Zielgruppe)                                                                         |

## Beweis und Vertrauen

| Section                                          | Wofür                                                                                 | Typisch auf                                                                                          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [Keyfacts / Zahlen](keyfacts.md)                 | Wenige Zahlen oder Fakten: Datum, Ort, Teilnehmende, Bereiche, Jahrgänge.             | Startseite, Sponsor werden, Rückblick / Mediathek                                                    |
| [Zahlen auf Bild oder Video](zahlen-auf-bild.md) | Große Kennzahlen über einem Hintergrundmotiv.                                         | Startseite, Rückblick / Mediathek                                                                    |
| [Meilensteine / Timeline](meilensteine.md)       | Die Geschichte des Events in Stationen.                                               | Startseite, Rückblick / Mediathek, Über uns / Team / Jobs, Thema / Warum                             |
| [Stimmen](stimmen.md)                            | Zitate oder Video-Interviews von Teilnehmenden, Speakern, Partnern.                   | Startseite, Für wen (je Zielgruppe), Sponsor werden, Rückblick / Mediathek, Volunteers / Ambassadors |
| [Presse-Karten / Bekannt aus](presse-karten.md)  | Berichte mit Screenshot, Quelle, Datum; oder Medienlogos.                             | Startseite, Presse / Downloads, Insights / Blog / News                                               |
| [Erfolgsgeschichten](erfolgsgeschichten.md)      | Was aus dem Event entstanden ist: Projekte, Kooperationen, Karrieren, Award-Gewinner. | Startseite, Sponsor werden, Für wen (je Zielgruppe)                                                  |
| [Wer kommt](wer-kommt.md)                        | Teilnehmende nach Branche, Rolle oder Organisation.                                   | Startseite, Sponsor werden, Für wen (je Zielgruppe)                                                  |

## Programm und Inhalte

| Section                                               | Wofür                                                                                  | Typisch auf                                                                                            |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [Bereiche / Themen](bereiche-themen.md)               | Die Themengebiete oder Bereiche des Events, je mit Text und Bild.                      | Startseite, Programm, Thema / Warum, Service / Ihr Besuch                                              |
| [Programm-Übersicht](programm-uebersicht.md)          | Tage als Karten oder Zeilen, je mit Bild und Kurztext, Link ins Programm.              | Startseite, Programm, Event-Hub / Archiv                                                               |
| [Agenda](agenda.md)                                   | Zeitplan je Tag mit Zeit, Titel, Bühne, Format, Speakern. Detail per Klick.            | Programm, Partner-Detail                                                                               |
| [Tabs und Filter](tabs-filter.md)                     | Tage als Tabs; Filter nach Bühne, Thema, Format, Jahr; Suche.                          | Programm, Speaker / Referenten, Rückblick / Mediathek, Insights / Blog / News, Aussteller, Side Events |
| [Formate / Networking](formate-networking.md)         | Wie man Menschen trifft: Matchmaking, Roundtables, Ausstellung, Workshops, Frühstücke. | Startseite, Für wen (je Zielgruppe), Programm, Community / Sub-Events, Volunteers / Ambassadors        |
| [Abendevent / Side Events](abendevent-side-events.md) | Networking Night, Dinner, Führungen; Verzeichnis der Side Events mit Einreichung.      | Startseite, Programm, Side Events                                                                      |
| [Award / Wettbewerb](award.md)                        | Kategorien, Bewerbung, Gewinner.                                                       | Startseite, Programm, Award / Wettbewerb / Pitch                                                       |

## Partner

| Section                                   | Wofür                                                                                    | Typisch auf                                                        |
| ----------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [Logo-Slider / Logo-Band](logo-slider.md) | Logos von Partnern, Teilnehmer-Organisationen oder Medien als laufendes Band oder Reihe. | Startseite, Sponsor werden, Für wen (je Zielgruppe)                |
| [Partnerwand](partnerwand.md)             | Logos nach Kategorien, mit freien Plätzen.                                               | Startseite, Sponsoren & Partner, Rückblick / Mediathek, Aussteller |
| [Partner-Profil](partner-profil.md)       | Popup oder Panel mit Logo, Text, Dokumenten, Website-Button.                             | Sponsoren & Partner, Aussteller                                    |
| [Pakete / Stufen](pakete.md)              | Vergleich der Sponsorenpakete, Sonderformate.                                            | Sponsor werden                                                     |

## Menschen

| Section                                    | Wofür                                                             | Typisch auf                                                                                                     |
| ------------------------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [Speaker-Reihe / Speaker-Grid](speaker.md) | Köpfe mit Name, Rolle, Organisation. Detail als Popup oder Seite. | Startseite, Speaker / Referenten, Programm, Sponsor werden, Für wen (je Zielgruppe), Award / Wettbewerb / Pitch |
| [Vorjahr](vorjahr.md)                      | Speaker, Partner oder Programm des Vorjahres als eigene Section.  | Speaker / Referenten, Sponsoren & Partner, Programm, Rückblick / Mediathek, Award / Wettbewerb / Pitch          |
| [Team](team.md)                            | Wer das Event macht, mit Fotos.                                   | Über uns / Team / Jobs, Startseite                                                                              |

## Tickets und Handlung

| Section                                                          | Wofür                                                                                                                                                                                | Typisch auf                                                                         |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| [Livestream / Aufzeichnungen](livestream.md)                     | Button oder kleine Section "Zum Livestream", "Aufzeichnungen ansehen".                                                                                                               | Startseite, Programm                                                                |
| [Fortbildung / Argumente für den Chef](fortbildung-argumente.md) | Warum das Ticket aus dem Firmen- oder Weiterbildungsbudget geht: Fortbildungsanerkennung, Punkte (Wissenschaft, Ärzte, Ingenieurkammern), Zertifikat, was das Unternehmen davon hat. | Teilnehmen / Tickets, Für wen (je Zielgruppe), Startseite                           |
| [Vormerken](vormerken.md)                                        | Formular vor Ticketstart: Mail, Rolle. Später Benachrichtigung beim Verkaufsstart.                                                                                                   | Startseite, Teilnehmen / Tickets                                                    |
| [Event-App](event-app.md)                                        | Was die App vor Ort kann: Programm, Matchmaking, QR statt Visitenkarte, Übersetzung.                                                                                                 | Startseite, Service / Ihr Besuch, Teilnehmen / Tickets                              |
| [Mitwirken](mitwirken.md)                                        | Speaker werden, Sponsor werden, Aussteller, Volunteer, Side Event, je ein Weg.                                                                                                       | Startseite, Speaker / Referenten, Sponsoren & Partner, Mitwirken, Side Events       |
| [Newsletter](newsletter.md)                                      | Anmeldung mit Nutzenversprechen.                                                                                                                                                     | Startseite, Insights / Blog / News, Community / Sub-Events, Für wen (je Zielgruppe) |
| [Ticket-Section](ticket.md)                                      | Kategorien, Bedingungen, Frühbucher, wer zahlt, Weg in den Shop.                                                                                                                     | Startseite, Teilnehmen / Tickets, Programm                                          |

## Medien und Rückblick

| Section                                    | Wofür                                                          | Typisch auf                                                                          |
| ------------------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [Bildleiste / Foto-Marquee](bildleiste.md) | Laufende Reihe echter Fotos.                                   | Startseite                                                                           |
| [Galerie](galerie.md)                      | Bilder, wahlweise mit Jahresfilter.                            | Rückblick / Mediathek, Startseite, Presse / Downloads, Stadtführer / Plan your visit |
| [Film / Kurzfilme](film.md)                | Aftermovie, Clips, Interviews mit Poster und Lightbox.         | Rückblick / Mediathek, Startseite                                                    |
| [Rückblick](rueckblick-film.md)            | Aftermovie, Galerie und Zahlen des Vorjahres als eine Section. | Startseite                                                                           |
| [Aktuelles](aktuelles.md)                  | Neueste Beiträge aus Blog oder News.                           | Startseite, Insights / Blog / News, Community / Sub-Events                           |

## Ort und Service

| Section                                 | Wofür                                                         | Typisch auf                                                                         |
| --------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [Location](location.md)                 | Ort, Adresse fürs Navi, Karte, Anreise-Teaser, Hotel-Hinweis. | Startseite, Service / Ihr Besuch, Aussteller, Stadtführer / Plan your visit         |
| [Ansprechpersonen](ansprechpersonen.md) | Wer für was zuständig ist, mit Foto, Mail, Telefon.           | Sponsor werden, Teilnehmen / Tickets, Service / Ihr Besuch, Presse / Downloads, FAQ |
| [FAQ](faq.md)                           | Fragen als Akkordeon.                                         | FAQ, Teilnehmen / Tickets, Für wen (je Zielgruppe)                                  |

## Rahmen

| Section                         | Wofür                                                                                   | Typisch auf                                                                                            |
| ------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [Veranstalter](veranstalter.md) | Wer steht dahinter, "ermöglicht durch".                                                 | Startseite, Über uns / Team / Jobs                                                                     |
| [CTA-Box](cta-box.md)           | Statement oder Frage, ein bis zwei Buttons.                                             | Startseite, Programm, Speaker / Referenten, Sponsoren & Partner, Sponsor werden, Rückblick / Mediathek |
| [Footer](footer.md)             | Abschluss und Leiste, siehe [Header, Menü, Footer](../elemente/header-menue-footer.md). | Startseite                                                                                             |

---

Kapitel: [Übersicht](../README.md) · [Vorbereiten](../vorbereitung/README.md) · [Verstehen](../00-prinzip.md) · [Auswählen](../seiten/README.md) · [Bauen](../daten.md) · [Live gehen](../bauen/go-live.md) · [Glossar](../glossar.md)
