/* Włoski na luzie - skrypty strony (bez bibliotek) */
(function () {
  "use strict";
  var C = window.SITE_CONFIG || {};
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Dane z config.js ---------- */
  $$("[data-cfg]").forEach(function (el) {
    var v = C[el.getAttribute("data-cfg")];
    if (v) el.textContent = v;
  });
  $$("[data-if-cfg]").forEach(function (el) {
    if (!C[el.getAttribute("data-if-cfg")]) el.hidden = true;
  });
  var waText = encodeURIComponent("Ciao! Chcę zapytać o lekcje włoskiego.");
  $$("[data-wa]").forEach(function (a) {
    a.href = "https://wa.me/" + (C.whatsapp || "") + "?text=" + waText;
    a.target = "_blank"; a.rel = "noopener";
  });
  $$("[data-cfg-mail]").forEach(function (a) { if (C.ownerEmail) a.href = "mailto:" + C.ownerEmail; });
  $$("[data-cfg-tel]").forEach(function (a) { if (C.ownerPhone) a.href = "tel:" + C.ownerPhone.replace(/[^0-9+]/g, ""); });
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  var pw = $("#per-week");
  if (pw && C.priceMonthly) pw.textContent = Math.round(parseFloat(C.priceMonthly) * 12 / 52);
  var pm = $("#per-month-1on1");
  if (pm && C.priceLesson) pm.textContent = Math.round(parseFloat(C.priceLesson) * 4);

  /* ---------- Opinie z config.js ---------- */
  var opList = $("#opinie-lista"), opinie = Array.isArray(C.opinie) ? C.opinie.filter(function (o) { return o && o.tekst; }) : [];
  if (opList && opinie.length) {
    var esc = function (t) { var d = document.createElement("div"); d.textContent = String(t || ""); return d.innerHTML; };
    opList.innerHTML = opinie.map(function (o, n) {
      var av = o.zdjecie
        ? '<img class="avatar" src="' + esc(o.zdjecie) + '" alt="" width="52" height="52" loading="lazy">'
        : '<span class="avatar">' + esc((o.imie || "?").trim().charAt(0).toUpperCase()) + "</span>";
      return '<figure class="review reveal" data-delay="' + (n % 3 + 1) + '"><blockquote>' + esc(o.tekst) + "</blockquote>" +
        "<figcaption>" + av + "<span><b>" + esc(o.imie) + "</b>" + (o.opis ? "<small>" + esc(o.opis) + "</small>" : "") + "</span></figcaption></figure>";
    }).join("");
    opList.classList.toggle("few", opinie.length < 3);
    $("#opinie").hidden = false;
  }

  /* ---------- Pokaz slajdów ze zrzutami opinii ---------- */
  var shots = Array.isArray(C.opinieScreeny) ? C.opinieScreeny.filter(Boolean) : [];
  var slider = $("#opinie-slider");
  if (slider && shots.length) {
    var track = $("#opinie-slides"), dotsBox = $(".slide-dots", slider);
    var src = function (f) { return /^(https?:|assets\/)/.test(f) ? f : "assets/img/opinie/" + f; };
    track.innerHTML = shots.map(function (f, n) {
      return '<figure class="slide"><button type="button" class="slide-open" aria-label="Powiększ opinię ' + (n + 1) + '">' +
        '<img src="' + encodeURI(src(f)) + '" alt="Opinia ucznia ' + (n + 1) + '" loading="' + (n < 2 ? "eager" : "lazy") + '"></button></figure>';
    }).join("");
    dotsBox.innerHTML = shots.map(function () { return "<i></i>"; }).join("");
    var slides = $$(".slide", track), sDots = $$("i", dotsBox), cur = 0, auto = null;
    var maxL = function () { return track.scrollWidth - track.clientWidth; };
    var pos = function (s) { return Math.min(maxL(), Math.max(0, s.offsetLeft - slides[0].offsetLeft)); };
    var to = function (x) { track.scrollTo({ left: x, behavior: reduce ? "auto" : "smooth" }); };
    var step = function (dir) {
      var x = track.scrollLeft, list = slides.map(pos), t;
      if (dir > 0) { t = list.filter(function (p) { return p > x + 5; })[0]; to(t === undefined ? 0 : t); }
      else { t = list.filter(function (p) { return p < x - 5; }).pop(); to(t === undefined ? maxL() : t); }
    };
    var go = function (n) { step(n > cur ? 1 : -1); };
    var mark = function () {
      var x = track.scrollLeft, best = 0, bd = Infinity;
      if (x >= maxL() - 5) best = slides.length - 1;
      else slides.forEach(function (s, n) { var d = Math.abs(pos(s) - x); if (d < bd - 1) { bd = d; best = n; } });
      cur = best; sDots.forEach(function (d, n) { d.classList.toggle("on", n === cur); });
    };
    var stop = function () { if (auto) { clearInterval(auto); auto = null; } };
    track.addEventListener("scroll", function () { requestAnimationFrame(mark); }, { passive: true });
    $(".prev", slider).addEventListener("click", function () { stop(); go(cur - 1); });
    $(".next", slider).addEventListener("click", function () { stop(); go(cur + 1); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { stop(); go(cur + 1); } else if (e.key === "ArrowLeft") { stop(); go(cur - 1); }
    });
    ["pointerdown", "touchstart", "wheel"].forEach(function (ev) { track.addEventListener(ev, stop, { passive: true }); });
    if (slides.length > 1 && !reduce) auto = setInterval(function () { go(cur + 1); }, 4500);
    slider.classList.toggle("single", slides.length === 1);
    // Powiększenie
    var lb = $("#lightbox"), lbImg = lb && $("img", lb);
    var closeLb = function () { lb.hidden = true; document.body.style.overflow = ""; };
    $$(".slide-open", track).forEach(function (b) {
      b.addEventListener("click", function () {
        stop(); lbImg.src = $("img", b).src; lbImg.alt = $("img", b).alt;
        lb.hidden = false; document.body.style.overflow = "hidden"; $(".lightbox-close", lb).focus();
      });
    });
    if (lb) {
      lb.addEventListener("click", function (e) { if (e.target !== lbImg) closeLb(); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLb(); });
    }
    slider.hidden = false;
    $("#opinie").hidden = false;
    mark();
  }

  /* ---------- Nawigacja ---------- */
  var nav = $("#nav"), burger = $("#burger"), menu = $("#mobile-menu");
  function closeMenu() {
    if (!nav) return;
    nav.classList.remove("open");
    if (burger) { burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Otwórz menu"); }
    document.body.style.overflow = "";
  }
  if (burger) {
    burger.addEventListener("click", function () {
      var open = !nav.classList.contains("open");
      if (menu) menu.style.top = Math.max(0, nav.getBoundingClientRect().bottom) + "px";
      nav.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
      document.body.style.overflow = open ? "hidden" : "";
    });
  }
  if (menu) $$("a", menu).forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---------- Przewijanie: cień nawigacji, pasek CTA, oś czasu ---------- */
  var cta = $("#mobile-cta"), hero = $(".hero"), zapisy = $("#zapisy");
  var timeline = $("#timeline"), progress = timeline && $(".progress", timeline);
  var ticking = false;
  function onScroll() {
    var sy = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("scrolled", sy > 10);
    if (cta && hero) {
      var pastHero = sy > hero.offsetHeight * 0.7;
      var zr = zapisy ? zapisy.getBoundingClientRect() : null;
      var inForm = zr && zr.top < window.innerHeight && zr.bottom > 0;
      var show = pastHero && !inForm;
      cta.classList.toggle("show", show);
      cta.setAttribute("aria-hidden", String(!show));
      $$("a", cta).forEach(function (a) { a.tabIndex = show ? 0 : -1; });
    }
    if (progress) {
      var r = timeline.getBoundingClientRect();
      var mid = window.innerHeight * 0.6;
      var h = Math.max(0, Math.min(r.height - 12, mid - r.top));
      progress.style.height = h + "px";
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Pojawianie się przy przewijaniu + liczniki + paski ---------- */
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduce) { el.textContent = target; return; }
    var start = null, dur = 1400;
    function step(t) {
      if (!start) start = t;
      var p = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function activate(el) {
    el.classList.add("in");
    $$("[data-count]", el).forEach(countUp);
    $$(".bar i[data-w]", el).forEach(function (b) { b.style.width = b.getAttribute("data-w") + "%"; });
  }
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { activate(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(activate);
  }

  /* ---------- Zmieniające się powitanie w nagłówku ---------- */
  var rot = $("#rotator");
  if (rot && !reduce) {
    var words = $$("span", rot), i = 0;
    setInterval(function () {
      var cur = words[i]; i = (i + 1) % words.length; var nxt = words[i];
      cur.classList.remove("on"); cur.classList.add("out");
      nxt.classList.remove("out"); nxt.classList.add("on");
      setTimeout(function () { cur.classList.remove("out"); }, 650);
    }, 2400);
  }

  /* ---------- Mini odmiana czasownika w karcie z łukiem ---------- */
  var conj = $("#conj");
  if (conj) {
    var forms = [
      ["io", "o", "ja mówię"], ["tu", "i", "ty mówisz"], ["lei / lui", "a", "ona / on mówi"],
      ["noi", "iamo", "my mówimy"], ["voi", "ate", "wy mówicie"], ["loro", "ano", "oni mówią"]
    ];
    var k = 0, verb = $(".conj-verb", conj), pl = $(".conj-pl", conj), dots = $$(".conj-dots i", conj);
    var paint = function () {
      var f = forms[k];
      verb.innerHTML = '<span class="p">' + f[0] + '</span>parl<span class="end">' + f[1] + "</span>";
      pl.textContent = f[2];
      dots.forEach(function (d, n) { d.classList.toggle("on", n === k); });
    };
    var next = function () { k = (k + 1) % forms.length; paint(); };
    var timer = reduce ? null : setInterval(next, 2000);
    conj.style.cursor = "pointer";
    conj.addEventListener("click", function () {
      if (timer) { clearInterval(timer); timer = null; }
      next();
    });
  }

  /* ---------- Zakładki formularzy ---------- */
  var tabs = $$(".tab");
  function selectTab(t) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute("aria-selected", String(on));
      x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute("aria-controls")).hidden = !on;
    });
  }
  tabs.forEach(function (t, idx) {
    t.addEventListener("click", function () { selectTab(t); });
    t.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        var n = tabs[(idx + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        selectTab(n); n.focus();
      }
    });
  });
  if (location.hash === "#pytanie" && tabs[1]) selectTab(tabs[1]);

  /* ---------- Przyciski produktów zaznaczają wybór w formularzu ---------- */
  $$("[data-product]").forEach(function (a) {
    a.addEventListener("click", function () {
      if (tabs[0]) selectTab(tabs[0]);
      var r = document.querySelector('input[name="produkt"][value="' + a.getAttribute("data-product") + '"]');
      if (r) r.checked = true;
    });
  });

  /* ---------- Formularze ---------- */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function validate(form) {
    var ok = true, first = null;
    $$("input, textarea, select", form).forEach(function (el) {
      if (el.type === "checkbox") {
        var lab = el.closest(".consent");
        var bad = el.required && !el.checked;
        if (lab) lab.classList.toggle("err", bad);
        if (bad) { ok = false; first = first || el; }
        return;
      }
      var f = el.closest(".field"); if (!f) return;
      var v = el.value.trim(), bad2 = false;
      if (el.required && !v) bad2 = true;
      else if (v && el.type === "email" && !emailRe.test(v)) bad2 = true;
      else if (v && el.type === "tel" && v.replace(/[^0-9]/g, "").length < 9) bad2 = true;
      f.classList.toggle("err", bad2);
      if (bad2) { ok = false; first = first || el; }
    });
    if (first) first.focus();
    return ok;
  }

  function setStatus(form, cls, html) {
    var s = $(".form-status", form);
    s.className = "form-status " + cls;
    s.innerHTML = html;
  }

  function waLink() { return "https://wa.me/" + (C.whatsapp || "") + "?text=" + waText; }

  $$(".js-form").forEach(function (form) {
    form.addEventListener("input", function (e) {
      var f = e.target.closest(".field"); if (f) f.classList.remove("err");
      var c = e.target.closest(".consent"); if (c) c.classList.remove("err");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(form)) { setStatus(form, "bad", "Uzupełnij zaznaczone pola i zgody."); return; }
      if (form._gotcha && form._gotcha.value) return; // bot

      var endpoint = (C.formEndpoint || "").trim();
      if (!endpoint) {
        setStatus(form, "bad", 'Formularz jeszcze nie działa. Napisz proszę na <a href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp</a>.');
        return;
      }

      var data = new FormData(form);
      data.delete("_gotcha");
      var produkt = data.get("produkt"), ftype = form.getAttribute("data-type");
      if (ftype === "opinia") {
        data.set("wiadomosc", (data.get("wiadomosc") || "") + (data.get("opis") ? "\n\nPodpis: " + data.get("opis") : ""));
        data.delete("opis");
      }
      data.append("typ", ftype === "zapis" ? "Zapis na lekcję 0" + (produkt ? " · " + produkt : "")
        : ftype === "opinia" ? "Opinia · zgoda na publikację: " + (data.get("zgoda_publikacja") || "nie") : "Pytanie");
      data.append("wersja_regulaminu", C.termsVersion || "");
      data.append("data_zgloszenia", new Date().toISOString());
      data.append("strona", location.href.split("#")[0]);
      // Brak zaznaczenia = "nie" w arkuszu
      ["zgoda_regulamin", "zgoda_rodo", "zgoda_kontakt"].forEach(function (n) {
        if (form.querySelector('[name="' + n + '"]') && !data.get(n)) data.append(n, "nie");
      });

      var btn = $("button[type=submit]", form);
      btn.disabled = true; btn.classList.add("loading");

      var isFormspree = /formspree\.io/.test(endpoint);
      var req = isFormspree
        ? fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
            .then(function (r) { if (!r.ok) throw new Error(r.status); })
        : fetch(endpoint, { method: "POST", body: new URLSearchParams(data), mode: "no-cors" }); // Google Apps Script

      req.then(function () {
        var zapis = form.getAttribute("data-type") === "zapis";
        if (form.getAttribute("data-type") === "opinia") {
          form.innerHTML = '<div class="success"><div class="big-check"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg></div><h3>Grazie mille!</h3><p>Dziękuję za opinię. Pojawi się na stronie po przeczytaniu.</p><p><a href="index.html">Wróć na stronę główną</a></p></div>';
          return;
        }
        form.innerHTML =
          '<div class="success"><div class="big-check"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg></div>' +
          "<h3>Grazie mille!</h3><p>" +
          (zapis ? "Zgłoszenie dotarło. Odezwę się w ciągu jednego dnia roboczego, żeby umówić lekcję 0."
                 : "Pytanie dotarło. Odpowiem najszybciej, jak to możliwe.") +
          '</p><p>Jeśli się spieszysz, napisz na <a href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp</a>.</p></div>';
      }).catch(function () {
        btn.disabled = false; btn.classList.remove("loading");
        setStatus(form, "bad", 'Nie udało się wysłać. Spróbuj ponownie albo napisz na <a href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp</a>.');
      });
    });
  });
})();
