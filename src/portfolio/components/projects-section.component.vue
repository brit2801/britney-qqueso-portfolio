<script setup>
import SectionHeader from '../../core/components/section-header.component.vue';
import ProjectCard from './project-card.component.vue';
import { PortfolioService } from '../services/portfolio.service.js';
import { useI18n } from '../../core/composables/use-i18n.composable.js';

const { t } = useI18n();
const featuredProjects = PortfolioService.getFeaturedProjects();
</script>

<template>
  <section id="projects" class="section" aria-labelledby="projects-heading">
    <div class="container">
      <section-header
        :label="t.projectsLabel"
        :title="t.projectsTitle"
        :title-highlight="t.projectsHighlight"
        :subtitle="t.projectsSubtitle"
      />

      <div class="projects-list stagger">
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
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.view-all {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 0.7rem 1.8rem;
  border-radius: 8px;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text-1);
  border: 1px solid var(--border);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s;
}

.view-all:hover {
  border-color: var(--cyan);
  background: rgba(56, 189, 248, 0.05);
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.08);
}

.view-all:hover .pi {
  transform: translateX(4px);
}

.view-all .pi {
  transition: transform 0.3s;
}
</style>
