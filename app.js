/* Behaviour of the site: layout, animations, navigation. */
const AUTHOR = window.AUTHOR, SESSIONS = window.SESSIONS;

const pad = n => String(n).padStart(2, "0");
const $ = s => document.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobile = () => innerWidth <= 860;
$("#author").textContent = AUTHOR;
$("#total").textContent = pad(SESSIONS.length);

/* ---------- cork texture, generated once ---------- */
(() => {
  try {
    const s = 360, cv = document.createElement("canvas"); cv.width = cv.height = s;
    const g = cv.getContext("2d");
    g.fillStyle = "#c4925a"; g.fillRect(0, 0, s, s);
    const tones = ["#a8733f", "#d8a76b", "#8c5a2c", "#e6c08a", "#b98149", "#f0d3a4", "#7a4b22"];
    let seed = 3; const r = () => (seed = seed * 16807 % 2147483647) / 2147483647;
    for (let i = 0; i < 6500; i++) {
      const x = r() * s, y = r() * s, w = .5 + r() * 2.4, h = .4 + r() * 1.8, ang = r() * Math.PI;
      g.fillStyle = tones[(r() * tones.length) | 0]; g.globalAlpha = .5 + r() * .5;
      for (const dx of [-s, 0, s]) for (const dy of [-s, 0, s]) {
        const X = x + dx, Y = y + dy; if (X < -4 || X > s + 4 || Y < -4 || Y > s + 4) continue;
        g.beginPath(); g.ellipse(X, Y, w, h, ang, 0, 6.2832); g.fill();
      }
    }
    document.documentElement.style.setProperty("--cork", `url(${cv.toDataURL()})`);
  } catch (e) {}
})();

/* ---------- generative art, one motif per session ---------- */
const arts = [];
function makeArt(canvas, type, fg, bg) {
  const a = { el: canvas, ctx: canvas.getContext("2d"), type, fg, bg, t: type * 3, speed: .5, visible: true, w: 0, h: 0 };
  const size = () => {
    const r = canvas.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 1.5);
    a.w = r.width; a.h = r.height;
    canvas.width = Math.round(r.width * d); canvas.height = Math.round(r.height * d);
    a.ctx.setTransform(d, 0, 0, d, 0, 0); draw(a);
  };
  new ResizeObserver(size).observe(canvas);
  new IntersectionObserver(([e]) => a.visible = e.isIntersecting).observe(canvas);
  arts.push(a); return a;
}
function draw(a) {
  const { ctx: c, w, h, t, fg, bg } = a; if (!w || !h) return;
  const cx = w / 2, cy = h / 2, m = Math.min(w, h), TAU = Math.PI * 2;
  c.fillStyle = bg; c.fillRect(0, 0, w, h);
  c.strokeStyle = fg; c.fillStyle = fg; c.lineWidth = 1;
  switch (a.type) {
    case 0: // breathing rings
      for (let i = 1; i <= 26; i++) { c.beginPath(); c.arc(cx, cy, Math.max(1, i * m * .017 + Math.sin(t + i * .45) * 5), 0, TAU); c.stroke(); } break;
    case 1: // flowing lines
      for (let i = 0; i < 34; i++) { const y0 = h * (i + .5) / 34, amp = 12 * Math.sin(i * .3 + t * .5); c.beginPath();
        for (let x = 0; x <= w; x += 6) { const y = y0 + Math.sin(x * .02 + t + i * .25) * amp; x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); } break;
    case 2: { // dot field with a moving lens
      const px = cx + Math.cos(t * .7) * w * .3, py = cy + Math.sin(t * .9) * h * .3, s = 15;
      c.beginPath(); for (let x = s / 2; x < w; x += s) for (let y = s / 2; y < h; y += s) { const r = Math.max(.6, 6 - Math.hypot(x - px, y - py) / 26); c.moveTo(x + r, y); c.arc(x, y, r, 0, TAU); } c.fill(); break; }
    case 3: { // equaliser bars
      const n = 44, bw = w / n;
      for (let i = 0; i < n; i++) { const v = (.5 + .5 * Math.sin(i * .35 + t)) * (.5 + .5 * Math.cos(i * .12 - t * .6)), bh = Math.max(2, v * h * .8); c.fillRect(i * bw + bw * .3, cy - bh / 2, bw * .4, bh); } break; }
    case 4: // spiral
      c.beginPath(); for (let i = 0; i < 700; i++) { const ang = i * .16 + t * .35, r = i * m * .45 / 700, x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r, rr = 1 + .8 * Math.sin(i * .05 + t * 2); c.moveTo(x + rr, y); c.arc(x, y, rr, 0, TAU); } c.fill(); break;
    case 5: { // moiré
      const o = Math.cos(t * .6) * m * .12;
      for (let i = 1; i < 40; i++) { const r = i * m * .016; c.beginPath(); c.arc(cx - o, cy, r, 0, TAU); c.stroke(); c.beginPath(); c.arc(cx + o, cy, r, 0, TAU); c.stroke(); } break; }
    case 6: // orbits
      for (let i = 0; i < 22; i++) { c.beginPath(); c.ellipse(cx, cy, m * .42, Math.max(1, m * .14 * (1 + .45 * Math.sin(t + i * .5))), i * Math.PI / 22 + t * .12, 0, TAU); c.stroke(); } break;
    case 7: { // rotating lattice
      const n = 9, s = m / n * .82, ox = cx - s * (n - 1) / 2, oy = cy - s * (n - 1) / 2;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const x = ox + i * s, y = oy + j * s, d = Math.hypot(x - cx, y - cy);
        c.save(); c.translate(x, y); c.rotate(Math.sin(t - d * .02) * 1.2); const k = s * .5 * (.4 + .6 * Math.abs(Math.cos(t * .7 - d * .015))); c.strokeRect(-k / 2, -k / 2, k, k); c.restore(); } break; }
  }
}

