<script setup lang="ts">
import Flex from "../Flex.vue";
import useConfigureStore from "../../pinia/configure.ts";

const {transition} = useConfigureStore();
</script>

<template>
  <Flex :row="true" justify="center" gap-x="2">
    <RouterLink to="/login" class="px-3 py-0.5  bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 duration-300"
            :class="transition"
            type="button">Sign in</RouterLink>
    <RouterLink to="/signup" class="px-2 font-semibold text-blue-500 hover:text-black duration-500"
            :class="transition"
            type="button">Sign Up</RouterLink>
  </Flex>
</template>

<style scoped>

</style>