<script setup>
import { computed } from 'vue';
import SectionHeader from '../../core/components/section-header.component.vue';
import { useI18n } from '../../core/composables/use-i18n.composable.js';

const { t } = useI18n();

const paragraphs = computed(() => [t.value.aboutP1, t.value.aboutP2, t.value.aboutP3]);
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-heading">
    <div class="container">
      <section-header
        :label="t.aboutLabel"
        :title="t.aboutTitle"
        :title-highlight="t.aboutHighlight"
      />
      <div class="about-text reveal" role="region" aria-label="About me description">
        <p v-for="(text, index) in paragraphs" :key="index" v-html="text"></p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-text p {
  margin-bottom: 0.9rem;
  font-size: 1rem;
  line-height: 1.85;
  color: var(--text-2);       
}

.about-text :deep(strong) {
  color: var(--text-1);       
  font-weight: 600;
}
</style>
