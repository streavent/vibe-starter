# Streavent Vibe Site — Sample Repo

Ein lauffähiges Beispielprojekt für eine Streavent **Vibe Site**.
Es klont sich der Designer, um eine Custom-Event-Website zu vibe-coden. Die komplette Dev-Runtime
(Render, Validator, `sv`-CLI, Browser-Bundle) kommt als npm-Paket `@streavent/sv-runtime` — das
Sample selbst enthält nur deine Seite (`src/`), die Config und Mock-Daten.

> Voller Contract: [`DESIGNER_CONTRACT.md`](DESIGNER_CONTRACT.md)

## Start

```bash
npm install
npm start          # http://localhost:3001  (leitet auf /de/)
```

## Datenquelle: Mock (Default) oder Live

Standardmäßig rendert die Runtime gegen die lokalen `mock-data/`. Zum Entwickeln kann man auf
echte Backend-Daten umschalten (nur lokales Dev-Tooling — vor einem Designer-Handoff wieder auf
Mock sperren):

```bash
VIBE_DATA_SOURCE=api \
VIBE_API_BASE_URL=https://api.streavent.de/api/app \
VIBE_EVENT_ID=<eventId> \
npm start
# Kurzform für die zwei bekannten Ziele: VIBE_API_ENV=local | production
```

> Live-Modus zieht die Daten aus den öffentlichen `/public/*`-Endpoints — also nur aus einem
> bereits veröffentlichten Event. Statische Inhalte (`data-sv-field`, Galerien) bleiben immer
> lokal. Andere Umgebungen als `local` und `production` erreichst du über `VIBE_API_BASE_URL`;
> die URL bekommst du von deinem Streavent-Kontakt.

## Embed-Component (Browser)

Dieselbe `<sv-*>`-Logik wie der Server-Render läuft auch als echtes Custom Element im Browser —
für interaktive Filter (Hydration) **und** als einpluggbares Embed auf fremden Seiten. `npm start`
injiziert das Browser-Bundle (`@streavent/sv-runtime` → `dist/sv-runtime.js`) automatisch; es muss
nicht selbst gebaut werden. Bundle, CEM (`custom-elements.json`) und Katalog
(`COMPONENT_CATALOG.md`) liefert das Paket fertig mit.

**`demo/embed-demo.html`** im Browser öffnen — sie stubt `fetch` mit Beispieldaten, läuft also
ohne Backend und zeigt drei Nutzungen: Zero-Config (Default-Design), Restyle via `--sv-accent`,
und volles eigenes `<template>`. Für ein echtes Backend `window.SV_API_BASE` setzen.

## Contract prüfen

Der Validator prüft deine Seite gegen den Component-Katalog und das Config-Schema — bevor du
die ZIP abgibst. Er fängt u. a.: unbekannte `<sv-*>`-Tags (Tippfehler), Listen ohne Item-`<template>`
(rendern still leer), fehlende Pflicht-Attribute, Kollisionen mit reservierten App-Routen,
fehlerhafte `streavent.config.json` und `data-bind` auf unbekannte Felder.

```bash
npm run validate   # einmaliger Check; Exit-Code 1 bei Fehlern (CI-tauglich)
```

Der Dev-Server (`npm start`) prüft zusätzlich automatisch: ein **Report beim Start** und ein
**Banner unten links** auf jeder Seite, die Probleme hat. Dieselbe Engine (`@streavent/sv-runtime`)
läuft später im CMS als Publish-Gate.

## Aufbau

```text
streavent.config.json   # Manifest: Sprachen, dynamische Seiten, SEO
src/                     # ← hier baust du deine Seite (reines HTML/CSS/JS)
  index.html             # Landing
  programm.html          # Agenda-Übersicht
  session.html           # dynamische Detailseite → /programm/<slug>
  speakers.html          # Speaker-Übersicht
  speaker.html           # dynamische Detailseite → /speakers/<slug>
  sponsoren.html         # Sponsoren (nach Kategorie gruppiert)
  kontakt.html           # Kontaktformular + Venue
  faq.html               # FAQ (statisches Markup, Texte editierbar)
  css/  js/  img/        # deine Assets
mock-data/               # Beispiel-Daten für die lokale Vorschau
demo/embed-demo.html     # Embed-Demo (Custom Element im Browser, ohne Backend)
```

> Die Dev-Runtime (Render, Validator, `sv`-CLI, Browser-Bundle) liegt **nicht** im Repo, sondern
> im npm-Paket `@streavent/sv-runtime` (devDependency). Sie wird nicht bearbeitet.

## Welche Bausteine das Sample demonstriert

| Baustein                                           | Wo                               |
| -------------------------------------------------- | -------------------------------- |
| `data-sv-field` (statisch, editierbar)             | überall (Hero, Headings, Footer) |
| `<sv-event>` (Einzelobjekt)                        | index, kontakt                   |
| `<sv-speakers>` + Detailseite                      | index, speakers, speaker         |
| `<sv-agenda>` + nested `<sv-each>` + Detailseite   | index, programm, session         |
| `<sv-sponsors>` (flach **und** `group="category"`) | index, sponsoren                 |
| `<sv-gallery>`                                     | index                            |
| `<sv-capacity>` + `data-sv-show/hide`              | index                            |
| `<sv-langswitch>` + i18n (`/de`, `/en`)            | header, alle Seiten              |
| dynamische Detailseiten (`:slug`)                  | speaker, session                 |

> Header/Footer sind in jeder Seite **inline** (keine Include-Magie) — geteilte Layouts managt
> der Designer mit seinem eigenen Tooling. FAQ/Testimonials/Themen sind statisches Markup.

## Verpacken (Handoff)

```bash
npm run package    # erzeugt my-event-site.zip (src/ + streavent.config.json)
```

> Es ist **derselbe** Renderer und **derselbe** Validator, die auch die Plattform beim
> Veröffentlichen ausführt — nur die Datenquelle unterscheidet sich (Mock statt Live-Event).
> Was lokal grün ist und richtig aussieht, sieht auch veröffentlicht so aus.
