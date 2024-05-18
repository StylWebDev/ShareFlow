<script setup lang="ts">
import {onMounted, ref} from "vue";
import Flex from "../Flex.vue";
import {Icon} from "@iconify/vue";
import {useAuthenticationStore} from "../../pinia/authentication.ts";
import UploadPhotoMobile from "./UploadPhotoMobile.vue";
import {useRoute} from "vue-router";

const route  = useRoute();
const auth = useAuthenticationStore();
const links = ref<string []>([
   `mingcute:home-4-fill`,
   `material-symbols-light:add-photo-alternate-rounded`,
   `material-symbols:account-circle`
])
const is = ref(0)

onMounted(()=> {
  (route.name==="Profile") ? is.value = 1 : is.value = 0
})

</script>

<template>
<div v-if="auth.isAuthenticated" class="py-3 border-t-2 border-white/20">
   <Flex :row="true" justify="evenly">
     <RouterLink @click="is=0" :class="(is===0) ? `text-blue-400` : null" to="/"
     >
       <Icon :icon="links[0]"  class="max-sm:size-8 size-10"/>
     </RouterLink>
       <UploadPhotoMobile :icon="links[1]"/>
     <RouterLink :to="`/profile/${auth.user.username}`" type="button" :class="(is===1) ? `text-blue-400` : null" @click="is=1">
       <Icon :icon="links[2]" class="max-sm:size-8 size-10"/>
     </RouterLink>
   </Flex>
</div>
</template>
