/**
 * Video-Lightbox für die Felder vom Typ `video`.
 *
 * Ein `video`-Feld speichert einen blanken String — mal ein Pfad im Bundle
 * (`/video/trailer.mp4`), mal ein YouTube-/Vimeo-Link, je nachdem, was der Organisator
 * im CMS hinterlegt. Beides muss abspielen: ein Portal-Link in einem <video src> zeigt
 * nichts, eine MP4-Datei in einem <iframe> lädt einen Download.
 *
 * Deshalb entscheidet die Wiedergabe anhand des Werts, nicht anhand des Feldes.
 */
(function () {
  var YOUTUBE = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([\w-]{6,})/;
  var VIMEO = /vimeo\.com\/(?:video\/)?(\d+)/;

  /** Embed-URL eines Portal-Links, oder '' wenn der Wert eine Videodatei ist. */
  function embedUrl(value) {
    var yt = value.match(YOUTUBE);
    if (yt) return 'https://www.youtube-nocookie.com/embed/' + yt[1] + '?autoplay=1';
    var vm = value.match(VIMEO);
    if (vm) return 'https://player.vimeo.com/video/' + vm[1] + '?autoplay=1';
    return '';
  }

  var dialog;

  function ensureDialog() {
    if (dialog) return dialog;
    dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.innerHTML = '<button type="button" class="lightbox-close" aria-label="Schließen">&times;</button>' + '<div class="lightbox-stage"></div>';
    // Klick neben den Inhalt schließt — <dialog> liefert Esc von selbst.
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog || e.target.classList.contains('lightbox-close')) dialog.close();
    });
    // Ohne das läuft das Video im Hintergrund weiter.
    dialog.addEventListener('close', function () {
      dialog.querySelector('.lightbox-stage').innerHTML = '';
    });
    document.body.appendChild(dialog);
    return dialog;
  }

  function open(value) {
    var el = ensureDialog();
    var stage = el.querySelector('.lightbox-stage');
    var embed = embedUrl(value);
    if (embed) {
      var frame = document.createElement('iframe');
      frame.src = embed;
      frame.allow = 'autoplay; fullscreen; picture-in-picture';
      frame.allowFullscreen = true;
      stage.appendChild(frame);
    } else {
      var video = document.createElement('video');
      video.src = value;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      stage.appendChild(video);
    }
    el.showModal();
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-video]');
    if (!trigger) return;
    e.preventDefault();
    open(trigger.getAttribute('data-video'));
  });
})();
