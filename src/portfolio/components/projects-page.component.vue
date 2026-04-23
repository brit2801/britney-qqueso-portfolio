<script setup>
import { useScrollReveal } from '../../core/composables/use-scroll-reveal.composable.js';
import ProjectCard from './project-card.component.vue';
import { PortfolioService } from '../services/portfolio.service.js';
import { useI18n } from '../../core/composables/use-i18n.composable.js';

const { t } = useI18n();
const allProjects = PortfolioService.getAllProjects();

useScrollReveal();
</script>

<template>
  <div>
    <div class="page-header">
      <div class="container">
        <router-link to="/" class="back-link" aria-label="Go back to home page">
          <i class="pi pi-arrow-left" aria-hidden="true"></i>
          {{ t.backToHome }}
        </router-link>
        <h1 class="section-title">{{ t.allProjectsTitle }} <strong>{{ t.allProjectsHighlight }}</strong></h1>
      </div>
    </div>

    <div class="projects-page-list">
      <div class="container stagger">
        <project-card
          v-for="project in allProjects"
          :key="project.id"
          :project="project"
          :use-full-description="true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  padding: 7rem 2rem 3rem;
}

.page-header .section-title {
  margin-bottom: 2.5rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--text-3);
  margin-bottom: 1.5rem;
  transition: color 0.25s;
}

.back-link:hover {
  color: var(--cyan);
}

.back-link:hover .pi {
  transform: translateX(-3px);
}

.back-link .pi {
  transition: transform 0.3s;
}

.projects-page-list {
  padding: 0 2rem 5rem;
}

.projects-page-list .container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (max-width: 480px) {
  .page-header {
    padding: 6rem 1.25rem 2rem;
  }
  .projects-page-list {
    padding: 0 1.25rem 4rem;
  }
}
</style>
