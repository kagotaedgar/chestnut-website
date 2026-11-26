/* Chestnut Insurance Agency site script. Progressive enhancement: pages read fine without it. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Mobile menu
  var btn = $('.menu-btn'), menu = $('#mobile-menu');
  if (btn && menu) btn.addEventListener('click', function () { var o = menu.classList.toggle('open'); btn.setAttribute('aria-expanded', String(o)); btn.textContent = o ? 'Close' : 'Menu'; });

  // Desktop mega menus: click/keyboard toggles, hover opens, Escape closes
  var megaBtns = $$('.mega-btn');
  function closeAll(except) { megaBtns.forEach(function (b) { if (b !== except) { b.setAttribute('aria-expanded', 'false'); var p = document.getElementById(b.getAttribute('aria-controls')); if (p) p.hidden = true; } }); }
  megaBtns.forEach(function (b) {
    var panel = document.getElementById(b.getAttribute('aria-controls'));
    function open() { closeAll(b); b.setAttribute('aria-expanded', 'true'); panel.hidden = false; }
    function close() { b.setAttribute('aria-expanded', 'false'); panel.hidden = true; }
    b.addEventListener('click', function () { panel.hidden ? open() : close(); });
    b.parentNode.addEventListener('mouseenter', function () { if (window.matchMedia('(hover:hover)').matches) open(); });
    var hdr = $('.site-header'); hdr.addEventListener('mouseleave', function () { closeAll(); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
  document.addEventListener('click', function (e) { if (!e.target.closest('.site-header')) closeAll(); });

  // Analytics events (only if gtag exists)
  function track(n, p) { if (window.gtag) window.gtag('event', n, p || {}); }
  document.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('a'); if (!a) return; var h = a.getAttribute('href') || '';
    if (h.indexOf('tel:') === 0) track('phone_click'); else if (h.indexOf('wa.me') > -1) track('whatsapp_click'); else if (h.indexOf('mailto:') === 0) track('email_click'); });

  // Partner carousel: gentle auto-advance, manual arrows, pause on hover/focus/touch, respects reduced motion
  $$('[data-carousel]').forEach(function (car) {
    var timer, paused = false, reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var step = function () { var it = car.querySelector('.partner'); return it ? it.getBoundingClientRect().width + 16 : 160; };
    function next(dir) {
      var max = car.scrollWidth - car.clientWidth;
      if (dir > 0 && car.scrollLeft >= max - 4) car.scrollTo({ left: 0, behavior: 'smooth' });
      else if (dir < 0 && car.scrollLeft <= 4) car.scrollTo({ left: max, behavior: 'smooth' });
      else car.scrollBy({ left: dir * step(), behavior: 'smooth' });
    }
    function start() { if (reduce) return; stop(); timer = setInterval(function () { if (!paused && !document.hidden) next(1); }, 2800); }
    function stop() { clearInterval(timer); }
    var wrapper = car.closest('.partners') || car;
    $$('.car-btn', wrapper).forEach(function (b) { b.addEventListener('click', function () { next(parseInt(b.getAttribute('data-dir'), 10)); }); });
    ['mouseenter', 'focusin', 'touchstart'].forEach(function (ev) { car.addEventListener(ev, function () { paused = true; }, { passive: true }); });
    ['mouseleave', 'focusout', 'touchend'].forEach(function (ev) { car.addEventListener(ev, function () { paused = false; }, { passive: true }); });
    start();
  });

  // Quote form: conditional fields + prefill
  var cover = document.getElementById('cover');
  function sync() { if (!cover) return; var o = cover.options[cover.selectedIndex]; var g = o ? o.getAttribute('data-group') : '';
    $$('.conditional').forEach(function (el) { el.hidden = el.getAttribute('data-for').split(' ').indexOf(g) === -1; }); }
  if (cover) { var q = new URLSearchParams(location.search).get('cover'); if (q) { for (var i = 0; i < cover.options.length; i++) if (cover.options[i].value === q) cover.selectedIndex = i; } cover.addEventListener('change', sync); sync(); }

  // Kenyan phone numbers: accepts 07xx, 01xx, +2547xx, 2547xx (spaces and dashes allowed)
  function normPhone(v) { var d = String(v || '').replace(/[\s\-().]/g, ''); if (/^\+254[17]\d{8}$/.test(d)) return d; if (/^254[17]\d{8}$/.test(d)) return '+' + d; if (/^0[17]\d{8}$/.test(d)) return '+254' + d.slice(1); if (/^[17]\d{8}$/.test(d)) return '+254' + d; return null; }

  // Forms
  $$('form[data-chestnut-form]').forEach(function (form) {
    var status = $('.form-status', form);
    function say(kind, html) { status.className = 'form-status show ' + kind; status.innerHTML = html; status.focus(); }
    function err(el, msg) { var box = el.closest('.field'), e = box && box.querySelector('.err'); if (msg) { el.setAttribute('aria-invalid', 'true'); if (e) e.textContent = msg; } else { el.removeAttribute('aria-invalid'); if (e) e.textContent = ''; } }
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var hp = $('.hp input', form); if (hp && hp.value) return;
      var bad = null;
      $$('input, select, textarea', form).forEach(function (el) {
        if (el.closest('[hidden]') || el.closest('.hp')) return;
        var v = (el.value || '').trim(), m = '';
        if (el.required && el.type === 'checkbox' && !el.checked) m = 'Please tick this box to continue.';
        else if (el.required && el.type !== 'checkbox' && !v) m = 'This field is required.';
        else if (el.type === 'email' && v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) m = 'Enter a valid email address, for example name@example.com.';
        else if (el.type === 'tel' && v && !normPhone(v)) m = 'Enter a Kenyan number such as 0712 345 678 or +254 712 345 678.';
        err(el, m); if (m && !bad) bad = el;
      });
      if (bad) { bad.focus(); say('bad', 'Please check the highlighted fields and try again.'); return; }

      var data = {}, labels = {};
      $$('input, select, textarea', form).forEach(function (el) {
        if (!el.name || el.name === 'website' || el.name === 'consent' || el.closest('[hidden]') || el.closest('.hp')) return;
        var v = (el.value || '').trim(); if (!v) return;
        if (el.type === 'tel') v = normPhone(v) || v;
        if (el.tagName === 'SELECT' && el.options[el.selectedIndex]) v = el.options[el.selectedIndex].text;
        var lab = form.querySelector('label[for="' + el.id + '"]'); labels[el.name] = lab ? lab.textContent.replace(/\(optional\)/, '').trim() : el.name; data[el.name] = v;
      });
      var lines = Object.keys(data).map(function (k) { return labels[k] + ': ' + data[k]; });
      var subject = form.getAttribute('data-subject') || 'Enquiry';
      var text = subject + '\n\n' + lines.join('\n') + '\n\nSent from ' + location.origin + location.pathname;
      var endpoint = form.getAttribute('data-endpoint');

      if (endpoint) {
        say('warn', 'Sending...');
        data._form = form.getAttribute('data-chestnut-form'); data._page = location.pathname;
        fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); form.reset(); sync(); track('form_submit', { form: data._form }); say('ok', '<strong>Thank you.</strong> Your request has been sent to our team. An adviser will get back to you shortly.'); })
          .catch(function () { say('bad', 'We could not send that just now. Please try again, or reach us on WhatsApp or by phone.'); });
      } else {
        // No inbox service connected: hand the completed request to WhatsApp or email in one tap
        var wa = 'https://wa.me/' + form.getAttribute('data-wa') + '?text=' + encodeURIComponent(text);
        var mail = 'mailto:' + form.getAttribute('data-email') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
        track('form_ready', { form: form.getAttribute('data-chestnut-form') });
        say('ok', '<strong>Your request is ready.</strong> Choose how to send it to our team:<div class="btn-row"><a class="btn btn-primary" href="' + wa + '" rel="noopener">Send on WhatsApp</a><a class="btn btn-ghost" href="' + mail + '">Send by email</a></div><span class="form-note">Nothing is sent until you tap one of these buttons.</span>');
      }
    });
  });
})();
