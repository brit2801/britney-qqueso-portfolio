<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const canvasRef = ref(null);
const progressRef = ref(null);
const cursorRef = ref(null);
const cursorDotRef = ref(null);

let resizeTimer;
let animationFrame;
let running = true;
let cleanup = () => {};

function setupStarfield() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  const mouse = { x: -9999, y: -9999 };
  let width = 0;
  let height = 0;
  let nodes = [];

  const isSmall = () => window.innerWidth < 700;

  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cap = isSmall() ? 54 : 122;
    const count = Math.max(34, Math.min(cap, Math.round((width * height) / 16500)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.26,
      vy: (Math.random() - 0.5) * 0.26,
      r: Math.random() * 1.5 + 0.5
    }));
  }

  function tick() {
    const linkDistance = isSmall() ? 108 : 142;
    ctx.clearRect(0, 0, width, height);

    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < -20) node.x = width + 20;
      else if (node.x > width + 20) node.x = -20;

      if (node.y < -20) node.y = height + 20;
      else if (node.y > height + 20) node.y = -20;

      const dx = mouse.x - node.x;
      const dy = mouse.y - node.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 150) {
        node.x += dx * 0.0012 * (1 - distance / 150);
        node.y += dy * 0.0012 * (1 - distance / 150);
      }
    }

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);

        if (distance < linkDistance) {
          const alpha = (1 - distance / linkDistance) * 0.4;
          const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          gradient.addColorStop(0, `rgba(54,233,214,${alpha})`);
          gradient.addColorStop(1, `rgba(155,123,255,${alpha})`);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const node of nodes) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(195,220,255,.8)';
      ctx.fill();
    }

    if (running && !reduceMotion) animationFrame = window.requestAnimationFrame(tick);
  }

  function onResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(size, 180);
  }

  function onMouseMove(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }

  function onVisibilityChange() {
    running = !document.hidden;
    if (running) {
      window.cancelAnimationFrame(animationFrame);
      tick();
    } else {
      window.cancelAnimationFrame(animationFrame);
    }
  }

  size();
  tick();

  window.addEventListener('resize', onResize);
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);

  cleanup = () => {
    running = false;
    window.clearTimeout(resizeTimer);
    window.cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
}

function setupProgress() {
  const progress = progressRef.value;
  if (!progress) return;

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${percent}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const previousCleanup = cleanup;
  cleanup = () => {
    previousCleanup();
    window.removeEventListener('scroll', updateProgress);
  };
}

function setupCursor() {
  const cursor = cursorRef.value;
  const dot = cursorDotRef.value;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (!cursor || !dot || !finePointer) return;

  let currentX = 0;
  let currentY = 0;
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let cursorFrame;

  document.body.classList.add('has-cursor');

  function onMouseMove(event) {
    targetX = event.clientX;
    targetY = event.clientY;
    dot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
  }

  function loop() {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    cursorFrame = window.requestAnimationFrame(loop);
  }

  function onMouseOver(event) {
    if (event.target.closest('a, button, [data-hover], .pill, .badge, .proj, .glass, .sphere')) {
      cursor.classList.add('is-hover');
    }
  }

  function onMouseOut(event) {
    if (event.target.closest('a, button, [data-hover], .pill, .badge, .proj, .glass, .sphere')) {
      cursor.classList.remove('is-hover');
    }
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseover', onMouseOver);
  document.addEventListener('mouseout', onMouseOut);
  loop();

  const previousCleanup = cleanup;
  cleanup = () => {
    previousCleanup();
    document.body.classList.remove('has-cursor');
    window.cancelAnimationFrame(cursorFrame);
    window.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseover', onMouseOver);
    document.removeEventListener('mouseout', onMouseOut);
  };
}

onMounted(() => {
  setupStarfield();
  setupProgress();
  setupCursor();
});

onBeforeUnmount(() => {
  cleanup();
});
</script>

<template>
  <div aria-hidden="true">
    <div class="field"></div>
    <div class="grid-bg"></div>
    <canvas id="starfield" ref="canvasRef"></canvas>
    <div class="grain"></div>
    <div ref="progressRef" class="progress"></div>
    <div ref="cursorRef" class="cur"></div>
    <div ref="cursorDotRef" class="cur-dot"></div>
  </div>
</template>
