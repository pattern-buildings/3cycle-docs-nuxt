<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: '3Cycle - Modular Construction System',
  ogTitle: '3Cycle - Modular Construction System',
  description: 'Open-source modular timber construction system from Estonia. Standardized components for flexible, sustainable building configurations.',
  ogDescription: 'Open-source modular timber construction system from Estonia. Standardized components for flexible, sustainable building configurations.',
})
</script>

<template>
  <div class="landing-page">
    <LandingHero />
    <LandingOpenSource />
    <LandingPillars />
    <LandingDfma />
    <LandingPeople />
    <LandingCta />
  </div>
</template>