/* ---------- build panels ---------- */
const track = $("#track");
SESSIONS.forEach((s, i) => {
  const b = document.createElement("button");
  const soon = s.ready === false;
  b.className = "panel" + (soon ? " soon" : ""); b.dataset.cursor = soon ? "Soon" : "Open";
  b.setAttribute("aria-label", soon ? `Session ${i + 1}, coming soon` : `Open session ${i + 1}: ${s.title}, ${s.speaker}`);
  b.innerHTML = `<div class="panel-meta"><b>Session ${i + 1}</b><span>${soon ? "" : s.date}</span></div><canvas></canvas>
    <div class="panel-text"><h3>${soon ? "Coming soon" : s.title}</h3>${s.speaker ? `<p>${s.speaker}</p>` : ""}</div>`;
  track.appendChild(b);
  const art = makeArt(b.querySelector("canvas"), i, "#f2f2f0", "#161616");
  art.panel = true;
  if (soon) art.still = true;
  else { b.addEventListener("mouseenter", () => art.speed = 2.2); b.addEventListener("mouseleave", () => art.speed = .5); }
  if (!soon) b.addEventListener("click", e => openRoom(i, e.clientX || innerWidth / 2, e.clientY || innerHeight / 2));
});
const tail = document.createElement("div");
tail.className = "ticket";
tail.innerHTML = `<div class="t-top">GUEST SPEAKER SERIES<br>ESSEC BUSINESS SCHOOL<br>TERM 2026</div>
  <div class="t-big">SG</div><div class="t-city">SINGAPORE</div>
  <p>More sessions will be added as the term goes on.</p>
  <div class="t-no">NO. ${pad(SESSIONS.filter(s => s.ready !== false).length)} / ${pad(SESSIONS.length)}</div><div class="t-bar" aria-hidden="true"></div>`;
track.appendChild(tail);

/* ---------- pinned horizontal scroll ---------- */
const wrap = $("#wrap");
let dist = 0, target = 0, pos = 0;
function layout() {
  if (mobile()) { wrap.style.height = ""; dist = 0; return; }
  dist = Math.max(0, track.scrollWidth - innerWidth);
  wrap.style.height = (innerHeight + dist) + "px";
}
function readScroll() {
  if (mobile()) return;
  const p = Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / (wrap.offsetHeight - innerHeight || 1)));
  target = p * dist;
  $("#barfill").style.width = p * 100 + "%";
  const N = SESSIONS.length;
  $("#count").textContent = pad(Math.min(N, Math.max(1, Math.round(p * (N - 1)) + 1)));
}
addEventListener("scroll", readScroll, { passive: true });
addEventListener("resize", () => { layout(); readScroll(); });

