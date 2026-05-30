<script setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from '../../core/composables/use-i18n.composable.js';

const props = defineProps({
  project: { type: Object, required: true },
  useFullDescription: { type: Boolean, default: false }
});

const { t, lang } = useI18n();
const canvasRef = ref(null);

const copyKeys = {
  'mining-analytics': {
    short: 'miningShort',
    full: 'miningFull',
    problem: 'miningProblem',
    type: { en: 'Machine Learning · Mining', es: 'Machine Learning · Mineria' },
    impactCap: { en: 'predictive maintenance risk scoring', es: 'riesgo para mantenimiento predictivo' },
    seed: 1
  },
  agrotech: {
    short: 'agrotechShort',
    full: 'agrotechFull',
    problem: 'agrotechProblem',
    type: { en: 'Web · Mobile · API', es: 'Web · Mobile · API' },
    impactCap: { en: 'unit, integration and BDD coverage', es: 'pruebas unitarias, integracion y BDD' },
    seed: 2
  },
  mecanet: {
    short: 'mecanetShort',
    full: 'mecanetFull',
    problem: 'mecanetProblem',
    type: { en: 'Software Architecture', es: 'Arquitectura de Software' },
    impactCap: { en: 'layered architecture with CQRS', es: 'arquitectura por capas con CQRS' },
    seed: 3
  },
  'sudoku-tech': {
    short: 'sudokuShort',
    full: 'sudokuFull',
    problem: 'sudokuProblem',
    type: { en: 'Algorithms · Analysis', es: 'Algoritmos · Analisis' },
    impactCap: { en: 'brute force vs backtracking analysis', es: 'fuerza bruta vs backtracking' },
    seed: 4
  }
};

const projectCopy = computed(() => copyKeys[props.project.id] ?? {});
const isFeature = computed(() => false);
const description = computed(() => {
  const key = props.useFullDescription ? projectCopy.value.full : projectCopy.value.short;
  return key ? t.value[key] : '';
});
const problem = computed(() => {
  const key = projectCopy.value.problem;
  return key ? t.value[key] : props.project.problem;
});
const type = computed(() => projectCopy.value.type?.[lang.value] ?? props.project.type);
const impactCaption = computed(() => projectCopy.value.impactCap?.[lang.value] ?? props.project.impactCap);

function drawVisual() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const seed = projectCopy.value.seed ?? 1;
  let state = seed * 1000 + 7;
  const random = () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };

  ctx.clearRect(0, 0, width, height);

  const colors = [
    'rgba(54,233,214,.55)',
    'rgba(155,123,255,.5)',
    'rgba(255,95,166,.35)'
  ];

  for (let i = 0; i < colors.length; i += 1) {
    const gradient = ctx.createRadialGradient(random() * width, random() * height, 0, random() * width, random() * height, width * 0.5);
    gradient.addColorStop(0, colors[i]);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  const points = Array.from({ length: 14 }, () => ({
    x: random() * width,
    y: random() * height
  }));

  ctx.lineWidth = 1;

  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const distance = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
      if (distance < 150) {
        ctx.strokeStyle = `rgba(180,200,255,${0.18 * (1 - distance / 150)})`;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
      }
    }
  }

  points.forEach((point, index) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, index % 4 === 0 ? 3.2 : 1.8, 0, Math.PI * 2);
    ctx.fillStyle = index % 3 === 0 ? '#36e9d6' : 'rgba(200,210,255,.85)';
    ctx.fill();
  });
}

onMounted(drawVisual);
</script>

<template>
  <article :class="['proj', 'glass', { feature: isFeature }]" :aria-label="`Project: ${project.name}`">
    <div class="proj-visual">
      <canvas ref="canvasRef" class="pv" width="600" height="380" aria-hidden="true"></canvas>
      <span class="tagtype">{{ type }}</span>
    </div>

    <div class="proj-body">
      <span class="pnum">PROJECT_0{{ projectCopy.seed }}</span>
      <h3>{{ project.name }}</h3>
      <p class="project-desc">{{ description }}</p>

      <div class="proj-row">
        <span class="lbl">{{ t.projectProblem }}</span>
        <span class="txt">{{ problem }}</span>
      </div>

      <div class="proj-tech" role="list" aria-label="Technologies used">
        <span v-for="tag in project.tags" :key="tag" role="listitem">{{ tag }}</span>
      </div>

      <div class="impact">
        <span class="ip">{{ project.impactNum }}</span>
        <span class="ic">{{ impactCaption }}</span>
      </div>

      <div v-if="project.demo || project.github" class="proj-btns">
        <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener" class="btn btn-primary">
          {{ t.projectDemo }}
        </a>
        <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="btn btn-ghost">
          {{ t.projectSource }}
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.proj {
  display: flex;
  flex-direction: column;
  padding: 0;
  transition: transform 0.4s var(--ease), border-color 0.4s, box-shadow 0.4s;
}

.proj.feature {
  grid-column: span 2;
  flex-direction: row;
}

.proj-visual {
  position: relative;
  min-height: 190px;
  flex: 0 0 44%;
  overflow: hidden;
  border-right: 1px solid var(--line-soft);
  background: linear-gradient(135deg, rgba(54, 233, 214, 0.08), rgba(155, 123, 255, 0.08));
}

.proj:not(.feature) .proj-visual {
  min-height: 172px;
  border-right: 0;
  border-bottom: 1px solid var(--line-soft);
}

.pv {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.tagtype {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 5px 10px;
  border: 1px solid rgba(54, 233, 214, 0.3);
  border-radius: 7px;
  background: rgba(4, 5, 10, 0.55);
  backdrop-filter: blur(6px);
  color: var(--cyan);
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.proj-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 26px 28px;
}

.pnum {
  color: var(--ink-3);
  font-family: var(--font-mono);
  font-size: 12px;
}

.proj-body h3 {
  margin: 8px 0 0;
  color: var(--ink);
  font-family: var(--font-display);
  font-size: 1.42rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.project-desc {
  margin-top: 12px;
  color: var(--ink-2);
  font-size: 0.96rem;
}

.proj-row {
  margin-top: 16px;
}

.lbl {
  display: block;
  margin-bottom: 4px;
  color: var(--cyan);
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.txt {
  color: var(--ink-2);
  font-size: 0.96rem;
}

.proj-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 16px;
}

.proj-tech span {
  padding: 5px 10px;
  border: 1px solid var(--line-soft);
  border-radius: 7px;
  background: var(--glass-hi);
  color: var(--ink-2);
  font-family: var(--font-mono);
  font-size: 11px;
}

.impact {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid var(--line-soft);
}

.ip {
  background: var(--grad);
  background-clip: text;
  color: transparent;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
}

.ic {
  color: var(--ink-3);
  font-size: 0.86rem;
}

.proj-btns {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.proj-btns .btn {
  padding: 10px 16px;
  font-size: 0.85rem;
}

.proj:hover {
  transform: translateY(-6px);
  border-color: rgba(155, 123, 255, 0.4);
  box-shadow: 0 34px 80px -40px var(--glow-violet);
}

@media (max-width: 900px) {
  .proj.feature {
    grid-column: span 1;
    flex-direction: column;
  }

  .proj.feature .proj-visual {
    min-height: 180px;
    border-right: 0;
    border-bottom: 1px solid var(--line-soft);
  }
}
</style>
