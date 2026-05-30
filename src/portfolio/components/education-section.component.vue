<script setup>
import SectionHeader from '../../core/components/section-header.component.vue';
import { useI18n } from '../../core/composables/use-i18n.composable.js';
import { PortfolioService } from '../services/portfolio.service.js';

const { t } = useI18n();
const certifications = PortfolioService.getFeaturedCertifications(5);
</script>

<template>
  <section id="education" class="section" aria-labelledby="education-heading">
    <div class="wrap">
      <section-header
        :label="t.eduLabel"
        :title="t.eduTitle"
        :title-highlight="t.eduHighlight"
      />
      <div class="education-stack">
        <article class="edu-card glass reveal" aria-label="Education details">
          <span class="eyebrow">{{ t.eduLabel }}</span>
          <p class="edu-role">{{ t.eduDegree }}</p>
          <p class="edu-place">{{ t.eduInstitution }}</p>
          <p class="edu-date">
            <time>{{ t.eduPeriod }}</time>
          </p>
          <p class="edu-note">{{ t.eduNote }}</p>
        </article>

        <div id="certifications" class="certifications-block">
          <div class="cert-heading reveal">
            <span class="eyebrow">{{ t.certLabel }}</span>
            <h3>{{ t.certTitle }} <strong>{{ t.certHighlight }}</strong></h3>
          </div>

          <div class="cert-list stagger" role="list" aria-label="Professional certifications">
            <div
              v-for="cert in certifications"
              :key="cert.name"
              class="cert-item glass reveal"
              role="listitem"
            >
              <span class="cert-name">{{ cert.name }}</span>
              <span class="cert-meta">{{ cert.issuer }} · {{ cert.date }}</span>
            </div>
          </div>

          <router-link to="/certifications" class="view-all-certs" aria-label="View all certificates">
            {{ t.viewAllCerts }}
            <i class="pi pi-arrow-right" aria-hidden="true"></i>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.education-stack {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  align-items: start;
}

.edu-card {
  padding: clamp(1.4rem, 3vw, 2rem);
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.edu-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: 0 24px 60px -34px var(--glow-cyan);
}

.eyebrow {
  display: inline-block;
  margin-bottom: 0.65rem;
  color: var(--cyan);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.edu-role {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
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
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--line-soft);
}

.certifications-block {
  padding-top: 4px;
}

.cert-heading {
  margin-bottom: 16px;
}

.cert-heading h3 {
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 3vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.01em;
}

.cert-heading strong {
  background: var(--grad);
  background-clip: text;
  color: transparent;
}

.cert-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.cert-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 1rem 1.2rem;
  transition: border-color 0.3s, transform 0.3s;
}

.cert-item:hover {
  transform: translateX(4px);
  border-color: var(--border-hover);
}

.cert-name {
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
}

.cert-meta {
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-align: right;
}

.view-all-certs {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.4rem;
  padding: 12px 18px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--text-1);
  font-family: var(--font-body);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: transform 0.25s var(--ease), border-color 0.25s, box-shadow 0.25s, background 0.25s;
}

.view-all-certs:hover {
  transform: translateY(-3px);
  border-color: rgba(54, 233, 214, 0.55);
  background: var(--glass-hi);
  box-shadow: 0 12px 30px -14px var(--glow-cyan);
}

.view-all-certs:hover .pi {
  transform: translateX(4px);
}

.view-all-certs .pi {
  transition: transform 0.3s;
}

@media (max-width: 640px) {
  .cert-item {
    align-items: flex-start;
    flex-direction: column;
  }

  .cert-meta {
    text-align: left;
  }
}
</style>
