<script setup lang="ts">

import Grid from "../Grid.vue";
defineProps<{
  profileName: string
  images: string[];
}>()
</script>

<template>
  <Grid columns="1" md-columns="2" sm-columns="2" lg-columns="3" txl-columns="5" class="grid-flow-row gap-y-4 justify-items-center">
    <div v-for="(image,index) in images" :key="index+1" class="max-[400px]:w-[200px] max-[640px]:w-[320px] w-[200px] xl:w-[180px] min-[2000px]:w-[240px] min-[2200px]:w-[300px] min-[2200px]:w-[260px] min-[2600px]:w-[320px] min-[3000px]:w-[370px] min-[3500px]:w-[415px] min-[4000px]:w-[450px]">
      <img class="rounded-md" :src="image" :alt="`img_${index+1}_of_${profileName}`">
    </div>
  </Grid>
</template>

<style scoped>

</style>