<script setup lang="ts">
import useConfigureStore from "../../pinia/configure.ts";
import {computed, ref} from "vue";
import Flex from "../Flex.vue";
import {Icon} from "@iconify/vue";

const store = useConfigureStore();
const links = ref([
  {icon: `mingcute:home-4-fill`, to: '/'},
  {icon: `material-symbols-light:add-photo-alternate-rounded`, to: ''},
  {icon: `material-symbols:account-circle`, to: (store.isAuthenticated) ? 'profile/authUser' : `/login`},
])

const authLinks=  computed(() => {
  return (!store.isAuthenticated) ? links.value.filter((val,index) => index > 1) : links.value
})
</script>

<template>
<div class="py-3 border-t-2 border-white/20">
   <Flex :row="true" justify="evenly">
     <RouterLink
      v-for="(link,index) in authLinks" :key="index+1"
      :to="(store.isAuthenticated) ? link.to : `/login`"
     ><Icon :icon="link.icon" class="max-sm:size-8 size-10"/></RouterLink>
   </Flex>
</div>
</template>
