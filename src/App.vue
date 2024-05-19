<script setup lang="ts">
import Header from "./components/Header.vue";
import useConfigureStore from "./pinia/configure.ts";
import {onMounted, ref} from "vue";
import Footer from "./components/Footer.vue";
import Flex from "./components/Flex.vue";
import {useAuthenticationStore} from "./pinia/authentication.ts";
const {themes} = useConfigureStore();
const store = useConfigureStore();
const darkMode = ref(window.matchMedia("(prefers-color-scheme: dark)"));
const auth = useAuthenticationStore()


onMounted(  ()=> {
  (!darkMode.value.matches) ? store.theme=0 : store.theme=1;
  document.body.style.background = themes[store.theme].bgColor;
  auth.getUser();
})
</script>

<template>
  <Flex :column="true" class="h-screen">
    <Header :class="themes[store.theme].headerColor" class="sticky top-0 z-50"/>
    <RouterView v-if="auth.isAuthenticated" v-slot="{ Component }">
      <Transition enter-from-class="scale-0 opacity-0 " enter-active-class="transition-all duration-500 ease-in"
                    leave-to-class="scale-0 opacity-0 absolute w-full" leave-active-class="transition-all duration-500 ease-in"
                    appear appear-active-class="transition-all opacity-0 duration-500 ease-in">
        <component :is="Component" :class="themes[store.theme].textColor" class="flex-grow"/>
      </Transition>
    </RouterView>
    <RouterView v-else v-slot="{ Component }">
      <Transition enter-from-class="scale-0 opacity-0 " enter-active-class="transition-all duration-500 ease-in"
                  leave-to-class="scale-0 opacity-0 absolute w-full" leave-active-class="transition-all duration-500 ease-in"
                  appear appear-active-class="transition-all opacity-0 duration-500 ease-in">
        <component :is="Component" :class="themes[store.theme].textColor" class="flex-grow"/>
      </Transition>
    </RouterView>

    <Footer :class="[themes[store.theme].headerColor,themes[store.theme].textColor, (auth.isAuthenticated) ?  `sticky bottom-0 w-full` : `max-sm:sticky sm:fixed bottom-0 w-full`]" class="mt-5 z-50 "  />
  </Flex>

</template>

<style scoped>

</style>