/* ---------- main loop ---------- */
let last = performance.now(), artClock = 0;
function loop(now) {
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  if (!mobile() && pos !== target) { pos = target; track.style.transform = `translate3d(${-pos}px,0,0)`; }
  artClock += dt;
  if (artClock >= 1 / 30 && !reduce) {
    const step = artClock; artClock = 0;
    for (const a of arts) {
      if (!a.visible || a.still || !a.el.isConnected) continue;
      if (a.panel && openIdx >= 0) continue;
      a.t += step * a.speed; draw(a);
    }
  }
  requestAnimationFrame(loop);
}

/* ---------- session room ---------- */
const room = $("#room"), body = $("#roomBody");
let openIdx = -1, roomArt = null;

function roomHTML(i) {
  const s = SESSIONS[i], ni = SESSIONS.findIndex((x, k) => k > i && x.ready !== false), n = ni > 0 ? SESSIONS[ni] : null;
  return `
  <section class="r-hero">
    <div>
      <div class="r-num">${pad(i + 1)}</div>
      <h2>${s.title}</h2>
      ${s.definition ? `<p class="def">${s.definition}</p>` : ""}
      <dl class="who">
        <div><dt>${/,| and /.test(s.speaker) ? "Speakers" : "Speaker"}</dt><dd>${s.speaker}</dd></div>
        ${s.role || s.company ? `<div><dt>${s.role ? "Role" : "From"}</dt><dd>${[s.role, s.company].filter(Boolean).join(", ")}</dd></div>` : ""}
        ${s.date ? `<div><dt>Date</dt><dd>${s.date}</dd></div>` : ""}
      </dl>
    </div>
    <div class="r-art"><canvas></canvas></div>
  </section>

  <section class="r-section">
    <div class="r-title"><h3>Key<br>learnings</h3><p>The ideas from ${s.speaker} that I want to remember. Open each one for the detail.</p></div>
    <ul class="learn">
      ${s.learnings.map(l => `<li>
        <button class="l-head" aria-expanded="false" data-cursor="Read"><span>${l.t}</span><i class="l-icon" aria-hidden="true"></i></button>
        <div class="l-body"><div><p>${l.d}</p></div></div></li>`).join("")}
    </ul>
  </section>

  ${s.quiz && s.quiz.length ? `<section class="r-section quiz">
    <div class="r-title"><h3>Test<br>yourself</h3><p>A few quick questions to check what stuck. Pick an answer; a wrong one is crossed out so you can try again.<span class="score" id="score">Score: 0 / ${s.quiz.length}</span></p></div>
    <ul class="quiz-list">
      ${s.quiz.map((q, k) => `<li data-q="${k}">
        <p class="q-text">${q.q}</p>
        <div class="q-opts">${q.options.map((o, j) => `<button data-o="${j}" data-cursor="Pick">${o}</button>`).join("")}</div>
        <p class="q-why" hidden>${q.why || ""}</p></li>`).join("")}
    </ul>
  </section>` : ""}

  ${s.essay ? essayHTML(s) : `<section class="r-section reflect">
    <div class="r-title"><h3>Reflec&shy;tion</h3></div>
    ${s.quote ? `<p class="lit">${s.quote.split(" ").map(w => `<span>${w}</span>`).join(" ")}</p>` : ""}
    <div class="notes">${s.notes.map(x => `<div class="note"><h4>${x.h}</h4><div class="note-body">${x.p.split("\n\n").map(par => `<p>${par}</p>`).join("")}</div></div>`).join("")}</div>
  </section>`}

  <button class="next" data-go="${n ? ni : -1}" data-cursor="${n ? "Next" : "Back"}">
    <small>${n ? "Next: session " + (ni + 1) : "You have reached the end"}</small>
    <strong>${n ? n.title : "All sessions"}</strong>
  </button>`;
}

