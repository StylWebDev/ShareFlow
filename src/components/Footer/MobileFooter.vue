<script setup lang="ts">
import {ref} from "vue";
import Flex from "../Flex.vue";
import {Icon} from "@iconify/vue";
import {useAuthenticationStore} from "../../pinia/authentication.ts";
import UploadPhotoMobile from "./UploadPhotoMobile.vue";

const auth = useAuthenticationStore();
const links = ref<string []>([
   `mingcute:home-4-fill`,
   `material-symbols-light:add-photo-alternate-rounded`,
   `material-symbols:account-circle`
])

const goToProfile = () => {
  location.assign(`/profile/${auth.user.username}`)
}
</script>

<template>
<div v-if="auth.isAuthenticated" class="py-3 border-t-2 border-white/20">
   <Flex :row="true" justify="evenly">
     <RouterLink to="/"
     >
       <Icon :icon="links[0]" class="max-sm:size-8 size-10"/>
     </RouterLink>
       <UploadPhotoMobile :icon="links[1]"/>
     <button type="button" @click="goToProfile()">
       <Icon :icon="links[2]" class="max-sm:size-8 size-10"/>
     </button>
   </Flex>
</div>
</template>
