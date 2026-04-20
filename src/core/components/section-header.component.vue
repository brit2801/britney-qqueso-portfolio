<script setup>
defineProps({
  label: { type: String, required: true },
  title: { type: String, required: true },
  titleHighlight: { type: String, required: true },
  subtitle: { type: String, default: '' }
});
</script>

<template>
  <div class="reveal">
    <p class="section-label">{{ label }}</p>
    <h2 class="section-title">{{ title }} <strong>{{ titleHighlight }}</strong></h2>
    <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
  </div>
</template>
