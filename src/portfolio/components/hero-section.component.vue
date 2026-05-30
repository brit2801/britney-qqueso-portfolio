<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useGreeting } from '../../core/composables/use-greeting.composable.js';
import { useI18n } from '../../core/composables/use-i18n.composable.js';
import { PortfolioService } from '../services/portfolio.service.js';

const canvasRef = ref(null);
const { greeting } = useGreeting();
const { t, lang } = useI18n();
const profile = PortfolioService.getProfile();

const badges = computed(() => [
  t.value.badge1,
  t.value.badge2,
  t.value.badge3,
  t.value.badge4,
  t.value.badge5,
  t.value.badge6
]);
const greetingLine = computed(() => {
  return greeting.value;
});

let cleanupSphere = () => {};

function setupSphere() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = window.innerWidth < 700;
  const lat = small ? 16 : 22;
  const lon = small ? 24 : 32;
  const points = [];
  const projected = [];
  const edges = [];

  for (let i = 0; i <= lat; i += 1) {
    const theta = Math.PI * i / lat;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let j = 0; j < lon; j += 1) {
      const phi = 2 * Math.PI * j / lon;
      points.push({
        x: sinTheta * Math.cos(phi),
        y: cosTheta,
        z: sinTheta * Math.sin(phi)
      });
      projected.push({ sx: 0, sy: 0, depth: 0 });
    }
  }

  const index = (i, j) => i * lon + (((j % lon) + lon) % lon);

  for (let i = 0; i <= lat; i += 1) {
    for (let j = 0; j < lon; j += 1) {
      if (i > 0 && i < lat) edges.push([index(i, j), index(i, j + 1)]);
      if (i < lat) edges.push([index(i, j), index(i + 1, j)]);
    }
  }

  let width = 0;
  let height = 0;
  let centerX = 0;
  let centerY = 0;
  let radius = 0;
  let rotY = 0.5;
  let rotX = -0.32;
  let velocityY = 0;
  let velocityX = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let mouseX = -9999;
  let mouseY = -9999;
  let hovering = false;
  let animationFrame;
  let resizeTimer;
  let running = true;

  const auto = reduce ? 0 : 0.0028;
  const cameraZ = 3;
  const focal = 2.7;
  const hoverRadius = small ? 70 : 98;

  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    centerX = width / 2;
    centerY = height / 2;
    radius = Math.min(width, height) * 0.42;
  }

  function project() {
    const sinY = Math.sin(rotY);
    const cosY = Math.cos(rotY);
    const sinX = Math.sin(rotX);
    const cosX = Math.cos(rotX);

    for (let i = 0; i < points.length; i += 1) {
      const source = points[i];
      const target = projected[i];
      const x = source.x * cosY + source.z * sinY;
      const z = -source.x * sinY + source.z * cosY;
      const y2 = source.y * cosX - z * sinX;
      const z2 = source.y * sinX + z * cosX;
      const scale = focal / (cameraZ - z2);

      target.sx = centerX + x * scale * radius;
      target.sy = centerY + y2 * scale * radius;
      target.depth = (z2 + 1) / 2;
    }
  }

  function frame() {
    if (!dragging) {
      rotY += auto + velocityY;
      rotX += velocityX;
      velocityY *= 0.92;
      velocityX *= 0.92;
    }

    rotX = Math.max(-1.3, Math.min(1.3, rotX));
    project();
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;

    for (const edge of edges) {
      const a = projected[edge[0]];
      const b = projected[edge[1]];
      const front = (a.depth + b.depth) * 0.5;
      let alpha = 0.04 + front * 0.26;
      let red = 120;
      let green = 170;
      let blue = 255;

      if (hovering) {
        const distance = Math.min(
          Math.hypot(a.sx - mouseX, a.sy - mouseY),
          Math.hypot(b.sx - mouseX, b.sy - mouseY)
        );

        if (distance < hoverRadius) {
          const amount = 1 - distance / hoverRadius;
          alpha = Math.min(0.85, alpha + amount * 0.5);
          red = 54;
          green = 233;
          blue = 214;
        }
      }

      ctx.strokeStyle = `rgba(${red},${green},${blue},${alpha})`;
      ctx.beginPath();
      ctx.moveTo(a.sx, a.sy);
      ctx.lineTo(b.sx, b.sy);
      ctx.stroke();
    }

    for (const point of projected) {
      let sizeDot = 0.6 + point.depth * 1.9;
      let alpha = 0.22 + point.depth * 0.72;
      let red = 150;
      let green = 200;
      let blue = 255;
      let glow = 0;

      if (hovering) {
        const distance = Math.hypot(point.sx - mouseX, point.sy - mouseY);
        if (distance < hoverRadius) {
          const amount = 1 - distance / hoverRadius;
          sizeDot += amount * 2.8;
          alpha = Math.min(1, alpha + amount * 0.55);
          glow = amount;
          red = 150 + (54 - 150) * amount;
          green = 200 + (233 - 200) * amount;
          blue = 255 + (214 - 255) * amount;
        }
      }

      if (glow > 0.12) {
        ctx.shadowBlur = 12 * glow;
        ctx.shadowColor = `rgba(54,233,214,${0.85 * glow})`;
      }

      ctx.beginPath();
      ctx.arc(point.sx, point.sy, sizeDot, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${red | 0},${green | 0},${blue | 0},${alpha})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if (running) animationFrame = window.requestAnimationFrame(frame);
  }

  function pointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  function onPointerDown(event) {
    dragging = true;
    canvas.classList.add('grabbing');
    const position = pointerPosition(event);
    lastX = position.x;
    lastY = position.y;
    canvas.setPointerCapture?.(event.pointerId);
  }

  function onPointerMove(event) {
    const position = pointerPosition(event);
    mouseX = position.x;
    mouseY = position.y;
    hovering = mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height;

    if (!dragging) return;

    const dx = position.x - lastX;
    const dy = position.y - lastY;
    rotY += dx * 0.0072;
    rotX += dy * 0.0072;
    velocityY = dx * 0.0072;
    velocityX = dy * 0.0072;
    lastX = position.x;
    lastY = position.y;
  }

  function onPointerUp() {
    dragging = false;
    canvas.classList.remove('grabbing');
  }

  function onResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(size, 180);
  }

  function onVisibilityChange() {
    running = !document.hidden;
    if (running) {
      window.cancelAnimationFrame(animationFrame);
      frame();
    } else {
      window.cancelAnimationFrame(animationFrame);
    }
  }

  size();
  frame();
  canvas.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibilityChange);

  cleanupSphere = () => {
    running = false;
    window.clearTimeout(resizeTimer);
    window.cancelAnimationFrame(animationFrame);
    canvas.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    canvas.removeEventListener('pointercancel', onPointerUp);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
}

