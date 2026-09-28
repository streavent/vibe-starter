# Design-Wiki für Event-Websites

> **Das Wiki ist ein Katalog dessen, was man auf einer Event-Website bauen kann, mit Vor- und Nachteilen. Es schreibt nichts vor.** Was gebaut wird, entscheidet der Designer aus dem Workshop und aus dem, was der Kunde will. Es gibt Dinge, die Besucher auf Event-Websites typischerweise suchen (Programm, Speaker, Sponsoren, Datum und Ort, einen Weg zum Ticket), und selbst die können fehlen, wenn das Event sie nicht hat. Weniger ist mehr: Was keinen Grund hat, bleibt weg. Wie viele Seiten, Sections oder Zielgruppen es gibt, wie lang eine Seite wird, sagt nicht das Wiki, sondern das Event.

Das Wiki folgt dem Ablauf eines Projekts. Wer neu ist, liest von oben nach unten; wer baut, springt
in den Katalog.

## 1 · Vorbereiten

Bevor etwas entworfen wird: die Fragen an den Veranstalter und das Material, das vorliegen muss.
Wo im Wiki "aus dem Workshop" steht, ist der Anforderungsworkshop gemeint; wer selbst baut,
beantwortet die Fragen vorher, wer sie nicht allein beantworten will, bucht den Workshop bei Streavent.

- [Der Anforderungsworkshop: die Fragen](vorbereitung/workshop.md)
- [Material, das die Website braucht](vorbereitung/material.md)

## 2 · Verstehen

Was eine Event-Website ausmacht, bevor man den Katalog aufschlägt.

1. [00 · Das oberste Prinzip: individuell, und weniger ist mehr](00-prinzip.md)
2. [01 · Warum es das Event gibt: die Storyline der Startseite](01-storyline.md)
3. [02 · Zielgruppen](02-zielgruppen.md)
4. [03 · Die drei Umfänge](03-umfaenge.md)

## 3 · Auswählen

Der Katalog: was es gibt, wann es sinnvoll ist, wie es typischerweise aufgebaut ist.

- [Seiten](seiten/README.md): 26 Seitentypen, je mit Zweck, Daten, wann sinnvoll und typischem Aufbau
- [Sections](sections/README.md): 44 Bausteine, die auf jeder Seite stehen können
- [Elemente](elemente/README.md): Header, Menü, Footer, Items, CTAs, Links
- [Beispiele](beispiele/README.md): fünf Strukturen vom Save-the-Date bis zur Messe, mit Navigation und Section-Aufbau je Seite

## 4 · Bauen

Regeln, die beim Bauen und Befüllen immer gelten.

- [Streavent-Daten, Collection oder statisch](daten.md)
- [Vorjahr und aktuelle Daten: Empty States und der Übergang](vorjahr.md)
- [Marke, Logo, Weiterentwicklung](marke.md)
- [Text und Tonalität](bauen/text-tonalitaet.md)
- [Mobil](mobil.md)
- [Kontrast, Lesbarkeit, Bewegung, Performance](barrierefrei-performance.md)
- [Technik-Pflichten, Tracking, SEO](technik.md)

## 5 · Live gehen

- [Go-Live-Checkliste](bauen/go-live.md): zum Durchlaufen, mit den Punkten, bei denen es sich lohnt, selbst hinzuschauen
- [Hochladen und übergeben](bauen/uebergabe.md): Bundle packen, in die Plattform bringen, ab dann in Streavent bearbeiten

## Nachschlagen

- [Glossar](glossar.md): die Begriffe des Wikis und der SDK

## Was dieses Wiki nicht ist

Der [`DESIGNER_CONTRACT.md`](../DESIGNER_CONTRACT.md) und der `COMPONENT_CATALOG.md` (im Paket
`@streavent/sv-runtime` unter `dist/`) sagen, _wie_ man auf der SDK baut. Dieses Wiki sagt, _was_
es auf Event-Websites gibt und was dabei zu beachten ist. Es wird nach jedem Kundenprojekt um das
ergänzt, was neu war.

Bei technischen Fragen gelten Contract und Katalog. Nennt das Wiki eine Komponente oder ein
Attribut anders als dort, ist das Wiki veraltet.

---

Kapitel: **Übersicht** · [Vorbereiten](vorbereitung/README.md) · [Verstehen](00-prinzip.md) · [Auswählen](seiten/README.md) · [Bauen](daten.md) · [Live gehen](bauen/go-live.md) · [Glossar](glossar.md)
