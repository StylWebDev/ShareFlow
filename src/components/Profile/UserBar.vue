<script setup lang="ts">

import Flex from "../Flex.vue";
import UploadPhoto from "./UploadPhoto.vue";
import {useAuthenticationStore} from "../../pinia/authentication.ts";
import useConfigureStore from "../../pinia/configure.ts";

const {transition} = useConfigureStore()
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

    <Flex justify="center" items="center" gap-y="3" gap-x="5" class="max-sm:flex-col sm:flex-row">
      <Flex :column="true"  class="items-center gap-x-2" >
        <img :src="profileInfo.icon" alt="pfp" class="max-sm:size-16 size-28 rounded-full">
        <h1 class="text-2xl max-[340px]:text-lg sm:hidden font-extrabold text-yellow-500">{{profileName}}</h1>
      </Flex>
      <Flex :column="true" gap-y="1" class="sm:pt-3" items="center">
        <h1 class="max-sm:text-lg text-2xl max-sm:hidden font-extrabold text-yellow-500 text-center ">{{profileName}}</h1>
        <Flex :row="true" gap-x="5" items="center" justify="center" class="font-semibold max-sm:text-sm max-[300px]:text-xs">
          <p class="text-center capitalize">{{profileInfo.posts}}<br> posts</p>
          <p class="text-center capitalize">{{profileInfo.followers}}<br> followers</p>
          <p class="text-center capitalize">{{profileInfo.following}}<br> following</p>
        </Flex>
        <Flex v-if="auth.user.username !== $route.params.name" :row="true" gap-x="3" justify="evenly"  class="items-center">
          <button type="button" class="px-3 py-0.5  bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 duration-300 max-sm:text-sm">Follow</button>
          <button type="button" class="px-3 py-0.5  bg-red-700 text-white rounded-lg font-semibold hover:bg-red-500 duration-300 max-sm:text-sm" >Unfollow</button>
        </Flex>
        <Flex/>
        <UploadPhoto v-if="auth.user.username === $route.params.name" />
        <button v-if="auth.user.username === $route.params.name"
                class="px-2 font-semibold rounded-lg text-red-500 border-2 border-red-500 hover:text-white hover:border-red-500 hover:bg-red-500 duration-500 xl:hidden"
                :class="transition"
                @click="auth.handleLogout()"
                type="button">Sign Out</button>
      </Flex>
    </Flex>

</template>

<style scoped>

</style>