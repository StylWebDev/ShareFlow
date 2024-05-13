<script setup lang="ts">

import Flex from "../Flex.vue";
import UploadPhoto from "./UploadPhoto.vue";
import {useAuthenticationStore} from "../../pinia/authentication.ts";

const auth = useAuthenticationStore();

defineProps<{
  profileName: string,
  profileInfo: {
    icon: string,
    posts: number,
    followers: number,
    following: number
  }
}>()
</script>

<template>
  <Flex :row="true" class="justify-evenly">
    <Flex justify="center" items="center" gap-y="5" gap-x="5" class="max-sm:flex-col sm:flex-row">
      <Flex class="items-center gap-x-2" ><img :src="profileInfo.icon" alt="pfp" class="max-sm:size-16 size-24 rounded-full">
        <h1 class="text-lg sm:hidden font-extrabold text-yellow-500">{{profileName}}</h1>
      </Flex>
      <Flex :column="true" gap-y="2" class="sm:pt-3">
        <h1 class="max-sm:text-lg text-2xl max-sm:hidden font-extrabold text-yellow-500">{{profileName}}</h1>
        <Flex :row="true" gap-x="5" items="center" justify="center" class="font-semibold max-sm:text-xs">
          <p class="text-center capitalize">{{profileInfo.posts}}<br> posts</p>
          <p class="text-center capitalize">{{profileInfo.followers}}<br> followers</p>
          <p class="text-center capitalize">{{profileInfo.following}}<br> following</p>
        </Flex>
      </Flex>
    </Flex>
    <UploadPhoto v-if="auth.user.username === $route.params.name" class="max-xl:hidden"/>
  </Flex>

</template>

<style scoped>

</style>