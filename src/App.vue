<script setup lang="ts">
import Header from "./components/Header.vue";
import useConfigureStore from "./pinia/configure.ts";
import {onMounted, ref} from "vue";
import Footer from "./components/Footer.vue";
const {themes,transition} = useConfigureStore();
const store = useConfigureStore();
const darkMode = ref(window.matchMedia("(prefers-color-scheme: dark)"));

onMounted(()=> {
  (darkMode.value.matches) ? store.theme=0 : store.theme=1;
  document.body.style.background = themes[store.theme].bgColor
})
</script>

<template>
 <Header :class="themes[store.theme].headerColor" class="sticky top-0"/>
  <Transition enter-from-class="scale-0 opacity-0" enter-active-class="transition-all duration-500 ease-in"
              leave-to-class="scale-0 opacity-0 absolute " leave-active-class="transition-all duration-500 ease-in"
              appear appear-active-class="transition-all opacity-0 duration-500 ease-in">
    <RouterView :class="themes[store.theme].textColor" />
  </Transition>
 <Footer class="mt-5"/>
</template>

<style scoped>

</style>
