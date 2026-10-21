/* Behaviour of the site: layout, animations, navigation. */
const AUTHOR = window.AUTHOR, SESSIONS = window.SESSIONS;

const pad = n => String(n).padStart(2, "0");
const $ = s => document.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobile = () => innerWidth <= 860;
$("#author").textContent = AUTHOR;
$("#total").textContent = pad(SESSIONS.length);

/* ---------- generative art, one motif per session ---------- */
const arts = [];
function makeArt(canvas, type, fg, bg) {
  const a = { el: canvas, ctx: canvas.getContext("2d"), type, fg, bg, t: type * 3, speed: .5, visible: true, w: 0, h: 0 };
  const size = () => {
    const r = canvas.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
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
      for (let x = s / 2; x < w; x += s) for (let y = s / 2; y < h; y += s) { const r = Math.max(.6, 6 - Math.hypot(x - px, y - py) / 26); c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); } break; }
    case 3: { // equaliser bars
      const n = 44, bw = w / n;
      for (let i = 0; i < n; i++) { const v = (.5 + .5 * Math.sin(i * .35 + t)) * (.5 + .5 * Math.cos(i * .12 - t * .6)), bh = Math.max(2, v * h * .8); c.fillRect(i * bw + bw * .3, cy - bh / 2, bw * .4, bh); } break; }
    case 4: // spiral
      for (let i = 0; i < 700; i++) { const ang = i * .16 + t * .35, r = i * m * .45 / 700; c.beginPath(); c.arc(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r, 1 + .8 * Math.sin(i * .05 + t * 2), 0, TAU); c.fill(); } break;
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
  b.addEventListener("mouseenter", () => art.speed = 2.2);
  b.addEventListener("mouseleave", () => art.speed = .5);
  if (!soon) b.addEventListener("click", e => openRoom(i, e.clientX || innerWidth / 2, e.clientY || innerHeight / 2));
});
const tail = document.createElement("p");
tail.className = "tail"; tail.textContent = "More sessions will be added as the term goes on.";
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

/* ---------- cursor ---------- */
const cur = $("#cursor"); let mx = -100, my = -100, cxp = -100, cyp = -100;
addEventListener("mousemove", e => {
  mx = e.clientX; my = e.clientY;
  const el = e.target.closest("[data-cursor]");
  cur.classList.toggle("big", !!el);
  if (el) cur.firstElementChild.textContent = el.dataset.cursor;
});

/* ---------- main loop ---------- */
let last = performance.now();
function loop(now) {
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  pos += (target - pos) * (reduce ? 1 : .09);
  if (!mobile()) track.style.transform = `translate3d(${-pos}px,0,0)`;
  cxp += (mx - cxp) * .22; cyp += (my - cyp) * .22;
  cur.style.transform = `translate3d(${cxp}px,${cyp}px,0)`;
  for (const a of arts) if (a.visible && a.el.isConnected && !reduce) { a.t += dt * a.speed; draw(a); }
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

  <section class="r-section reflect">
    <div class="r-title"><h3>Reflec&shy;tion</h3></div>
    ${s.quote ? `<p class="lit">${s.quote.split(" ").map(w => `<span>${w}</span>`).join(" ")}</p>` : ""}
    <div class="notes">${s.notes.map(x => `<div><h4>${x.h}</h4><p>${x.p}</p></div>`).join("")}</div>
  </section>

  <button class="next" data-go="${n ? ni : -1}" data-cursor="${n ? "Next" : "Back"}">
    <small>${n ? "Next: session " + (ni + 1) : "You have reached the end"}</small>
    <strong>${n ? n.title : "All sessions"}</strong>
  </button>`;
}

function fill(i) {
  if (roomArt) arts.splice(arts.indexOf(roomArt), 1);
  body.innerHTML = roomHTML(i);
  roomArt = makeArt(body.querySelector(".r-art canvas"), i, "#000000", "#ffffff");
  roomArt.speed = .7;
  $("#where").textContent = `Session ${i + 1}`;
  $("#prev").disabled = !SESSIONS.some((x, k) => k < i && x.ready !== false); $("#nextBtn").disabled = !SESSIONS.some((x, k) => k > i && x.ready !== false);
  body.querySelectorAll(".l-head").forEach(btn => btn.onclick = () => {
    const li = btn.parentElement, open = li.classList.toggle("open");
    btn.setAttribute("aria-expanded", open); btn.dataset.cursor = open ? "Close" : "Read";
    cur.firstElementChild.textContent = btn.dataset.cursor;
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
  lightWords();
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
  const p = body.querySelector(".lit"); if (!p) return;
  const r = p.getBoundingClientRect(), words = p.children;
  const prog = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .35)));
  const on = reduce ? words.length : Math.round(prog * words.length);
  for (let k = 0; k < words.length; k++) words[k].classList.toggle("on", k < on);
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
