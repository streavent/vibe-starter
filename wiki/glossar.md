# Glossar

[Übersicht](README.md) › Glossar

Die Begriffe, wie sie in diesem Wiki gemeint sind. Die technischen Begriffe erklärt der
`DESIGNER_CONTRACT.md` der SDK im Detail; hier steht die kurze Fassung.

| Begriff                       | Bedeutung                                                                                                                                                                                 |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Seite                         | Eine Datei unter `src/`, die zu einer Adresse wird (`/programm`). Der [Seiten-Katalog](seiten/README.md) listet die Typen                                                                 |
| Section                       | Ein Baustein auf einer Seite, mit Zweck, Datenquelle und Form. Kann auf mehreren Seiten identisch vorkommen. Der [Section-Katalog](sections/README.md) listet sie                         |
| Item                          | Ein kleines Element innerhalb einer Section: Button, Karte, Pill, Chip, Kontaktkarte. Siehe [Items](elemente/items.md)                                                                    |
| Umfang                        | One-Pager, Multipage klassisch oder Multipage groß. Siehe [Umfänge](03-umfaenge.md)                                                                                                       |
| Storyline                     | Die Antworten, die die Startseite in Reihenfolge gibt: warum, für wen, was, warum jetzt, was tun. Siehe [Storyline](01-storyline.md)                                                      |
| Anforderungsworkshop          | Das Gespräch vor dem Design, in dem der Veranstalter die Fragen beantwortet. Siehe [Vorbereitung](vorbereitung/README.md)                                                                 |
| Komponente, Widget            | Ein `<sv-*>`-Element: Speaker, Agenda, Sponsoren, Event und Kapazität kommen aus Streavent, Galerie und Collection aus dem Editor des Kunden. Listen bekommen ihr Markup als `<template>` |
| Collection                    | Eine vom Designer deklarierte Liste gleich geformter Einträge, die der Kunde selbst pflegt (FAQ, Stimmen, Videos, Vorjahres-Speaker). Startdaten liegen im Bundle                         |
| Statisches Feld               | Ein Text, Bild oder Video mit `data-sv-field`, das der Kunde im Editor ändert. Schlüssel nach `sektion.element`                                                                           |
| Ausblendbarer Abschnitt       | Ein Block mit `data-sv-section`, den der Kunde im Editor ein- und ausschaltet. Ausgeblendet steht er nicht im Live-HTML                                                                   |
| Empty-State                   | Was eine Komponente zeigt, solange keine Daten da sind. Ist Inhalt, kein "Bald verfügbar". Siehe [Vorjahr](vorjahr.md)                                                                    |
| Vorjahr                       | Speaker, Partner oder Programm der letzten Ausgabe als Collection, als Platzhalter oder Rückblick                                                                                         |
| Kategorie                     | Die frei benannte Gruppe, in der Streavent Sponsoren und Speaker führt: Stufen, Publika, Rollen. Die Website filtert und gruppiert danach                                                 |
| Freie Plätze                  | Noch nicht vergebene Sponsorenplätze je Kategorie, als Kachel sichtbar                                                                                                                    |
| Detailseite, dynamische Seite | Eine Vorlage, aus der je Eintrag einer Collection eine eigene Adresse entsteht (`/fuer-:slug`). Alternative: Popup ohne eigene Adresse                                                    |
| Popup, Panel                  | Detail ohne Seitenwechsel, im Item-Template der Komponente                                                                                                                                |
| Partial                       | Header, Menü und Footer als eine Datei, die in alle Seiten eingespielt wird. Eigenes Werkzeug des Designers, die SDK kennt kein Include                                                   |
| Token                         | Farben, Verlauf, Schriften, Radius, Formen als CSS-Variablen an einer Stelle; Grundlage für Vorlagen und Brand Engine                                                                     |
| Kicker, Eyebrow               | Kurzes Label über einer Überschrift                                                                                                                                                       |
| CTA                           | Call to Action, der Button, der zur Handlung führt; primär die Ticket-Handlung                                                                                                            |
| Reservierte Route             | Adressen, die die Plattform belegt (`/shop`, `/register`, `/tickets`, `/login` und weitere). Nur verlinken, keine eigene Seite                                                            |
| Bundle                        | Das Zip aus `src/` und Manifest, das in die Plattform geladen wird                                                                                                                        |
| Manifest                      | `streavent.config.json`: Name, Sprachen, Collections, dynamische Seiten, SEO-Defaults, Redirects                                                                                          |
| Staging                       | Die Vorschau-Adresse vor dem Go-Live; muss im Consent-Tool freigeschaltet sein                                                                                                            |
| Consent-Tool                  | Der Cookie-Banner-Dienst des Kunden, der Tracking erst nach Einwilligung freigibt                                                                                                         |
| Filestore, CDN                | Der Ablageort für Videos und große Dateien außerhalb des Bundles                                                                                                                          |
| Validator                     | `npm run validate`; derselbe Contract-Check, den die Plattform beim Upload fährt. Collection-Felder und Adressen prüft sie zusätzlich                                                     |
| Brand Engine                  | Das Werkzeug, das aus den Tokens der Website Vorlagen für Social, Folien und Print erzeugt. Zusatzpaket, nicht Teil der SDK                                                               |

---

Kapitel: [Übersicht](README.md) · [Vorbereiten](vorbereitung/README.md) · [Verstehen](00-prinzip.md) · [Auswählen](seiten/README.md) · [Bauen](daten.md) · [Live gehen](bauen/go-live.md) · **Glossar**
