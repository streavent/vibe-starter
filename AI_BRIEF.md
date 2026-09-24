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
Optional:

- `collections[]` — eigene Datenobjekte des Kunden (s. u.)
- `dynamicPages[]` — `template`, `collection` (`speakers`, `agenda`, `sponsors` **oder ein
  eigener Collection-Name**), `route` mit `:slug`, `slugFrom`
- `seo` — `defaultOgImage`, `titleSuffix`
- `redirects` — `{ "/alt.html": "/neu" }`, nur wenn die Site eine bestehende ABLÖST. Der
  Normalfall (`.html` fällt weg) passiert von selbst; hier stehen nur echte Umbenennungen.
  Beides root-absolut. Schleifen, Ziele auf App-Routen und Quellen, die die Site selbst
  ausliefert, lehnt der Validator ab.

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
`data-join=", "`, `data-sv-show/hide="feld"`, `limit`, `sort`, `filter="feld:wert"`,
`exclude="feld:wert"` (Reihenfolge: filtern → sortieren → begrenzen; Groß-/Kleinschreibung und
Leerzeichen egal). Rohwerte fürs eigene Layout: `data-bind-attr="attribut:feld, …"` — schreibt
UNFORMATIERT in beliebige Attribute (`style` und `on*` gesperrt). Auf einem Komponenten-HOST
einer Detailseite bindet `data-bind-attr` gegen den Datensatz der Seite:
`<sv-agenda data-bind-attr="filter:agendaFilter">`.

**Tage nie hart codieren.** Ein Programm über mehrere Tage ist **eine**
`<sv-agenda group="day">` — Tabs mit demselben Datum werden ein Tag, jeder Tab bleibt eine Spur
in `tracks`. Nie `day="1"`, `day="2"` … nebeneinander: `day` ist ein **Tab-Index**, parallele
Workshops liegen oft als eigene Tabs am selben Datum und fielen still weg. Die Tagesnummer für
„Tag 2" ist `dayNumber` (am Tag); `dayIndex` an einem Eintrag ist die Position seines Tabs, keine
Tagesnummer. Für eigene Raster in JavaScript die flache `<sv-agenda>` mit `dayDate`/`dayName`
nehmen (Contract 10.5).

**Katalog (Felder → siehe `dist/COMPONENT_CATALOG.md` für Details):**

| Tag                        | Art          | Wichtigste Felder                                                                                                |
| -------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `<sv-event>`               | Einzelobjekt | name, description, startDate, endDate, location, organizer, image, logo                                          |
| `<sv-capacity>`            | Einzelobjekt | atCapacity, waitlistEnabled (für `data-sv-show/hide`)                                                            |
| `<sv-speakers>`            | Liste        | name, bio, image, company, position, website, linkedIn, twitter, featured, category                              |
| `<sv-agenda>`              | Liste        | topic, description, date, dateEnd, stage, type, category, headerImg, speakers, dayName, dayDate, dayIndex, dayId |
| `<sv-agenda group="day">`  | Liste (Tage) | dayName, dayDate, dayNumber, entries, tracks (name, entries), hasTracks, stages                                  |
| `<sv-sponsors>`            | Liste        | name, logoUrl, bannerUrl, description, website, documents, slug, url (`group="category"`: name, color, sponsors) |
| `<sv-events>`              | Liste        | name, location, eventDateTime, url (noch nicht verdrahtet)                                                       |
| `<sv-gallery field="…">`   | Liste        | image, alt, caption (kundeneditierbar; Bundle-Defaults via `<template slot="default">`)                          |
| `<sv-collection name="…">` | Liste        | die im Manifest deklarierten Felder dieser Collection (+ `slug`, `url`)                                          |
| `<sv-langswitch>`          | Liste        | code, label, url, isCurrent                                                                                      |
| `<sv-image field="…">`     | Einzelbild   | Attribute: field (Pflicht), default, sizes, loading, alt                                                         |
| `<sv-video field="…">`     | Einzelvideo  | Attribute: field (Pflicht), default, poster; autoplay/muted/loop/playsinline/preload/class werden durchgereicht  |

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

