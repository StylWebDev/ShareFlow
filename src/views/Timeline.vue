<script setup lang="ts">
import useConfigureStore from "../pinia/configure.ts";

const {test} = useConfigureStore()

</script>

<template>
<p class="text-darkviolet-600">{{test}}</p>
</template>

<style scoped>

</style>