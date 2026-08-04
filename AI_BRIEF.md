# Vibe Sites — KI-Onboarding-Brief

> **Zweck:** Kompakte, system-prompt-fertige Spezifikation für die KI, die mit einem Designer eine
> Streavent Vibe Site baut. Vollständige Begründungen stehen im [`DESIGNER_CONTRACT.md`](./DESIGNER_CONTRACT.md);
> dieser Brief ist die Kurzfassung, die du direkt als Kontext laden kannst. Maschinen-Katalog:
> `dist/custom-elements.json` (CEM) + `dist/COMPONENT_CATALOG.md` (generiert aus der Registry).

## Deine Rolle

Du baust eine **Event-Website als reines HTML/CSS/JS** im Sample-Repo. Struktur und Layout gehören
dir (frei, „vibe-coded"). Inhalte und Live-Daten bindest du über eine schmale Konvention an
Streavent an. Du baust **kein** CMS und **keine** Build-Pipeline — nur die Seite.

## Die drei Schichten (das Kernprinzip)

1. **Struktur/Layout = Code** — dein HTML/CSS/JS. Frei.
2. **Statischer Inhalt = `data-sv-field`** — Texte/Bilder, die der Kunde später inline editiert.
3. **Dynamische Daten = `<sv-*>`** — Speaker, Agenda, Sponsoren etc. aus dem CMS.

**Zwei Wahrheiten:** (a) `data-bind="feld"` heißt immer „Feld des **aktuellen** Datenobjekts".
(b) Du baust jede Seite **einmal, sprachneutral** — Streavent vervielfältigt sie pro Sprache.

## Seiten & Routing

- Datei → URL: `src/index.html` → `/`, `src/about.html` → `/about`. Assets in Unterordnern
  (`/css`, `/js`, `/img`, `/fonts`, `/icons`), nie im Root (außer `favicon.ico`).
- Dynamische Detailseiten (eine Vorlage → viele URLs) deklarierst du in `streavent.config.json`.

### `streavent.config.json` (Pflichtfelder)

`name` (string), `languages` (nicht-leeres Array), `defaultLanguage` (∈ `languages`).
Optional `dynamicPages[]` (`template`, `collection` ∈ {`speakers`, `agenda`}, `route` mit `:slug`,
`slugFrom`) und `seo` (`defaultOgImage`, `titleSuffix`).

### Reservierte Top-Level-Routen (NICHT als Seitenname verwenden)

`shop register sessions ticket tickets checkout feedback app login booth zoom invoice registration check`
— dorthin nur **verlinken**.

## Statische Inhalte: `data-sv-field`

Schreib echten Inhalt direkt ins Markup und markiere ihn:
`<h1 data-sv-field="hero.title">Willkommen</h1>`. Streavent extrahiert den Text beim ersten Publish
als Default; der Kunde überschreibt ihn inline. Schlüssel feature-namespacen (`hero.title`).

## Dynamische Daten: `<sv-*>`-Komponenten

Alle Listen-Komponenten sind **renderless**: du lieferst ein `<template>` mit `data-bind`-Stellen,
die Komponente wiederholt es pro Datensatz. Optional `<template slot="empty">`. In verschachtelte
Arrays gehst du mit `<sv-each field="…">`. Hilfs-Attribute: `data-format="date|time|datetime"`,
`data-join=", "`, `data-sv-show/hide="feld"`, `limit`, `sort`.

**Katalog (Felder → siehe `dist/COMPONENT_CATALOG.md` für Details):**

| Tag                      | Art          | Wichtigste Felder                                                                                     |
| ------------------------ | ------------ | ----------------------------------------------------------------------------------------------------- |
| `<sv-event>`             | Einzelobjekt | name, description, startDate, endDate, location, organizer, image, logo                               |
| `<sv-capacity>`          | Einzelobjekt | atCapacity, waitlistEnabled (für `data-sv-show/hide`)                                                 |
| `<sv-speakers>`          | Liste        | name, bio, image, company, position, website, linkedIn, twitter                                       |
| `<sv-agenda>`            | Liste        | topic, description, date, dateEnd, stage, type, category, headerImg, speakers, dayName                |
| `<sv-sponsors>`          | Liste        | name, logoUrl, bannerUrl, description, website, documents (`group="category"`: name, color, sponsors) |
| `<sv-events>`            | Liste        | name, location, eventDateTime, url (noch nicht verdrahtet)                                            |
| `<sv-gallery field="…">` | Liste        | image, alt, caption (kundeneditierbar)                                                                |
| `<sv-langswitch>`        | Liste        | code, label, url, isCurrent                                                                           |
| `<sv-image field="…">`   | Einzelbild   | Attribute: field (Pflicht), default, sizes, loading, alt                                              |

Auf Detailseiten (`dynamicPages`) bindest du die Felder der Collection **direkt** (kein `<sv-*>`-Wrapper).
Zusätzlich verfügbar auf detail-verlinkbaren Einträgen: `url`, `slug`.

### Detail als Popup statt Subpage

Listen-Komponenten binden **jedes Feld** in jeden Eintrag — für ein Popup brauchst du daher
**keinen Slug, keine Route, keinen zweiten Fetch**. Leg das Detail-Markup (z. B. ein natives
`<dialog>` mit `data-bind`) ins Item-`<template>` und toggle es mit eigenem Vanilla-JS
(`showModal()` / `<form method="dialog">`):

```html
<sv-speakers>
  <template>
    <article>
      <h3 data-bind="name"></h3>
      <button type="button" onclick="this.closest('article').querySelector('dialog').showModal()">Mehr</button>
      <dialog>
        <h2 data-bind="name"></h2>
        <div data-bind="bio"></div>
        <form method="dialog"><button>Schließen</button></form>
      </dialog>
    </article>
  </template>
  <template slot="empty"><p>Bald verfügbar.</p></template>
</sv-speakers>
```

Trade-off: Popup = schneller Blick, aber keine teilbare URL / kein SEO/OG. Routed Subpage
(`dynamicPages`) = eigene, teilbare URL mit SSR/OG. Schnellansicht → Popup; verlinkbare Seite → Subpage.

## Harte Regeln

- **Erfinde keine Tags/Felder.** Nur die oben gelisteten existieren — alles andere meldet der Validator.
- Editierbare Bilder immer `<sv-image>`/`<sv-gallery>` (Responsive/Formate automatisch), Design-Assets als normales `<img>`.
- Keine eigene Seite mit reserviertem Routennamen.
- Light DOM — dein CSS greift voll; style die `<sv-*>` ganz normal über Klassen/Selektoren.

## Workflow

```bash
npm start            # lokale Vorschau (localhost:3001) + Contract-Banner bei Problemen
npm run validate     # Contract-Check; muss grün sein vor Abgabe (Exit 1 bei Fehlern)
npm run package      # erzeugt my-event-site.zip (src/ + streavent.config.json)
```

Die ZIP enthält **genau** `src/` + `streavent.config.json` — kein `runtime/`, `node_modules/`, `dist/`.
Update = neue ZIP. Vor jeder Abgabe `npm run validate` ohne Fehler.
