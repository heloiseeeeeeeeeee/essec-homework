/* Hero animation: Singapore skyline at night, drawn in thin white lines.
   Marina Bay Sands with sweeping light beams, the Singapore Flyer turning,
   Supertrees, the ArtScience Museum, CBD towers with twinkling windows,
   and the whole city reflected in the bay. No external library. */
(() => {
  const canvas = document.getElementById("hero3d");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- the city, in virtual units (1440 wide, y = height above the water) ---------- */
  // [x, width, height, roof style] roof: 0 flat, 1 slanted, 2 stepped, 3 antenna, 4 rounded
  const back = [
    [30, 46, 150, 1], [80, 40, 205, 0], [124, 58, 250, 2], [186, 44, 300, 3], [234, 54, 230, 0],
    [292, 40, 272, 4], [336, 60, 340, 2], [400, 44, 292, 1], [448, 54, 222, 0], [506, 40, 184, 3],
    [1312, 48, 205, 0], [1364, 44, 252, 1], [1412, 40, 176, 4]
  ];
  const MBS = { x: 712, w: 48, gap: 34, h: 300 };
  const FLYER = { x: 1246, y: 158, r: 112 };
  const TREES = [[990, 96], [1016, 138], [1044, 112], [1068, 150], [1094, 90]];

  // windows: random lit points inside back towers
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const windows = [];
  back.forEach(([x, w, h]) => {
    for (let wy = 14; wy < h - 18; wy += 13) for (let wx = x + 7; wx < x + w - 5; wx += 9)
      if (rnd() < 0.22) windows.push([wx, wy, rnd() * 6.28, 0.4 + rnd() * 1.4]);
  });
  for (let t = 0; t < 3; t++) for (let wy = 20; wy < MBS.h - 20; wy += 16) for (let k = 0; k < 3; k++)
    if (rnd() < 0.3) windows.push([MBS.x + t * (MBS.w + MBS.gap) + 8 + k * 14, wy, rnd() * 6.28, 0.3 + rnd()]);

  /* ---------- sizing ---------- */
  let W = 0, H = 0, dpr = 1, k = 1, ox = 0, horizon = 0;
  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    k = Math.max(W / 1440, H / 1500) * (W < 700 ? 1 : 0.9);
    ox = W >= 1440 * k ? (W - 1440 * k) / 2 : W / 2 - 860 * k; // on narrow screens, centre on Marina Bay Sands
    horizon = H * (W < 700 ? 0.8 : 0.84);
    if (reduce) draw(performance.now());
  }

  /* ---------- drawing helpers ---------- */
  const ease = v => 1 - Math.pow(1 - Math.min(Math.max(v, 0), 1), 3);
  let rise = 1; // per-element growth, set while drawing
  const grow = (x, p) => ease(p * 1.9 - x / 1440 * 0.9);

  function tower(x, w, h, style) {
    const g = rise; h *= g; if (h < 1) return;
    ctx.beginPath();
    ctx.moveTo(x, 0); ctx.lineTo(x, -h);
    if (style === 1) { ctx.lineTo(x + w, -h - 18 * g); }
    else if (style === 2) { ctx.lineTo(x + w * 0.2, -h); ctx.lineTo(x + w * 0.2, -h - 14 * g); ctx.lineTo(x + w * 0.8, -h - 14 * g); ctx.lineTo(x + w * 0.8, -h); ctx.lineTo(x + w, -h); }
    else if (style === 4) { ctx.quadraticCurveTo(x + w / 2, -h - 22 * g, x + w, -h); }
    else { ctx.lineTo(x + w, -h); }
    ctx.lineTo(x + w, 0);
    ctx.fill(); ctx.stroke();
    if (style === 3) { ctx.beginPath(); ctx.moveTo(x + w / 2, -h); ctx.lineTo(x + w / 2, -h - 34 * g); ctx.stroke(); }
  }

  function marinaBaySands() {
    const { x, w, gap } = MBS, h = MBS.h * rise;
    if (h < 1) return;
    for (let i = 0; i < 3; i++) {
      const tx = x + i * (w + gap);
      ctx.beginPath();
      ctx.moveTo(tx, 0); ctx.lineTo(tx + 2, -h);
      ctx.lineTo(tx + w - 2, -h);
      ctx.quadraticCurveTo(tx + w - 4, -h * 0.35, tx + w + 12, 0);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(tx + w * 0.55, 0); ctx.quadraticCurveTo(tx + w * 0.5, -h * 0.3, tx + w * 0.45, -h * 0.55); ctx.stroke();
    }
    // SkyPark: the "ship" across the three towers, cantilevered to the right
    const top = -h, L = x - 14, R = x + 3 * w + 2 * gap + 46;
    ctx.beginPath();
    ctx.moveTo(L, top + 1); ctx.lineTo(R - 22, top + 1);
    ctx.quadraticCurveTo(R, top - 1, R + 4, top - 9);
    ctx.lineTo(R - 8, top - 14); ctx.lineTo(L + 6, top - 14); ctx.closePath();
    ctx.fill(); ctx.stroke();
  }

  function artScience() {
    const cx = 640, g = rise; if (g < 0.02) return;
    ctx.beginPath(); ctx.moveTo(604, 0); ctx.lineTo(676, 0); ctx.stroke();
    for (let i = -4; i <= 4; i++) {
      const tipX = cx + i * 9, tipY = (-66 + Math.abs(i) * 7) * g;
      ctx.beginPath();
      ctx.moveTo(cx + i * 3 - 6, -4 * g);
      ctx.quadraticCurveTo(tipX - 10, tipY * 0.55, tipX, tipY);
      ctx.quadraticCurveTo(tipX + 10, tipY * 0.55, cx + i * 3 + 6, -4 * g);
      ctx.fill(); ctx.stroke();
    }
  }

  function supertrees() {
    TREES.forEach(([x, th]) => {
      const h = th * rise; if (h < 2) return;
      const r = 13 + th * 0.07;
      ctx.beginPath(); ctx.moveTo(x - 4, 0); ctx.lineTo(x - 1.5, -h * 0.7); ctx.lineTo(x - r, -h); ctx.lineTo(x + r, -h); ctx.lineTo(x + 1.5, -h * 0.7); ctx.lineTo(x + 4, 0);
      ctx.fill(); ctx.stroke();
      for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(x, -h * 0.72); ctx.lineTo(x + i * r / 2.2, -h); ctx.stroke(); }
      ctx.beginPath(); ctx.ellipse(x, -h, r, 3, 0, 0, Math.PI * 2); ctx.stroke();
    });
  }

  function flyer(t) {
    const { x, r } = FLYER, cy = -FLYER.y * rise, g = rise; if (g < 0.05) return;
    const R = r * g;
    // base terminal and legs
    ctx.beginPath(); ctx.rect(x - 120, -24 * g, 230, 24 * g); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 46, -24 * g); ctx.lineTo(x, cy); ctx.lineTo(x + 46, -24 * g); ctx.stroke();
    // wheel
    ctx.beginPath(); ctx.arc(x, cy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, cy, R * 0.93, 0, Math.PI * 2); ctx.stroke();
    const a0 = t * 0.12;
    for (let i = 0; i < 16; i++) { const a = a0 + i * Math.PI / 8; ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x + Math.cos(a) * R * 0.93, cy + Math.sin(a) * R * 0.93); ctx.stroke(); }
    for (let i = 0; i < 28; i++) {
      const a = a0 + i * Math.PI * 2 / 28, px = x + Math.cos(a) * R * 1.04, py = cy + Math.sin(a) * R * 1.04;
      ctx.beginPath(); ctx.ellipse(px, py, 4.2 * g, 2.6 * g, a, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(x, cy, 5 * g, 0, Math.PI * 2); ctx.stroke();
  }

  function beams(t, alpha) {
    const bx = MBS.x + 1.5 * MBS.w + MBS.gap, by = -MBS.h * rise - 14;
    const base = [-0.62, -0.24, 0.18, 0.58];
    base.forEach((b, i) => {
      const a = b + Math.sin(t * 0.35 + i * 1.9) * 0.28 - Math.PI / 2;
      const len = 1300, spread = 0.035;
      const grd = ctx.createLinearGradient(bx, by, bx + Math.cos(a) * len, by + Math.sin(a) * len);
      grd.addColorStop(0, `rgba(255,255,255,${0.16 * alpha})`);
      grd.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.moveTo(bx, by);
      ctx.lineTo(bx + Math.cos(a - spread) * len, by + Math.sin(a - spread) * len);
      ctx.lineTo(bx + Math.cos(a + spread) * len, by + Math.sin(a + spread) * len);
      ctx.closePath(); ctx.fill();
    });
  }

  /* ---------- frame ---------- */
  let mx = 0, my = 0, sx = 0, sy = 0;
  addEventListener("pointermove", e => { mx = (e.clientX / innerWidth) * 2 - 1; my = (e.clientY / innerHeight) * 2 - 1; }, { passive: true });
  const start = performance.now();

  function layer(depth, scroll, fn) {
    ctx.save();
    ctx.translate(ox + sx * depth * 14 * k, horizon + scroll * H * 0.12 * depth);
    ctx.scale(k, k);
    fn();
    ctx.restore();
  }

  function draw(now) {
    const t = reduce ? 8 : (now - start) / 1000;
    const p = reduce ? 1 : Math.min(t / 2.4, 1);
    sx += (mx - sx) * 0.04; sy += (my - sy) * 0.04;
    const rect = canvas.getBoundingClientRect();
    const scroll = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.lineJoin = "round"; ctx.lineCap = "round";

    // light show beams behind everything
    rise = ease(p * 1.9 - 0.75 * 0.9);
    layer(0.6, scroll, () => beams(t, Math.max(0, p * 1.4 - 0.6)));

    // back layer: CBD towers
    ctx.fillStyle = "#050505"; ctx.strokeStyle = "rgba(255,255,255,0.32)";
    layer(0.35, scroll, () => {
      ctx.lineWidth = 1 / k;
      back.forEach(b => { rise = grow(b[0], p); tower(...b); });
      windows.forEach(([wx, wy, ph, sp]) => {
        rise = grow(wx, p); if (wy > (wx > 700 && wx < 1000 ? MBS.h : 400) * rise) return;
        const a = (0.25 + 0.75 * Math.max(0, Math.sin(t * sp + ph))) * rise;
        ctx.fillStyle = `rgba(255,255,255,${0.55 * a})`;
        ctx.fillRect(wx, -wy, 2.2, 2.2);
      });
    });

    // middle layer: landmarks
    ctx.fillStyle = "#030303"; ctx.strokeStyle = "rgba(255,255,255,0.78)";
    layer(0.7, scroll, () => {
      ctx.lineWidth = 1.1 / k;
      rise = grow(640, p); artScience();
      rise = grow(1040, p); supertrees();
      rise = grow(1246, p); flyer(t);
      rise = grow(820, p); marinaBaySands();
      // window lights on the towers of Marina Bay Sands drawn last so they sit on top
      windows.forEach(([wx, wy, ph, sp]) => {
        if (wx < MBS.x || wx > MBS.x + 3 * MBS.w + 2 * MBS.gap) return;
        rise = grow(820, p); if (wy > MBS.h * rise - 6) return;
        const a = 0.2 + 0.8 * Math.max(0, Math.sin(t * sp + ph));
        ctx.fillStyle = `rgba(255,255,255,${0.5 * a})`;
        ctx.fillRect(wx, -wy, 2.4, 1.6);
      });
    });

    // waterline
    ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, horizon + 0.5); ctx.lineTo(W * ease(p * 1.5), horizon + 0.5); ctx.stroke();

    // reflection in the bay: copy the city upside down, row by row, with a ripple
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const hz = Math.round(horizon * dpr), reflH = Math.min(Math.round((H - horizon) * dpr), hz), step = Math.max(2, Math.round(2 * dpr));
    for (let j = 0; j < reflH; j += step) {
      const f = j / reflH;
      ctx.globalAlpha = 0.32 * (1 - f) * (1 - f);
      const dx = Math.sin(j / dpr * 0.11 + t * 1.7) * (0.6 + f * 7) * dpr;
      ctx.drawImage(canvas, 0, hz - j - step, canvas.width, step, dx, hz + j + 1, canvas.width, step);
    }
    ctx.globalAlpha = 1;
  }

  let visible = true, raf = 0;
  function frame(now) { raf = 0; if (!visible) return; draw(now); raf = requestAnimationFrame(frame); }
  new ResizeObserver(resize).observe(canvas);
  resize();
  if (reduce) draw(performance.now());
  else {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); }).observe(canvas);
    raf = requestAnimationFrame(frame);
  }
})();
