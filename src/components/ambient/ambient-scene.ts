// Three.js ambient light: a full-screen shader of slow, soft colour fields.
// Rendered at a fraction of screen resolution (it's blurry by design), capped
// at 30 fps, and paused whenever the tab is hidden, so it stays cheap.

import {
  Color,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform float uTime;
  uniform float uAspect;
  uniform float uIntensity;
  uniform vec2 uMouse;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform vec3 uC4;
  varying vec2 vUv;

  float field(vec2 p, vec2 c, float r) {
    vec2 d = p - c;
    return exp(-dot(d, d) / (r * r));
  }

  void main() {
    vec2 p = vec2(vUv.x * uAspect, vUv.y);
    float t = uTime * 0.045;

    vec2 c1 = vec2(uAspect * (0.18 + 0.10 * sin(t * 1.3)), 0.92 + 0.06 * cos(t * 1.1));
    vec2 c2 = vec2(uAspect * (0.86 + 0.08 * cos(t * 0.9)), 0.62 + 0.14 * sin(t * 1.7));
    vec2 c3 = vec2(uAspect * (0.50 + 0.22 * sin(t * 0.7)), 0.08 + 0.10 * cos(t * 1.3));
    vec2 c4 = vec2(uMouse.x * uAspect, uMouse.y);

    float w1 = field(p, c1, 0.62);
    float w2 = field(p, c2, 0.52);
    float w3 = field(p, c3, 0.58);
    float w4 = field(p, c4, 0.32) * 0.55;
    float w = w1 + w2 + w3 + w4;

    vec3 col = (uC1 * w1 + uC2 * w2 + uC3 * w3 + uC4 * w4) / max(w, 1e-3);
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
    float alpha = clamp(w * uIntensity + grain * 0.012, 0.0, 1.0);
    gl_FragColor = vec4(col, alpha);
  }
`;

const palettes = {
  // Taken from the portrait: royal-blue drapes, light-blue blazer, its shadow, and the warm ivory shirt.
  dark: { colors: ["#3f5fd6", "#6f9ad8", "#4a5f9e", "#e8d6c8"], intensity: 0.26 },
  light: { colors: ["#a9bdf2", "#bcd3f2", "#c4cbe0", "#f1e3d8"], intensity: 0.34 },
} as const;

export type AmbientHandle = { dispose: () => void };

export function createAmbient(container: HTMLElement): AmbientHandle {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2) * 0.35);
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
  container.appendChild(renderer.domElement);

  const uniforms = {
    uTime: { value: Math.random() * 200 },
    uAspect: { value: 1 },
    uIntensity: { value: 0.26 },
    uMouse: { value: new Vector2(0.5, 0.75) },
    uC1: { value: new Color() },
    uC2: { value: new Color() },
    uC3: { value: new Color() },
    uC4: { value: new Color() },
  };

  const material = new ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true, depthTest: false });
  const geometry = new PlaneGeometry(2, 2);
  const scene = new Scene();
  scene.add(new Mesh(geometry, material));
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  let running = false;
  let raf = 0;
  let last = 0;

  const applyTheme = () => {
    const theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const p = palettes[theme];
    [uniforms.uC1, uniforms.uC2, uniforms.uC3, uniforms.uC4].forEach((u, i) => u.value.set(p.colors[i]));
    uniforms.uIntensity.value = p.intensity;
    if (!running) renderer.render(scene, camera);
  };

  const resize = () => {
    const { innerWidth: w, innerHeight: h } = window;
    renderer.setSize(w, h, false);
    uniforms.uAspect.value = w / h;
    if (!running) renderer.render(scene, camera);
  };

  const target = new Vector2(0.5, 0.75);
  const onPointer = (e: PointerEvent) => target.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (now - last < 33) return; // ~30 fps is plenty for slow light
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    uniforms.uTime.value += dt;
    uniforms.uMouse.value.lerp(target, 0.04);
    renderer.render(scene, camera);
  };
  const start = () => {
    if (running || reduceMotion) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const onVisibility = () => (document.hidden ? stop() : start());

  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);

  resize();
  applyTheme();
  renderer.render(scene, camera);
  start();

  return {
    dispose() {
      stop();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
