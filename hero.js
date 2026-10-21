/* Hero animation: floating glass and chrome shapes, drawn with a WebGL shader.
   No external library. Pauses when the intro is off screen. */
(() => {
  const canvas = document.getElementById("hero3d");
  if (!canvas) return;
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: "high-performance" });
  if (!gl) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const vert = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
  const frag = `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uScroll; uniform float uIntro; uniform float uSpread; uniform float uSize;

mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float sdRoundBox(vec3 p, vec3 b, float r){ vec3 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r; }
float sdTorus(vec3 p, vec2 t){ vec2 q = vec2(length(p.xz) - t.x, p.y); return length(q) - t.y; }
float sdCapsule(vec3 p, float h, float r){ p.y -= clamp(p.y, -h, h); return length(p) - r; }

float grow(float i){ float s = clamp(uIntro * 1.7 - i * 0.16, 0.0, 1.0); return max(1.0 - pow(1.0 - s, 3.0), 0.001); }

vec3 place(vec3 base, float i, float depth){
  float t = uTime;
  vec3 c = vec3(base.x * uSpread, base.y, base.z);
  c.y += sin(t * (0.45 + i * 0.07) + i * 1.7) * 0.14;
  c.x += cos(t * (0.33 + i * 0.05) + i) * 0.06;
  c.y += uScroll * (2.2 + depth * 1.4);
  c.xy += uMouse * (0.12 + depth * 0.1);
  return c;
}

vec2 map(vec3 p){
  float t = uTime, k = uScroll * 2.5;
  vec2 res = vec2(1e5, 0.0);
  float s; vec3 q; float d;

  s = grow(0.0) * uSize; q = p - place(vec3(1.75, 0.45, 0.0), 0.0, 1.0);
  q.xy *= rot(0.5 + t * 0.21 + k); q.xz *= rot(0.7 + t * 0.27 + k);
  d = sdRoundBox(q / s, vec3(0.82), 0.3) * s; if (d < res.x) res = vec2(d, 1.0);

  s = grow(1.0) * uSize; q = p - place(vec3(-2.9, -1.6, -0.6), 1.0, 0.6);
  q.xy *= rot(0.9 + sin(t * 0.3) * 0.4 + k); q.yz *= rot(t * 0.2);
  d = sdCapsule(q / s, 0.62, 0.36) * s; if (d < res.x) res = vec2(d, 2.0);

  s = grow(2.0) * uSize; q = p - place(vec3(3.05, -1.35, -1.1), 2.0, 0.4);
  q.yz *= rot(1.1 + t * 0.32 + k); q.xy *= rot(0.4 + t * 0.18);
  d = sdTorus(q / s, vec2(0.62, 0.24)) * s; if (d < res.x) res = vec2(d, 1.0);

  s = grow(3.0) * uSize; q = p - place(vec3(-0.75, 1.75, -1.6), 3.0, 0.3);
  d = (length(q / s) - 0.3) * s; if (d < res.x) res = vec2(d, 2.0);

  s = grow(4.0) * uSize; q = p - place(vec3(3.45, 1.75, -2.2), 4.0, 0.2);
  q.xy *= rot(t * 0.35 + k); q.yz *= rot(0.6 + t * 0.25);
  d = sdRoundBox(q / s, vec3(0.42), 0.16) * s; if (d < res.x) res = vec2(d, 1.0);

  return res;
}

vec3 normal(vec3 p){
  vec2 e = vec2(0.0015, -0.0015);
  return normalize(e.xyy * map(p + e.xyy).x + e.yyx * map(p + e.yyx).x + e.yxy * map(p + e.yxy).x + e.xxx * map(p + e.xxx).x);
}

float panel(vec3 d, vec3 n, vec3 up, vec2 size){
  n = normalize(n); float f = dot(d, n); if (f <= 0.0) return 0.0;
  vec3 r = normalize(cross(up, n)); vec3 u = cross(n, r);
  vec2 q = vec2(dot(d, r), dot(d, u)) / f;
  vec2 e = smoothstep(size, size * 0.55, abs(q));
  return e.x * e.y;
}
vec3 env(vec3 d){
  float l = 0.04 + 0.14 * smoothstep(-0.4, 1.0, d.y);
  l += panel(d, vec3(0.0, 1.0, 0.3), vec3(0.0, 0.0, -1.0), vec2(1.1, 0.45)) * 4.5;
  l += panel(d, vec3(-1.0, 0.3, 0.5), vec3(0.0, 1.0, 0.0), vec2(0.22, 1.2)) * 3.2;
  l += panel(d, vec3(1.0, 0.15, 0.35), vec3(0.0, 1.0, 0.0), vec2(0.14, 1.0)) * 2.2;
  l += panel(d, vec3(0.2, -0.15, 1.0), vec3(0.0, 1.0, 0.0), vec2(1.4, 0.07)) * 1.6;
  l += exp(-pow((d.y + 0.05) * 9.0, 2.0)) * 0.2;
  return vec3(l);
}
vec3 film(float c){ return mix(vec3(1.0), 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + c * 1.8 + 0.15)), 0.55); }

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(uMouse.x * 0.25, uMouse.y * 0.18, 8.0);
  vec3 rd = normalize(vec3(uv * 0.75, -1.0));
  float t = 0.0; vec2 h = vec2(0.0);
  bool hit = false;
  for (int i = 0; i < 90; i++){
    h = map(ro + rd * t);
    if (h.x < 0.0012) { hit = true; break; }
    t += h.x;
    if (t > 16.0) break;
  }
  if (!hit) { gl_FragColor = vec4(0.0); return; }
  vec3 p = ro + rd * t, n = normal(p);
  float cosT = clamp(dot(n, -rd), 0.0, 1.0);
  float F = 0.04 + 0.96 * pow(1.0 - cosT, 5.0);
  vec3 refl = env(reflect(rd, n));
  vec3 col;
  if (h.y < 1.5) {
    vec3 refr = env(refract(rd, n, 1.0 / 1.45)) * 0.75 + env(refract(rd, -n, 1.45)) * 0.35 + 0.05;
    col = mix(refr, refl, clamp(F * 1.8, 0.0, 1.0));
    col += film(cosT) * pow(1.0 - cosT, 2.5) * 0.4;
    col += pow(1.0 - cosT, 4.0) * 0.35;
    float a = clamp(0.55 + F + dot(col, vec3(0.33)), 0.0, 1.0);
    gl_FragColor = vec4(col * a, a);
  } else {
    col = refl * 1.05 + 0.06;
    col += film(cosT * 0.8 + 0.3) * F * 0.35;
    gl_FragColor = vec4(col, 1.0);
  }
  gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(0.9));
}`;

  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
  const vs = sh(gl.VERTEX_SHADER, vert), fs = sh(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = n => gl.getUniformLocation(prog, n);
  const uRes = U("uRes"), uTime = U("uTime"), uMouse = U("uMouse"), uScroll = U("uScroll"), uIntro = U("uIntro"), uSpread = U("uSpread"), uSize = U("uSize");

  let w = 0, h = 0;
  function resize() {
    const r = canvas.getBoundingClientRect();
    const scale = Math.min(window.devicePixelRatio || 1, r.width < 700 ? 1.5 : 1.25);
    w = Math.max(1, Math.round(r.width * scale)); h = Math.max(1, Math.round(r.height * scale));
    canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h);
    const aspect = r.width / Math.max(r.height, 1);
    gl.uniform2f(uRes, w, h);
    gl.uniform1f(uSpread, Math.min(Math.max(aspect / 1.6, 0.42), 1.25));
    gl.uniform1f(uSize, aspect < 0.8 ? 0.62 : 1.0);
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  let mx = 0, my = 0, sx = 0, sy = 0, visible = true;
  addEventListener("pointermove", e => { mx = (e.clientX / innerWidth) * 2 - 1; my = -((e.clientY / innerHeight) * 2 - 1); }, { passive: true });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduce) requestAnimationFrame(frame); }).observe(canvas);

  const start = performance.now();
  function draw(now) {
    const sec = (now - start) / 1000;
    sx += (mx - sx) * 0.05; sy += (my - sy) * 0.05;
    const r = canvas.getBoundingClientRect();
    const scroll = Math.min(Math.max(-r.top / Math.max(r.height, 1), 0), 1);
    gl.uniform1f(uTime, reduce ? 4 : sec);
    gl.uniform1f(uIntro, reduce ? 1 : Math.min(sec / 1.6, 1));
    gl.uniform2f(uMouse, sx, sy);
    gl.uniform1f(uScroll, scroll);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function frame(now) {
    if (!visible) return;
    draw(now);
    requestAnimationFrame(frame);
  }
  if (reduce) { draw(performance.now()); addEventListener("resize", () => draw(performance.now())); }
  else requestAnimationFrame(frame);
})();
