<script setup>
import { computed } from 'vue';
import { useI18n } from '../../core/composables/use-i18n.composable.js';

const props = defineProps({
  project: { type: Object, required: true },
  useFullDescription: { type: Boolean, default: false }
});

const { t } = useI18n();

const descriptionKeys = {
  mecanet: { short: 'mecanetShort', full: 'mecanetFull' },
  agrotech: { short: 'agrotechShort', full: 'agrotechFull' },
  'sudoku-tech': { short: 'sudokuShort', full: 'sudokuFull' },
  utime: { short: 'utimeShort', full: 'utimeFull' }
};

const description = computed(() => {
  const keys = descriptionKeys[props.project.id];
  if (!keys) return props.useFullDescription ? props.project.fullDesc : props.project.shortDesc;
  return t.value[props.useFullDescription ? keys.full : keys.short];
});

const iconPaths = {
  mecanet: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
  agrotech: '<path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/>',
  'sudoku-tech': '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  utime: '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01" stroke-width="2"/>'
};
</script>

<template>
  <article class="project-card reveal" :aria-label="`Project: ${project.name}`">
    <div class="project-icon" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        :stroke="project.iconColor"
        stroke-width="1.5"
        v-html="iconPaths[project.id]"
      ></svg>
    </div>
    <div class="project-body">
      <h3 class="project-name">{{ project.name }}</h3>
      <p class="project-desc">{{ description }}</p>
      <div class="project-tags" role="list" aria-label="Technologies used">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="project-tag"
          role="listitem"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: grid;
  grid-template-columns: 260px 1fr;
  border-radius: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  overflow: hidden;
  transition: all 0.35s;
}

.project-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px var(--card-shadow);
}

.project-icon {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(56, 189, 248, 0.03);
  min-height: 200px;
}

.project-icon svg {
  width: 80px;
  height: 80px;
  opacity: 0.35;
}

.project-body {
  padding: 1.75rem 2rem;
}

.project-name {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-1);
  margin-bottom: 0.5rem;
}

.project-desc {
  font-size: 0.95rem;
  color: var(--text-2);
  line-height: 1.75;
  margin-bottom: 1.1rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.project-tag {
  padding: 0.25rem 0.65rem;
  border-radius: 5px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text-3);
  background: var(--pill-bg);
  border: 1px solid var(--border);
  transition: all 0.2s;
}

.project-tag:hover {
  color: var(--text-2);
  border-color: var(--border-hover);
}

@media (max-width: 900px) {
  .project-card {
    grid-template-columns: 1fr;
  }
  .project-icon {
    min-height: 140px;
  }
}

@media (max-width: 480px) {
  .project-body {
    padding: 1.25rem 1.5rem;
  }
}
</style>
