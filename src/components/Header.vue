<script setup lang="ts">
import Grid from "./Grid.vue";
import Title from "./Header/Title.vue";
import SearchBar from "./Header/SearchBar.vue";
import NotAuth from "./Header/NotAuth.vue";
import Auth from "./Header/Auth.vue";
import SearchBarMobile from "./Header/SearchBarMobile.vue";
import {useAuthenticationStore} from "../pinia/authentication.ts";

const store = useAuthenticationStore();
</script>

<template>
  <Grid columns="2"  xl-columns="3" class="max-[300px]:grid-cols-1 justify-items-center justify-evenly py-4 border-b border-neutral-400/60 shadow-lg max-xl:gap-y-3 items-center">
    <Title/>
    <SearchBar/>
    <Transition enter-from-class="opacity-0" enter-active-class="transition-all duration-50 ease-in">
      <div v-if="!store.starting" :class=" (store.isAuthenticated) ? ` max-xl:hidden xl:block` : `block`">
        <NotAuth v-if="!store.isAuthenticated" class="` max-xl:hidden xl:block` "/>
        <Auth v-else/>
      </div>
    </Transition>
    <SearchBarMobile/>
  </Grid>
</template>

<style scoped>

</style>