onMounted(setupSphere);
onBeforeUnmount(() => cleanupSphere());
</script>

<template>
  <section class="hero" id="home" aria-label="Hero introduction">
    <div class="wrap hero-in">
      <div class="hero-copy">
        <p class="avail reveal">
          <span class="dot-live" aria-hidden="true"></span>
          <span>{{ greetingLine }}</span>
        </p>

        <h1 class="reveal" style="--d: .08s">
          <span class="name">{{ profile.name }}</span>
          <span class="role">{{ t.heroRole }}</span>
          <span class="sub">{{ t.heroSub }}</span>
        </h1>

        <p class="lede reveal" style="--d: .18s">{{ t.heroDesc }}</p>

        <div class="hero-cta reveal" style="--d: .28s">
          <a
            :href="profile.cvUrl"
            target="_blank"
            rel="noopener"
            class="btn btn-primary"
            aria-label="Download CV as PDF"
          >
            {{ t.downloadCv }}
            <i class="pi pi-download" aria-hidden="true"></i>
          </a>
          <a href="#projects" class="btn btn-ghost">{{ t.viewProjects }}</a>
        </div>

        <div class="badges reveal" style="--d: .36s" role="list" aria-label="Key strengths">
          <span v-for="badge in badges" :key="badge" class="badge" role="listitem">{{ badge }}</span>
        </div>
      </div>

      <div class="hero-visual reveal" style="--d: .2s" aria-hidden="true">
        <div class="sphere-glow"></div>
        <canvas ref="canvasRef" class="sphere"></canvas>
        <div class="sphere-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12a9 9 0 1 1-3-6.7" />
            <path d="M21 3v5h-5" />
          </svg>
          {{ lang === 'en' ? 'drag to rotate' : 'arrastra para rotar' }}
        </div>
      </div>
    </div>

    <div class="scroll-hint" aria-hidden="true">
      <span>scroll</span>
      <span class="line"></span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-top: 96px;
  padding-bottom: 60px;
}