/* ---------- reflection written as an interactive essay ---------- */
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const words = t => t.split(" ").map(w => `<span>${w}</span>`).join(" ");
function essayHTML(s) {
  const e = s.essay; let fn = 0, figN = 0;
  const text = e.chapters.flatMap(c => c.blocks).filter(b => typeof b === "string").join(" ") + " " + e.standfirst + " " + (e.closing || "");
  const mins = Math.max(1, Math.round(text.split(/\s+/).length / 220));
  const para = p => `<p class="e-p">${p.replace(/\[\[(.+?)\]\]/g, (_, n) => { fn++; return `<button class="fn" aria-expanded="false" data-cursor="Note">${fn}</button><span class="fn-note" hidden><b>${fn}</b> ${n}</span>`; })}</p>`;
  const figure = name => {
    figN++;
    if (name === "chain" && s.chain) return `<figure class="fig chain" data-fig="chain">
      <figcaption><b>Figure ${figN}</b> The handoff chain. Click a step, or play the chain.</figcaption>
      <div class="c-track"><i class="c-line"></i>${s.chain.map((c, k) => `<button class="c-step${c.human ? " human" : ""}" data-k="${k}" data-cursor="Step"><span>${k + 1}</span><em>${c.role}</em></button>`).join("")}</div>
      <div class="c-panel" aria-live="polite"></div>
      <button class="c-play" data-cursor="Play">Play the chain</button>
    </figure>`;
    if (name === "scores" && s.scores) return `<figure class="fig scores" data-fig="scores">
      <figcaption><b>Figure ${figN}</b> Creative scores out of 10, rated by the AI through three agency lenses. Switch lens, open a row for the verdict.</figcaption>
      <div class="s-tabs" role="tablist">${["Average", ...s.scores.lenses].map((l, k) => `<button role="tab" data-l="${k - 1}" aria-selected="${k === 0}" data-cursor="Lens">${l}</button>`).join("")}</div>
      <ul class="s-rows">${s.scores.items.map(it => `<li class="${it.best ? "best" : ""}"><button class="s-row" aria-expanded="false" data-cursor="Open">
        <span class="s-name">${it.name}</span><span class="s-bar"><i data-v='${JSON.stringify(it.v)}'></i></span><b class="s-val">0.0</b></button>
        <div class="s-verdict"><div><p>${it.verdict}</p></div></div></li>`).join("")}</ul>
    </figure>`;
    return "";
  };
  return `<section class="essay">
    <header class="e-head">
      <p class="e-kicker"><span>Reflection</span><span>Essay</span><span>${mins} min read</span></p>
      <h3 class="e-title">${e.title}</h3>
      <p class="e-stand">${e.standfirst}</p>
      <p class="e-by">By ${window.AUTHOR || ""}, after the session of ${s.date}</p>
    </header>
    <div class="e-grid">
      <nav class="e-rail" aria-label="Chapters"><i class="e-meter"><b></b></i>
        <ol>${e.chapters.map((c, k) => `<li><button data-ch="${k}" data-cursor="Go"><span>${ROMAN[k]}</span>${c.h}</button></li>`).join("")}</ol>
      </nav>
      <div class="e-text">
        ${e.chapters.map((c, k) => `<section class="e-ch" id="ch-${k}">
          <h4 class="e-h"><span>${ROMAN[k]}</span>${c.h}</h4>
          ${c.blocks.map(b => typeof b === "string" ? para(b) : b.quote ? `<blockquote class="e-quote lit">${words(b.quote)}</blockquote>` : b.figure ? figure(b.figure) : "").join("")}
        </section>`).join("")}
        ${e.closing ? `<p class="e-close lit">${words(e.closing)}</p><p class="e-sign">${window.AUTHOR || ""}</p>` : ""}
      </div>
    </div>
  </section>`;
}

