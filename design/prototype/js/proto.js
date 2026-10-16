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

/* Session timeout warning demo (admin-session-warning.html). Prototype only: the real build counts down to the
   expiry time sent by the server. ?remaining=N sets the seconds left (default 180). */
(function () {
  var scrim = document.querySelector('[data-session-dialog]');
  if (!scrim) { return; }
  var dlg = scrim.querySelector('[role="alertdialog"]');
  var warn = scrim.querySelector('[data-state="warning"]');
  var ended = scrim.querySelector('[data-state="ended"]');
  var count = scrim.querySelector('[data-countdown]');
  var live = document.querySelector('[data-live]');
  var stay = scrim.querySelector('[data-stay]');
  var m = /[?&]remaining=([0-9]+)/.exec(window.location.search);
  var total = m ? parseInt(m[1], 10) : parseInt(scrim.getAttribute('data-remaining'), 10);
  var left = total;
  var timer = null;
  var behind = Array.prototype.slice.call(document.querySelectorAll('.skip-link, .concept-notice, .admin-shell'));
  var returnTo = null;
  var announce = { 120: 'About 2 minutes left before you are signed out.', 60: 'About 1 minute left before you are signed out.', 30: 'About 30 seconds left before you are signed out.', 10: 'About 10 seconds left before you are signed out.' };

  var words = function (s) {
    var mins = Math.floor(s / 60), secs = s % 60;
    return mins + (mins === 1 ? ' minute ' : ' minutes ') + secs + (secs === 1 ? ' second' : ' seconds');
  };
  var setInert = function (on) {
    behind.forEach(function (el) { if (on) { el.setAttribute('inert', ''); } else { el.removeAttribute('inert'); } });
  };
  var focusables = function () {
    return Array.prototype.slice.call(dlg.querySelectorAll('a[href], button:not([disabled])')).filter(function (el) { return !el.closest('[hidden]'); });
  };
  var open = function () {
    returnTo = document.activeElement;
    scrim.hidden = false; warn.hidden = false; ended.hidden = true;
    setInert(true);
    document.body.style.overflow = 'hidden';
    stay.focus();
    tick();
  };
  var close = function () {
    clearTimeout(timer);
    scrim.hidden = true; setInert(false); document.body.style.overflow = '';
    if (returnTo && document.contains(returnTo)) { returnTo.focus(); } else { var h = document.querySelector('h1'); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); } }
  };
  var end = function () {
    clearTimeout(timer);
    warn.hidden = true; ended.hidden = false;
    live.textContent = 'You were signed out because the session ended.';
    var again = ended.querySelector('[data-signin-again]');
    if (again) { again.focus(); }
  };
  function tick() {
    count.textContent = words(left);
    if (announce[left]) { live.textContent = announce[left]; }
    if (left <= 0) { end(); return; }
    left -= 1;
    timer = setTimeout(tick, 1000);
  }
  stay.addEventListener('click', function () {
    close();
    live.textContent = 'Your session has been extended.';
    left = total;
    // Demo only: show the warning again after another full idle period.
    timer = setTimeout(open, (total + 5) * 1000);
  });
  scrim.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !warn.hidden) { e.preventDefault(); stay.click(); return; }
    if (e.key !== 'Tab') { return; }
    var f = focusables();
    if (!f.length) { return; }
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  open();
})();
