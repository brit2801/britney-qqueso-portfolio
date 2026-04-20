<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from '../composables/use-i18n.composable.js';
import { useTheme } from '../composables/use-theme.composable.js';

const isOpen = ref(false);
const route = useRoute();
const { t, lang, toggleLang } = useI18n();
const { isDark, toggleTheme } = useTheme();

const navKeys = [
  { key: 'navAbout', hash: '#about' },
  { key: 'navEducation', hash: '#education' },
  { key: 'navProjects', hash: '#projects' },
  { key: 'navSkills', hash: '#skills' },
  { key: 'navCertifications', hash: '#certifications' },
  { key: 'navContact', hash: '#contact' }
];

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function closeMenu() {
  isOpen.value = false;
}

function getNavHref(item) {
  if (route.name === 'home') return item.hash;
  return `/${item.hash}`;
}

watch(() => route.fullPath, closeMenu);
</script>

<template>
  <div class="nav-wrapper" role="banner">
    <nav aria-label="Main navigation">
      <router-link to="/" class="nav-logo" @click="closeMenu">
        Britney<span> </span> Qqueso
      </router-link>

      <ul
        :class="['nav-links', { open: isOpen }]"
        id="nav-links"
        role="menubar"
      >
        <li v-for="item in navKeys" :key="item.hash" role="none">
          <a
            :href="getNavHref(item)"
            role="menuitem"
            @click="closeMenu"
          >
            {{ t[item.key] }}
          </a>
        </li>
      </ul>

      <div class="nav-actions">
        <!-- Language toggle -->
        <button
          class="nav-toggle-btn"
          :aria-label="lang === 'en' ? 'Cambiar a español' : 'Switch to English'"
          @click="toggleLang"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
          </svg>
          <span class="toggle-label">{{ lang === 'en' ? 'ES' : 'EN' }}</span>
        </button>

        <!-- Theme toggle -->
        <button
          class="nav-toggle-btn"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <!-- Sun icon (show when dark → click to go light) -->
          <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <!-- Moon icon (show when light → click to go dark) -->
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <!-- Hamburger -->
        <button
          class="hamburger"
          :aria-expanded="isOpen.toString()"
          aria-controls="nav-links"
          aria-label="Toggle navigation menu"
          @click="toggleMenu"
        >
          <span :class="{ rotated: isOpen }"></span>
          <span :class="{ hidden: isOpen }"></span>
          <span :class="{ 'rotated-reverse': isOpen }"></span>
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  transition: all 0.35s;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem 2rem;
}

.nav-logo {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-1);
  flex-shrink: 0;
}

.nav-logo span {
  color: var(--cyan);
}

.nav-links {
  display: flex;
  gap: 1.6rem;
  list-style: none;
}

.nav-links a {
  color: var(--text-3);
  font-size: 0.82rem;
  font-weight: 500;
  transition: color 0.25s;
  white-space: nowrap;
}

.nav-links a:hover {
  color: var(--text-1);
}

/* ─── Nav actions: lang, theme, hamburger ─── */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.nav-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.6rem;
  border-radius: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-2);
  cursor: pointer;
  transition: all 0.25s;
  font-family: var(--font-mono);
  font-size: 0.7rem;
}

.nav-toggle-btn:hover {
  border-color: var(--border-hover);
  color: var(--text-1);
}

.nav-toggle-btn svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.toggle-label {
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Hamburger button */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--text-2);
  transition: all 0.3s;
}

.hamburger span.rotated {
  transform: rotate(45deg) translate(4px, 4px);
}

.hamburger span.hidden {
  opacity: 0;
}

.hamburger span.rotated-reverse {
  transform: rotate(-45deg) translate(4px, -4px);
}

/* ─── Mobile ─── */
@media (max-width: 900px) {
  .nav-links {
    display: none;
  }

  .nav-links.open {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--nav-mobile-bg);
    backdrop-filter: blur(20px);
    padding: 5rem 2rem;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    z-index: 998;
  }

  .nav-links.open a {
    font-size: 1.15rem;
    color: var(--text-1);
  }

  .hamburger {
    display: flex;
    z-index: 1001;
  }
}
</style>
