<script setup>
import { useScrollReveal } from '../../core/composables/use-scroll-reveal.composable.js';

import HeroSection from './hero-section.component.vue';
import AboutSection from './about-section.component.vue';
import EducationSection from './education-section.component.vue';
import SkillsSection from './skills-section.component.vue';
import ProjectsSection from './projects-section.component.vue';
import CertificationsSection from './certifications-section.component.vue';
import ContactSection from './contact-section.component.vue';

useScrollReveal();
</script>

<template>
  <div>
    <hero-section />
    <hr class="divider" aria-hidden="true">

    <about-section />
    <hr class="divider" aria-hidden="true">

    <education-section />
    <hr class="divider" aria-hidden="true">

    <skills-section />
    <hr class="divider" aria-hidden="true">

    <projects-section />
    <hr class="divider" aria-hidden="true">

    <certifications-section />
    <hr class="divider" aria-hidden="true">

    <contact-section />
  </div>
</template>
