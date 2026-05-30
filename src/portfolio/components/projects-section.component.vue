<script setup>
import SectionHeader from '../../core/components/section-header.component.vue';
import ProjectCard from './project-card.component.vue';
import { PortfolioService } from '../services/portfolio.service.js';
import { useI18n } from '../../core/composables/use-i18n.composable.js';

const { t } = useI18n();
const featuredProjects = PortfolioService.getFeaturedProjects();
</script>

<template>
  <section id="projects" class="section projects-section" aria-labelledby="projects-heading">
    <div class="wrap">
      <section-header
        :label="t.projectsLabel"
        :title="t.projectsTitle"
        :title-highlight="t.projectsHighlight"
        :subtitle="t.projectsSubtitle"
      />

      <div class="proj-list stagger">
        <project-card
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
        />
      </div>

      <router-link to="/projects" class="view-all" aria-label="View all projects">
        {{ t.viewAllProjects }}
        <i class="pi pi-arrow-right" aria-hidden="true"></i>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.projects-section :deep(.section-subtitle) {
  max-width: 640px;
}

.proj-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}

.view-all {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 12px 18px;
  border-radius: 999px;
  font-size: 0.9rem;
  color: var(--text-1);
  border: 1px solid var(--border);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s;
}

.view-all:hover {
  transform: translateY(-3px);
  border-color: rgba(54, 233, 214, 0.55);
  background: var(--glass-hi);
  box-shadow: 0 12px 30px -14px var(--glow-cyan);
}

.view-all:hover .pi {
  transform: translateX(4px);
}

.view-all .pi {
  transition: transform 0.3s;
}

@media (max-width: 900px) {
  .proj-list {
    grid-template-columns: 1fr;
  }
}
</style>
