<script setup>
import { useGreeting } from '../../core/composables/use-greeting.composable.js';
import { useI18n } from '../../core/composables/use-i18n.composable.js';
import { PortfolioService } from '../services/portfolio.service.js';

const { greeting } = useGreeting();
const { t } = useI18n();
const profile = PortfolioService.getProfile();
</script>

<template>
  <section class="hero" id="home" aria-label="Hero introduction">
    <div class="hero-glow hero-glow--1" aria-hidden="true"></div>
    <div class="hero-glow hero-glow--2" aria-hidden="true"></div>

    <div class="hero-layout">
      <div class="hero-text">
        <p class="hero-greeting">
          <span>{{ greeting }}</span>, I'm
          <strong class="hero-name">{{ profile.name }}</strong>
        </p>

        <h1>
          {{ t.heroPrefix }}
          <strong>{{ t.heroHighlight }}</strong>
          {{ t.heroSuffix }}
        </h1>

        <p class="hero-desc">{{ t.heroDesc }}</p>

        <div class="hero-badges" role="list" aria-label="Key achievements">
          <span class="badge badge--cyan" role="listitem">{{ t.badge1 }}</span>
          <span class="badge badge--teal" role="listitem">{{ t.badge2 }}</span>
          <span class="badge badge--amber" role="listitem">{{ t.badge3 }}</span>
        </div>

        <div class="hero-ctas">
          <a
            :href="profile.cvUrl"
            target="_blank"
            rel="noopener"
            class="btn btn-primary"
            aria-label="Download CV as PDF"
          >
            {{ t.downloadCv }}
            <i class="pi pi-download" aria-hidden="true"></i>
          </a>
          <a href="#projects" class="btn btn-ghost">{{ t.viewProjects }}</a>
        </div>
      </div>

      <!-- DDD + CQRS Architecture Illustration -->
      <div class="hero-illustration" aria-hidden="true">
        <svg viewBox="0 0 400 370" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="100" y1="90" x2="200" y2="160" stroke="var(--cyan)" stroke-width="1" opacity=".2" stroke-dasharray="6 4" class="flow-line" />
          <line x1="300" y1="90" x2="200" y2="160" stroke="var(--cyan)" stroke-width="1" opacity=".2" stroke-dasharray="6 4" class="flow-line" />
          <line x1="200" y1="160" x2="200" y2="260" stroke="var(--cyan)" stroke-width="1" opacity=".25" stroke-dasharray="6 4" class="flow-line" />
          <line x1="200" y1="260" x2="110" y2="320" stroke="var(--teal)" stroke-width="1" opacity=".2" stroke-dasharray="6 4" class="flow-line" />
          <line x1="200" y1="260" x2="290" y2="320" stroke="var(--teal)" stroke-width="1" opacity=".2" stroke-dasharray="6 4" class="flow-line" />
          <line x1="55" y1="180" x2="145" y2="160" stroke="var(--cyan)" stroke-width="1" opacity=".12" stroke-dasharray="4 4" class="flow-line" />
          <line x1="345" y1="180" x2="255" y2="160" stroke="var(--cyan)" stroke-width="1" opacity=".12" stroke-dasharray="4 4" class="flow-line" />
          <rect x="55" y="58" width="90" height="56" rx="10" fill="rgba(56,189,248,.04)" stroke="var(--cyan)" stroke-width=".75" opacity=".35" />
          <text x="100" y="82" text-anchor="middle" font-family="'Space Mono',monospace" font-size="7" fill="var(--cyan)" opacity=".6">BOUNDED</text>
          <text x="100" y="93" text-anchor="middle" font-family="'Space Mono',monospace" font-size="7" fill="var(--cyan)" opacity=".6">CONTEXT A</text>
          <circle cx="100" cy="103" r="4" fill="var(--cyan)" class="node-pulse" />
          <rect x="255" y="58" width="90" height="56" rx="10" fill="rgba(56,189,248,.04)" stroke="var(--cyan)" stroke-width=".75" opacity=".35" />
          <text x="300" y="82" text-anchor="middle" font-family="'Space Mono',monospace" font-size="7" fill="var(--cyan)" opacity=".6">BOUNDED</text>
          <text x="300" y="93" text-anchor="middle" font-family="'Space Mono',monospace" font-size="7" fill="var(--cyan)" opacity=".6">CONTEXT B</text>
          <circle cx="300" cy="103" r="4" fill="var(--cyan)" class="node-pulse node-pulse--delayed-1" />
          <rect x="150" y="138" width="100" height="50" rx="12" fill="rgba(56,189,248,.06)" stroke="var(--cyan)" stroke-width="1" opacity=".5" />
          <text x="200" y="159" text-anchor="middle" font-family="'Outfit',sans-serif" font-size="9" font-weight="700" fill="var(--text-1)" opacity=".85">AGGREGATE</text>
          <text x="200" y="172" text-anchor="middle" font-family="'Space Mono',monospace" font-size="7" fill="var(--cyan)" opacity=".5">Domain Core</text>
          <rect x="148" y="212" width="104" height="26" rx="6" fill="none" stroke="var(--amber)" stroke-width=".75" stroke-dasharray="4 3" opacity=".35" />
          <text x="200" y="229" text-anchor="middle" font-family="'Space Mono',monospace" font-size="6.5" fill="var(--amber)" opacity=".5">ANTI-CORRUPTION LAYER</text>
          <rect x="155" y="248" width="40" height="26" rx="6" fill="rgba(45,212,191,.04)" stroke="var(--teal)" stroke-width=".75" opacity=".4" />
          <text x="175" y="265" text-anchor="middle" font-family="'Space Mono',monospace" font-size="7" fill="var(--teal)" opacity=".6">CMD</text>
          <rect x="205" y="248" width="40" height="26" rx="6" fill="rgba(45,212,191,.04)" stroke="var(--teal)" stroke-width=".75" opacity=".4" />
          <text x="225" y="265" text-anchor="middle" font-family="'Space Mono',monospace" font-size="7" fill="var(--teal)" opacity=".6">QUERY</text>
          <rect x="65" y="300" width="85" height="38" rx="8" fill="rgba(45,212,191,.03)" stroke="var(--teal)" stroke-width=".75" opacity=".3" />
          <text x="107" y="318" text-anchor="middle" font-family="'Space Mono',monospace" font-size="7" fill="var(--teal)" opacity=".5">WRITE DB</text>
          <circle cx="107" cy="308" r="3" fill="var(--teal)" class="node-pulse node-pulse--delayed-2" />
          <rect x="250" y="300" width="85" height="38" rx="8" fill="rgba(45,212,191,.03)" stroke="var(--teal)" stroke-width=".75" opacity=".3" />
          <text x="292" y="318" text-anchor="middle" font-family="'Space Mono',monospace" font-size="7" fill="var(--teal)" opacity=".5">READ DB</text>
          <circle cx="292" cy="308" r="3" fill="var(--teal)" class="node-pulse" />
          <circle cx="55" cy="180" r="14" fill="rgba(56,189,248,.03)" stroke="var(--cyan)" stroke-width=".5" opacity=".25" />
          <text x="55" y="183" text-anchor="middle" font-family="'Space Mono',monospace" font-size="6" fill="var(--cyan)" opacity=".4">API</text>
          <circle cx="345" cy="180" r="14" fill="rgba(56,189,248,.03)" stroke="var(--cyan)" stroke-width=".5" opacity=".25" />
          <text x="345" y="183" text-anchor="middle" font-family="'Space Mono',monospace" font-size="6" fill="var(--cyan)" opacity=".4">EVT</text>
          <text x="200" y="36" text-anchor="middle" font-family="'Outfit',sans-serif" font-size="9" font-weight="600" fill="var(--text-1)" opacity=".18" letter-spacing="3">DDD + CQRS ARCHITECTURE</text>
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: auto;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 2rem 3rem;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--hero-dot-color) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  pointer-events: none;
}

