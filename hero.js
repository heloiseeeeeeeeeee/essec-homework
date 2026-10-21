/* Hero animation: a field of fine white lines that flow like fabric,
   in the same style as the session artworks. The lines bend away from
   the mouse and draw themselves in when the page opens. No library. */
(() => {
  const canvas = document.getElementById("hero3d");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W = 0, H = 0, dpr = 1;
  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    if (reduce) draw(performance.now());
  }

  let mx = -9999, my = -9999, tx = -9999, ty = -9999;
  addEventListener("pointermove", e => {
    const r = canvas.getBoundingClientRect();
    tx = e.clientX - r.left; ty = e.clientY - r.top;
    if (mx < -9000) { mx = tx; my = ty; }
  }, { passive: true });
  addEventListener("pointerleave", () => { tx = -9999; ty = -9999; });

  const ease = v => 1 - Math.pow(1 - Math.min(Math.max(v, 0), 1), 3);
  const start = performance.now();

  function draw(now) {
    const t = reduce ? 6 : (now - start) / 1000;
    const p = reduce ? 1 : Math.min(t / 2.6, 1);
    if (tx > -9000) { mx += (tx - mx) * 0.08; my += (ty - my) * 0.08; }
    else { mx += (-9999 - mx) * 0.02; my += (-9999 - my) * 0.02; }
    const rect = canvas.getBoundingClientRect();
    const scroll = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;

    const N = W < 700 ? 34 : 56;
    const step = W < 700 ? 8 : 10;
    const radius = Math.min(W, H) * 0.22;
    const speed = 1 + scroll * 2.5;

    for (let i = 0; i < N; i++) {
      const n = i / (N - 1);
      const reveal = ease(p * 1.9 - n * 0.9);
      if (reveal <= 0) continue;
      const y0 = H * (0.06 + 0.9 * n) - scroll * H * 0.25 * n;
      const amp = 10 + 34 * Math.sin(n * Math.PI);
      const alpha = (0.1 + 0.32 * Math.pow(Math.sin(n * Math.PI), 1.5)) * (1 - scroll * 0.6);
      ctx.strokeStyle = i % 6 === 3 ? `rgba(92,135,232,${Math.min(1, alpha * 1.8)})` : `rgba(242,242,240,${alpha})`;
      ctx.beginPath();
      const xEnd = -20 + (W + 40) * reveal;
      for (let x = -20; x <= xEnd; x += step) {
        let y = y0
          + Math.sin(x * 0.0042 + t * 0.45 * speed + n * 3.1) * amp
          + Math.sin(x * 0.011 - t * 0.7 * speed + n * 9.0) * amp * 0.28
          + Math.sin(x * 0.0017 + t * 0.2 + n * 1.3) * amp * 0.6;
        const dx = x - mx, dy = y - my, d2 = dx * dx + dy * dy;
        if (d2 < radius * radius * 6) {
          const f = Math.exp(-d2 / (2 * radius * radius * 0.45));
          y += (dy / (Math.abs(dy) + 28)) * f * 46;
        }
        x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  let visible = true, raf = 0;
  function frame(now) { raf = 0; if (!visible) return; if (!document.documentElement.classList.contains("locked")) draw(now); raf = requestAnimationFrame(frame); }
  new ResizeObserver(resize).observe(canvas);
  resize();
  if (reduce) draw(performance.now());
  else {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); }).observe(canvas);
    raf = requestAnimationFrame(frame);
  }
})();
