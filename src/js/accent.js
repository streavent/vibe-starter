/**
 * Färbt die Elemente ein, die eine Farbe aus den Daten mitbringen.
 *
 * `data-bind-attr` darf `style` nicht schreiben (CSS-Injection), reicht die Farbe aber als
 * `data-accent` durch. Von dort ins Layout sind es drei Zeilen — die Streavent-Daten
 * bestimmen die Farbe, das Stylesheet bestimmt, was damit passiert.
 */
document.querySelectorAll('[data-accent]').forEach(function (el) {
  el.style.setProperty('--accent-stream', el.dataset.accent);
});
