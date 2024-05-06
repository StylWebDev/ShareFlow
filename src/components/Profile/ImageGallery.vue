<script setup lang="ts">

import Grid from "../Grid.vue";
defineProps<{
  profileName: string
  images: string[];
}>()
</script>

<template>
  <Grid txl-columns="5" class="grid-flow-row">
    <div v-for="(image,index) in images" :key="index+1" class="w-[200px]">
      <img class="rounded-md" :src="image" :alt="`img_${index+1}_of_${profileName}`">
    </div>
  </Grid>
</template>

<style scoped>

</style>