<script setup>
import SectionHeader from '../../core/components/section-header.component.vue';
import { PortfolioService } from '../services/portfolio.service.js';
import { useI18n } from '../../core/composables/use-i18n.composable.js';

const { t } = useI18n();
const featuredCerts = PortfolioService.getFeaturedCertifications(5);
</script>

<template>
  <section id="certifications" class="section" aria-labelledby="certifications-heading">
    <div class="container">
      <section-header
        :label="t.certLabel"
        :title="t.certTitle"
        :title-highlight="t.certHighlight"
      />

      <div class="cert-list stagger" role="list" aria-label="Professional certifications">
        <div
          v-for="cert in featuredCerts"
          :key="cert.name"
          class="cert-item reveal"
          role="listitem"
        >
          <span class="cert-name">{{ cert.name }}</span>
          <span class="cert-meta">{{ cert.issuer }} · {{ cert.year }}</span>
        </div>
      </div>

      <router-link to="/certifications" class="view-all" aria-label="View all certifications">
        {{ t.viewAllCerts }}
        <i class="pi pi-arrow-right" aria-hidden="true"></i>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.cert-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.cert-item {
  padding: 1.1rem 1.5rem;
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
