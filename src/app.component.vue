<script setup>
import { onMounted } from 'vue';
import NavBar from './core/components/nav-bar.component.vue';
import AppFooter from './core/components/app-footer.component.vue';
import { useTheme } from './core/composables/use-theme.composable.js';

const { applyTheme } = useTheme();

onMounted(() => {
  applyTheme();
});
</script>

<template>
  <div class="app-wrapper dark-mode">
    <nav-bar />
    <main id="main-content" role="main">
      <router-view />
    </main>
    <app-footer />
  </div>
</template>

<style>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background 0.35s ease, color 0.35s ease;
}

.app-wrapper.dark-mode {
  background: var(--bg);
}

.app-wrapper.light-mode {
  background: var(--bg);
}

#main-content {
  flex: 1;
}
</style>
