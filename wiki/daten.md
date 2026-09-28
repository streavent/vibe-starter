# Streavent-Daten, Collection oder statisch

[Übersicht](README.md) › Streavent-Daten, Collection oder statisch

| Frage                                                         | Antwort                                                                                                             |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Programm, Speaker, Sponsoren, Kapazität, Event-Stammdaten?    | `<sv-*>` aus Streavent. Auch wenn noch leer, dann Empty-State                                                       |
| Liste gleich geformter Einträge, die der Kunde selbst pflegt? | Collection (FAQ, Stimmen, Presse, Videos, Zielgruppen, Themenbereiche, Artikel, Vorjahres-Speaker, Partner-Gruppen) |
| Text, Bild oder Video, das sich ändern kann?                  | `data-sv-field`, `<sv-image>` bzw. `<sv-video>`, Schlüssel `sektion.element`                                        |
| Block, den der Kunde ein- und ausschalten soll?               | `data-sv-section`, dazu `data-sv-hidden`, wenn er ausgeblendet startet                                              |
| Block, den der Kunde selbst hinzufügen soll?                  | Eine Collection je Section-Typ, das Item-Template enthält den ganzen Block                                          |
| Design (Hintergrund, Motiv, Icon)?                            | Normales `<img>` oder CSS, nicht editierbar                                                                         |
| Eigenes JS baut die Ausgabe um?                               | `data-sv-widget-region`                                                                                             |

Regeln, die man sonst erst beim Publish merkt: `url` und `slug` sind in Collections reserviert,
deshalb `link`. Die Namen `speakers`, `agenda` und `sponsors` sind für eigene Collections
gesperrt. Eine gespeicherte Liste gewinnt über die Defaults, auch eine geleerte. Ein Feld
entfernen geht nur, wenn kein Kunde Inhalt darin hat. Richtext kennt keine Überschriften:
Erlaubt sind fett, kursiv, unterstrichen, Absätze, Listen, Links und `span` mit Klasse; andere
Tags entfernt das Speichern, ihr Text bleibt. Je Komponente
ein `filter` und ein `exclude`, jeweils mit einem Paar `feld:wert`. Collections pflegt der Kunde
je Sprache.

Wie die Komponenten technisch funktionieren, steht im `DESIGNER_CONTRACT.md` und im
`COMPONENT_CATALOG.md`; dieses Wiki wiederholt das nicht.

Siehe auch: [Vorjahr und aktuelle Daten](vorjahr.md)

---

Kapitel: [Übersicht](README.md) · [Vorbereiten](vorbereitung/README.md) · [Verstehen](00-prinzip.md) · [Auswählen](seiten/README.md) · **Bauen** · [Live gehen](bauen/go-live.md) · [Glossar](glossar.md)
