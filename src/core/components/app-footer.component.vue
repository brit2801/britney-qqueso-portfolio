<script setup>
import { useI18n } from '../composables/use-i18n.composable.js';

const { t } = useI18n();
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer role="contentinfo">
    <p>
      {{ t.footerDesigned }}
      <span class="highlight">Britney Delhy Qqueso Rodriguez</span>
      — {{ currentYear }}
    </p>
  </footer>
</template>

<style scoped>
footer {
  text-align: center;
  padding: 2rem;
  border-top: 1px solid var(--border);
}

footer p {
  font-size: 0.8rem;
  color: var(--text-3);
}

.highlight {
  color: var(--cyan);
}
</style>
