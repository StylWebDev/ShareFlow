<script setup lang="ts">

import Grid from "./Grid.vue";
import {Icon} from "@iconify/vue";
import Flex from "./Flex.vue";
import useConfigureStore from "../pinia/configure.ts";
import {useRouter} from "vue-router";
import {ref} from "vue";
import Profile from "../views/Profile.vue";

const router = useRouter();
const search = ref("")
const isAuthenticated = ref<boolean>(true)

const {transition} = useConfigureStore();

const goToProfile = (): void => {
  if (search.value !== "") router.push(`/profile/${search.value}`);
}

</script>

<template>
  <Grid columns="1" xl-columns="3" class="justify-items-center justify-evenly py-4 border-b border-neutral-400/60 shadow-lg max-xl:gap-y-3 items-center">
    <div class="font-mono text-2xl font-bold align-middle"><Icon class="inline size-10" icon="material-symbols:android-camera"/> ShareFlow</div>
    <div class="bg-neutral-200 border border-neutral-800/50 rounded-md h-fit"><input v-model.trim="search" class="max-[340px]:w-52  bg-transparent border-r border-neutral-800/50 h-9 text-center outline-0" placeholder="Search Someone" type="text"><button class="px-2" type="button" @click="goToProfile"><Icon icon="material-symbols:search" class="size-6  inline"/></button></div>

    <div class="max-xl:hidden">
      <Flex v-if="!isAuthenticated" :row="true" justify="center" gap-x="2">
        <button class="px-3 py-0.5  bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 duration-300"
                :class="transition"
                type="button">Log in</button>
        <button class="px-2 font-semibold text-blue-500 hover:text-black duration-500"
                :class="transition"
                type="button">Sign In</button>
      </Flex>

      <Flex v-else :row="true" justify="center" gap-x="2">
        <button class="px-3 py-0.5  bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 duration-300"
                :class="transition"
                type="button">Profile</button>
        <button class="px-2 font-semibold rounded-lg text-red-500 border-2 border-red-500 hover:text-white hover:border-white hover:bg-red-500 duration-500"
                :class="transition"
                @click="isAuthenticated = !isAuthenticated"
                type="button">Sign Out</button>
      </Flex>
    </div>

  </Grid>
</template>

<style scoped>

</style>