function wireEssay(s) {
  const ess = body.querySelector(".essay"); if (!ess) return;
  /* side notes */
  ess.querySelectorAll(".fn").forEach(b => b.onclick = () => {
    const n = b.nextElementSibling, open = n.hidden; n.hidden = !open;
    b.setAttribute("aria-expanded", open); b.classList.toggle("on", open);
  });
  /* chapter rail */
  ess.querySelectorAll(".e-rail button").forEach(b => b.onclick = () => {
    const t = ess.querySelector("#ch-" + b.dataset.ch);
    room.scrollTo({ top: room.scrollTop + t.getBoundingClientRect().top - 110, behavior: reduce ? "auto" : "smooth" });
  });
  /* paragraphs and figures rise in */
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); if (x.target.dataset.fig === "scores") setLens(x.target, -1); } }), { root: room, rootMargin: "0px 0px -12% 0px" });
  ess.querySelectorAll(".e-p,.fig,.e-h").forEach(el => io.observe(el));
  /* figure: handoff chain */
  const chain = ess.querySelector(".chain");
  if (chain) {
    const steps = chain.querySelectorAll(".c-step"), panel = chain.querySelector(".c-panel"), line = chain.querySelector(".c-line");
    let timer = 0;
    const show = k => {
      const c = s.chain[k];
      steps.forEach((b, j) => { b.classList.toggle("on", j === k); b.classList.toggle("done", j < k); });
      line.style.setProperty("--p", k / (steps.length - 1));
      panel.innerHTML = `<p class="c-role">${k + 1}. ${c.role}</p><p class="c-does">${c.does}</p>${c.note ? `<p class="c-note">${c.note}</p>` : ""}`;
    };
    const stop = () => { clearInterval(timer); timer = 0; chain.querySelector(".c-play").textContent = "Play the chain"; };
    steps.forEach(b => b.onclick = () => { stop(); show(+b.dataset.k); });
    chain.querySelector(".c-play").onclick = e => {
      if (timer) return stop();
      let k = 0; show(0); e.currentTarget.textContent = "Pause";
      timer = setInterval(() => { k++; if (k >= steps.length) return stop(); show(k); }, 2200);
    };
    show(0);
  }
  /* figure: creative scores */
  const sc = ess.querySelector(".scores");
  if (sc) {
    sc.querySelectorAll(".s-tabs button").forEach(b => b.onclick = () => setLens(sc, +b.dataset.l));
    sc.querySelectorAll(".s-row").forEach(b => b.onclick = () => { const li = b.parentElement, o = li.classList.toggle("open"); b.setAttribute("aria-expanded", o); });
  }
}
function setLens(sc, l) {
  sc.querySelectorAll(".s-tabs button").forEach(b => b.setAttribute("aria-selected", +b.dataset.l === l));
  sc.querySelectorAll(".s-bar i").forEach(i => {
    const v = JSON.parse(i.dataset.v), val = l < 0 ? v.reduce((a, b) => a + b, 0) / v.length : v[l];
    i.style.width = val * 10 + "%";
    i.closest(".s-row").querySelector(".s-val").textContent = val.toFixed(1);
  });
}
function essayScroll() {
  const ess = body.querySelector(".essay"); if (!ess) return;
  const txt = ess.querySelector(".e-text"), r = txt.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (innerHeight * .5 - r.top) / r.height));
  ess.querySelector(".e-meter b").style.transform = `scaleY(${p})`;
  ess.style.setProperty("--read", p);
  let cur = 0;
  ess.querySelectorAll(".e-ch").forEach((c, k) => { if (c.getBoundingClientRect().top < innerHeight * .45) cur = k; });
  ess.querySelectorAll(".e-rail li").forEach((li, k) => li.classList.toggle("on", k === cur));
  if (ess.dataset.cur != cur) {
    ess.dataset.cur = cur;
    const ol = ess.querySelector(".e-rail ol"), li = ol.children[cur];
    if (ol.scrollWidth > ol.clientWidth) ol.scrollTo({ left: li.offsetLeft - 18, behavior: reduce ? "auto" : "smooth" });
  }
}
room.addEventListener("scroll", essayScroll, { passive: true });