.hero-glow--1 {
  width: 400px;
  height: 400px;
  background: var(--cyan);
  top: 8%;
  right: 12%;
  opacity: 0.06;
}

.hero-glow--2 {
  width: 300px;
  height: 300px;
  background: var(--teal);
  bottom: 10%;
  left: 18%;
  opacity: 0.04;
}

.hero-layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: center;
  max-width: var(--max-width);
  margin: 0 auto;
  width: 100%;
}

.hero-greeting {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--cyan);
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  opacity: 0;
  animation: fade-up 0.6s ease forwards;
}

.hero-name {
  color: var(--cyan);
}

.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 3.8vw, 2.8rem);
  font-weight: 300;
  color: var(--text-1);
  line-height: 1.2;
  margin-bottom: 1.2rem;
  letter-spacing: -0.5px;
  opacity: 0;
  animation: fade-up 0.65s ease 0.1s forwards;
}

.hero h1 strong {
  font-weight: 700;
  color: var(--cyan);
}

.hero-desc {
  font-size: 1rem;
  color: var(--text-2);
  line-height: 1.8;
  margin-bottom: 1.8rem;
  max-width: 460px;
  opacity: 0;
  animation: fade-up 0.65s ease 0.2s forwards;
}

.hero-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fade-up 0.65s ease 0.25s forwards;
}

.badge {
  padding: 0.38rem 0.85rem;
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  border: 1px solid;
}

.badge--cyan {
  color: var(--cyan);
  border-color: rgba(56, 189, 248, 0.2);
  background: rgba(56, 189, 248, 0.05);
}

.badge--teal {
  color: var(--teal);
  border-color: rgba(45, 212, 191, 0.2);
  background: rgba(45, 212, 191, 0.05);
}

.badge--amber {
  color: var(--amber);
  border-color: rgba(251, 191, 36, 0.2);
  background: rgba(251, 191, 36, 0.05);
}

.hero-ctas {
  display: flex;
  gap: 0.7rem;
  opacity: 0;
  animation: fade-up 0.65s ease 0.35s forwards;
}

.hero-illustration {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: fade-in 1s ease 0.35s forwards;
}

.hero-illustration svg {
  width: 100%;
  max-width: 380px;
  height: auto;
}

.node-pulse { animation: node-pulse 3s ease-in-out infinite; }
.node-pulse--delayed-1 { animation: node-pulse 3s ease-in-out 1s infinite; }
.node-pulse--delayed-2 { animation: node-pulse 3s ease-in-out 2s infinite; }
.flow-line { animation: dash-flow 2s linear infinite; }

@media (max-width: 900px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .hero-text {
    text-align: center;
    order: 1;
  }
  .hero-illustration {
    order: 0;
  }
  .hero-illustration svg {
    max-width: 280px;
  }
  .hero-ctas,
  .hero-badges {
    justify-content: center;
  }
  .hero-desc {
    margin: 0 auto 1.8rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 4.5rem 1.25rem 2rem;
  }
  .hero h1 {
    font-size: 1.7rem;
  }
  .hero-ctas {
    flex-direction: column;
    align-items: center;
  }
  .hero-ctas .btn {
    width: 100%;
    max-width: 260px;
    justify-content: center;
  }
}
</style>
