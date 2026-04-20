<script setup>
import SectionHeader from '../../core/components/section-header.component.vue';
import { useI18n } from '../../core/composables/use-i18n.composable.js';

const { t } = useI18n();
</script>

<template>
  <section id="education" class="section" aria-labelledby="education-heading">
    <div class="container">
      <section-header
        :label="t.eduLabel"
        :title="t.eduTitle"
        :title-highlight="t.eduHighlight"
      />
      <article class="edu-card reveal" aria-label="Education details">
        <p class="edu-role">{{ t.eduDegree }}</p>
        <p class="edu-place">{{ t.eduInstitution }}</p>
        <p class="edu-date">
          <time>{{ t.eduPeriod }}</time>
        </p>
        <p class="edu-note">{{ t.eduNote }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.edu-card {
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: border-color 0.3s;
}

.edu-card:hover {
  border-color: var(--border-hover);
}

.edu-role {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-1);
  margin-bottom: 0.1rem;
}

.edu-place {
  font-size: 0.95rem;
  color: var(--text-2);
  margin-bottom: 0.15rem;
}

.edu-date {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-3);
  letter-spacing: 1px;
}

.edu-note {
  font-size: 0.92rem;
  color: var(--text-2);
  margin-top: 0.6rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--border);
}
</style>