.hero-in {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.06fr 0.94fr;
  gap: 50px;
  align-items: center;
  width: 100%;
}

.avail {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 7px 13px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--panel);
  color: var(--ink-2);
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.05em;
}

.dot-live {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 0 0 var(--glow-cyan);
  animation: pulse 2.4s infinite;
}

.hero h1 {
  margin: 22px 0 0;
  color: var(--ink);
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 7vw, 5.6rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.03em;
}

.hero h1 .name {
  display: block;
}

.hero .role {
  display: block;
  margin-top: 0.24em;
  color: var(--ink);
  font-size: clamp(1.5rem, 3.6vw, 2.6rem);
  line-height: 1.16;
  letter-spacing: 0;
}

.hero .sub {
  display: block;
  margin-top: 14px;
  color: var(--cyan);
  font-family: var(--font-mono);
  font-size: clamp(0.95rem, 1.7vw, 1.25rem);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.lede {
  max-width: 510px;
  margin: 22px 0 0;
  color: var(--ink-2);
  font-size: 1.12rem;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 30px;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 30px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 13px;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: var(--panel);
  color: var(--ink-2);
  font-family: var(--font-mono);
  font-size: 12.5px;
  letter-spacing: 0.02em;
  transition: 0.3s var(--ease);
}

.badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cyan);
  opacity: 0.85;
}

.badge:nth-child(even)::before {
  background: var(--violet);
}

.badge:hover {
  transform: translateY(-2px);
  border-color: rgba(54, 233, 214, 0.45);
  color: var(--ink);
}

.hero-visual {
  position: relative;
  display: grid;
  place-items: center;
  height: 480px;
}

.sphere-glow {
  position: absolute;
  top: -8%;
  left: -8%;
  width: 116%;
  height: 116%;
  border-radius: 50%;
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 46%, transparent 40%, rgba(4, 6, 14, 0.55) 60%, transparent 73%),
    radial-gradient(circle at 44% 40%, rgba(54, 233, 214, 0.13), transparent 55%),
    radial-gradient(circle at 62% 64%, rgba(155, 123, 255, 0.13), transparent 58%);
}

.sphere {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  cursor: grab;
  touch-action: none;
}

.sphere.grabbing {
  cursor: grabbing;
}

.sphere-hint {
  position: absolute;
  bottom: 2px;
  left: 50%;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 8px;
  transform: translateX(-50%);
  color: var(--ink-3);
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.65;
  pointer-events: none;
}

.sphere-hint svg {
  width: 13px;
  height: 13px;
  color: var(--cyan);
}

.scroll-hint {
  position: absolute;
  bottom: 26px;
  left: 50%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  transform: translateX(-50%);
  color: var(--ink-3);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.scroll-hint .line {
  position: relative;
  width: 1px;
  height: 34px;
  overflow: hidden;
  background: linear-gradient(var(--cyan), transparent);
}

.scroll-hint .line::after {
  content: '';
  position: absolute;
  top: -12px;
  left: 0;
  width: 1px;
  height: 12px;
  background: var(--cyan);
  animation: trail 2s var(--ease) infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(54, 233, 214, 0.5);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(54, 233, 214, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(54, 233, 214, 0);
  }
}

@keyframes trail {
  to {
    top: 34px;
  }
}

@media (max-width: 980px) {
  .hero-in {
    grid-template-columns: 1fr;
    gap: 26px;
  }

  .hero-copy {
    text-align: center;
  }

  .lede,
  .avail {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-cta,
  .badges {
    justify-content: center;
  }

  .hero-visual {
    height: 390px;
  }
}

@media (max-width: 600px) {
  .hero {
    padding-top: 84px;
  }

  .hero-visual {
    height: 330px;
  }

  .hero h1 {
    font-size: clamp(2.4rem, 13vw, 4rem);
  }

  .hero-cta .btn {
    width: 100%;
  }

  .scroll-hint {
    display: none;
  }
}
</style>
