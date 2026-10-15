/* Prototype behaviour only. The real build serves this from its own origin (no inline script, CSP). */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Header menu (below 960px). Without JavaScript the panel is simply visible.
  var header = document.querySelector('.site-header');
  var btn = document.querySelector('.menu-button');
  if (header && btn) {
    var setOpen = function (open) {
      if (open) { header.setAttribute('data-open', ''); } else { header.removeAttribute('data-open'); }
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    btn.addEventListener('click', function () { setOpen(!header.hasAttribute('data-open')); });
    header.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.hasAttribute('data-open')) { setOpen(false); btn.focus(); }
    });
  }

  // Admin shell menu (below 1024px). Without JavaScript the navigation is simply visible.
  var shell = document.querySelector('.admin-shell');
  var abtn = document.querySelector('.admin-menu-button');
  if (shell && abtn) {
    abtn.addEventListener('click', function () {
      var open = !shell.hasAttribute('data-open');
      if (open) { shell.setAttribute('data-open', ''); } else { shell.removeAttribute('data-open'); }
      abtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    shell.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && shell.hasAttribute('data-open')) { shell.removeAttribute('data-open'); abtn.setAttribute('aria-expanded', 'false'); abtn.focus(); }
    });
  }

  // Pause motion control (FR-30): choice kept for the tab session only.
  var KEY = 'jcdm-motion';
  var pauseButtons = document.querySelectorAll('[data-pause-motion]');
  var apply = function (paused) {
    if (paused) { root.setAttribute('data-motion', 'paused'); } else { root.removeAttribute('data-motion'); }
    pauseButtons.forEach(function (b) {
      b.setAttribute('aria-pressed', paused ? 'true' : 'false');
      var label = b.querySelector('[data-label]');
      if (label) { label.textContent = paused ? b.getAttribute('data-resume') : b.getAttribute('data-pause'); }
    });
  };
  var stored = null;
  try { stored = window.sessionStorage.getItem(KEY); } catch (e) { stored = null; }
  apply(stored === '1');
  pauseButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      var next = root.getAttribute('data-motion') !== 'paused';
      apply(next);
      try { window.sessionStorage.setItem(KEY, next ? '1' : '0'); } catch (e) { /* storage unavailable */ }
    });
  });

  // Show or hide password (admin sign in).
  document.querySelectorAll('[data-toggle-password]').forEach(function (t) {
    t.addEventListener('click', function () {
      var input = document.getElementById(t.getAttribute('aria-controls'));
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      t.setAttribute('aria-pressed', show ? 'true' : 'false');
      t.querySelector('[data-label]').textContent = show ? t.getAttribute('data-hide') : t.getAttribute('data-show');
    });
  });

  // Review helper: ?t=1.4 freezes every CSS animation at that time so screenshots are repeatable.
  var m = /[?&]t=([0-9.]+)/.exec(window.location.search);
  if (m) {
    window.addEventListener('load', function () {
      document.getAnimations().forEach(function (a) { a.pause(); a.currentTime = parseFloat(m[1]) * 1000; });
    });
  }
})();
