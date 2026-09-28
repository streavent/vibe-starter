# Vorjahr und aktuelle Daten: Empty States und der Übergang

[Übersicht](README.md) › Vorjahr und aktuelle Daten: Empty States und der Übergang

Das Problem in jedem Projekt: Die Seite soll live gehen, bevor Speaker, Sponsoren oder Programm des
neuen Jahres feststehen. Das Vorjahr ist da, als Collection im Bundle. Drei Wege, jeder hat seinen
Fall:

| Weg                          | Wie                                                                                                                                                                                                          | Vorteil                                                                 | Preis                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Vorjahr bleibt dauerhaft** | Eigene Section "Vorjahr" mit der Collection, daneben die Live-Section aus Streavent                                                                                                                          | Immer Inhalt auf der Seite; Rückblick als Beweis; nichts springt um     | Zwei Sections, die sich ähneln; die Seite wird länger                               |
| **Vorjahr im Empty-State**   | Die Collection liegt im `<template slot="empty">` der Live-Komponente                                                                                                                                        | Eine Section; sobald der erste Datensatz kommt, zeigt sie das neue Jahr | Der erste bestätigte Speaker verdrängt das ganze Vorjahr; die Seite wirkt dann leer |
| **Hybrid**                   | Vorjahr als eigene Section, Live-Section mit leerem Empty-State; die Live-Section füllt sich Stück für Stück; ab einer Schwelle nimmt der Kunde die Vorjahres-Section raus (Schalter über `data-sv-section`) | Weicher Übergang, kein Sprung, der Kunde entscheidet den Zeitpunkt      | Der Kunde muss den Schalter kennen; bis dahin zwei Sections                         |

Das gilt für Speaker, Sponsoren, Programm und alles, was sich erst nach und nach füllt. Der Weg wird
im Konzept festgelegt und in der Übergabe erklärt.

Weitere Regeln: Ein Platzhalter erklärt, was folgt und wann, und ist abschaltbar. Freie
Sponsorenplätze sind Aussage, nicht Lücke (`openSlots`, `targetCount` je Stufe). Inhalt im
Empty-Slot verschwindet mit dem ersten Datensatz; was bleiben soll, gehört in eine eigene Section.

Siehe auch: [Section Vorjahr](sections/vorjahr.md) · [Daten](daten.md)

---

Kapitel: [Übersicht](README.md) · [Vorbereiten](vorbereitung/README.md) · [Verstehen](00-prinzip.md) · [Auswählen](seiten/README.md) · [Bauen](daten.md) · [Live gehen](bauen/go-live.md) · [Glossar](glossar.md)
