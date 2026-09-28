# Programm

[Übersicht](../README.md) › [Seiten-Katalog](README.md) › Programm

**Route:** `/programm`

**Wofür:** Was passiert wann, wo und mit wem.

**Daten:** Eine `<sv-agenda group="day">` aus Streavent für das ganze Programm, die Tage kommen aus den Daten; Detail als Popup im Item-Template oder als Detailseite.

**Sinnvoll, wenn:** Es mehr als einen Tag oder eine Bühne gibt, oder das Programm sich laufend ändert.

**Eher nicht, wenn:** Das Programm auf eine Section der Startseite passt.

## Typischer Aufbau

Reihenfolge und Auswahl sind Beobachtung, keine Vorschrift. Jede Zeile ist eine Section aus dem
[Section-Katalog](../sections/README.md).

1. [Hero / Seitenkopf](../sections/hero.md) · Seitenkopf mit CTAs und Bild
2. [Programm-Übersicht](../sections/programm-uebersicht.md) · Tage als Karten, verlinkt auf die Tabs
3. [Agenda](../sections/agenda.md) · je Tag, Detail per Klick
4. [Tabs und Filter](../sections/tabs-filter.md) · Tage als Tabs; Filter erst bei parallelen Bühnen
5. [Vorjahr](../sections/vorjahr.md) · Programm des Vorjahres, solange das neue leer ist
6. [Termin speichern](../sections/termin-speichern.md) · ICS für das ganze Event
7. [CTA-Box](../sections/cta-box.md) · Ticket
8. [Footer](../sections/footer.md)

## Varianten

Themen des Jahrgangs als Einstieg; Kuration oder Beirat als Section; Rahmenprogramm (Frühstücke, Führungen, Abendevent) als eigene Section; Programm als PDF-Download.

## Hinweise

Hinweis "Änderungen vorbehalten" oder "Arbeitstitel", solange nicht final. Zeitraster am Rechner, Liste am Handy. Bühnen in Streavent so benennen, dass Filter greifen. Tage nie fest ins Markup schreiben: `day` wählt einen Tab aus, keinen Kalendertag, und parallele Workshops liegen oft als eigene Tabs am selben Datum.

## In den Beispielen

- [Beispiel 3 · Kongress als Multipage klassisch](../beispiele/kongress.md)
- [Beispiel 4 · Konferenz mit Marke als Multipage groß](../beispiele/konferenz-gross.md)
- [Beispiel 5 · Messe oder Kongress mit Ausstellung](../beispiele/messe.md)

---

Kapitel: [Übersicht](../README.md) · [Vorbereiten](../vorbereitung/README.md) · [Verstehen](../00-prinzip.md) · [Auswählen](README.md) · [Bauen](../daten.md) · [Live gehen](../bauen/go-live.md) · [Glossar](../glossar.md)
