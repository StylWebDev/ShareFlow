<script setup lang="ts">
import Grid from "./Grid.vue";
import useConfigureStore from "../pinia/configure.ts";
import Title from "./Header/Title.vue";
import SearchBar from "./Header/SearchBar.vue";
import NotAuth from "./Header/NotAuth.vue";
import Auth from "./Header/Auth.vue";
import SearchBarMobile from "./Header/SearchBarMobile.vue";

const store = useConfigureStore();
</script>

<template>
  <Grid columns="2"  xl-columns="3" class="max-[300px]:grid-cols-1 justify-items-center justify-evenly py-4 border-b border-neutral-400/60 shadow-lg max-xl:gap-y-3 items-center">
    <Title/>
    <SearchBar/>
    <div :class=" (store.isAuthenticated) ? ` max-xl:hidden xl:block` : `block`">
      <NotAuth v-if="!store.isAuthenticated" class="` max-xl:hidden xl:block` "/>
      <Auth v-else/>
    </div>
    <SearchBarMobile/>
  </Grid>
</template>

<style scoped>

</style>