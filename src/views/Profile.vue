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

  <Flex :column="true" justify="center" items="center" class="mt-6 sm:gap-y-6">

    <Flex :column="true"
          :class="themes[store.theme].signBgColor"
          class="py-8 gap-y-10 px-16  max-sm:w-[90%] sm:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[70%]  max-sm:rounded-t-md sm:rounded-md">
       <UserBar :class="themes[store.theme].textColor" :profileName="route.params.name.toString()"  :profileInfo="{icon: `https://cdn.hero.page/pfp/03dffda4-6d0d-4f4a-93c7-16e87406605f-shadowy-anime-character-unique-black-pfp-anime-1.png` ,posts: 4, followers: 100, following: 300}"/>
       <ImageGallery :profileName="route.params.name.toString()" :images="[`https://picsum.photos/500`, `https://picsum.photos/600`, `https://picsum.photos/200`, `https://picsum.photos/300`, `https://picsum.photos/1920`]"/>

    </Flex>
  </Flex>
</template>

<style scoped>

</style>