<script setup>
import { computed } from 'vue';
import SectionHeader from '../../core/components/section-header.component.vue';
import { useI18n } from '../../core/composables/use-i18n.composable.js';

const { t } = useI18n();

const dotColorMap = {
  cyan: 'var(--cyan)',
  teal: 'var(--teal)',
  amber: 'var(--amber)',
  green: 'var(--green)',
  purple: 'var(--purple)'
};

const skillGroups = computed(() => [
  { title: t.value.skillLanguages, dotColor: 'cyan', items: ['C++', 'Python', 'Java', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Dart', 'Kotlin'] },
  { title: t.value.skillFrameworks, dotColor: 'teal', items: ['Angular', 'React', 'Vue.js', 'Spring Boot', 'Flutter', 'Vite'] },
  { title: t.value.skillDatabases, dotColor: 'amber', items: ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB', 'Firebase'] },
  { title: t.value.skillIDEs, dotColor: 'green', items: ['VS Code', 'IntelliJ IDEA', 'WebStorm', 'Android Studio', 'Visual Studio'] },
  { title: t.value.skillCloud, dotColor: 'purple', items: ['Firebase', 'Netlify', 'Vercel', 'AWS'] },
  { title: t.value.skillSoft, dotColor: 'cyan', items: [t.value.softResponsibility, t.value.softProactivity, t.value.softTeamwork, t.value.softAdaptability] }
]);
</script>

<template>
  <section id="skills" class="section" aria-labelledby="skills-heading">
    <div class="container">
      <section-header
        :label="t.skillsLabel"
        :title="t.skillsTitle"
        :title-highlight="t.skillsHighlight"
        :subtitle="t.skillsSubtitle"
      />

      <div class="skills-grid stagger" role="list" aria-label="Technical skill categories">
        <div
          v-for="(group, index) in skillGroups"
          :key="index"
          class="skill-group reveal"
          role="listitem"
        >
          <div class="skill-title">
            <span
              class="dot"
              :style="{ background: dotColorMap[group.dotColor] }"
              aria-hidden="true"
            ></span>
            {{ group.title }}
          </div>
          <div class="skill-list" role="list" :aria-label="`${group.title} skills`">
            <span
              v-for="item in group.items"
              :key="item"
              class="pill"
              role="listitem"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.7rem;
}

.skill-group {
  padding: 1.4rem;
  border-radius: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: border-color 0.3s;
}

.skill-group:hover {
  border-color: var(--border-hover);
}

.skill-title {
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-1);
  margin-bottom: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

@media (max-width: 900px) {
  .skills-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