## Eigene Collections: `<sv-collection>`

Wenn der Kunde eine Liste gleich geformter Datensätze selbst pflegen soll (Streams, Zielgruppen,
FAQ), deklarierst DU das Schema, ER pflegt die Einträge — hinzufügen, löschen, sortieren,
bearbeiten, aber nie die Felder ändern.

```jsonc
// streavent.config.json
"collections": [{
  "name": "streams", "label": "Streams", "itemLabel": "name",
  "defaults": "collections/streams.json",     // Startdaten, relativ zu src/
  "fields": [
    { "key": "name",  "type": "text", "required": true, "section": "Kopfbereich" },
    { "key": "color", "type": "color" },
    { "key": "img",   "type": "image" },
    { "key": "takeaways", "type": "text", "repeat": true },
    { "key": "cases", "type": "group", "repeat": true,
      "fields": [{ "key": "who", "type": "text" }, { "key": "quote", "type": "text" }] }
  ]
}]
```

Feldtypen: `text`, `richtext`, `link` (`{label,href}`), `cta` (`{label,href}`), `image`
(`{src,alt}`), `video` (String: Datei-Pfad ODER YouTube-/Vimeo-Link), `color` (`#rrggbb`),
`group` (**genau eine** Verschachtelungsebene). `"repeat": true` macht aus jedem Typ eine Liste.
`section` gruppiert nur das CMS-Formular (nur oberste Ebene). `slug`/`url` sind reserviert und
werden beim Rendern gesetzt.

Im Markup dieselbe Mechanik wie `<sv-speakers>`; wiederholte Felder innerhalb eines Eintrags mit
`<sv-each field="…">` — bei einer Liste einfacher Texte ist `data-bind="."` der Wert selbst, bei
`image`/`link`/`cta` bindest du die Wert-Keys (`src`, `href`, …).

Ein `dynamicPages`-Eintrag auf diese Collection gibt **jedem Eintrag eine eigene URL**; der Kunde
legt einen Datensatz an und die Seite entsteht beim nächsten Rendern.

Zwei Regeln, die man sonst erst beim Publish merkt:

- **Eine gespeicherte Liste gewinnt** — auch eine bewusst geleerte. Nur ihr Fehlen fällt auf die
  `defaults` zurück. Gleiches gilt für `<sv-gallery>`.
- **Ein Bundle-Update, das ein Feld entfernt, wird abgelehnt**, sobald Einträge dafür Inhalt
  tragen. Erst im CMS leeren, dann hochladen.

## Harte Regeln

- **Erfinde keine Tags/Felder.** Nur die oben gelisteten existieren — alles andere meldet der Validator.
- Editierbare Bilder immer `<sv-image>`/`<sv-gallery>` (Responsive/Formate automatisch), Design-Assets als normales `<img>`.
- Editierbare Videos (Datei, kein YouTube/Vimeo) als `<sv-video>`; der Kunde tauscht Video und Vorschaubild. Video-Links gehören in ein Collection-Feld `video` + Lightbox, Standard-Paar dort: `poster` (image) + `video` (video).
- Keine eigene Seite mit reserviertem Routennamen.
- Light DOM — dein CSS greift voll; style die `<sv-*>` ganz normal über Klassen/Selektoren.

## Workflow

```bash
npm start            # lokale Vorschau (localhost:3001) + Contract-Banner bei Problemen
npm run validate     # Contract-Check; muss grün sein vor Abgabe (Exit 1 bei Fehlern)
npm run package      # erzeugt my-event-site.zip (src/ + streavent.config.json)
```

Die ZIP enthält **genau** `src/` + `streavent.config.json` — kein `mock-data/`, `node_modules/`,
keine Runtime. Die Startdaten deiner Collections liegen deshalb unter `src/collections/` und
wandern mit; `mock-data/` ist reine Vorschau und bleibt draußen.
Update = neue ZIP. Vor jeder Abgabe `npm run validate` ohne Fehler.
