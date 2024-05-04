<script setup lang="ts">

import {Icon} from "@iconify/vue";
import useConfigureStore from "../../pinia/configure.ts";

const store = useConfigureStore();
</script>

<template>
  <div
      :class=" (store.isAuthenticated) ? `col-span-2` : `col-span-2`"
      class="bg-neutral-200 border border-neutral-800/50 rounded-md h-fit xl:hidden max-xl:block max-[300px]:col-span-1">
    <input v-model.trim="store.search"
           class="max-[340px]:w-52  bg-transparent border-r border-neutral-800/50 h-9 text-center outline-0"
           placeholder="Search Someone" type="text"/>
          <button class="px-2" type="button" @click="store.goToProfile()">
            <Icon icon="material-symbols:search" class="size-6  inline"/>
          </button>
  </div>

</template>

<style scoped>

</style>