<script setup lang="ts">

import DesktopFooter from "./Footer/DesktopFooter.vue";
import MobileFooter from "./Footer/MobileFooter.vue";
import useConfigureStore from "../pinia/configure.ts";

const {themes} = useConfigureStore();
const store = useConfigureStore();
</script>

<template>
 <div>
   <DesktopFooter class="max-xl:hidden border-t border-neutral-400/60 " :class="themes[store.theme].textColor" />
   <MobileFooter class="xl:hidden"/>
 </div>

</template>

<style scoped>

</style>