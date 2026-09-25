# Streavent Vibe Sites — Designer & KI Contract

> **Status:** 🟢 Erste vollständige Fassung (Kap. 1–14). Die konkrete Komponenten-Mechanik
> (`<sv-*>`, Attribute) ist noch an die finale Implementierung der Runtime gebunden und kann sich
> im Detail ändern.
>
> **Für wen:** Dich (Designer) und deine KI. Dieses Dokument ist bewusst so geschrieben,
> dass du es deiner KI als Kontext geben kannst. Konkrete Beispiele, klare Regeln,
> ein Cheat-Sheet am Ende.

---

## Inhalt

1. [Überblick & Mentalmodell](#1-überblick--mentalmodell)
2. [Schnellstart](#2-schnellstart)
3. [Projekt- & Seitenstruktur](#3-projekt--seitenstruktur)
4. [Statische Inhalte & Inline-Editing](#4-statische-inhalte--inline-editing)
5. [Dynamische Daten — die `<sv-*>`-Komponenten](#5-dynamische-daten--die-sv-komponenten)
6. [Bilder & Assets](#6-bilder--assets)
7. [Mehrsprachigkeit (i18n)](#7-mehrsprachigkeit-i18n)
8. [Verlinkung in die Streavent-App](#8-verlinkung-in-die-streavent-app)
9. [SEO & Meta](#9-seo--meta)
10. [JavaScript, Libraries & Interaktivität](#10-javascript-libraries--interaktivität)
11. [Dev & Preview](#11-dev--preview)
12. [Publish & Go-Live](#12-publish--go-live)
13. [Constraints & Do's / Don'ts](#13-constraints--dos--donts)
14. [Referenz / Cheat-Sheet](#14-referenz--cheat-sheet)

---

## 1. Überblick & Mentalmodell

Du baust eine **ganz normale Website** mit HTML, CSS und JavaScript. Du darfst gestalten,
animieren und Libraries laden, wie du willst. Es gibt nur **zwei Konzepte**, die du zusätzlich
kennen musst, damit die Seite mit Streavent zusammenarbeitet.

### Die drei Schichten

| Schicht               | Was                                  | Wem gehört's               | Wie änderbar                                            |
| --------------------- | ------------------------------------ | -------------------------- | ------------------------------------------------------- |
| **Struktur / Layout** | Dein HTML/CSS/JS                     | Dir (Designer)             | Du baust es, Updates per neuer ZIP                      |
| **Statischer Inhalt** | Texte, Bilder, Button-Labels         | Dem Kunden (zum Editieren) | Du markierst die Stellen, der Kunde editiert sie inline |
| **Dynamische Daten**  | Speaker, Agenda, Sponsoren, Sessions | Streavent (CMS)            | Du bindest sie ein, gepflegt werden sie im CMS          |

### Zwei Wahrheiten, die alles erklären

1. **Du besitzt das Markup. Streavent besitzt die Daten und die Editierbarkeit.**
   Du schreibst frei HTML. An den Stellen, wo Inhalt editierbar oder dynamisch sein soll,
   benutzt du eine Handvoll Streavent-Bausteine (`data-sv-field` und `<sv-*>`-Elemente).

2. **Du baust Struktur. Der Kunde ändert nur Inhalt.**
   Der Kunde kann Texte und Bilder ändern, die du als editierbar markiert hast — aber er kann
   keine Sections hinzufügen, verschieben oder löschen. Das ist Absicht: Es ist eine
   Agenturleistung, dass die Seite gut aussieht und bleibt. Neue Struktur = neue ZIP von dir.

### Was frei ist und was reserviert

- ✅ **Frei:** beliebiges HTML/CSS/JS, eigene Libraries, eigene Assets, eigene Subpages,
  Animationen, Layout — alles.
- ⛔ **Reserviert:** ein paar Top-Level-Pfade gehören der Streavent-App (Ticketshop, Login …).
  Dort baust du keine eigenen Seiten, sondern verlinkst nur dorthin. → siehe
  [Kapitel 8](#8-verlinkung-in-die-streavent-app) und [13](#13-constraints--dos--donts).

---

## 2. Schnellstart

### 2.1 Sample-Repo klonen

Du startest nicht bei null. Klon dir das Sample-Repo — es enthält die lokale Runtime,
Mock-Daten, dieses Dokument und eine lauffähige Beispielseite.

```bash
git clone <sample-repo-url> my-event-site
cd my-event-site
npm install
npm start          # lokale Vorschau auf http://localhost:3001
```

### 2.2 Aufbau des Repos

```text
my-event-site/
├── streavent.config.json    # Site-Manifest (Sprachen, Collections, dynamische Seiten, SEO)
├── src/                     # ← HIER baust du deine Seite
│   ├── index.html
│   ├── about.html
│   ├── speaker.html         # dynamische Detailseite (1 Template → viele Speaker-Seiten)
│   ├── collections/         # Startdaten deiner eigenen Collections (JSON, siehe 4.9)
│   ├── css/
│   ├── js/
│   └── img/
├── mock-data/               # Beispiel-Speaker/Agenda/Sponsoren für die lokale Vorschau
├── DESIGNER_CONTRACT.md     # dieses Dokument
├── AI_BRIEF.md              # Kurzfassung als KI-Kontext
└── package.json
```

> Die Dev-Runtime (`<sv-*>`, Renderer, Validator, `sv`-CLI, Browser-Bundle) liegt **nicht** im
> Repo, sondern im npm-Paket `@streavent/sv-runtime` (devDependency). Sie wird nicht bearbeitet.
>
> Du arbeitest praktisch nur in **`src/`** und in **`streavent.config.json`**.
> Was du am Ende ablieferst, ist genau dieser Inhalt als ZIP → siehe [Kapitel 12](#12-publish--go-live).

### 2.3 Hello World — die drei Bausteine an einem Beispiel

```html
<!-- src/index.html -->
<section class="hero">
  <!-- (1) STATISCHER, editierbarer Text: Default steht im Markup, Kunde editiert ihn inline -->
  <h1 data-sv-field="hero.title">Willkommen zur TechConf 2026</h1>
  <p data-sv-field="hero.subtitle">Drei Tage Zukunft, live in Berlin.</p>

  <!-- (2) Ein Link in die Streavent-App (Ticketshop) -->
  <a href="/shop" class="btn">Tickets sichern</a>
</section>

<section class="speakers">
  <h2 data-sv-field="speakers.heading">Unsere Speaker</h2>

  <!-- (3) DYNAMISCHE Daten: du lieferst das Markup im <template>, Streavent füllt die Daten -->
  <sv-speakers sort="name">
    <template>
      <article class="speaker-card">
        <img data-bind="image" alt="" />
        <h3 data-bind="name"></h3>
        <span data-bind="company"></span>
      </article>
    </template>

    <!-- Pflicht: Leerzustand, falls (noch) keine Speaker gepflegt sind -->
    <template slot="empty">
      <p>Die Speaker werden bald bekanntgegeben.</p>
    </template>
  </sv-speakers>
</section>
```

Das ist alles, was es im Kern gibt:

- `data-sv-field="…"` → markiert **statischen, editierbaren** Inhalt. Der Text dazwischen ist
  dein Default.
- `<sv-*>` mit einem `<template>` drin → **dynamische** Daten; du bestimmst das Markup,
  `data-bind="…"` setzt die Datenfelder ein.
- normales `<a href="/shop">` → Übergang in die Streavent-App.

> Beim lokalen `npm start` rendern die `<sv-*>` mit den **Mock-Daten** aus `mock-data/`,
> damit du sofort etwas siehst.

---

## 3. Projekt- & Seitenstruktur

Deine Seite ist ein **datei-basiertes Projekt**: Jede HTML-Datei in `src/` wird zu einer URL.
Du kannst beliebig viele Seiten, Unterordner und Assets anlegen. Es gibt nur drei Regeln zu
verstehen — Mapping, dynamische Detailseiten, reservierte Namen — plus eine Manifest-Datei.

### 3.1 Datei → URL-Mapping (statische Seiten)

Jede `.html`-Datei in `src/` wird anhand ihres Pfads zu einer „sauberen" URL:

| Datei                         | URL                   |
| ----------------------------- | --------------------- |
| `src/index.html`              | `/`                   |
| `src/about.html`              | `/about`              |
| `src/agenda.html`             | `/agenda`             |
| `src/programm/workshops.html` | `/programm/workshops` |

> Es gilt „clean URLs": `about.html` wird unter `/about` ausgeliefert (ohne `.html`).
> `index.html` in einem Ordner ist die Indexseite des Ordners (`src/blog/index.html` → `/blog`).

### 3.2 Assets & Ordner

Eigene Assets (Bilder, CSS, JS, Fonts) legst du in **Unterordnern** ab und referenzierst sie
relativ:

```text
src/
├── index.html
├── css/styles.css
├── js/main.js
└── img/hero.jpg
```

```html
<link rel="stylesheet" href="/css/styles.css" /> <img src="/img/hero.jpg" alt="" />
```

> ⚠️ **Keine Asset-Dateien direkt ins Root** (`src/styles.css`) — nutze Unterordner.
> Ein paar Root-Dateien sind aber ok und erwünscht: `favicon.ico`, `robots.txt`, `sitemap.xml`.

### 3.3 Dynamische Detailseiten (eine Vorlage → viele Seiten)

Du willst nicht 50 Speaker-Seiten von Hand bauen. Stattdessen baust du **eine Vorlage**, und
Streavent multipliziert sie pro Datensatz.

> Das gilt nicht nur für Streavent-Daten: eine eigene **Collection** (siehe
> [4.9](#49-custom-collections--wiederkehrende-datenobjekte)) funktioniert hier genauso — der
> Kunde legt einen Eintrag an, die Seite dazu entsteht beim nächsten Rendern.

1. Du legst die Vorlage an, z. B. `src/speaker.html`.
2. Im Manifest deklarierst du, dass sie pro Speaker vervielfältigt wird (siehe 3.4).
3. Auf der Vorlage bindest du die Felder des **aktuellen** Datensatzes mit `data-bind="…"` —
   hier **ohne** `<template>`-Loop, weil es genau ein Objekt ist (der Speaker zur jeweiligen URL):

```html
<!-- src/speaker.html  →  erzeugt /speakers/anna-schmidt, /speakers/max-mueller, … -->
<head>
  <!-- auch Meta darf an den Datensatz gebunden werden (siehe Kap. 9) -->
  <title data-bind="name"></title>
</head>
<body>
  <main class="speaker-detail">
    <img data-bind="photo" alt="" />
    <h1 data-bind="name"></h1>
    <span data-bind="company"></span>
    <div data-bind="bio"></div>
  </main>
</body>
```

> Merksatz: `data-bind` heißt immer „Feld des **aktuellen** Datenobjekts". Innerhalb eines
> `<sv-*>`-`<template>` ist das das jeweilige Listen-Element; auf einer Detailseite ist es der
> Datensatz, der zur URL gehört.

### Alternative: Detail als Popup statt Subpage

Eine routed Subpage (oben) ist nicht der einzige Weg zu einer Detailansicht. Da die
Listen-Komponenten (`<sv-speakers>`, `<sv-agenda>`) **jedes Feld** in jeden Eintrag binden, hast
du die Detaildaten bereits im Item — für ein Popup brauchst du also **keinen Slug, keine Route und
keinen zweiten Fetch**. Leg das Detail-Markup (z. B. ein natives `<dialog>` mit `data-bind`-Feldern)
direkt in das Item-`<template>` und öffne/schließe es mit deinem eigenen Vanilla-JS
(`showModal()` / `<form method="dialog">`).

```html
<sv-speakers>
  <template>
    <article class="speaker">
      <h3 data-bind="name"></h3>
      <button type="button" onclick="this.closest('article').querySelector('dialog').showModal()">Mehr</button>

      <dialog class="speaker-detail">
        <img data-bind="image" alt="" />
        <h2 data-bind="name"></h2>
        <p data-bind="position"></p>
        <div data-bind="bio"></div>
        <form method="dialog"><button>Schließen</button></form>
      </dialog>
    </article>
  </template>
  <template slot="empty"><p>Bald verfügbar.</p></template>
</sv-speakers>
```

> **Popup vs. Subpage:** Das Popup ist ein schneller Blick — kein eigener Link, nicht teilbar,
> kein eigenes SEO/OG. Die routed Subpage (via `dynamicPages`) hat eine **eigene, teilbare URL**
> mit SSR/OG-Tags. Faustregel: Schnellansicht in der Liste → Popup; eigenständige, verlinkbare
> Detailseite → Subpage.

### 3.4 `streavent.config.json` — das Manifest

Die eine maschinenlesbare Datei im Projekt-Root, in der du das deklarierst, was man dem HTML
**nicht ansehen kann**: Sprachen, dynamische Seiten, SEO-Defaults. Die Render-Pipeline liest sie.

```jsonc
{
  // Anzeigename der Site (intern / Fallback-Titel)
  "name": "TechConf 2026",

  // Unterstützte Sprachen; die erste/`defaultLanguage` ist die Standardsprache
  "languages": ["de", "en"],
  "defaultLanguage": "de",

  // Welche Seiten sind dynamische Detail-Vorlagen und woran hängen sie?
  "dynamicPages": [
    {
      "template": "speaker.html", // Datei in src/
      "collection": "speakers", // bestehende Streavent-Collection (s. u.)
      "route": "/speakers/:slug", // daraus entstehen /speakers/anna-schmidt, …
      "slugFrom": "name" // woraus der URL-Slug gebaut wird
    }
  ],

  // Optionale SEO-Defaults, falls eine Seite nichts Eigenes setzt
  "seo": {
    "defaultOgImage": "/img/og-default.jpg",
    "titleSuffix": " · TechConf 2026"
  },

  // Nur wenn diese Site eine bestehende ABLÖST: alte Adressen auf ihr neues Zuhause
  "redirects": {
    "/tickets.html": "/teilnehmen"
  }
}
```

**Feld-Referenz:**

| Feld                        | Pflicht | Bedeutung                                                              |
| --------------------------- | ------- | ---------------------------------------------------------------------- |
| `name`                      | ✅      | Anzeigename der Site (interner Fallback-Titel)                         |
| `languages`                 | ✅      | Liste der Sprachcodes, z. B. `["de", "en"]`                            |
| `defaultLanguage`           | ✅      | Standardsprache (muss in `languages` sein)                             |
| `collections[]`             | –       | Eigene Datenobjekte des Kunden (siehe 4.9)                             |
| `dynamicPages[]`            | –       | Dynamische Detail-Vorlagen (leer/weglassen, wenn keine)                |
| `dynamicPages[].template`   | ✅\*    | Dateiname der Vorlage in `src/`                                        |
| `dynamicPages[].collection` | ✅\*    | `speakers`, `agenda`, `sponsors` oder ein eigener `collections[].name` |
| `dynamicPages[].route`      | ✅\*    | URL-Muster mit `:slug`                                                 |
| `dynamicPages[].slugFrom`   | ✅\*    | Feld, aus dem der Slug erzeugt wird                                    |
| `seo.defaultOgImage`        | –       | Fallback-OG-Bild (Pfad im Bundle)                                      |
| `seo.titleSuffix`           | –       | Suffix, das an jeden Seitentitel gehängt wird                          |
| `redirects`                 | –       | `{ alt: neu }` für Adressen einer abgelösten Site (s. u.)              |

> \* Pflicht, sobald ein `dynamicPages`-Eintrag existiert.
>
> **Verfügbare Collections** für Detailseiten: `speakers`, `agenda` und `sponsors` aus den
> Streavent-Daten — plus **jede eigene Collection**, die du unter `collections[]` deklariert hast
> (siehe 4.9). Ein Name, den es weder als Streavent-Collection noch in deiner Deklaration gibt,
> schlägt bei der Validierung fehl. Diese drei Namen sind reserviert: Eine eigene Collection
> darf nicht so heißen.
>
> **Breaking Change — `sponsors`:** Der Name ist neu reserviert. Hat dein Bundle eine eigene
> Collection `sponsors` deklariert, **benenne sie vor dem nächsten Upload um** (z. B. `partner`)
> und passe `dynamicPages[].collection`, `<sv-collection name="…">` und die Inhalte an. Ein
> erneuter Upload mit dem alten Namen schlägt bei der Validierung fehl; wird die bestehende Site
> nur neu gerendert, liest `collection: "sponsors"` still die Streavent-Sponsoren — deine
> eigenen Detailseiten liefern dann 404.
>
> Eine **Sponsoren-Detailseite** zeigt einen Sponsor mit seinen Feldern aus 5.3 plus `category`
> (Name seiner Stufe). Zwei Sponsoren mit demselben Namen bekommen verschiedene Slugs — an den
> lesbaren Teil wird ein kurzer, stabiler Hash ihrer Id gehängt, genau wie bei Speakern und
> Sessions. Auf Übersichtsseiten verlinkst du mit `data-bind="url"`.

#### Alte Adressen mitnehmen: `redirects`

Wenn deine Site eine bestehende ersetzt, zeigen Links aus Suchergebnissen, Presseartikeln und
Social-Posts weiter auf die **alten** Adressen. Die Pipeline kann sie nicht erraten — sie kennt
nur die Seiten, die es jetzt gibt, und ein Pfad, den es nicht mehr gibt, sieht für sie genauso
aus wie einer, den es nie gab.

**Den häufigsten Fall musst du nicht deklarieren.** War die alte Site eine Sammlung von
`.html`-Dateien und deine hat saubere URLs, erledigt das die Auslieferung von selbst: Die
Endung fällt weg, und wenn der Rest ein Pfad ist, den deine Site wirklich ausliefert, geht ein
`301` darauf. `/programm.html` → `/programm`, `/index.html` → `/`. Ohne Zutun, für alle Seiten.

`redirects` ist für die Umbenennungen, die diese Regel **nicht** erraten kann:

```jsonc
"redirects": {
  "/tickets.html": "/teilnehmen",   // Seite heisst jetzt anders
  "/team.html": "/ueber-uns"
}
```

Beides root-absolut (führender `/`). Die Validierung lehnt ab, was schlimmer wäre als kein
Redirect: eine Schleife, ein Ziel auf einer [reservierten App-Route](#35-reservierte-routen--namen)
— und eine Quelle, die deine Site selbst ausliefert, denn das machte diese Seite dauerhaft
unerreichbar.

> Warum das genau genommen werden muss: Ein `301` wird vom Browser dauerhaft gemerkt. Ein
> falscher Eintrag verschwindet deshalb nicht dadurch, dass du ihn wieder herausnimmst.

### 3.5 Reservierte Routen / Namen

Ein paar Top-Level-Pfade gehören der Streavent-App (Ticketshop, Login, Sessions …). **Benenne
keine eigene Seite oder Top-Level-Sektion so** — sonst überschattet deine Seite die App-Funktion
auf dieser Domain. Dorthin wird nur **verlinkt** (siehe Kap. 8).

Reserviert sind diese Top-Level-Namen:

```text
shop        register     sessions     ticket       tickets
checkout    feedback     app          login        booth
zoom        invoice      registration check
```

> Praktisch relevant sind vor allem `shop`, `register`, `sessions`, `ticket(s)`, `feedback`,
> `app`. Die übrigen sind unwahrscheinliche Kollisionen, aber der Vollständigkeit halber gelistet.
> Alles **außerhalb** dieser Namen gehört dir.

### 3.6 Zusammenfassung der Struktur

```text
src/
├── index.html              →  /
├── about.html              →  /about
├── agenda.html             →  /agenda
├── speaker.html            →  Vorlage → /speakers/<slug>   (via streavent.config.json)
├── collections/*.json      →  Startdaten deiner Collections (keine URL, siehe 4.9)
├── css/  js/  img/         →  deine Assets (in Unterordnern)
└── favicon.ico             →  ok im Root
streavent.config.json       →  Manifest (Sprachen, Collections, dynamische Seiten, SEO)
```

## 4. Statische Inhalte & Inline-Editing

„Statischer Inhalt" sind die Texte, Bilder und Buttons, die **du gestaltest** und die der
**Kunde später anpassen** kann — ohne dein Layout anfassen zu können. Du markierst die Stellen,
der Kunde editiert sie inline auf der Live-Seite.

### 4.1 Das Prinzip: markieren, nicht auslagern

Du schreibst den echten Inhalt **direkt ins Markup** — als gäbe es kein CMS. Das ist dein
Default und sorgt dafür, dass die Seite beim Bauen sofort schön aussieht. Du markierst das
Element nur mit `data-sv-field="key"`:

```html
<h1 data-sv-field="hero.title">Willkommen zur TechConf 2026</h1>
```

Beim ersten Publish **extrahiert** Streavent diesen Text als Default-Wert des Feldes `hero.title`.
Ab dann kann der Kunde ihn inline überschreiben. Du musst nichts in eine separate Datei auslagern.

### 4.2 Syntax

```html
<element data-sv-field="key" data-sv-type="text">Default-Inhalt</element>
```

- `data-sv-field` — der eindeutige Feld-Schlüssel (Pflicht).
- `data-sv-type` — der Feld-Typ (optional, Default `text`).
- Der Inhalt/das Attribut im Markup ist der **Default**.

### 4.3 Feld-Typen

| `data-sv-type`   | Für was                    | Was der Kunde editiert                                      | Default kommt aus                                                         |
| ---------------- | -------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| `text` (Default) | Überschriften, kurze Texte | Reiner Text (eine/mehrere Zeilen)                           | Textinhalt des Elements                                                   |
| `richtext`       | Fließtext mit Formatierung | Text + begrenzte Formatierung (fett, kursiv, Links, Listen) | innerer HTML-Inhalt                                                       |
| `link`           | Logo-/Icon-Link            | Nur das Ziel (`href`, optional `download`), Text bleibt     | `href`-Attribut                                                           |
| `cta`            | Buttons / Call-to-Action   | Label **und** Ziel (`href`, optional `download`)            | Text + `href`                                                             |
| `image`          | Austauschbares Bild        | Bild hochladen/zuschneiden + Alt-Text                       | siehe [Kap. 6](#6-bilder--assets)                                         |
| `video`          | Austauschbares Video       | Videodatei + Vorschaubild ersetzen (`{ src, poster }`)      | `src`/`poster` am `<video>`, siehe [6.7](#67-editierbare-videos-sv-video) |

```html
<!-- text -->
<h2 data-sv-field="about.heading">Über das Event</h2>

<!-- richtext: begrenzte Formatierung erlaubt -->
<div data-sv-field="about.body" data-sv-type="richtext">
  <p>Drei Tage <strong>Zukunft</strong>, live in Berlin.</p>
</div>

<!-- cta: Label + href editierbar -->
<a data-sv-field="hero.cta" data-sv-type="cta" href="/shop" class="btn">Tickets sichern</a>

<!-- link: nur das Ziel editierbar -->
<a data-sv-field="footer.imprint" data-sv-type="link" href="https://example.com/impressum">Impressum</a>
```

**Gespeicherter Wert von `link`/`cta`:** `{ label?, href?, download? }`. Das Ziel kann eine
Web-Adresse, `mailto:`, `tel:` oder eine hochgeladene Datei sein (siehe „Links" in 4.6).
`download: true` rendert das `download`-Attribut (der Besucher lädt die Datei herunter),
`download: false` entfernt ein von dir gesetztes, fehlt es, bleibt dein Markup, wie es ist.

> **`richtext` ist bewusst begrenzt.** Beim Speichern läuft der Wert durch eine feste
> Allowlist — alles andere wird verworfen:
>
> | Erlaubt                                                                       | Verworfen                                       |
> | ----------------------------------------------------------------------------- | ----------------------------------------------- |
> | `b` `strong` `i` `em` `u` `a` `p` `br` `ul` `ol` `li` `span`                  | jedes andere Tag (`div`, `h2`, `img`, `table`…) |
> | `class` auf allen davon                                                       | `style`, `id`, `on*`, alle sonstigen Attribute  |
> | `href`/`target`/`rel`/`download` auf `a`; Schemata `http(s)`, `mailto`, `tel` | `javascript:`, `data:`, `vbscript:`             |
>
> `span` + `class` sind ausdrücklich drin, damit deine Inline-Auszeichnung
> (`<span class="grad">`) eine Kundenbearbeitung überlebt. `style` bleibt draußen.
>
> **Formatieren im Editor:** Solange ein `richtext`-Feld den Cursor hat, zeigt der Editor darüber
> eine kleine Leiste mit **fett**, _kursiv_, Aufzählung und Link (dazu die Schriftgröße, siehe
> 4.6). Überschriften gibt es dort bewusst nicht — die Hierarchie der Seite ist dein Markup. Die
> Leiste erzeugt nur Tags aus der Allowlist oben (`b`, `i`, `ul`/`li`, `a`); ⌘/Strg + B, I, U
> gehen weiterhin.

> ⚠️ **Enthält das Element Inline-Markup, nimm `richtext` — nicht `text`.** `text` wird als
> reiner Text bearbeitet und gespeichert, d. h. beim ersten Speichern verschwindet jedes
> Kind-Element. Eine Überschrift wie
> `<h2 data-sv-field="…">Wir schützen <span class="grad">was zählt.</span></h2>` verliert so
> ihre Auszeichnung. Faustregel: **steht ein `<` zwischen den Tags, ist es `richtext`.**

### 4.4 Schlüssel-Benennung & Gruppierung

Benenne Felder nach dem Schema **`sektion.element`**:

```text
hero.title        hero.subtitle      hero.cta
about.heading     about.body
footer.copyright
```

- Der **Präfix vor dem ersten Punkt** (`hero`, `about`, `footer`) gruppiert die Felder im
  CMS-Editor zu Abschnitten — der Kunde sieht sie sauber unter „Hero", „About", „Footer".
- **Gleicher Schlüssel = gleicher Wert, überall.** Verwendest du `footer.copyright` auf jeder
  Seite, pflegt der Kunde ihn **einmal** und er erscheint überall. Praktisch für Footer, Nav,
  wiederkehrende Claims.
- Willst du pro Seite **unterschiedliche** Werte, präfixe mit der Seite:
  `home.hero.title` vs. `about.hero.title`.

### 4.5 Was beim Publish passiert (und wer gewinnt)

1. **Erstes Publish:** Der Content-Store ist leer. Jedes Feld zeigt seinen Markup-Default, solange
   kein Wert gespeichert ist — Defaults werden nicht kopiert, sie bleiben in deinem Markup.
2. **Kunde editiert:** Der überschriebene Wert landet im Content-Store.
3. **Du lieferst ein Update (neue ZIP):** Solange ein Feld-Schlüssel **gleich bleibt**, behält
   der Content-Store den Wert des Kunden — **der editierte Wert gewinnt** über den neuen Markup-
   Default. Benennst du den Schlüssel um, gilt der neue Default (der alte Wert verwaist).

> Merksatz: **gespeicherter Wert > Markup-Default.** Ändere Schlüssel nur bewusst.

### 4.6 Was der Kunde im Edit-Modus sieht und darf

- Der Edit-Modus lädt **nur für eingeloggte Bearbeiter** — normale Besucher sehen davon nichts.
- Editierbare Elemente bekommen beim Hovern eine Markierung. Klick → inline bearbeiten
  (Text direkt, `cta`/`link` über ein kleines Formular für Label/Ziel, `image` über den
  Upload-/Zuschneide-Dialog, `video` über einen Dialog für Video und Vorschaubild).
- **Der Editor verändert Layout und Stil deiner Elemente nicht; er markiert nur.** Die
  Markierung lebt ausschließlich in `outline`, Cursor und Chips. Ein runder Button bleibt
  im Editor rund, ein Button behält seine Farbe – was du im Edit-Modus siehst, ist dein CSS.
- Speichern → Wert im Content-Store → Seite wird neu gerendert.
- **Leere Felder bleiben greifbar.** Löscht der Kunde einen Text komplett, zeigt der Editor an
  seiner Stelle einen blassen Platzhalter („Leer – zum Bearbeiten klicken"). Das ist die eine
  bewusste Ausnahme von „der Editor fasst keine Boxen an": ein leeres Inline-Element hat keine
  Breite, ohne Platzhalter wäre das Feld nicht mehr anklickbar. Der Platzhalter ist ein
  `::before`-Inhalt nur im Edit-Modus; `display`, Box-Eigenschaften und gefüllte Felder bleiben
  unberührt; ein leeres Element bekommt nur durch den Platzhalter eine Ausdehnung. Auf der
  Live-Seite gibt es ihn nicht.
- **„Original wiederherstellen".** Jedes Feld, für das in der aktuellen Sprache ein Wert oder
  eine Schriftgröße gespeichert ist, lässt sich zurücksetzen: Bilder, Videos, Links und Buttons
  über einen Chip „↺ Original wiederherstellen" beim Hovern, Text und Richtext über denselben
  Knopf in der Formatierungs-Leiste. Ein Klick löscht Wert **und** Schriftgröße, und dein
  Markup-Default greift wieder. Deshalb ist der Default im Markup nie nur Platzhalter — er ist
  der Stand, zu dem der Kunde zurückkehren kann.
- **Formatierungs-Leiste.** Hat ein `text`- oder `richtext`-Feld den Cursor, erscheint darüber
  eine kleine Leiste (neben dem Feld, nie im Layout-Fluss):
  - `richtext`: **fett**, _kursiv_, Aufzählung, Link.
  - `text` und `richtext`: Schriftgröße `A−  16px  A+` in 1-px-Schritten, 8–200 px. Startwert ist
    die Größe, die dein CSS gerade berechnet.
  - „↺ Original wiederherstellen", sobald das Feld einen gespeicherten Wert oder eine Größe hat.
  - Bild-, Video-, Link- und Button-Felder bekommen keine Leiste; Collection-Einträge auf einer
    Detailseite (Eintrags-Modus) auch nicht — eine Schriftgröße gehört zum Feld-Schlüssel, und
    ein Eintragsfeld hat keinen.
- **Die Schriftgröße gilt für das ganze Feld, in absoluten px, auf jedem Viewport.** Sie wird
  beim Rendern als `font-size:<n>px` in das `style`-Attribut des Elements geschrieben (eine
  vorhandene `font-size`-Angabe dort wird ersetzt, alles andere bleibt) — damit schlägt sie
  auch deine Media Queries. Eine Headline, die auf dem Desktop mit 64 px gut aussieht, ist auf
  dem Smartphone ebenfalls 64 px. Der Kunde kann das im Editor mit dem Viewport-Schalter
  (Desktop/Smartphone) prüfen; der Wert selbst ist eine Zahl, kein CSS aus dem Browser.
- **`data-sv-lock="style"`** am Feld nimmt es aus der Formatierung heraus: keine Leiste, keine
  Schriftgröße, nur der Zurücksetzen-Knopf bleibt. In `richtext` gehen fett, kursiv und
  unterstrichen weiter über ⌘/Strg + B, I, U; einen Link kann der Kunde dort nicht setzen. Nimm es für Felder, deren Größe dein Layout trägt (Hero-Claim
  mit `clamp()`, Zahlen in Kacheln). Dokumentiert, vom Validator nicht geprüft.
- **Schriftgröße und Sprachen.** Die Größe wird wie der Text pro Sprache gespeichert und fällt
  auf die Standardsprache zurück (7.4). Eine Größe, die eine Zweitsprache nur von der
  Standardsprache erbt, wird deshalb in der **Standardsprache** zurückgesetzt.
- **Links.** Das Link-Formular (für `link`/`cta` und für den Link-Knopf in `richtext`) hat vier
  Reiter: **URL** (`https://…` oder ein Pfad der Seite), **E-Mail** (wird zu `mailto:`),
  **Telefon** (wird zu `tel:`, Leerzeichen entfernt) und **Datei** (Upload über die
  Team-Mediathek — PDF, Office-Dateien, CSV, TXT, ZIP; der Link bekommt `download`). In
  `richtext` markiert der Kunde Text und setzt den Link darauf, oder er setzt den Cursor in
  einen vorhandenen Link und ändert ihn oder entfernt ihn. Klicks auf Links navigieren im
  Editor nie, sie setzen nur den Cursor.

| Der Kunde **kann**                                                                                           | Der Kunde **kann nicht**                        |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| Markierte Texte ändern                                                                                       | Feste Sections hinzufügen/verschieben/löschen   |
| Bilder und Videos austauschen                                                                                | Layout/Design ändern                            |
| Link-Ziele & Button-Labels anpassen — Web-Adresse, E-Mail, Telefon oder Datei-Download                       | Etwas editieren, das **nicht** markiert ist     |
| Galerie-Bilder verwalten                                                                                     | Speaker-/Agenda-/Partner-Inhalte hier ändern    |
| Felder auf deinen Default zurücksetzen                                                                       | Überschriften-Ebenen oder neue Elemente anlegen |
| Richtext formatieren: fett, kursiv, Aufzählung, Links                                                        | `data-sv-lock="style"`-Felder formatieren       |
| Die Schriftgröße eines Text-/Richtext-Felds ändern (feldweit, px)                                            |                                                 |
| Mit `data-sv-section` markierte Abschnitte aus- und einblenden ([4.10](#410-abschnitte-aus--und-einblenden)) |                                                 |
| Sections hinzufügen, die du als Collection vorsiehst ([4.11](#411-sections-die-der-kunde-selbst-hinzufügt))  |                                                 |

#### Was mit `<sv-*>`-Komponenten passiert

Ausgabe von `<sv-speakers>`, `<sv-agenda>`, `<sv-sponsors>` & Co. ist **nicht** inline
editierbar — die Daten liegen im Event, nicht in der Seite. Im Edit-Modus umrahmt der Editor
diese Blöcke beim Hovern und benennt sie („Agenda-Widget"); ein Klick auf den Chip öffnet das
zuständige CMS-Modul in einem neuen Tab. Ohne diese Markierung sähe der Kunde Markup, das wie
handgeschriebener Text aussieht, sich aber nicht anfassen lässt — mit keinem Hinweis darauf,
wo die Inhalte wirklich gepflegt werden.

`<sv-gallery>` ist die Ausnahme: Ihre Bilder liegen im Content-Store, der Chip öffnet deshalb
direkt den Bilder-Dialog (hinzufügen, entfernen, sortieren, Alt/Caption). Solange nichts
gespeichert ist, zeigt der Dialog die Bilder aus `<template slot="default">` — also genau das,
was die Seite gerade rendert.

Du musst dafür normalerweise **nichts** tun: Die Markierung entsteht beim Rendern und ist im
veröffentlichten HTML nicht enthalten.

#### `data-sv-widget-region` — wenn dein JavaScript die Ausgabe umbaut

Der Renderer markiert genau die Knoten, die **er** erzeugt hat. Sobald dein eigenes JavaScript
damit etwas anderes macht, geht diese Spur verloren:

- Du **versteckst** die gerenderte Liste und baust die sichtbare Ansicht selbst
  (`.ag-list { display: none }` + ein per JS gebautes Raster) → der Editor findet nur
  unsichtbare Knoten und zeigt gar nichts an.
- Du **verteilst** die Ausgabe über einen Slider/Marquee, der breiter als der Viewport ist
  → der Rahmen ist zwar da, beginnt aber weit außerhalb des Bildschirms.

Dann sag dem Editor selbst, welches Element er umrahmen soll:

```html
<!-- Desktop-Ansicht: das per JS gebaute Raster -->
<div class="ag-gridwrap" data-sv-widget-region="sv-agenda"></div>

<!-- Mobile-Ansicht: die gerenderte Liste -->
<div class="ag-list" data-sv-widget-region="sv-agenda">
  <sv-agenda>…</sv-agenda>
</div>

<!-- Galerie im Slider: den sichtbaren Container umrahmen, nicht die laufenden Bilder -->
<div class="photostrip" data-sv-widget-region="sv-gallery" data-sv-widget-field="event.gallery">
  <sv-gallery field="event.gallery">…</sv-gallery>
</div>
```

Regeln:

- Wert = der Komponenten-Tag (`sv-agenda`, `sv-speakers`, `sv-sponsors`, `sv-gallery`).
- Mehrere Regionen mit demselben Wert sind erlaubt — genau so löst man Desktop/Mobile.
  Ist eine davon unsichtbar, wird sie übersprungen.
- Eine Region ersetzt die automatische Markierung **innerhalb** von ihr; es gibt nie zwei
  Rahmen übereinander.
- Bei `sv-gallery` braucht die Region den Feldschlüssel, wenn sie die Komponente nicht
  umschließt — `data-sv-widget-field="…"`.

#### `data-sv-widget-entry` — einen einzelnen Datensatz treffen

Der Rahmen um den ganzen Block ist die richtige Antwort für eine Liste, die als Liste gepflegt
wird. Für eine Agenda ist er es nicht: Der Kunde zeigt auf den 11:30-Panel, weil er genau den
ändern will — und bekäme eine Seite mit achtundvierzig Zeilen zum Suchen.

Deshalb stempelt der Renderer im Editor-Modus auf jede gerenderte Karte die Id ihres
Datensatzes (`data-sv-widget-entry="<id>"`). Klick auf die Karte → das CMS öffnet genau diesen
Agendapunkt. Im veröffentlichten HTML steht das Attribut nicht.

**Du musst dafür nichts tun** — außer in genau einem Fall: Wenn dein JavaScript die Karten
selbst neu baut (siehe oben), musst du die Id mitnehmen, sonst kennt der Editor nur den Block.

```js
// beim Auslesen der gerenderten Quelle
var id = card.getAttribute('data-sv-widget-entry') || '';
// beim Bauen der eigenen Kachel wieder mitgeben
html += '<div class="my-card"' + (id ? ' data-sv-widget-entry="' + id + '"' : '') + '>…</div>';
```

Regeln:

- Nur Streavent-Daten haben eine Id. Collection-Einträge werden über ihre Position adressiert
  (`data-sv-widget-item`), die der Editor selbst setzt.
- Ob ein Klick auf einen einzelnen Datensatz überhaupt angeboten wird, entscheidet das CMS —
  nur dort ist bekannt, ob das Zielmodul einen einzelnen Datensatz öffnen kann. Aktuell:
  `sv-agenda`. Für alles andere bleibt der Block-Rahmen stehen.
- Ein Datensatz ohne Id bekommt keinen Stempel; dann greift wieder der Block-Rahmen.
- Bei `<sv-agenda group="day">` trägt nicht der Tag den Stempel, sondern jede Karte aus
  `<sv-each field="entries">` — ein Tag hat keinen Datensatz, die Sessions darin schon.

#### Wenn deine Seite sich neu rendert

Ein Tab-Wechsel, ein Filter, ein Zeitraster, das sich in JavaScript neu aufbaut: Der Editor
liest das Dokument danach erneut und findet die neuen Knoten von selbst. Du musst nur dafür
sorgen, dass die Marker mitkommen — `data-sv-field` an den Texten, `data-sv-widget-entry` an
den Karten.

**Verschiebe markierte Knoten, statt sie neu zu schreiben.** Ein `data-sv-field`-Element, das
du per `appendChild` an seinen Platz bewegst, behält seine Identität und den Cursor des
Kunden; eines, das du als HTML-String neu erzeugst, ist ein anderer Knoten — er wird zwar
wieder editierbar, aber eine laufende Eingabe geht verloren.

```js
// Der gepflegte Tagestext gehört dem Content-Store, nicht deinem Renderer:
// ihn per textContent neu zu schreiben, wirft den Feldmarker weg.
out.innerHTML = tabs + '<div class="head-slot"></div>' + grid;
out.querySelector('.head-slot').append(headOf(day)); // derselbe Knoten, neuer Platz
```

### 4.7 Gute vs. schlechte editierbare Felder

- ✅ Markiere **Inhalt**: Überschriften, Fließtexte, Button-Labels, Bilder.
- ✅ Auch **Kennzahlen und Kurzlabels** sind Inhalt: „75+ Speaker:innen", „3 Plätze frei",
  „Tag 1 · Di, 11. Mai 2027". Der Kunde ändert genau die — ein Feld wegzulassen, weil es kurz
  ist, macht die Zahl zu Struktur, die nur du noch anfassen kannst.
- ⛔ Nicht markieren: reine **Icons und Zierzeichen** (`×`, `●`, `✓`) und alles, was dein
  eigenes JavaScript ohnehin überschreibt.
- 🔒 Trägt die Schriftgröße eines Felds dein Layout (ein Hero-Claim mit `clamp()`, eine Zahl
  in einer festen Kachel), setz `data-sv-lock="style"`: der Text bleibt editierbar, die Größe
  nicht. Ohne Sperre darf der Kunde sie feldweit in px setzen — auf allen Viewports gleich (4.6).
- 📐 Wenn ein Feld eng ist, ist die Antwort **Platz im Design**, nicht ein fehlendes Feld:
  `min-width`, Umbruch erlauben, `text-wrap: balance`. Ein Badge, das bei zwei Wörtern mehr
  bricht, ist ein Layoutfehler — kein Grund, dem Kunden seinen eigenen Text wegzunehmen.

### 4.8 Mehrsprachigkeit (Kurz-Hinweis)

Jeder Feld-Wert wird **pro Sprache** gespeichert. Dein Markup-Default ist der Wert der
Standardsprache; andere Sprachen starten leer und werden vom Kunden übersetzt. Details in
[Kap. 7](#7-mehrsprachigkeit-i18n).

### 4.9 Custom Collections — wiederkehrende Datenobjekte

`data-sv-field` macht **eine Stelle** editierbar, `<sv-gallery>` **eine Bilderliste**. Was
beiden fehlt: eine Liste gleich geformter **Datensätze**, die der Kunde selbst erweitern kann —
vier Fach-Streams, drei Zielgruppen, sechs Rollen. Genau dafür sind Collections da.

**Du deklarierst die Form, der Kunde pflegt die Einträge.** Er kann Einträge hinzufügen,
löschen, sortieren und alle Felder bearbeiten — aber nie die Felder selbst ändern, denn dein
`data-bind` zeigt darauf.

#### Schritt 1 — Schema im Manifest

```jsonc
"collections": [
  {
    "name": "streams",                        // Bezeichner für Markup + dynamicPages
    "label": "Streams",                       // Überschrift im CMS
    "itemLabel": "name",                      // welches Feld einen Eintrag betitelt
    "defaults": "collections/streams.json",   // Startdaten, relativ zu src/
    "fields": [
      { "key": "name",  "label": "Name",  "type": "text", "required": true },
      { "key": "claim", "label": "Claim", "type": "text" },
      { "key": "color", "label": "Farbe", "type": "color" },
      { "key": "img",   "label": "Bild",  "type": "image" },
      { "key": "takeaways", "label": "Mitnehmen", "type": "text", "repeat": true },
      { "key": "cases", "label": "Stimmen", "type": "group", "repeat": true,
        "fields": [
          { "key": "who",   "label": "Wer",   "type": "text" },
          { "key": "quote", "label": "Zitat", "type": "richtext" }
        ]
      }
    ]
  }
]
```

| Feldtyp    | Gespeicherter Wert | Eingabe im CMS                       |
| ---------- | ------------------ | ------------------------------------ |
| `text`     | String             | einzeiliges Feld                     |
| `richtext` | String (HTML)      | Rich-Text-Editor (Allowlist wie 4.3) |
| `link`     | `{ label, href }`  | Text + URL                           |
| `cta`      | `{ label, href }`  | wie `link`, als Button               |
| `image`    | `{ src, alt }`     | Upload + Cropper                     |
| `video`    | String (URL)       | Upload **oder** YouTube-/Vimeo-Link  |
| `color`    | `#rrggbb`          | Farbwähler                           |
| `group`    | Objekt             | Unterformular                        |

`"repeat": true` macht aus jedem Typ eine Liste. **`group` darf genau eine Ebene tief sein** —
ein `group` in einem `group` lehnt der Validator ab.

> `slug` und `url` sind reserviert: die Laufzeit setzt sie pro Eintrag (siehe Schritt 3).

##### `video` ist `text` mit einer besseren Eingabe

Der gespeicherte Wert ist derselbe blanke String wie bei `text` — ein Pfad im Bundle
(`/static/video/aftermovie.mp4`), die URL einer hochgeladenen Datei oder ein YouTube-/
Vimeo-Link. Binde ihn also genauso: `data-bind="video"`, `data-bind-attr="data-lightbox:video"`.

Der Unterschied liegt allein im CMS: `text` zwingt den Organisator, einen Pfad zu **tippen**,
den er nur kennt, wenn er das Bundle gesehen hat. `video` gibt ihm einen Upload-Knopf und ein
Linkfeld. Deklariere `video` überall dort, wo heute ein Pfad in einem `text`-Feld steht.

> **Standard-Paar für Videos in Collections:** ein `poster`-Feld vom Typ `image` (das
> Vorschaubild, das du im Raster zeigst) plus ein `video`-Feld vom Typ `video` (das, was
> die Lightbox abspielt). So kann der Kunde beides getrennt austauschen, und ein YouTube-Link
> bekommt trotzdem ein eigenes Vorschaubild.

> **Deine Wiedergabe muss beide Fälle können.** Eine eigene Lightbox, die den Wert in ein
> `<video src>` steckt, zeigt bei einem YouTube-Link nichts. Prüfe den Wert und baue im
> Zweifel ein `<iframe>` — `src/js/lightbox.js` im Sample-Repo macht genau das vor (die
> Stream-Detailseite benutzt es).

##### `section` — Überschriften im Eingabeformular

Optional pro Feld der obersten Ebene:

```jsonc
{ "key": "seoTitle", "label": "Seitentitel", "type": "text", "section": "Suchmaschinen" }
```

Felder mit derselben `section` erscheinen im CMS zusammen unter dieser Überschrift, in der
Reihenfolge des Schemas — auch dann, wenn das Schema sie auseinanderreißt; die Überschrift
steht dort, wo ihr erstes Feld deklariert ist. Felder ohne `section` bilden einen eigenen
Block ohne Überschrift. Am Wert, am Rendern und an der Bindung ändert das **nichts** — es ist
reine Lesbarkeit des Formulars.

Ab etwa acht Feldern lohnt es sich: ein Stream mit fünfzehn Feldern ist ohne Abschnitte eine
einzige Spalte gleich aussehender Eingaben, in der man das gesuchte Feld nur findet, wenn man
das Schema auswendig kennt. Benenne die Abschnitte nach dem, was auf der **Seite** passiert
(„Kopfbereich", „Programm", „Suchmaschinen"), nicht nach dem Datentyp („Texte", „Bilder").

#### Schritt 2 — Startdaten mitliefern

Die in `defaults` genannte Datei ist ein Array von Einträgen:

```jsonc
// src/collections/streams.json
[
  {
    "name": "Regulatorik & Compliance",
    "claim": "…",
    "color": "#FF6A36",
    "img": { "src": "/img/streams/regulatorik.jpg", "alt": "…" },
    "takeaways": ["…", "…"],
    "cases": [{ "who": "…", "quote": "…" }]
  }
]
```

Gleiche Regel wie bei `<sv-gallery>`: **eine gespeicherte Liste gewinnt** — auch eine bewusst
geleerte. Ohne Startdaten steht der Kunde beim ersten Öffnen vor einer leeren Seite.

> **Die Startdaten sind sprachneutral, die gepflegten Einträge nicht.** Die `defaults`-Datei
> gibt es einmal und sie füllt jede Sprache. Sobald der Kunde Einträge pflegt, liegen sie
> **pro Sprache** im Content-Store: Was er in `/de` anlegt, erscheint nicht in `/en`. Auf einer
> zweisprachigen Site heißt das, jede Collection wird zweimal gepflegt — plane das ein, statt
> es beim ersten Sprachwechsel zu entdecken.

#### Schritt 3 — Im Markup

Kein neuer Loop: `<sv-collection>` ist dieselbe Mechanik wie `<sv-speakers>`.

```html
<sv-collection name="streams">
  <template>
    <a class="stream-card" data-bind-attr="href:url">
      <img data-bind="img.src" alt="" data-bind-attr="alt:img.alt" />
      <h3 data-bind="name"></h3>
      <p data-bind="claim"></p>
    </a>
  </template>
  <template slot="empty"><p>Bald verfügbar.</p></template>
</sv-collection>
```

Wiederholte Felder **innerhalb** eines Eintrags nutzen `<sv-each>` — auch das kennst du schon:

```html
<!-- Liste einfacher Texte: data-bind="." ist der Wert selbst -->
<ul>
  <sv-each field="takeaways"
    ><template><li data-bind="."></li></template
  ></sv-each>
</ul>

<!-- Wiederholte Gruppe: die Unterfelder wie gewohnt -->
<sv-each field="cases">
  <template>
    <figure>
      <q data-bind="quote"></q>
      <figcaption data-bind="who"></figcaption>
    </figure>
  </template>
</sv-each>

<!-- Wiederholte Bilder/Links: der Eintrag IST das Objekt -->
<sv-each field="shots">
  <template><img data-bind="src" alt="" data-bind-attr="alt:alt" /></template>
</sv-each>
```

#### Schritt 4 — Optional: eine Detailseite pro Eintrag

`dynamicPages` akzeptiert neben `speakers`/`agenda` jeden Collection-Namen:

```jsonc
"dynamicPages": [
  { "template": "stream.html", "collection": "streams",
    "route": "/stream/:slug", "slugFrom": "name" }
]
```

Damit bekommt **jeder Eintrag eine echte URL** — `slug` wird aus `slugFrom` abgeleitet
(Duplikate bekommen `-2`, `-3`), und jeder Eintrag stellt `url` zum Verlinken bereit. Legt der
Kunde später einen fünften Stream an, entsteht seine Seite beim nächsten Rendern von selbst.

Auf der Vorlage bindest du wie bei `speaker.html` **ohne** `<template>`-Loop — es ist genau ein
Datensatz:

```html
<title data-bind="name"></title>
<h1 data-bind="name"></h1>
<p data-bind="claim"></p>
```

#### Stolperfallen

- **`data-bind` auf `<a>` setzt den href, auf `<img>` die Bildquelle** — nicht den Text. Für
  sichtbaren Text ein Element _innerhalb_ binden: `<a data-bind="url"><span data-bind="name"></span></a>`.
  Der Validator warnt, wenn du ein Textfeld auf `<a>`/`<img>` bindest.
- **Ein Bundle-Update, das ein Feld entfernt, wird abgelehnt**, sobald Einträge dafür Inhalt
  tragen. Erst im CMS leeren, dann hochladen — es gibt bewusst keinen Erzwingen-Schalter.
- **Farben gehören nicht in `style`.** `data-bind-attr` darf `style` nicht schreiben; reiche die
  Farbe als `data-*`-Attribut durch und setze sie mit drei Zeilen eigenem JS (siehe 5.2.1).

### 4.10 Abschnitte aus- und einblenden

Manche Blöcke gehören zu einer Phase: der Call for Papers vor dem Event, der Countdown bis zum
Einlass, das „Danke fürs Kommen" danach. Der Kunde soll sie ein- und ausschalten können, ohne
dich zu fragen — aber nur die, die **du** dafür vorsiehst.

```html
<section data-sv-section="countdown">…</section>

<!-- Designer-Default „ausgeblendet": erscheint erst, wenn der Kunde ihn einblendet -->
<section data-sv-section="call-for-papers" data-sv-hidden>…</section>
```

- **`data-sv-section="key"`** markiert einen Block als ausblendbar. Der Schlüssel folgt dem
  Muster `^[a-z0-9][a-z0-9._-]*$` (Kleinbuchstaben, Ziffern, `.`, `_`, `-`) und ist pro Seite
  eindeutig — gleicher Schlüssel auf mehreren Seiten heißt: ein Schalter für alle.
- **`data-sv-hidden`** (ohne Wert) ist dein Default: Der Block startet ausgeblendet. Ohne das
  Attribut startet er sichtbar.
- **Was der Kunde sieht:** Im Edit-Modus bekommt jeder markierte Block beim Hovern einen Chip
  „Ausblenden" bzw. „Einblenden". Ausgeblendete Blöcke bleiben im Editor stehen — gedimmt und
  gestrichelt umrahmt, das Layout ändert sich nicht —, damit der Kunde sie wiederfindet.
- **Auf der Live-Seite** ist ein ausgeblendeter Block **nicht im HTML** — kein `display:none`,
  seine Bilder und Komponenten werden gar nicht erst ausgeliefert. Sichtbare Blöcke verlieren
  beim Rendern die Marker.
- **Global, nicht pro Sprache.** Aus Kundensicht ist die Sichtbarkeit eine Entscheidung für die
  ganze Site; der Editor speichert sie für alle Sprachen gleichzeitig.
- **Die Wahl des Kunden schlägt deinen Default** — in beide Richtungen. Lieferst du ein Update mit
  geändertem `data-sv-hidden`, gilt das nur, solange der Kunde den Block nie umgeschaltet hat.
- **Nicht in `<template>`.** Ein Abschnitt in einem Collection-Template wäre ein Schalter für
  alle Einträge zugleich — das meint nie jemand. Der Validator meldet das als Fehler (Regel
  `section-key`), ebenso einen leeren oder ungültigen Schlüssel. `data-sv-hidden` ohne
  `data-sv-section` wirkt nicht und ergibt eine Warnung.
- `sv dev`: Überschreibungen testest du mit `mock-data/content-sections.json` (optional, gleiche
  Form wie `content.json`: `{ "de": { "countdown": true } }`, `true` = ausgeblendet).

> Merksatz: **Du entscheidest, was ausblendbar ist; der Kunde entscheidet, wann.**

### 4.11 Sections, die der Kunde selbst hinzufügt

Der Kunde kann keine freien Elemente einfügen — und das ist gewollt: Was nicht in deinem
Design vorgesehen ist, sieht auch nicht nach deinem Design aus. Soll er trotzdem Blöcke
**hinzufügen** können (ein zusätzliches Aktionsbanner, einen zweiten Countdown), baust du das
mit dem, was es schon gibt: einer [Collection](#49-custom-collections--wiederkehrende-datenobjekte).

Das Rezept:

1. **Eine Collection pro Section-Typ** — `ctas` für Aktionsbanner, `countdowns` für Countdowns.
   Das Schema im Manifest legt fest, welche Felder ein solcher Block hat.
2. **`<sv-collection name="ctas">` genau dort platzieren, wo du Blöcke erlaubst** — zum Beispiel
   zwischen Programm und Footer. Das Item-`<template>` enthält den kompletten Block,
   `<section>` inklusive.
3. **`<template slot="empty">` ist optional** — leer gelassen rendert die Stelle nichts, solange
   der Kunde keinen Eintrag angelegt hat. Mit Inhalt ist es ein Platzhalter-Block.
4. **`defaults`** darf `[]` sein: Dann erscheint der Block erst, wenn der Kunde einen anlegt.
   Ein Beispiel-Eintrag hilft dir beim Gestalten in `sv dev`.
5. **Der Kunde pflegt die Blöcke im Content-Tab:** anlegen, löschen, sortieren, Felder
   bearbeiten. Im Edit-Modus führt ein Klick auf einen Block direkt zu seinem Eintrag.

```html
<sv-collection name="ctas">
  <template>
    <section class="cta-band">
      <h2 data-bind="title"></h2>
      <p data-bind="text"></p>
      <a class="btn" data-bind-attr="href:button.href"><span data-bind="button.label"></span></a>
    </section>
  </template>
  <template slot="empty"></template>
</sv-collection>
```

Was **nicht** in einer Collection steht, bleibt Code: Feste Sections sind für den Kunden
gesperrt — verschieben, löschen oder duplizieren kann er sie nicht. Ausblenden kann er sie nur,
wenn du sie mit `data-sv-section` markierst ([4.10](#410-abschnitte-aus--und-einblenden)).

## 5. Dynamische Daten — die `<sv-*>`-Komponenten

Hier kommen die echten Streavent-Daten ins Spiel: Speaker, Agenda, Sponsoren, Events. Du baust
das Markup, die Komponente liefert die Daten. Du musst **kein** JavaScript schreiben und nichts
fetchen.

### 5.1 So funktionieren alle `<sv-*>`-Komponenten

Jede Listen-Komponente ist **renderless**: Du legst ein `<template>` hinein, das einmal pro
Datensatz wiederholt wird. `data-bind="feld"` setzt ein Feld des aktuellen Datensatzes ein.

```html
<sv-speakers>
  <template>
    <article class="card">
      <img data-bind="image" alt="" />
      <h3 data-bind="name"></h3>
      <span data-bind="position"></span>
    </article>
  </template>

  <!-- Pflicht: Leerzustand -->
  <template slot="empty">
    <p>Speaker werden bald bekanntgegeben.</p>
  </template>
</sv-speakers>
```

Das HTML zwischen den Tags gehört komplett dir — Klassen, Struktur, Styling. Streavent füllt nur
die `data-bind`-Stellen.

### 5.2 Gemeinsame Konventionen

| Mechanismus              | Syntax                                                       | Zweck                                                                                        |
| ------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| **Feld einsetzen**       | `data-bind="name"`                                           | Setzt den Feldwert als Textinhalt; bei `<img>` als `src`, bei `<a>` als `href`               |
| **Feld in ein Attribut** | `data-bind-attr="data-start:date, data-end:dateEnd"`         | Schreibt Rohwerte in **beliebige** Attribute — für eigenes JS, das sie zurückliest (→ 5.2.1) |
| **Leerzustand**          | `<template slot="empty">…</template>`                        | **Pflicht** — wird gezeigt, wenn keine Daten da sind                                         |
| **Verschachtelte Liste** | `<sv-each field="speakers"><template>…</template></sv-each>` | Iteriert ein Array-Feld des aktuellen Datensatzes (z. B. Speaker eines Agenda-Eintrags)      |
| **Array als Text**       | `data-bind="type" data-join=", "`                            | Verbindet ein Array-Feld zu einem String                                                     |
| **Datum formatieren**    | `data-bind="date" data-format="date\|time\|datetime"`        | Wandelt ISO-Datum in lesbares Format (statt Roh-ISO)                                         |
| **Verschachteltes Feld** | `data-bind="eventDateTime.startDate"`                        | Punkt-Notation für verschachtelte Objekte                                                    |
| **Limit**                | `<sv-speakers limit="6">`                                    | Maximale Anzahl                                                                              |
| **Sortierung**           | `sort="name"` / `sort="-date"`                               | Sortierfeld (`-` = absteigend)                                                               |
| **Filter**               | `filter="stage:Hauptbühne"`                                  | Nur Einträge, deren Feld passt (→ 5.2.2)                                                     |
| **Ausschluss**           | `exclude="category:Stream"`                                  | Einträge, deren Feld passt, **weglassen** (→ 5.2.2)                                          |

> **Default-Markup:** Lässt du das `<template>` weg, rendert die Komponente ein schlichtes
> Standard-Layout. Für volle Kontrolle nutze immer ein eigenes `<template>`.

### 5.2.1 Eigenes Layout aus Rohwerten: `data-bind-attr`

`data-bind` schreibt **anzeigefertig**: Text, `<img src>`, `<a href>`. Für Layouts, die du
selbst berechnest, reicht das nicht — eine Timetable, die Pixelpositionen aus Start- und
Endzeiten ableitet, kann aus „09:00 bis 10:30 Uhr" nichts rechnen. Sie braucht die Rohwerte
maschinenlesbar im DOM:

```html
<sv-agenda>
  <template>
    <div class="slot" data-bind-attr="data-start:date, data-end:dateEnd, data-stage:stage">
      <time data-bind="date" data-format="time"></time>
      <b data-bind="topic"></b>
    </div>
  </template>
  <template slot="empty">…</template>
</sv-agenda>
```

Danach positioniert dein eigenes Script die **server-gerenderten** Knoten:

```js
document.querySelectorAll('.slot').forEach(el => {
  const start = new Date(el.dataset.start); // Rohwert, kein Parsen von Anzeigetext
  el.style.top = minutesFrom(start) * PX_PER_MIN + 'px';
});
```

Das ist das allgemeine Muster für „eigenes Layout auf Streavent-Daten": **Streavent rendert die
Inhalte, dein JS ordnet sie an.** Der Vorteil gegenüber dem alten „alles per `innerHTML` bauen":
Crawler und der Inline-Editor sehen echte Inhalte, und dein Script behält die volle Kontrolle
über Geometrie und Interaktion.

Regeln:

- **Syntax:** `attribut:feld`, mehrere durch Komma getrennt.
- **Rohwerte:** `data-format` wirkt hier **nicht** — genau das ist der Zweck. Für die
  formatierte Anzeige nimmst du zusätzlich ein normales `data-bind` auf demselben Element.
- **Leere Werte schreiben kein Attribut.** `hasAttribute()` bleibt damit aussagekräftig.
- **Arrays** werden mit `,` ohne Leerzeichen verbunden, damit `split(',')` sauber ist.
  Enthalten die Werte selbst Kommata (eine echte Kategorie heißt „KI, Cyberabwehr & Quanten"),
  setzt du mit `data-bind-attr-join="|"` einen eindeutigen Trenner.
- **Gesperrt:** alle `on*`-Attribute und `style` — das wären Code- bzw. CSS-Injection-Flächen.
  Brauchst du eine dynamische Farbe, binde sie als `data-color` und setze sie im eigenen
  Script (`el.style.background = el.dataset.color`).
- **URL-Attribute** (`src`, `href`, `poster`, …) durchlaufen dieselbe Sicherheitsprüfung wie
  `data-bind` auf `<img>`/`<a>`.

Der Validator meldet falsch geschriebene Paare und gesperrte Ziel-Attribute als **Fehler**,
unbekannte Feldnamen als Warnung — beides schon beim `sv validate`, nicht erst im Render.

### 5.2.2 Nur einen Ausschnitt zeigen: `filter`

`filter="feld:wert"` reduziert eine Liste auf die Einträge, deren Feld passt — die Sessions
einer Bühne, die Speaker eines Themas, die Sponsoren einer Stufe:

```html
<sv-agenda group="day" filter="stage:Hauptbühne">
  <template>…</template>
  <template slot="empty">…</template>
</sv-agenda>
```

Regeln:

- **Syntax:** `feld:wert`, getrennt am **ersten** Doppelpunkt — ein Feldname enthält keinen,
  ein Wert durchaus („Panel: Recht").
- **Groß-/Kleinschreibung und Leerzeichen sind egal.** Die Werte sind Freitext, den der
  Veranstalter im CMS getippt hat; „Main Stage" und „main stage " sind dieselbe Bühne.
- **Mehrwertige Felder** (`type`, `category`) passen, sobald **einer** ihrer Werte passt.
- Ein Eintrag **ohne** das Feld passt nie.
- Ein `filter` ohne verwertbares Paar filtert nicht — die Liste bleibt vollständig.
- Kombinierbar mit `sort` und `limit` (Reihenfolge: filtern → sortieren → begrenzen).
- Bei `<sv-agenda group="day">` wirken `filter`, `exclude`, `sort` und `limit` auf die
  **Einträge** innerhalb der Tage, nicht auf die Tage. Ein Tag ohne Treffer fällt ganz weg.

#### `exclude` — die Gegenrichtung

`exclude="feld:wert"` lässt die passenden Einträge **weg**. Gleiche Syntax, gleiche
Vergleichsregeln, gleiche Toleranz gegenüber einem unbrauchbaren Paar — nur umgekehrt. Es
läuft **nach** `filter`, das Paar liest sich also als „diese Einträge, aber die nicht":

```html
<!-- Das Programm dieses Streams: die Sessions in seinem Raum, ohne den ganztägigen
     Block, der der Stream selbst IST — der stünde sonst als Eintrag auf seiner eigenen
     Seite. -->
<sv-agenda data-bind-attr="filter:agendaFilter" exclude="category:Stream">
  <template>…</template>
  <template slot="empty"><p>Programm folgt.</p></template>
</sv-agenda>
```

Ein Eintrag **ohne** das Feld wird nie ausgeschlossen — genau spiegelbildlich dazu, dass er
auch nie zu einem `filter` passt.

#### Der Ausschnitt kann aus dem Datensatz der Seite kommen

Auf einer Detailseite (3.3) darf der **Wert** aus dem Eintrag stammen, zu dem die Seite gehört.
Dafür schreibst du `data-bind-attr` **auf die Komponente selbst**:

```html
<!-- src/stream.html — jede Stream-Seite zeigt nur ihr eigenes Programm -->
<sv-agenda data-bind-attr="filter:agendaFilter">
  <template>…</template>
  <template slot="empty"><p>Programm folgt.</p></template>
</sv-agenda>
```

Der Eintrag `streams` hat dafür ein Feld `agendaFilter` mit z. B. `category:KI & Cyberabwehr`.
Das ist der Punkt, an dem Collections sich auszahlen: Der Kunde legt einen fünften Stream an,
bekommt seine Seite automatisch — **und** das passende Programm darauf, ohne dass jemand die
Vorlage anfasst.

Zwei Dinge dazu:

- `data-bind-attr` **auf dem Host** bindet gegen den Datensatz der **Seite**. Dasselbe Attribut
  **im `<template>`** bindet gegen das jeweilige Listen-Element — beides zugleich ist erlaubt
  und meint zwei verschiedene Objekte.
- Ist das Feld im Eintrag leer, wird gar kein `filter` geschrieben und die Liste bleibt
  **vollständig**. Sichtbar und korrigierbar — im Zweifel setzt du zusätzlich ein `limit`.

---

### 5.3 Komponenten-Katalog

> Alle Felder unten sind **public-safe** und stammen aus den echten Streavent-Datenobjekten.
> Mit `?` markierte Felder können leer sein — sieh im Template einen Fallback vor.
>
> **Maschinen-Zwilling:** Derselbe Katalog liegt generiert als `dist/custom-elements.json` (CEM,
> für IDE/KI) und `dist/COMPONENT_CATALOG.md` (`npm run build:cem` / `build:catalog`) vor. Die
> Feldlisten sind per Test an die echten Daten gekoppelt (`manifest-grounding.test.js`) und werden
> von `npm run validate` gegen deine Seite geprüft — falsch geschriebene Felder fallen sofort auf.

#### `<sv-speakers>` — Speaker-Liste

**Attribute:** `limit`, `sort` (`name`), `filter`, `exclude`

| Feld        | Typ     | Bedeutung                                     |
| ----------- | ------- | --------------------------------------------- |
| `name`      | string  | Vollständiger Name                            |
| `bio?`      | string  | Kurzbiografie                                 |
| `image?`    | string  | Profilfoto-URL                                |
| `company?`  | string  | Firma/Organisation                            |
| `position?` | string  | Jobtitel/Rolle                                |
| `website?`  | string  | Website-URL                                   |
| `linkedIn?` | string  | LinkedIn-URL                                  |
| `twitter?`  | string  | Twitter/X-URL                                 |
| `featured`  | boolean | Vom Veranstalter hervorgehoben (Haken im CMS) |
| `category?` | string  | Speaker-Kategorie („Keynote", „Moderation")   |

**Hervorgehobene Speaker bekommen eine eigene Reihe, keine Sortierung.** `featured` ist ein
Haken pro Person im Speaker-Management — die zwei, drei Namen, die das Event verkaufen. Wenn
sie oben und größer stehen sollen, sind das **zwei Blöcke**, und `filter`/`exclude` sind die
beiden Hälften derselben Frage:

```html
<div class="speakers-feat">
  <sv-speakers filter="featured:true"><template>…große Karte…</template></sv-speakers>
</div>
<div class="speakers">
  <sv-speakers exclude="featured:true"><template>…normale Karte…</template></sv-speakers>
</div>
```

Ein `sort` kann das nicht leisten: Sortieren ändert die Reihenfolge, nicht die Kachelgröße.

**`category` ist die Kuratierungs-Zeile.** Sie kommt aus den Speaker-Kategorien des Events und
ist die Antwort auf „woher kommt dieses kleine Label über/unter dem Namen": nicht aus einem
Extra-Feld, sondern aus der Kategorie, die der Veranstalter der Person ohnehin schon gibt.
Weil sie live aufgelöst wird, ändert eine Umbenennung im CMS jede Karte auf einmal. Sie kann
leer sein — hänge ein `data-sv-show="category"` an das Element, sonst steht dort eine leere
Zeile mit Abstand.

```html
<sv-speakers sort="name">
  <template>
    <article class="speaker">
      <img data-bind="image" alt="" />
      <h3 data-bind="name"></h3>
      <p data-bind="position"></p>
      <a data-bind="linkedIn" class="social">LinkedIn</a>
    </article>
  </template>
  <template slot="empty"><p>Bald verfügbar.</p></template>
</sv-speakers>
```

> Für **Detailseiten** pro Speaker → dynamische Seite via `streavent.config.json`
> (`collection: "speakers"`), dann auf der Vorlage `data-bind` direkt nutzen (siehe Kap. 3.3).

#### `<sv-agenda>` — Programm / Sessions

Im CMS ist die Agenda in **Tabs** gegliedert, jeder Tab hat **Einträge** (= Sessions), jeder
Eintrag hat **Speaker**. Ein Tab ist aber **nicht** dasselbe wie ein Tag: Viele Veranstalter
legen parallele Workshops als eigene Tabs an, alle mit demselben Datum. Deshalb baust du das
Programm **aus den Daten** und nie aus festen Tagesblöcken im Markup.

Der Normalfall ist **eine** `<sv-agenda group="day">` für das ganze Programm. Sie liefert einen
Datensatz pro **Kalendertag**; mit `<sv-each field="entries">` gehst du in die Einträge des
Tages, mit `<sv-each field="speakers">` darin in die Speaker:

```html
<sv-agenda group="day">
  <template>
    <section class="tag" data-bind-attr="data-day:dayDate">
      <h2>
        Tag <span data-bind="dayNumber"></span>
        <span data-sv-show="dayDate">· <span data-bind="dayDate" data-format="date"></span></span>
      </h2>

      <!-- nur an Tagen mit parallelen Tabs -->
      <p data-sv-show="hasTracks">
        Parallel:
        <sv-each field="tracks"
          ><template><span data-bind="name"></span></template
        ></sv-each>
      </p>

      <sv-each field="entries">
        <template>
          <div class="slot" data-bind-attr="data-start:date, data-track:dayName">
            <time data-bind="date" data-format="time"></time>
            <h4 data-bind="topic"></h4>
            <span data-bind="stage"></span>
            <span data-bind="type" data-join=" · "></span>

            <sv-each field="speakers">
              <template>
                <span class="speaker"><img data-bind="image" alt="" /><span data-bind="name"></span></span>
              </template>
            </sv-each>
          </div>
        </template>
      </sv-each>
    </section>
  </template>
  <template slot="empty"><p>Programm folgt.</p></template>
</sv-agenda>
```

So entsteht ein Tag:

- **Tabs mit demselben Datum** (`tabDate` im CMS) werden **ein** Tag. Jeder Tab bleibt als Spur
  in `tracks` erhalten — für ein Spaltenlayout musst du keine Tab-Namen zerlegen.
- **Ein Tab ohne Datum** ist ein eigener Tag. Das Zusammenlegen verbessert, wo die Daten es
  hergeben, und ist nie eine Voraussetzung.
- `entries` ist nach Startzeit sortiert. Ein Punkt, der in mehreren Spuren steht (dieselbe
  Kaffeepause in drei Workshops), steht dort **einmal**. Verglichen werden Startzeit, Bühne
  (`stage`) und Titel, **exakt**: Eine Kaffeepause ohne Bühne in drei Tabs ist ein Punkt, ein
  „Q&A" zur selben Zeit in zwei verschiedenen Räumen sind zwei. Ein Tippfehler im CMS ergibt
  zwei Einträge — das korrigiert der Kunde im CMS, der Renderer rät nicht. In
  `tracks[].entries` steht jeder Punkt dagegen in jeder seiner Spuren.
- `filter`, `exclude`, `sort` und `limit` wirken auf die Einträge. Ein Tag oder eine Spur ohne
  Treffer fällt weg, `dayNumber` zählt die verbleibenden Tage.
- **Zwei Zahlen, zwei Fragen:** `dayNumber` hängt am **Tag** und ist die Zahl für die
  Überschrift („Tag 2"). `dayIndex` hängt an jedem **Eintrag** und ist die Position seines Tabs
  (das, was `day="N"` auswählt) — an einem Tag mit drei Workshop-Tabs tragen die Einträge 2, 3
  und 4. Innerhalb von `<sv-each field="entries">` meint jeder Name den Eintrag; für die
  Tages-Überschrift nimm deshalb immer `dayNumber` außerhalb davon.
- `dayDate` ist ein Kalenderdatum (`JJJJ-MM-TT`) und wird mit `data-format="date"` genau als
  dieser Tag ausgegeben, unabhängig von der Zeitzone des Events.

Ohne `group` iterierst du die **flache** Liste aller Einträge — jeder trägt seinen Tag in
`dayName`/`dayDate`. Das ist die Quelle, wenn du Tage, Raster oder Filter selbst in JavaScript
baust (siehe [10.5](#105-eigene-aufbauten-aus-sv--ausgabe)).

> ⚠️ **`day` ist ein Tab-Index, kein Tag.** `<sv-agenda day="3">` heißt „der dritte Tab im CMS".
> Liegen dort drei Workshop-Tabs am selben Datum, trifft `day="3"` den ersten Workshop, und alles
> dahinter fehlt still — auf der ersten echten Seite, die so gebaut war, 32 von 72 Programmpunkten.
> Nutze `day` nur, wenn du wirklich genau **einen bestimmten Tab** willst. Der Validator warnt
> (`agenda-day-index`), sobald eine Seite mehrere `day=`, ein `day` ab `2` oder ein nicht
> numerisches `day` enthält — und wenn `day` neben `group="day"` steht, wo es ignoriert wird.

**Attribute:** `group="day"` (nach Kalendertagen gruppieren), `day` (Tab-Index, `1`-basiert,
genau ein Tab), `filter`, `exclude`, `sort`, `limit`

**Eintrags-Felder:**

| Feld            | Typ           | Bedeutung                                                                                  |
| --------------- | ------------- | ------------------------------------------------------------------------------------------ |
| `topic`         | string        | Titel der Session                                                                          |
| `description?`  | string (HTML) | Beschreibung                                                                               |
| `date`          | ISO-string    | Start (mit `data-format` formatieren)                                                      |
| `dateEnd?`      | ISO-string    | Ende                                                                                       |
| `timeText?`     | string        | Text-Zeitangabe (wenn keine echten Zeiten genutzt werden)                                  |
| `stage?`        | string        | Bühne/Raum                                                                                 |
| `type?`         | string[]      | Typ-Tags (z. B. „Keynote")                                                                 |
| `category?`     | string[]      | Kategorie-Tags                                                                             |
| `headerImg?`    | string        | Header-Bild der Session                                                                    |
| `speakers`      | array         | Speaker dieses Eintrags → mit `<sv-each>`                                                  |
| `highlight`     | boolean       | Optische Hervorhebung, im CMS pro Eintrag setzbar (→ `data-sv-show`)                       |
| `stageColor`    | string        | Farbe der Bühne aus den Event-Einstellungen (`''`, wenn keine hinterlegt)                  |
| `typeColor`     | string        | Farbe des ersten passenden Typ-Tags                                                        |
| `categoryColor` | string        | Farbe des ersten passenden Kategorie-Tags                                                  |
| `dayName`       | string        | Name des Tabs, so wie der Veranstalter ihn getippt hat                                     |
| `dayDate`       | string        | Datum des Tabs als `JJJJ-MM-TT` (`''`, wenn der Tab keins hat) → `data-format`             |
| `dayIndex`      | number        | Position des **Tabs**, `1`-basiert (genau das, was `day="N"` auswählt) — keine Tagesnummer |
| `dayId`         | string        | Stabile Id des Tabs — ändert sich nicht, wenn der Tab umbenannt oder verschoben wird       |

**Tages-Felder** (bei `group="day"`):

| Feld        | Typ      | Bedeutung                                                                                     |
| ----------- | -------- | --------------------------------------------------------------------------------------------- |
| `dayName`   | string   | Name des ersten Tabs dieses Tages                                                             |
| `dayDate`   | string   | Datum als `JJJJ-MM-TT` (`''` bei einem Tab ohne Datum)                                        |
| `dayNumber` | number   | Position des **Tages** in der Ausgabe, `1`-basiert — die Zahl für „Tag 2"                     |
| `entries`   | array    | Alle Einträge des Tages, nach Startzeit, gemeinsame Punkte einmal (Startzeit + Bühne + Titel) |
| `tracks`    | array    | Eine Spur pro Tab: `{ name, entries }`                                                        |
| `hasTracks` | boolean  | Mehr als eine Spur an diesem Tag (→ `data-sv-show` für die Spaltenansicht)                    |
| `stages`    | string[] | Die Bühnen/Räume des Tages, numerisch sortiert („Raum 10" nach „Raum 9")                      |

**Speaker-Felder (innerhalb eines Eintrags):** `name`, `image?`, `company?`, `position?`, `link?`

#### `<sv-sponsors>` — Sponsoren & Aussteller

Sponsoren sind in **Kategorien** (z. B. „Gold", „Silber") gruppiert. Du kannst flach iterieren
(optional auf eine Kategorie gefiltert) oder nach Kategorie gruppieren.

**Attribute:** `group="category"`, `category` (Name, filtert auf eine Kategorie), `limit`,
`sort`, `filter`, `exclude`

**Sponsor-Felder:**

| Feld            | Typ    | Bedeutung                                                                   |
| --------------- | ------ | --------------------------------------------------------------------------- |
| `name`          | string | Name                                                                        |
| `logoUrl`       | string | Logo-URL                                                                    |
| `bannerUrl?`    | string | Banner-/Hero-Bild                                                           |
| `description?`  | string | Beschreibung                                                                |
| `website?`      | string | Website-URL                                                                 |
| `websiteLabel?` | string | Link-Text (z. B. „Zur Website")                                             |
| `documents`     | array  | Dateien → `<sv-each>` mit `url`, `fileName`                                 |
| `slug`          | string | Stabiler Handle, auch ohne Detailseite                                      |
| `url?`          | string | Link zur Detailseite (nur mit `dynamicPages`-Eintrag `sponsors`, siehe 3.4) |

```html
<!-- flach, alle Sponsoren -->
<sv-sponsors>
  <template>
    <a data-bind="website" class="sponsor">
      <img data-bind="logoUrl" alt="" />
      <span data-bind="name"></span>
    </a>
  </template>
  <template slot="empty"><p>Partner werden bekanntgegeben.</p></template>
</sv-sponsors>

<!-- nach Kategorie gruppiert -->
<sv-sponsors group="category">
  <template>
    <section>
      <h3 data-bind="name"></h3>
      <!-- Kategorie-Name -->
      <sv-each field="sponsors">
        <template><img data-bind="logoUrl" alt="" /></template>
      </sv-each>
    </section>
  </template>
</sv-sponsors>
```

**Kategorie-Felder** (bei `group="category"`):

| Feld          | Typ     | Bedeutung                                        |
| ------------- | ------- | ------------------------------------------------ |
| `name`        | string  | Name der Stufe („Platin")                        |
| `color`       | string  | Farbe der Stufe aus dem CMS                      |
| `sponsors`    | array   | Die Sponsoren dieser Stufe                       |
| `tier`        | number  | **Rang der Stufe in der Wall**, von 0 an         |
| `targetCount` | number  | Geplante Plätze auf dieser Stufe (0 = kein Plan) |
| `openCount`   | number  | Davon noch frei                                  |
| `hasOpen`     | boolean | `openCount > 0`                                  |
| `openIsOne`   | boolean | Genau ein Platz frei — für den Singular          |
| `openSlots`   | array   | Ein Eintrag je freiem Platz, mit `position`      |

##### Größen an die POSITION hängen, nicht an den Namen

Eine Sponsorenwand hat eine Größenkaskade: Co-Host groß, Connect klein. Diese Kaskade gehört
ins Stylesheet — aber sie darf nicht am Stufen**namen** hängen. Der Name ist die Beschriftung,
die der Veranstalter jederzeit ändern darf; die Reihenfolge ist die Aussage. Deshalb gibt es
`tier`: den Rang der Stufe, von oben gezählt.

```html
<sv-sponsors group="category">
  <template>
    <div class="tierband" data-bind-attr="data-tier:tier">…</div>
  </template>
</sv-sponsors>
```

```css
.tierband[data-tier='0'] .ptile {
  min-height: 180px;
}
.tierband[data-tier='1'] .ptile {
  min-height: 136px;
}
```

Aus „Platin" wird morgen „Premium" — mit `data-tier` bleibt die Wall stehen, mit
`.tb-platin` bricht sie.

##### Freie Plätze sind Teil der Aussage

Eine Stufe trägt im CMS eine **geplante Anzahl**. Was davon noch nicht vergeben ist, kommt als
`openSlots` an — eine Liste, über die du iterieren kannst, weil ein Template wiederholen aber
nicht zählen kann. Eine Stufe mit Plan bleibt **auch ohne einen einzigen Sponsor sichtbar**;
genau dafür ist sie da.

```html
<div class="wall">
  <sv-each field="sponsors"><template>…Logo…</template></sv-each>
  <sv-each field="openSlots">
    <template><a class="ptile open" href="/sponsor-werden">Platz frei</a></template>
  </sv-each>
</div>
<em data-sv-show="hasOpen">
  <span data-bind="openCount"></span>
  <span data-sv-show="openIsOne">Platz frei</span>
  <span data-sv-hide="openIsOne">Plätze frei</span>
</em>
```

Der Plural braucht zwei Elemente, weil die Bindung keine Bedingungen kennt — dafür bleiben
beide Wörter im Markup, wo sie übersetzbar und im Editor pflegbar sind.

#### `<sv-event>` — Daten des aktuellen Events

Ein **Einzelobjekt** (kein `<template>`-Loop nötig): die Infos des Events, dem diese Site gehört.

| Feld           | Typ        | Bedeutung                           |
| -------------- | ---------- | ----------------------------------- |
| `name`         | string     | Event-Name                          |
| `description?` | string     | Beschreibung                        |
| `startDate`    | ISO-string | Beginn                              |
| `endDate`      | ISO-string | Ende                                |
| `timezone`     | string     | Zeitzone (z. B. „Europe/Berlin")    |
| `location`     | string     | Veranstaltungsort (oder „Online")   |
| `organizer?`   | string     | Veranstalter                        |
| `url?`         | string     | Link zur Event-/Registrierungsseite |
| `category?`    | string     | Kategorie                           |
| `tags?`        | string[]   | Tags                                |
| `type?`        | string     | Event-Typ (z. B. „hybrid")          |

> **Kein** `image`/`logo`/`primaryColor`: der Event-Endpoint liefert **Fakten** (v. a. Zeiten/Ort).
> Visuals (Bild, Logo, Farben) gestaltet die Site selbst im eigenen Markup.

```html
<sv-event>
  <h1 data-bind="name"></h1>
  <p><time data-bind="startDate" data-format="date"></time> · <span data-bind="location"></span></p>
</sv-event>
```

#### `<sv-events>` — Mehrere Events (Übersichts-/Portalseiten)

Für Seiten, die **viele** Events listen (z. B. ein Veranstalter-Portal). Iteriert Events.

**Attribute:** `limit`, `sort` (`date`), `filter`

| Feld                      | Typ        | Bedeutung             |
| ------------------------- | ---------- | --------------------- |
| `name`                    | string     | Event-Name            |
| `description`             | string     | Beschreibung          |
| `location`                | string     | Ort oder „Online"     |
| `organizer`               | string     | Veranstalter          |
| `type`                    | string     | Event-Typ             |
| `category`                | string     | Kategorie             |
| `tags`                    | string[]   | Tags                  |
| `duration`                | number     | Dauer in Stunden      |
| `image`                   | string     | Event-Bild            |
| `url`                     | string     | Öffentliche Event-URL |
| `eventDateTime.startDate` | ISO-string | Beginn                |
| `eventDateTime.endDate`   | ISO-string | Ende                  |

### 5.4 Sessions

Es gibt **keine** separate öffentliche Sessions-Komponente: Die buchbaren Sessions leben in der
authentifizierten App. Was du auf der Marketing-Seite zeigst, ist das **Programm** — und das ist
`<sv-agenda>` (die Agenda-Einträge _sind_ die Sessions). Zum Buchen verlinkst du in die App
(siehe Kap. 8).

> **`<sv-collection>`** gehört formal auch hierher, steht aber bei den statischen Inhalten
> ([4.9](#49-custom-collections--wiederkehrende-datenobjekte)): seine Daten kommen nicht aus
> Streavent, sondern aus dem Content-Store des Kunden.

### 5.5 Was (noch) nicht als Komponente verfügbar ist

> Damit du nichts erfindest: Verfügbar sind genau die oben gelisteten Komponenten/Felder.
> Strukturierte Venue-Daten (Adresse, Karte) über den Ort-String hinaus, sowie buchbare
> Sessions sind aktuell **nicht** als Binding verfügbar — für eine Karte bettest du selbst
> einen Map-Embed ein und nutzt das `location`-Feld aus `<sv-event>`.

## 6. Bilder & Assets

Es gibt **zwei Arten** von Bildern, und die Unterscheidung ist wichtig: deine **Design-Assets**
und die **editierbaren Content-Bilder** des Kunden.

### 6.1 Die Entscheidungsregel

> **Ist es Teil des Designs — oder ein Inhalt, der dem Kunden gehört?**

|                           | Design-Asset                                                | Editierbares Content-Bild                                                                    |
| ------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Beispiele**             | Hintergrundtexturen, dekorative Formen, Icons, Font-Dateien | Hero-Foto, Galerie-Bilder, austauschbare Teaser-Bilder                                       |
| **Wie eingebunden**       | normales `<img src="/img/…">`                               | `<sv-image field="…">`                                                                       |
| **Wo gespeichert**        | in deinem Bundle (ZIP)                                      | im Streavent-CDN (Referenz im Content-Store)                                                 |
| **Editierbar vom Kunden** | nein (nur via neuer ZIP)                                    | ja (inline)                                                                                  |
| **Größe & Optimierung**   | dein Job (komprimieren, `width`/`height`)                   | Box sizen ist dein Job (6.3); Zuschnitt und Auflösung des Kunden-Uploads übernimmt Streavent |

### 6.2 Design-Assets (deine eigenen Dateien)

Lege sie in **Unterordnern** ab (`/img`, `/fonts`, `/icons`) und referenziere sie relativ —
nie direkt im Root (siehe [Kap. 3.2](#32-assets--ordner)):

```html
<img src="/img/textur.svg" alt="" aria-hidden="true" />
<div style="background-image: url('/img/hero-pattern.png')"></div>
```

Diese Dateien reisen in der ZIP mit, sind für jeden Besucher gleich und ändern sich nur, wenn du
ein Update lieferst. **Optimierung liegt bei dir** (komprimieren, `width`/`height` setzen).

### 6.3 Editierbare Bilder: `<sv-image>`

Für jedes Bild, das der Kunde austauschen können soll. Du gibst einen Default (ein Bild aus deinem
Bundle); bis der Kunde etwas hochlädt, wird der Default gezeigt.

```html
<sv-image field="hero.background" default="/img/hero-default.jpg" sizes="100vw" loading="eager" alt="Bühne der Konferenz"> </sv-image>
```

**Attribute:**

| Attribut  | Pflicht | Bedeutung                                                                  |
| --------- | ------- | -------------------------------------------------------------------------- |
| `field`   | ✅      | Content-Store-Schlüssel (wie `data-sv-field`)                              |
| `default` | –       | Default-Bild aus deinem Bundle, bis der Kunde eines hochlädt               |
| `sizes`   | –       | Wird ans `<img>` durchgereicht; ein `srcset` erzeugt Streavent heute nicht |
| `loading` | –       | `lazy` (Default) oder `eager` (für das Hero über dem Fold)                 |
| `alt`     | –       | Default-Alt-Text (der Kunde kann ihn beim Editieren anpassen)              |

**Was Streavent automatisch macht:** `<sv-image>` wird zu einem normalen `<img>` mit deinen
Klassen und Attributen; die vom Kunden hochgeladene Bild-URL ersetzt den Default. Ein
`srcset`/`<picture>` entsteht dabei nicht — wie groß das Bild gerendert wird, bestimmst du.

**Größe der Box (Pflicht):** Die gerenderte Größe eines editierbaren Bildes darf **nie von der
Pixelgröße der Datei abhängen**. Gib die Breite über CSS oder den Container vor (`height: auto`
ist in Ordnung, die Höhe folgt dann dem festen Zuschnitt-Verhältnis) oder setze `width`/`height`
als Attribute. Ein `<sv-image>` in natürlicher Größe ohne Constraint ist nicht erlaubt: der
Kunden-Upload wird in doppelter Box-Auflösung gespeichert und würde dann doppelt so groß
gerendert. Liefere auch dein **Default-Asset in doppelter Box-Größe** (Retina), sonst ist schon
der Auslieferungszustand unscharf.

**Editieren (Kunde):** Klick aufs Bild im Edit-Modus → Upload-/Zuschneide-Dialog → neues Bild +
Alt-Text. Der Zuschnitt ist dabei vorbelegt: die **Form** kommt vom ersetzten Bild (deine
Proportionen), die **Auflösung** ist die doppelte Größe der Box im Layout (Retina, gemessen in
der gerade gewählten Vorschau-Breite des Editors) und nie kleiner als das ersetzte Bild — beides
bis zur Obergrenze von 2560 px auf der langen Kante. Galerie-Bilder (`<sv-gallery>`) werden
weiterhin auf die Pixelgröße des ersetzten Bildes zugeschnitten. Du musst dafür nichts tun.
Nur wenn sich das alte Bild nicht vermessen lässt, bleibt der Zuschnitt frei.

> **Styling:** Du gibst dem `<sv-image>` (oder dem erzeugten `<img>`) ganz normal deine Klassen.
> Es liegt im Light DOM, dein CSS greift voll.

### 6.4 Galerien: `<sv-gallery>`

Wie die `<sv-*>`-Datenkomponenten **renderless** — du lieferst das Markup pro Bild, der Kunde
befüllt die Galerie. Das Hinzufügen/Entfernen/Sortieren von Bildern ist die **einzige**
Struktur-Operation, die der Kunde an Inhalten ausführen darf (sicher, weil es nur den Feld-Wert
ändert).

```html
<sv-gallery field="event.gallery">
  <template>
    <figure class="tile">
      <img data-bind="image" alt="" />
      <figcaption data-bind="caption"></figcaption>
    </figure>
  </template>
  <template slot="empty"><p>Bilder folgen.</p></template>
</sv-gallery>
```

**Item-Felder (im `<template>`):**

| Feld       | Typ    | Bedeutung                                          |
| ---------- | ------ | -------------------------------------------------- |
| `image`    | string | Bild-URL (bindest du selbst in deinem Item-Markup) |
| `alt?`     | string | Alt-Text                                           |
| `caption?` | string | Bildunterschrift                                   |

**Editieren (Kunde):** Klick auf die Galerie im Edit-Modus → Dialog mit allen aktuellen
Bildern: hinzufügen, entfernen, sortieren, Alt-Text/Bildunterschrift ändern. Ein Klick auf
eine Miniatur ersetzt **dieses** Bild; neue Bilder übernehmen das Seitenverhältnis des ersten
vorhandenen. Layout und Markup bleiben deins.

> **Liefere Default-Bilder mit** — sonst ist die Galerie beim ersten Publish **leer**.
> `<sv-image default="…">` und `data-sv-field` bringen beide einen Default mit; für die Galerie
> ist der Slot `default` dafür da:
>
> ```html
> <sv-gallery field="event.gallery">
>   <template> … dein Item-Markup … </template>
>   <template slot="default">
>     <img src="/assets/img/impression-1.jpg" alt="Bühne" data-caption="Keynote 2026" />
>     <img src="/assets/img/impression-2.jpg" alt="Foyer" />
>   </template>
> </sv-gallery>
> ```
>
> Gemappt wird `src → image`, `alt → alt`, `data-caption → caption`. Sobald der Kunde die Liste
> das erste Mal speichert, gewinnt seine Fassung — auch eine bewusst geleerte.

### 6.5 Fonts & Icons

- **Fonts:** entweder im Bundle (`/fonts`) selbst hosten oder von einem CDN laden (Google Fonts
  o. Ä. ist erlaubt) — wie in den bestehenden Streavent-Landingpages.
- **Icons:** als SVG ins Bundle (`/icons`) oder eine Icon-Library laden. Reine Design-Assets.

### 6.6 Performance-Hinweise

- Für editierbare Bilder **immer `<sv-image>`/`<sv-gallery>`** nutzen und die Box per CSS oder
  `width`/`height` sizen — bei `<sv-image>` bestimmt die Box, in welcher Auflösung der
  Kunden-Upload gespeichert wird (siehe 6.3); Galerie-Bilder behalten die Pixelgröße des
  ersetzten Bildes.
- Setze beim Hero `loading="eager"`, bei allem anderen bleibt `lazy` der Default.
- Deine eigenen Design-Assets vorher komprimieren und mit `width`/`height` versehen.

### 6.7 Editierbare Videos: `<sv-video>`

Für ein Video, das **fest in der Seite** steht (Hero-Loop, Aftermovie-Teaser) und das der
Kunde austauschen können soll. Es funktioniert wie `<sv-image>`: du lieferst Video und
Vorschaubild als Default aus deinem Bundle, der Kunde ersetzt sie im Editor.

```html
<sv-video
  field="hero.clip"
  default="/video/hero.mp4"
  poster="/img/hero-poster.jpg"
  class="hero-video"
  autoplay
  muted
  loop
  playsinline
  preload="metadata"></sv-video>
```

Daraus wird ein ganz normales `<video>` mit deinen Klassen und Wiedergabe-Attributen.

**Attribute:**

| Attribut     | Pflicht | Bedeutung                                                                                                      |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------------- |
| `field`      | ✅      | Content-Store-Schlüssel (wie `data-sv-field`)                                                                  |
| `default`    | –       | Default-Videodatei aus deinem Bundle, bis der Kunde eine hochlädt                                              |
| `poster`     | –       | Default-Vorschaubild aus deinem Bundle (wird vor dem Abspielen gezeigt)                                        |
| alle anderen | –       | gehen unverändert aufs `<video>`: `class`, `autoplay`, `muted`, `loop`, `playsinline`, `preload`, `controls` … |

Inhalt zwischen den Tags (z. B. `<source>`-Alternativen, `<track>`-Untertitel oder ein
Fallback-Text) bleibt im `<video>` erhalten. Lädt der Kunde ein Video hoch, gewinnt dessen
`src` über deine `<source>`-Kinder.

**Editieren (Kunde):** Klick aufs Video im Edit-Modus → Dialog mit zwei Aktionen:
**Video ersetzen** und **Vorschaubild ersetzen** (hochladen). Ein Vorschaubild wird nicht
automatisch aus dem Video erzeugt. Beide Teile sind unabhängig: Ersetzt der Kunde nur das
Vorschaubild, läuft weiter dein Video, und umgekehrt. Im Editor startet ein Klick das Video
nicht, er öffnet den Dialog.

**Ein handgeschriebenes `<video>` geht auch:** `data-sv-field` reicht, der Typ `video` ergibt
sich aus dem Tag (wie bei `<img>`):

```html
<video data-sv-field="hero.clip" src="/video/hero.mp4" poster="/img/hero-poster.jpg" autoplay muted loop playsinline></video>
```

> **Nur Videodateien** (`.mp4`, `.webm`). Ein `<video>` kann keinen YouTube- oder Vimeo-Link
> abspielen. Für Videos, die als Link gepflegt werden, nimm ein `video`-Feld in einer
> Collection plus Lightbox (siehe [4.9](#49-custom-collections--wiederkehrende-datenobjekte)).

> **Autoplay im Browser:** Ein Video startet automatisch nur mit `muted` (und auf iOS mit
> `playsinline`). Setz für Hintergrund-Loops also immer alle drei: `autoplay muted playsinline`.

## 7. Mehrsprachigkeit (i18n)

### 7.1 Grundidee: eine Seite, viele Sprachen

Du baust deine Seiten **einmal** — sprachneutral im Markup. Streavent **vervielfältigt** sie pro
Sprache: aus `about.html` werden `/de/about` und `/en/about`. Du duplizierst **keine** Seiten pro
Sprache. Was sich unterscheidet, sind die **Feld-Werte** (pro Sprache im Content-Store) und die
**dynamischen Daten**.

### 7.2 URL-Schema

**Einsprachige Site** (`languages: ["de"]`) — der Normalfall. Die Seiten liegen **ohne**
Sprach-Präfix an der Domain-Root, verlinke also einfach `/about`:

```text
/               /about          /speakers/anna-schmidt
```

**Mehrsprachige Site** — jede Sprache lebt unter einem **Pfad-Präfix**:

```text
/de/            /en/
/de/about       /en/about
/de/speakers/anna-schmidt   /en/speakers/anna-schmidt
```

- Schreib interne Links immer **root-absolut und präfixlos** (`/about`, nicht `about.html` und
  nicht `/de/about`). Auf einer mehrsprachigen Site setzt die Render-Pipeline das Präfix der
  jeweiligen Sprachversion selbst ein; auf einer einsprachigen bleibt der Link, wie er ist.
- Die Slugs der dynamischen Seiten sind über alle Sprachen gleich.

> ⚠️ **Stand der Auslieferung:** Live wird derzeit nur die **Standardsprache** ausgeliefert
> (das Edge-Routing kennt keine Sprachsegmente). Gerendert werden alle Sprachen, erreichbar ist
> die Standardsprache. Mehrsprachige Sites sind damit noch nicht produktiv nutzbar.

### 7.3 Sprachen deklarieren

Im Manifest (siehe [Kap. 3.4](#34-streaventconfigjson--das-manifest)):

```jsonc
{
  "languages": ["de", "en"],
  "defaultLanguage": "de"
}
```

Das steuert, welche Präfix-Versionen die Render-Pipeline erzeugt und welche die Standardsprache ist.

### 7.4 Statische Inhalte pro Sprache

Deine `data-sv-field`-Felder werden **pro Sprache** gespeichert. Du musst dafür nichts Zusätzliches
tun — markieren genügt:

```html
<h1 data-sv-field="hero.title">Willkommen zur TechConf 2026</h1>
```

- Dein Markup-Default ist der Wert der **Standardsprache** (`de`).
- Die anderen Sprachen starten leer; der Kunde übersetzt sie im Editor (mit Sprach-Auswahl).
- **Fallback:** Solange eine Sprache nicht übersetzt ist, wird der Wert der Standardsprache gezeigt
  — nie eine leere Seite.
- **Zurücksetzen gilt je Sprache.** „Original wiederherstellen" (4.6) löscht den Wert der Sprache,
  die gerade im Editor gewählt ist. Ein Wert, den eine Sprache nur von der Standardsprache erbt,
  gehört der Standardsprache — er wird dort zurückgesetzt, in der zweiten Sprache gibt es für ihn
  keinen Chip.

> Wenn du Default-Texte für mehrere Sprachen schon im Bundle mitliefern willst, geht das über das
> Manifest (Feld-Defaults pro Sprache) — Schema dazu folgt in einer späteren Doku-Version. Standard
> ist: Markup = Default der Standardsprache.

### 7.5 Dynamische Daten & Sprache

Die Streavent-Daten (`<sv-agenda>`, `<sv-speakers>`, …) kommen in der **Sprache, die das Event
hat**. Streavent-Events sind oft einsprachig konfiguriert — dann erscheinen die dynamischen
Inhalte in dieser Event-Sprache auf **allen** Sprachversionen der Seite. Das ist erwartetes
Verhalten: Die Mehrsprachigkeit deckt zuverlässig **deine statischen Inhalte** ab; dynamische
Daten folgen der Datenpflege im CMS.

### 7.6 Sprachumschalter

Nutze `<sv-langswitch>` — es liefert pro verfügbarer Sprache einen Link auf die **aktuelle Seite**
in dieser Sprache. Markup gehört dir:

```html
<nav class="lang-switch">
  <sv-langswitch>
    <template>
      <a data-bind="url">
        <span data-bind="label"></span>
      </a>
    </template>
  </sv-langswitch>
</nav>
```

**Item-Felder:**

| Feld        | Typ     | Bedeutung                                                      |
| ----------- | ------- | -------------------------------------------------------------- |
| `code`      | string  | Sprachcode (`de`, `en`)                                        |
| `label`     | string  | Anzeigename (`Deutsch`, `English`)                             |
| `url`       | string  | Aktuelle Seite in dieser Sprache                               |
| `isCurrent` | boolean | Ob es die aktuell angezeigte Sprache ist (für aktiven Zustand) |

### 7.7 Was automatisch passiert

- `<html lang="…">` wird pro Sprachversion korrekt gesetzt (überschreibt das `lang` in deinem
  Template).
- `<link rel="alternate" hreflang="…">`-Tags werden für alle Sprachversionen automatisch gesetzt
  (SEO) — du musst dafür nichts tun. Siehe auch [Kap. 9](#9-seo--meta).

## 8. Verlinkung in die Streavent-App

Ticketkauf, Login, Registrierung und die buchbaren Sessions leben in der **Streavent-App** — nicht
in deiner Seite. Du **verlinkst** dorthin; gebaut und gepflegt wird das von Streavent.

### 8.1 Prinzip: reservierte Routen = App

Die App-Routen (siehe [Kap. 3.5](#35-reservierte-routen--namen)) erreichst du mit ganz normalen
Links. Du baust dort **keine** eigenen Seiten.

```html
<a href="/shop" class="btn">Tickets kaufen</a>
<a href="/register">Jetzt anmelden</a>
<a href="/login">Login</a>
```

| Link        | Führt zu                        |
| ----------- | ------------------------------- |
| `/shop`     | Ticketshop / Checkout           |
| `/register` | Registrierung (ohne Ticketkauf) |
| `/login`    | Login der Teilnehmer            |
| `/sessions` | Buchbare Sessions (in der App)  |
| `/feedback` | Feedback-Formular               |

> Der Übergang ist nahtlos: Die App läuft auf **derselben Domain**, der Besucher bleibt auf
> `deine-domain.de/shop`.

### 8.2 Verfügbarkeit anzeigen — `<sv-capacity>`

Du kannst öffentlich den **Auslastungsstatus** anzeigen (z. B. „Ausverkauft", „Warteliste"). Ein
Einzelobjekt mit zwei Flags:

| Feld              | Typ     | Bedeutung            |
| ----------------- | ------- | -------------------- |
| `atCapacity`      | boolean | Event ist ausgebucht |
| `waitlistEnabled` | boolean | Warteliste ist aktiv |

Mit `data-sv-show` / `data-sv-hide` blendest du Markup abhängig von einem Boolean-Feld ein/aus:

```html
<sv-capacity>
  <a href="/shop" class="btn" data-sv-hide="atCapacity">Tickets kaufen</a>
  <span class="badge" data-sv-show="atCapacity">Ausverkauft</span>
  <a href="/register" class="btn" data-sv-show="waitlistEnabled">Auf die Warteliste</a>
</sv-capacity>
```

### 8.3 Ticketpreise / Ticketarten

> ⚠️ Es gibt **keine** öffentlichen Ticketpreis-Daten zum Einbinden. Preise, Ticketarten und der
> Bezahlvorgang leben komplett im Ticketshop (`/shop`). Baue also **keinen** Preis-Teaser mit
> erfundenen Werten — verlinke auf `/shop` und nutze optional `<sv-capacity>` für den Status.

### 8.4 Eigene Formulare

- **Event-Registrierung** → immer auf `/register` bzw. `/shop` verlinken (nicht selbst nachbauen).
- **Andere Formulare** (Newsletter, Kontakt) → es gibt dafür keine Streavent-Anbindung. Nutze deine
  eigene Lösung (eigenes Backend oder ein Drittanbieter-Formular-Service). JavaScript dafür ist
  erlaubt (siehe [Kap. 10](#10-javascript-libraries--interaktivität)).

## 9. SEO & Meta

### 9.1 Statische Seiten

Schreib die Head-Tags einfach **normal ins HTML** — eine Vibe Site wird server-seitig zu fertigem
HTML gerendert, Suchmaschinen und Social-Previews sehen alles direkt:

```html
<head>
  <title>Über die TechConf 2026</title>
  <meta name="description" content="Drei Tage Zukunft, live in Berlin." />
  <meta property="og:title" content="Über die TechConf 2026" />
  <meta property="og:image" content="/img/og-about.jpg" />
</head>
```

### 9.2 Manifest-Defaults

Aus [Kap. 3.4](#34-streaventconfigjson--das-manifest): `seo.titleSuffix` wird an jeden Seitentitel
gehängt, `seo.defaultOgImage` greift, wenn eine Seite kein eigenes OG-Bild setzt.

### 9.3 Meta auf dynamischen Detailseiten binden

Auf einer Detailseite (z. B. `speaker.html`) bindest du Meta-Tags an den Datensatz. `data-bind`
ist element-bewusst: bei `<title>` setzt es den Text, bei `<meta>` das `content`, bei `<link>` das
`href`:

```html
<head>
  <title data-bind="name"></title>
  <meta name="description" data-bind="bio" />
  <meta property="og:image" data-bind="image" />
</head>
```

### 9.4 Editierbare Meta (optional)

Willst du, dass der Kunde Title/Description/OG-Bild selbst pflegt, markiere sie zusätzlich als
Feld — `data-sv-field` funktioniert auch auf Meta-Elementen:

```html
<meta name="description" data-sv-field="home.metaDescription" content="Drei Tage Zukunft." />
```

### 9.5 Was automatisch passiert

- `<link rel="alternate" hreflang="…">` für alle Sprachen ([Kap. 7](#7-mehrsprachigkeit-i18n)).
- `<link rel="canonical">` pro Seite.
- Korrektes `<html lang="…">` pro Sprachversion.

Darum musst du dich nicht kümmern.

## 10. JavaScript, Libraries & Interaktivität

### 10.1 Alles erlaubt

Du darfst beliebiges JavaScript schreiben und **beliebige Libraries** laden — Animations-Frameworks
(GSAP, Lottie), Slider, Scroll-Effekte, was immer dein Design braucht. Per CDN oder gebündelt im
`/js`-Ordner.

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="/js/main.js"></script>
```

### 10.2 Wie dein JS mit den `<sv-*>` koexistiert

Die `<sv-*>`-Komponenten und `data-sv-field`-Inhalte werden **server-seitig zu fertigem HTML**
gerendert. Dein JavaScript sieht beim Laden also bereits normales DOM — kein Warten auf Daten,
kein Timing-Problem. Du kannst die gerenderten Elemente ganz normal selektieren und animieren.

### 10.3 Was du NICHT brauchst

- **Kein Daten-Fetching** — die Daten kommen über die `<sv-*>`-Komponenten.
- **Kein bestimmtes Framework** — reines HTML/CSS/JS reicht; ein Build-Step (Bundler) ist optional.

### 10.4 Heads-up: Security & Publish-Gate (spätere Phase)

Beim Go-Live wird das Bundle künftig durch einen **Publish-Check** laufen, und es kann eine
Content-Security-Policy mit einer **CDN-Allowlist** für Skripte dazukommen. Heute gibt es dafür
**keine** harten Einschränkungen — aber baue defensiv:

- Libraries nur aus **seriösen Quellen** (jsdelivr, unpkg, googleapis …).
- Wenn möglich, Skripte mit **Subresource Integrity** (`integrity="…"`) einbinden.

So bist du auf die spätere Härtung vorbereitet, ohne heute eingeschränkt zu sein.

### 10.5 Eigene Aufbauten aus `<sv-*>`-Ausgabe

Manchmal reicht das Template nicht: ein Zeitraster mit Spalten je Workshop, eine Filterleiste
aus den vorhandenen Räumen, Tabs, die dein Script baut. Dann gilt das Muster aus 5.2.1 —
**Streavent rendert die Inhalte, dein JS ordnet sie an.** Die Runtime rendert server-seitig
alle Einträge in einen Quell-Container, dein Script leitet daraus die Struktur ab und
**verschiebt** die fertigen Knoten hinein. Nimm dafür die flache `<sv-agenda>` (ohne `day`) mit
`dayDate`, `dayName` und `stage` in `data-bind-attr` — die Form der Daten steht dann nirgends
im Markup, und ein vierter Workshop wird eine vierte Spalte, ohne dass jemand die Seite anfasst.

```html
<div class="ag-tabs" data-tage-tabs></div>
<!-- leer, dein JS füllt sie -->

<div class="ag-panels" data-tage-panels data-sv-widget-region="sv-agenda">
  <div class="ag-quelle">
    <sv-agenda>
      <template>
        <article class="slot" data-bind-attr="data-start:date, data-day:dayDate, data-track:dayName, data-stage:stage">
          <time data-bind="date" data-format="time"></time>
          <h4 data-bind="topic"></h4>
          <span class="spur" data-bind="dayName"></span>
        </article>
      </template>
      <template slot="empty"><p>Das Programm folgt.</p></template>
    </sv-agenda>
  </div>
</div>
```

Ohne JavaScript bleibt die Quelle stehen: alle Punkte in einer Liste, jeder mit seinem Tag.
Vollständig und lesbar — das ist die Fassung für Crawler und für den Fall, dass dein Script
scheitert.

Vier Fallstricke haben auf der ersten Seite, die so gebaut wurde, jeweils einen halben Tag
gekostet:

1. **`<sv-agenda>` ersetzt sich selbst.** Sie rendert renderless und ist danach nicht mehr im
   Baum. Wer sie nach dem Rendern sucht, findet nichts. Anker ist **dein eigener Container**
   (`.ag-quelle`), nie die Komponente.
2. **Die Quelle bleibt stehen, leer und versteckt.** Verschiebe die Karten per `appendChild`,
   statt sie per `innerHTML` neu zu schreiben — so behalten sie `data-sv-field`,
   `data-sv-widget-entry` und einen laufenden Cursor (siehe 4.6). Rendert die Seite nach
   (Vorschau, Editor), liegen die neuen Einträge wieder in der Quelle, und dein Aufbau läuft
   erneut. Ist die Quelle leer, ist er fertig — damit ist er idempotent.
3. **Ein `MutationObserver` dreht sich sonst im Kreis.** Jeder Aufbauschritt schreibt in den
   Baum, den der Beobachter überwacht. Drei Riegel: Der Beobachter ignoriert die Bereiche, die
   du selbst erzeugst (Filterleiste, Tabs). Jede Aufbaufunktion vergleicht eine **Signatur** und
   tut nichts, wenn sie gleich ist. Und die Signatur kennt **Identität, nicht nur Form**: Drei
   Workshop-Räume mit denselben Uhrzeiten sehen für „Uhrzeit + sichtbar" gleich aus, der
   Wechsel zwischen ihnen gälte als „nichts geändert". Vergib deshalb jedem Knoten eine laufende
   Nummer — als JavaScript-Eigenschaft, nicht als Attribut, sonst ist das Setzen selbst wieder
   ein Schreibvorgang im beobachteten Baum — und vergleiche sortiert:

   ```js
   var svNr = 0;
   function signatur(karten) {
     karten.forEach(function (k) {
       if (k._svNr == null) k._svNr = ++svNr;
     });
     return karten
       .map(function (k) {
         return k._svNr + (k.hidden ? '-' : '+');
       })
       .sort()
       .join('|');
   }
   ```

   Sortiert macht sie unabhängig von der Reihenfolge (dein Raster sortiert um), die Nummer
   macht sie identitätsbewusst. Beides zusammen, nicht eins davon.

4. **Räume Inline-Stile mit auf.** Setzt dein Raster `grid-column` am Knoten und fällt das
   Raster weg (nach dem Filtern ist nur eine Spalte übrig), bleibt der Stil stehen, und die
   Karten rutschen in Spalten, die es nicht mehr gibt. Wer das Raster abbaut, entfernt auch die
   Inline-Stile. Und: CSS-Grid füllt in Dokumentreihenfolge und geht nie zurück — bring die
   Karten **vor** dem Platzieren in Spaltenreihenfolge.

**Testen ohne Browser.** Mit `linkedom` (liegt schon in `node_modules`, die Runtime nutzt es
selbst) lädst du das server-gerenderte HTML in ein DOM, führst dein echtes Script darin aus
und taktest den `MutationObserver` von Hand. Zwei Regeln machen diese Tests etwas wert:

- **Gegen echte Kundendaten testen, nicht nur gegen Mock.** Rendere einmal mit den Mock-Daten
  und einmal mit `VIBE_DATA_SOURCE=api` gegen das echte Event (siehe README). Ein Spaltenlayout,
  das im Mock stimmt, kann live falsch sein, weil die Spalten dort aus einem anderen Feld
  kommen (Tabs statt Räume).
- **Eine Prüfung, die ohne den Fix nicht rot wird, prüft nichts.** Nimm den Fix testweise
  heraus und sieh zu, wie der Test fehlschlägt. Erst dann zählt er.

## 11. Dev & Preview

### 11.1 Lokaler Start

Das Sample-Repo zieht die Dev-Runtime als npm-Paket (`@streavent/sv-runtime`) — dieselbe, die
beim Publish läuft. Lokal tut sie genau das, was die Live-Seite tut, nur mit Mock-Daten.

```bash
npm install
npm start          # http://localhost:3001
```

Der Dev-Server:

- serviert deine Seiten aus `src/` mit Clean URLs,
- **rendert die `<sv-*>`-Komponenten** mit den Mock-Daten aus `mock-data/`,
- zeigt die `data-sv-field`-Defaults aus deinem Markup,
- erzeugt die Sprachversionen (`/de`, `/en`) live,
- **prüft deine Seite gegen den Contract** und zeigt Probleme als Banner unten links + als
  Report beim Start (unbekannte `<sv-*>`, falsche Felder, fehlende `<template>`/Pflicht-Attribute,
  reservierte Routen, Config-Fehler).

### 11.2 Contract-Check (vor der Abgabe)

```bash
npm run validate   # einmaliger Check, Exit-Code 1 bei Fehlern
```

Speist sich aus demselben Komponenten-Katalog wie die Runtime — deckt also genau das ab, was beim
Publish ebenfalls geprüft wird. **Muss grün sein, bevor du die ZIP abgibst.**

### 11.3 Mock-Daten

In `mock-data/` liegen Beispiel-Datensätze (Speaker, Agenda, Sponsoren, Event). Du darfst sie
erweitern, um dein Layout mit realistischen Mengen zu testen (viele Speaker, lange Titel, fehlende
optionale Felder). Die Feldnamen entsprechen exakt [Kap. 5](#5-dynamische-daten--die-sv-komponenten).

Die Mock-Agenda enthält absichtlich **drei Tabs am selben Datum** (Hauptprogramm und zwei
Workshops mit gemeinsamer Kaffeepause). So siehst du schon lokal, wie `group="day"` sie zu
einem Tag mit drei Spuren zusammenlegt — der Fall, an dem fest verdrahtete Tage scheitern.

> **Deine eigenen Collections stehen nicht hier.** Ihre Startdaten gehören ins Bundle
> (`src/collections/*.json`, siehe [4.9](#49-custom-collections--wiederkehrende-datenobjekte)) —
> `mock-data/` ist reine Vorschau und wird nicht mit abgegeben.

### 11.4 Grenzen der lokalen Vorschau

- Du arbeitest gegen **Mock-Daten**, nicht gegen ein echtes Event. Echte Daten erscheinen erst nach
  dem Anbinden an ein Event (Publish).
- Das **Inline-Editing** des Kunden ist eine CMS-Funktion und steht lokal nicht zur Verfügung —
  lokal siehst du immer die Default-Werte.

> Teste vor allem die **Leerzustände** (`mock-data` leeren) und die **Langtext-/Vielfach-Fälle**.

## 12. Publish & Go-Live

### 12.1 Was du ablieferst

Ein **ZIP** mit deinem Seiten-Inhalt — nicht das ganze Repo. Erst prüfen, dann packen:

```bash
npm run validate   # muss grün sein (Exit 0)
npm run package    # erzeugt my-event-site.zip
```

Das ZIP enthält:

```text
src/…                     # deine Seiten + Assets
streavent.config.json     # das Manifest
```

**Nicht** enthalten: `mock-data/`, `node_modules/`, die Doku — die braucht Streavent nicht.
Die Startdaten deiner Collections liegen bewusst unter `src/collections/` und sind deshalb
**drin**: ohne sie steht der Kunde beim ersten Öffnen vor leeren Listen.

### 12.2 Hochladen im CMS

1. Im Streavent-CMS am Event den Toggle **„Custom Website"** aktivieren.
2. Die ZIP per **Drag & Drop** hochladen.
3. Streavent **validiert** (Struktur, Manifest, reservierte Pfade), **rendert** und schaltet die
   Seite live.

### 12.3 Custom-Domain

Eine Vibe Site läuft **immer unter einer Custom-Domain** (z. B. `cpt.events`). Die Domain wird im
CMS am Event verbunden — ohne Custom-Domain keine Vibe Site.

### 12.4 Updates

Neue Version? **Neue ZIP rein droppen** — fertig. Wichtig:

- Solange die `data-sv-field`-**Schlüssel gleich bleiben**, behält der Kunde seine inline
  gepflegten Inhalte (gespeicherter Wert gewinnt, siehe [Kap. 4.5](#45-was-beim-publish-passiert-und-wer-gewinnt)).
- Benennst du Schlüssel um, verwaisen die zugehörigen Kundenwerte.
- Frühere Bundles bleiben bei Streavent erhalten (die letzten 20); ein **Rollback** auf ein
  früheres Bundle macht Streavent auf Anfrage über die Admin-Seite der Website. Auch der Rollback
  prüft die Collection-Schemas: würden gespeicherte Einträge ihre Felder verlieren, wird er
  abgelehnt.
- Der Kunde hat im Editor **Rückgängig/Wiederherstellen** in der Kopfzeile — für jede Änderung an
  seinen Inhalten (Texte, Listen, Schriftgrößen, ausgeblendete Sections), über alle Bearbeiter und
  Sitzungen hinweg. Ein Schritt landet im Entwurf — live geht es erst mit dem nächsten
  Veröffentlichen.

## 13. Constraints & Do's / Don'ts

Die harten Regeln auf einer Seite.

### ✅ Do

- Schreib echten Inhalt **direkt ins Markup** — das ist der Default ([Kap. 4](#4-statische-inhalte--inline-editing)).
- Markiere **Inhalt** (Texte, Bilder, Buttons) als editierbar, nichts Strukturelles/Dekoratives.
- Gib jedem `<sv-*>` einen **`<template slot="empty">`** (Leerzustand).
- Nutze für editierbare Bilder **`<sv-image>` / `<sv-gallery>`** und size die Box per CSS oder
  `width`/`height` — nie natürliche Bildgröße.
- Lege Assets in **Unterordner** (`/img`, `/css`, `/js`, `/fonts`).
- Benenne Felder nach **`sektion.element`**; gleicher Schlüssel = gleicher Wert überall.
- Sieh editierbaren Texten im Layout **genug Platz** für realistische Eingaben vor.
- Markiere Phasen-Blöcke (Call for Papers, Countdown, Nachbericht) mit **`data-sv-section`**,
  Blöcke, die erst später gebraucht werden, zusätzlich mit `data-sv-hidden` ([4.10](#410-abschnitte-aus--und-einblenden)).
- Blöcke, die der Kunde **hinzufügen** soll, sind eine **Collection** ([4.11](#411-sections-die-der-kunde-selbst-hinzufügt)).

### ⛔ Don't

- **Keine eigenen Seiten** unter reservierten App-Routen:
  `shop · register · sessions · ticket · tickets · checkout · feedback · app · login · booth · zoom · invoice · registration · check`.
- **Keine Top-Level-Sektion** wie eine App-Route benennen (sie würde diese überschatten).
- **Keine erfundenen** Komponenten/Felder/Collections — nur die in
  [Kap. 5](#5-dynamische-daten--die-sv-komponenten) dokumentierten.
- **Keine Asset-Dateien im Root** (außer `favicon.ico`, `robots.txt`, `sitemap.xml`).
- **Kein Preis-Teaser** mit erfundenen Ticketpreisen — auf `/shop` verlinken.
- **Keine Schlüssel** ohne Not umbenennen (verwaist Kundeninhalte).
- **Keine Tage hart codieren** (`<sv-agenda day="1">`, `day="2"` …) — `day` ist ein Tab-Index.
  Ein Programm über mehrere Tage ist **eine** `<sv-agenda group="day">` ([5.3](#53-komponenten-katalog)).

## 14. Referenz / Cheat-Sheet

### Die zwei Markup-Primitive

| Primitiv                              | Wofür                                                         |
| ------------------------------------- | ------------------------------------------------------------- |
| `data-sv-field="key"`                 | Statischer, **editierbarer** Inhalt (Default steht im Markup) |
| `<sv-…><template>…</template></sv-…>` | **Dynamische** Streavent-Daten (renderless)                   |

### `data-sv-field`-Typen (`data-sv-type`)

| Typ              | Editiert                      | Default aus         |
| ---------------- | ----------------------------- | ------------------- |
| `text` (Default) | reiner Text                   | Textinhalt          |
| `richtext`       | Text + begrenzte Formatierung | innerer HTML-Inhalt |
| `link`           | nur `href` (+ `download`)     | `href`-Attribut     |
| `cta`            | Label + `href` (+ `download`) | Text + `href`       |
| `image`          | Bild + Alt-Text               | siehe `<sv-image>`  |
| `video`          | Videodatei + Vorschaubild     | siehe `<sv-video>`  |

### Abschnitte & Sections

| Syntax                                         | Zweck                                                                   |
| ---------------------------------------------- | ----------------------------------------------------------------------- |
| `data-sv-section="key"`                        | Block ist im Editor aus-/einblendbar; ausgeblendet = nicht im Live-HTML |
| `data-sv-hidden`                               | Designer-Default „ausgeblendet" (nur zusammen mit `data-sv-section`)    |
| `<sv-collection name="ctas">` + Block-Template | Sections, die der Kunde selbst anlegt, löscht und sortiert              |

Schlüssel: `^[a-z0-9][a-z0-9._-]*$`, nicht innerhalb von `<template>`. Sichtbarkeit gilt für alle
Sprachen.

### Formatierung im Editor

| Feld                   | Leiste im Editor                                                     |
| ---------------------- | -------------------------------------------------------------------- |
| `richtext`             | fett · kursiv · Aufzählung · Link · Schriftgröße (px) · Zurücksetzen |
| `text`                 | Schriftgröße (px) · Zurücksetzen                                     |
| `data-sv-lock="style"` | nur Zurücksetzen                                                     |
| `link` / `cta`         | Formular: URL · E-Mail · Telefon · Datei (`download`)                |

Schriftgröße: feldweit, 8–200 px, als `font-size` ins `style`-Attribut gerendert, auf jedem
Viewport gleich.

### Binding- & Steuer-Attribute (in `<sv-*>`)

| Syntax                                  | Zweck                                                                                  |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| `data-bind="feld"`                      | Feldwert einsetzen (Text / `img`→`src` / `a`→`href` / `meta`→`content` / `title`→Text) |
| `data-bind="a.b"`                       | Verschachteltes Feld (Punkt-Notation)                                                  |
| `data-bind-attr="attr:feld, …"`         | Rohwerte in beliebige Attribute (für eigenes Layout-JS) — `on*`/`style` gesperrt       |
| `data-format="date\|time\|datetime"`    | ISO-Datum formatieren                                                                  |
| `data-join=", "`                        | Array-Feld zu String verbinden                                                         |
| `<sv-each field="arr">…</sv-each>`      | Über ein Array-Feld des aktuellen Objekts iterieren                                    |
| `data-sv-show / data-sv-hide="flag"`    | Markup abhängig von Boolean ein-/ausblenden                                            |
| `<template slot="empty">`               | Leerzustand (Pflicht)                                                                  |
| `limit` · `sort` (`-feld` = absteigend) | Anzahl / Sortierung                                                                    |
| `filter="feld:wert"`                    | Nur Einträge, deren Feld passt (Groß-/Kleinschreibung egal)                            |
| `exclude="feld:wert"`                   | Passende Einträge weglassen (läuft **nach** `filter`)                                  |
| `<template slot="default">`             | Nur `<sv-gallery>`: Startbilder aus dem Bundle                                         |

### Komponenten

| Komponente                 | Liefert               | Wichtige Felder                                                                                                                                                                                                       |
| -------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<sv-speakers>`            | Liste                 | `id`, `name`, `bio`, `image`, `company`, `position`, `website`, `linkedIn`, `twitter`, `featured`, `category`                                                                                                         |
| `<sv-agenda>`              | Liste (Einträge)      | `topic`, `description`, `date`, `dateEnd`, `timeText`, `stage`, `type[]`, `category[]`, `headerImg`, `speakers[]`, `highlight`, `stageColor`, `typeColor`, `categoryColor`, `dayName`, `dayDate`, `dayIndex`, `dayId` |
| `<sv-agenda group="day">`  | Liste (Tage)          | `dayName`, `dayDate`, `dayNumber`, `entries[]`, `tracks[]` (`name`, `entries[]`), `hasTracks`, `stages[]`                                                                                                             |
| `<sv-agenda>` → `speakers` | nested                | `name`, `image`, `company`, `position`, `link`                                                                                                                                                                        |
| `<sv-sponsors>`            | Liste                 | `name`, `logoUrl`, `bannerUrl`, `description`, `website`, `websiteLabel`, `documents[]`, `slug`, `url`                                                                                                                |
| `<sv-event>`               | Einzelobjekt          | `name`, `description`, `startDate`, `endDate`, `timezone`, `location`, `organizer`, `url`, `category`, `tags[]`, `type` (kein `image`/`logo`)                                                                         |
| `<sv-events>`              | Liste                 | `name`, `description`, `location`, `organizer`, `type`, `category`, `tags[]`, `duration`, `image`, `url`, `eventDateTime.*`                                                                                           |
| `<sv-image field>`         | editierbares Bild     | Attribute: `field`, `default`, `sizes`, `loading`, `alt`                                                                                                                                                              |
| `<sv-video field>`         | editierbares Video    | Attribute: `field`, `default`, `poster` (+ `autoplay`, `muted`, `loop`, `playsinline`, `preload` … durchgereicht)                                                                                                     |
| `<sv-gallery field>`       | editierbare Galerie   | Item: `image`, `alt`, `caption`                                                                                                                                                                                       |
| `<sv-capacity>`            | Status (Einzelobjekt) | `atCapacity`, `waitlistEnabled`                                                                                                                                                                                       |
| `<sv-langswitch>`          | Sprachlinks           | `code`, `label`, `url`, `isCurrent`                                                                                                                                                                                   |
| `<sv-collection name>`     | Liste (eigene Daten)  | die im Manifest deklarierten Felder + `slug`, `url` — siehe [4.9](#49-custom-collections--wiederkehrende-datenobjekte)                                                                                                |

### Reservierte Routen (nur verlinken, keine eigenen Seiten)

```text
shop  register  sessions  ticket  tickets  checkout  feedback
app   login     booth     zoom    invoice  registration  check
```

### `streavent.config.json` (Gerüst)

```jsonc
{
  "name": "Mein Event",
  "languages": ["de", "en"],
  "defaultLanguage": "de",
  "collections": [
    {
      "name": "streams",
      "label": "Streams",
      "itemLabel": "name",
      "defaults": "collections/streams.json",
      "fields": [
        { "key": "name", "type": "text", "required": true },
        { "key": "color", "type": "color" }
      ]
    }
  ],
  "dynamicPages": [
    { "template": "speaker.html", "collection": "speakers", "route": "/speakers/:slug", "slugFrom": "name" },
    { "template": "stream.html", "collection": "streams", "route": "/streams/:slug", "slugFrom": "name" }
  ],
  "seo": { "defaultOgImage": "/img/og-default.jpg", "titleSuffix": " · Mein Event" },
  "redirects": { "/tickets.html": "/teilnehmen" }
}
```

> Verfügbare `collection`-Werte: `speakers`, `sponsors`, `agenda`.
