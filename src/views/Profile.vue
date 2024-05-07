<script setup lang="ts">
import {useRoute} from "vue-router";
import UserBar from "../components/Profile/UserBar.vue";
import Flex from "../components/Flex.vue";
const route = useRoute();
import useConfigureStore from "../pinia/configure.ts";
import ImageGallery from "../components/Profile/ImageGallery.vue";

const {themes} = useConfigureStore()
const store = useConfigureStore()
</script>

<template>

  <Flex :column="true" items="center" class="mt-6 sm:gap-y-6 items-start">

    <Flex :column="true"
          class="gap-y-5   max-sm:w-[90%] sm:w-[80%] lg:w-[80%] xl:w-[80%] 2xl:w-[70%]  ">
       <UserBar class="px-16 py-3 rounded-md" :class="[themes[store.theme].signBgColor ,themes[store.theme].textColor]" :profileName="route.params.name.toString()"  :profileInfo="{icon: `https://cdn.hero.page/pfp/03dffda4-6d0d-4f4a-93c7-16e87406605f-shadowy-anime-character-unique-black-pfp-anime-1.png` ,posts: 4, followers: 100, following: 300}"/>
       <ImageGallery class="px-16 py-3 rounded-md" :class="themes[store.theme].signBgColor" :profileName="route.params.name.toString()" :images="[`https://picsum.photos/500`, `https://picsum.photos/600`, `https://picsum.photos/200`, `https://picsum.photos/300`, `https://picsum.photos/1920`]"/>

    </Flex>
  </Flex>
</template>

<style scoped>

</style>