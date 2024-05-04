<script setup lang="ts">
import Header from "./components/Header.vue";
import useConfigureStore from "./pinia/configure.ts";
import {onMounted, ref} from "vue";
const {themes} = useConfigureStore();
let {theme} = useConfigureStore();
const darkMode = ref(window.matchMedia("(prefers-color-scheme: dark)"));

onMounted(()=> {
  (darkMode.value.matches) ? theme=0 : theme=1;
  document.body.style.background = themes[theme].bgColor
})
</script>

<template>
 <Header :class="themes[theme].headerColor" class="sticky top-0"/>
 <RouterView :class="themes[theme].textColor" />
</template>

<style scoped>

</style>
