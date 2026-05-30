<script setup>
import AmbientBackground from './core/components/ambient-background.component.vue';
import NavBar from './core/components/nav-bar.component.vue';
import AppFooter from './core/components/app-footer.component.vue';
</script>

<template>
  <div class="app-wrapper dark-mode">
    <ambient-background />
    <nav-bar />
    <main id="main-content" role="main">
      <router-view />
    </main>
    <app-footer />
  </div>
</template>

<style>
.app-wrapper {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent;
}

#main-content {
  position: relative;
  z-index: 1;
  flex: 1;
}
</style>
