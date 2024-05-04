<script setup lang="ts">

import {Icon} from "@iconify/vue";
import useConfigureStore from "../../pinia/configure.ts";
const {themes,theme,isAuthenticated} = useConfigureStore();
</script>

<template>
  <RouterLink to="/" :class="[themes[theme].logoColor,  (isAuthenticated) ? `max-xl:col-span-2` : `col-span-1`]"
       class="font-mono text-2xl font-bold align-middle text-center">
    <Icon class="inline size-10" icon="material-symbols:android-camera"/>
    ShareFlow
  </RouterLink>
</template>

<style scoped>

</style>