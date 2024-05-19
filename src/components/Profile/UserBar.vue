<script setup lang="ts">

import Flex from "../Flex.vue";
import UploadPhoto from "./UploadPhoto.vue";
import {useAuthenticationStore} from "../../pinia/authentication.ts";
import useConfigureStore from "../../pinia/configure.ts";
import {useFollowStore} from "../../pinia/follow.ts";
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import UploadPhotoProfile from "./UploadPhotoProfile.vue";
import DeleteUser from "./DeleteUser.vue";
import {Icon} from "@iconify/vue";

const {transition} = useConfigureStore()
const auth = useAuthenticationStore();
const follow = useFollowStore()
const route = useRoute()
const store = useConfigureStore()

defineProps<{
  profileName: string,
  profileInfo: {
    icon: string,
    posts: number,
    followers: number|null,
    following: number|null
  }
}>()

onMounted(()=> {
 if (auth.isAuthenticated && auth.user.username !== route.params.name){
   follow.checkIfFollowing(auth.user.id, auth.externalUser.id)
 }
  (auth.isAuthenticated && auth.user.username === route.params.name)
      ? follow.getNumberFollowers(auth.user.id)
      : follow.getNumberFollowers(auth.externalUser.id)
})

</script>

<template>
    <Flex justify="center" items="center" gap-y="3" gap-x="5" class="max-sm:flex-col sm:flex-row border">
      <Flex :column="true"  class="items-center gap-x-2" >
        <UploadPhotoProfile :photo-profile="profileInfo.icon"/>
        <h1 class="text-2xl max-[340px]:text-lg sm:hidden font-extrabold text-yellow-500">{{profileName}}</h1>
      </Flex>

      <Flex :column="true" gap-y="1" class="sm:pt-3" items="center">
        <h1 class="max-sm:text-lg text-2xl max-sm:hidden font-extrabold text-yellow-500 text-center ">{{profileName}}</h1>
        <Flex :row="true" gap-x="5" items="center" justify="center" class="font-semibold max-sm:text-sm max-[300px]:text-xs">
          <p class="text-center capitalize">{{profileInfo.posts}}<br> posts</p>
          <p class="text-center capitalize">{{profileInfo.followers}}<br> followers</p>
          <p class="text-center capitalize">{{profileInfo.following}}<br> following</p>
        </Flex>

        <Flex v-if="auth.isAuthenticated && auth.user.username !== $route.params.name" :row="true" gap-x="3" justify="evenly"  class="items-center">
          <button type="button" class="px-3 py-0.5  duration-300 max-sm:text-sm capitalize"
                  :class="(!follow.isFollowing) ? `bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 ` : `bg-white text-black rounded-lg font-semibold`"
                  :disabled="follow.isFollowing"
                  @click="follow.handleFollow(auth.user.id, auth.externalUser.id)">{{ (!follow.isFollowing) ? `Follow ${profileName}` : `Following` }}</button>

          <Transition enter-from-class="scale-0" leave-to-class="scale-0" active-enter-class="transition-all duration-500 ease-in" active-leave-class="transition-all duration-500 ease-out">
            <button v-if="follow.isFollowing" type="button"  class="px-3 py-0.5  bg-red-700 text-white rounded-lg font-semibold hover:bg-red-500 duration-300 max-sm:text-sm"
                    @click="follow.handleUnfollow(auth.user.id, auth.externalUser.id)">Unfollow</button>
          </Transition>

        </Flex>
        <Flex/>
        <Flex justify="between" gap-x="4"  v-if="auth.isAuthenticated && auth.user.username === $route.params.name">
          <UploadPhoto />
          <button type="button" title="Delete Account" @click="auth.deleteModal=true"
            class="hover:text-red-600 duration-300 max-xl:w-44"
                  :class="[transition, (store.theme === 1)
                   ? `max-xl:bg-neutral-700 max-xl:text-white max-xl:border-2 max-xl:border-neutral-700 rounded-lg max-xl:px-3`
                   : `max-xl:bg-neutral-100 max-xl:text-neutral-700 max-xl:border-2 max-xl:border-neutral-100 rounded-lg max-xl:px-3`]"
          >
            <Icon icon="streamline:interface-user-delete-actions-close-delete-deny-fail-geometric-human-person-remove-single-up-user"
                  class="inline size-6"/>
            <span class="xl:block ">Delete Account</span>
          </button>
        </Flex>

        <button v-if="auth.isAuthenticated && auth.user.username === $route.params.name"
                class="w-44 mt-1 font-semibold rounded-lg text-red-500 border-2 border-red-500 hover:text-white hover:border-red-500 hover:bg-red-500 duration-500 xl:hidden"
                :class="transition"
                @click="auth.handleLogout()"
                type="button">Sign Out</button>
      </Flex>
      <DeleteUser/>
    </Flex>
</template>

<style scoped>

</style>