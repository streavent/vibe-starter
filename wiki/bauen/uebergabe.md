# Hochladen und übergeben

[Übersicht](../README.md) › [Bauen](README.md) › Hochladen und übergeben

Wenn die [Go-Live-Checkliste](go-live.md) durch ist, wird aus dem Projekt ein Bundle, und das
Bundle kommt in die Plattform. Ab dann lebt die Seite in Streavent.

## Das Bundle

`npm run package` prüft noch einmal und packt `src/` und das Manifest in ein Zip. Mehr braucht die
Plattform nicht: keine Mock-Daten, keine Runtime, keine Rohdateien. Startdaten der Collections liegen
unter `src/collections/` und wandern mit.

## Drei Wege in die Plattform

- **Selbst hochladen:** Im Streavent-CMS des Events die Custom Website aktivieren und das Zip
  hochladen. Die Plattform rendert die Seite und stellt sie unter der Staging-Adresse bereit.
- **Repository übergeben:** Das Projekt auf GitHub oder einem anderen Git-Hoster ablegen und Streavent
  den Zugang geben. Streavent baut das Bundle und lädt es hoch.
- **Zip an Streavent geben:** Das fertige Zip an Streavent schicken. Ein Streavent-Designer kennt
  den Weg und lädt es hoch.

## Nach dem Upload

- Custom Domain setzen, DNS beim Kunden umstellen, Staging- und Live-Domain im Consent-Tool
  freischalten.
- Programm, Speaker, Sponsoren und Kapazität kommen ab jetzt live aus dem Event in Streavent; wer
  dort etwas ändert, ändert die Website.
- Texte, Bilder und Collections bearbeitet der Kunde direkt in Streavent im Editor, ohne Bundle
  und ohne Designer.
- Eine neue Fassung der Seite ist ein neues Zip. Was der Kunde im Editor geändert hat, bleibt
  erhalten, solange die Feldschlüssel gleich bleiben; ein Bundle, das ein Collection-Feld
  entfernt, in dem der Kunde Inhalt hat, wird abgelehnt.

Siehe auch: [Go-Live-Checkliste](go-live.md) · [Technik](../technik.md) · [Daten](../daten.md)

---

Kapitel: [Übersicht](../README.md) · [Vorbereiten](../vorbereitung/README.md) · [Verstehen](../00-prinzip.md) · [Auswählen](../seiten/README.md) · [Bauen](../daten.md) · [Live gehen](go-live.md) · [Glossar](../glossar.md)
