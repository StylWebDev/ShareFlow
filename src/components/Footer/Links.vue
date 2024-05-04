<script setup>
import Grid from "../Grid.vue";
import {ref} from "vue";
import {Icon} from "@iconify/vue";
const linkList = ref([{href:`https://www.linkedin.com/in/konstantinos-stylianou-a4a95625b/` ,icon:`line-md:linkedin` },{href:`https://github.com/AliBaBas02` ,icon:`line-md:github-loop` },{href:`https://twitter.com/AliBaBaSssS` ,icon:`line-md:twitter-x` },{href:`#` ,icon:`material-symbols:globe` }])
</script>

<template>
    <Grid columns="4" class="justify-items-center grid-flow-row gap-x-1">
      <a v-for="(link,index) in linkList" :key="index" class="block p-1 bg-neutral-800/30 rounded-xl hover:scale-110 transition-all duration-500 ease-in" :href="link.href" target="_blank">
        <Icon class="size-6"  :icon="link.icon"/>
      </a>
    </Grid>
</template>

<style scoped>

</style>