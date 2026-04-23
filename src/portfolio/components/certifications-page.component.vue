<script setup>
import { useScrollReveal } from '../../core/composables/use-scroll-reveal.composable.js';
import { PortfolioService } from '../services/portfolio.service.js';
import { useI18n } from '../../core/composables/use-i18n.composable.js';

const { t } = useI18n();
const allCerts = PortfolioService.getAllCertifications();

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
        <h1 class="section-title">{{ t.certTitle }} <strong>{{ t.certHighlight }}</strong></h1>
      </div>
    </div>

    <div class="certs-page-list">
      <div class="container">
        <div class="cert-list stagger" role="list" aria-label="All professional certifications">
          <div
            v-for="cert in allCerts"
            :key="cert.name"
            class="cert-item reveal"
            role="listitem"
          >
            <span class="cert-name">{{ cert.name }}</span>
            <span class="cert-meta">{{ cert.issuer }} · {{ cert.year }}</span>
          </div>
        </div>
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

.certs-page-list {
  padding: 0 2rem 5rem;
}

.cert-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.cert-item {
  padding: 1.2rem 1.5rem;
  border-radius: 10px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  transition: border-color 0.3s;
}

.cert-item:hover {
  border-color: var(--border-hover);
}

.cert-name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-1);
}

.cert-meta {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-3);
  letter-spacing: 1px;
}

@media (max-width: 480px) {
  .page-header {
    padding: 6rem 1.25rem 2rem;
  }
  .certs-page-list {
    padding: 0 1.25rem 4rem;
  }
}
</style>
