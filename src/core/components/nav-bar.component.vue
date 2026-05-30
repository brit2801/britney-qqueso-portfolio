<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from '../composables/use-i18n.composable.js';
import { PortfolioService } from '../../portfolio/services/portfolio.service.js';

const isOpen = ref(false);
const isScrolled = ref(false);
const activeHash = ref('#home');
const route = useRoute();
const { t, lang, toggleLang } = useI18n();
const profile = PortfolioService.getProfile();

const navKeys = [
  { key: 'navAbout', hash: '#about' },
  { key: 'navEducation', hash: '#education' },
  { key: 'navSkills', hash: '#skills' },
  { key: 'navProjects', hash: '#projects' },
  { key: 'navContact', hash: '#contact' }
];

const initials = computed(() => profile.name
  .split(/\s+/)
  .slice(0, 2)
  .map((word) => word[0])
  .join('')
  .toUpperCase());

function toggleMenu() {
  isOpen.value = !isOpen.value;
  document.body.style.overflow = isOpen.value ? 'hidden' : '';
}

function closeMenu() {
  isOpen.value = false;
  document.body.style.overflow = '';
}

function getNavHref(item) {
  if (route.name === 'home') return item.hash;
  return `/${item.hash}`;
}

function updateActiveState() {
  isScrolled.value = window.scrollY > 30;

  if (route.name !== 'home') {
    activeHash.value = '';
    return;
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  let current = '#home';
  const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

  if (isAtBottom && sections.length) {
    activeHash.value = `#${sections[sections.length - 1].id}`;
    return;
  }

  for (const section of sections) {
    const top = section.offsetTop - 140;
    const bottom = section.offsetTop + section.offsetHeight - 140;

    if (window.scrollY >= top && window.scrollY < bottom) {
      current = `#${section.id}`;
    }
  }

  activeHash.value = current;
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveState, { passive: true });
  updateActiveState();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveState);
  document.body.style.overflow = '';
});

watch(() => route.fullPath, () => {
  closeMenu();
  requestAnimationFrame(updateActiveState);
});
</script>

<template>
  <header :class="['nav', { scrolled: isScrolled }]" role="banner">
    <div class="wrap nav-in">
      <router-link to="/" class="brand" @click="closeMenu">
        <span class="mark"><span>{{ initials }}</span></span>
        <span>{{ profile.name }}</span>
      </router-link>

      <nav :class="['nav-links', { open: isOpen }]" id="nav-links" aria-label="Main navigation">
        <a
          v-for="item in navKeys"
          :key="item.hash"
          :href="getNavHref(item)"
          :class="{ active: activeHash === item.hash }"
          @click="closeMenu"
        >
          {{ t[item.key] }}
        </a>
      </nav>

      <div class="nav-actions">
        <button
          class="lang-btn"
          :aria-label="lang === 'en' ? 'Cambiar a español' : 'Switch to English'"
          @click="toggleLang"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
          </svg>
          <span>{{ lang === 'en' ? 'ES' : 'EN' }}</span>
        </button>

        <button
          :class="['burger', { open: isOpen }]"
          :aria-expanded="isOpen.toString()"
          aria-controls="nav-links"
          aria-label="Toggle navigation menu"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 1200;
  transition: background 0.4s, border-color 0.4s, backdrop-filter 0.4s;
}

.nav.scrolled {
  background: rgba(6, 8, 16, 0.7);
  border-bottom: 1px solid var(--line-soft);
  backdrop-filter: blur(14px);
}

.nav-in {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.brand {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 11px;
  color: var(--ink);
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.01em;
}

.mark {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: var(--grad-soft);
  box-shadow: inset 0 0 14px rgba(54, 233, 214, 0.25);
}

.mark span {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 600;
  background: var(--grad);
  background-clip: text;
  color: transparent;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-links a {
  position: relative;
  padding: 9px 14px;
  border-radius: 10px;
  color: var(--ink-2);
  font-size: 0.92rem;
  font-weight: 500;
  transition: color 0.25s;
}

.nav-links a::after {
  content: '';
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 3px;
  height: 1.5px;
  border-radius: 2px;
  background: var(--cyan);
  opacity: 0;
  transform: scaleX(0.35);
  transition: opacity 0.25s, transform 0.25s var(--ease);
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--cyan);
}

.nav-links a:hover::after,
.nav-links a.active::after {
  opacity: 1;
  transform: scaleX(1);
}

.nav-actions {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
}

.lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 8px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--glass-hi);
  color: var(--ink);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  transition: transform 0.25s var(--ease), border-color 0.25s, box-shadow 0.25s;
}

.lang-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(54, 233, 214, 0.5);
  box-shadow: 0 12px 30px -18px var(--glow-cyan);
}

.lang-btn svg {
  width: 16px;
  height: 16px;
}

.burger {
  position: relative;
  display: none;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--glass-hi);
  cursor: pointer;
}

.burger span {
  position: absolute;
  left: 12px;
  right: 12px;
  height: 2px;
  border-radius: 2px;
  background: var(--ink);
  transition: 0.3s var(--ease);
}

.burger span:nth-child(1) {
  top: 16px;
}

.burger span:nth-child(2) {
  top: 21px;
}

.burger span:nth-child(3) {
  top: 26px;
}

.burger.open span:nth-child(1) {
  top: 21px;
  transform: rotate(45deg);
}

.burger.open span:nth-child(2) {
  opacity: 0;
}

.burger.open span:nth-child(3) {
  top: 21px;
  transform: rotate(-45deg);
}

@media (max-width: 900px) {
  .nav-links {
    position: fixed;
    inset: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    padding: 0 30px;
    background: rgba(4, 5, 10, 0.92);
    backdrop-filter: blur(20px);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-12px);
    transition: 0.4s var(--ease);
  }

  .nav-links.open {
    opacity: 1;
    visibility: visible;
    transform: none;
  }

  .nav-links a {
    width: min(100%, 420px);
    padding: 14px 0;
    border-bottom: 1px solid var(--line-soft);
    border-radius: 0;
    color: var(--ink);
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 600;
  }

  .nav-links a::after {
    display: none;
  }

  .burger {
    display: block;
  }
}

@media (max-width: 520px) {
  .brand > span:last-child {
    display: none;
  }
}
</style>
