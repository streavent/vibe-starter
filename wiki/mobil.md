# Mobil

[Übersicht](README.md) › Mobil

- Unter 960 px nur das Fullscreen-Menü, Burger rechts, Ticket-CTA als letztes Element im Overlay
  und zusätzlich im klebenden Header. `viewport-fit=cover`, `env(safe-area-inset-top)` und ein
  Deckstreifen oberhalb, weil iOS die Statusbar-Zone durchscrollen lässt.
- Section-Abstände kleiner als am Rechner, Hero-Text kleiner, Section-Köpfe zentriert, Chips als
  Raster statt Seitwärts-Scroller (Scrollbarkeit wird nicht erkannt).
- Kein Quer-Scroll: lange Wörter, Tabellen (`overflow-x:auto` im Wrapper), Agenda-Spalten
  `minmax(0,1fr)`. Jede Runde bei 390×844 prüfen.
- Scroll-Effekte auf Mobil vereinfachen oder abschalten; eine Karte darf das Motiv nicht überdecken.
- Bilderleisten auf eine Reihe, Speaker-Auszug kürzen, Videos mit `preload="none"`, kein Autoplay
  mit Ton.

Siehe auch: [Header, Menü, Footer](elemente/header-menue-footer.md)

---

Kapitel: [Übersicht](README.md) · [Vorbereiten](vorbereitung/README.md) · [Verstehen](00-prinzip.md) · [Auswählen](seiten/README.md) · [Bauen](daten.md) · [Live gehen](bauen/go-live.md) · [Glossar](glossar.md)