function fill(i) {
  if (roomArt) arts.splice(arts.indexOf(roomArt), 1);
  body.innerHTML = roomHTML(i);
  roomArt = makeArt(body.querySelector(".r-art canvas"), i, "#000000", "#ffffff");
  roomArt.speed = .7;
  $("#where").textContent = `Session ${i + 1}`;
  $("#prev").disabled = !SESSIONS.some((x, k) => k < i && x.ready !== false); $("#nextBtn").disabled = !SESSIONS.some((x, k) => k > i && x.ready !== false);
  body.querySelectorAll(".l-head").forEach(btn => btn.onclick = () => {
    const li = btn.parentElement, open = li.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  let score = 0;
  body.querySelectorAll(".quiz-list li").forEach(li => {
    const q = SESSIONS[i].quiz[+li.dataset.q]; let firstTry = true;
    li.querySelectorAll(".q-opts button").forEach(btn => btn.onclick = () => {
      if (+btn.dataset.o === q.answer) {
        btn.classList.add("right");
        li.querySelectorAll(".q-opts button").forEach(b => b.disabled = true);
        li.querySelector(".q-why").hidden = false;
        if (firstTry) score++;
        $("#score").textContent = `Score: ${score} / ${SESSIONS[i].quiz.length}`;
      } else { btn.classList.add("wrong"); btn.disabled = true; firstTry = false; }
    });
  });
  body.querySelector(".next").onclick = e => {
    const g = +e.currentTarget.dataset.go;
    g < 0 ? closeRoom() : goRoom(g);
  };
  wireEssay(SESSIONS[i]);
  lightWords(); essayScroll();
}

function openRoom(i, x, y) {
  room.style.setProperty("--x", x + "px"); room.style.setProperty("--y", y + "px");
  openIdx = i; fill(i); room.scrollTop = 0;
  document.documentElement.classList.add("locked");
  room.classList.add("open");
  history.replaceState(null, "", "#session-" + (i + 1));
  setTimeout(() => $("#close").focus({ preventScroll: true }), 400);
}
function closeRoom() {
  if (openIdx < 0) return;
  const p = track.children[openIdx + 1];
  if (p) { const r = p.getBoundingClientRect(); room.style.setProperty("--x", r.left + r.width / 2 + "px"); room.style.setProperty("--y", r.top + r.height / 2 + "px"); }
  room.classList.remove("open");
  document.documentElement.classList.remove("locked");
  history.replaceState(null, "", location.pathname);
  if (p) p.focus({ preventScroll: true });
  openIdx = -1;
}
function goRoom(i) {
  const d = i > openIdx ? 1 : -1;
  while (SESSIONS[i] && SESSIONS[i].ready === false) i += d;
  if (i < 0 || i >= SESSIONS.length || i === openIdx) return;
  openIdx = i; body.classList.add("swap");
  setTimeout(() => { fill(i); room.scrollTop = 0; history.replaceState(null, "", "#session-" + (i + 1)); requestAnimationFrame(() => body.classList.remove("swap")); }, 380);
}

/* words of the reflection light up as you scroll */
function lightWords() {
  body.querySelectorAll(".lit").forEach(p => {
    const r = p.getBoundingClientRect(), words = p.children;
    const prog = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .35)));
    const on = reduce ? words.length : Math.round(prog * words.length);
    for (let k = 0; k < words.length; k++) words[k].classList.toggle("on", k < on);
  });
}
room.addEventListener("scroll", lightWords, { passive: true });

$("#close").onclick = closeRoom;
$("#prev").onclick = () => goRoom(openIdx - 1);
$("#nextBtn").onclick = () => goRoom(openIdx + 1);
addEventListener("keydown", e => {
  if (openIdx < 0) return;
  if (e.key === "Escape") closeRoom();
  if (e.key === "ArrowRight") goRoom(openIdx + 1);
  if (e.key === "ArrowLeft") goRoom(openIdx - 1);
});

/* ---------- start ---------- */
layout(); readScroll(); requestAnimationFrame(loop);
if (document.fonts) document.fonts.ready.then(() => { layout(); readScroll(); });
const h = location.hash.match(/session-(\d+)/);
if (h) { const i = Math.min(SESSIONS.length, Math.max(1, +h[1])) - 1; room.style.transition = "none"; openRoom(i, innerWidth / 2, innerHeight / 2); requestAnimationFrame(() => room.style.transition = ""); }
