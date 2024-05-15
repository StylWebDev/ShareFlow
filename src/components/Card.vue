<script setup lang="ts">

import Flex from "./Flex.vue";
import {Icon} from "@iconify/vue";
import {ref} from "vue";
import useConfigureStore from "../pinia/configure.ts";

const {transition,themes} = useConfigureStore()
const liked = ref<boolean>(false);
const likes = ref(0);

const store = useConfigureStore();

defineProps<{
  profileIcon: string;
  profileName: string,
  description: string,
  imageSrc: string,
}>()
</script>

<template>
<Flex :column="true" justify="center" items="center"
      class="max-[250px]:w-[200px] max-[300px]:w-[250px] max-sm:w-[300px] sm:w-[350px] md:w-[450px] rounded-md"
      :class="themes[store.theme].contentBgColor">
  <div :class="themes[store.theme].profileBgColor" class=" w-full py-2 px-3 rounded-t-md ">
    <p class="font-semibold text-lg">
      <img :src="profileIcon" alt="pfp" class="inline size-10 rounded-full" />
      {{ profileName }}
    </p>
  </div>
  <div class="text-center relative w-[100%] rounded-md">
    <img @dblclick="[(!liked) ? liked=!liked : null, (likes===0) ? likes++ : likes--]" :src="imageSrc" alt="img" class="inline cursor-pointer">
  </div>

  <div :class="themes[store.theme].descriptionBgColor" class=" py-2 px-3 w-full rounded-b-md">
    <div class=" rounded-t-md">
      <p class="font-semibold text-lg">
        <img :src="profileIcon" alt="pfp" class="inline size-6 rounded-full" />
         {{likes}} Likes
      </p>
    </div>
    <Flex :row="true" gap-x="2" class="pt-1.5">
      <Icon class="size-8 " :class="[(likes===1) ? `text-red-500 scale-125 duration-300` : `text-neutral-100 duration-300 hover:scale-110 scale-100`, transition]" icon="material-symbols-light:favorite-rounded" @click="[liked=!liked,(liked) ? likes++ : likes--]"/>
      <Icon class="size-8 text-neutral-100 hover:scale-110 duration-500" :class="transition" icon="ph:chat-teardrop-duotone"/>
      <Icon class="size-8 text-neutral-100 hover:scale-110 duration-500" :class="transition" icon="carbon:send-alt-filled"/>
    </Flex>
     <h1 class="text-base font-semibold text-yellow-400">{{ profileName }} </h1>
     <p class="break-all text-sm font-normal"> {{description}}</p>
  </div>
</Flex>
</template>

<style scoped>

</style>