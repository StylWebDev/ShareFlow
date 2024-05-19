<script setup lang="ts">
import {useRoute} from "vue-router";
import UserBar from "../components/Profile/UserBar.vue";
import Flex from "../components/Flex.vue";
const route = useRoute();
import useConfigureStore from "../pinia/configure.ts";
import ImageGallery from "../components/Profile/ImageGallery.vue";
import {useAuthenticationStore} from "../pinia/authentication.ts";
import {usePostsStore} from "../pinia/posts.ts";
import {onMounted, onUpdated} from "vue";
import {Icon} from "@iconify/vue";
import {useFollowStore} from "../pinia/follow.ts";

const auth = useAuthenticationStore()
const {themes,transition} = useConfigureStore()
const store = useConfigureStore()
const posts = usePostsStore()
const follow = useFollowStore()

onMounted(()=> {
  auth.getExternalUser(route.params.name.toString());
})
onUpdated(()=> {
  auth.getExternalUser(route.params.name.toString());
})

</script>

<template>
  <Flex :column="true" items="center" class="mt-6 sm:gap-y-6 items-start">
    <Transition enter-from-class="scale-0 opacity-0 " enter-active-class="transition-all duration-500 ease-in"
                leave-to-class="scale-0 opacity-0 absolute w-full" leave-active-class="transition-all duration-500 ease-in"
                appear appear-active-class="transition-all opacity-0 duration-500 ease-in"
    >
      <Flex v-if="auth.isAuthenticated && auth.user.username === route.params.name" :column="true"
            class="gap-y-5   max-sm:w-[90%] sm:w-[80%] lg:w-[80%] xl:w-[80%] 2xl:w-[70%] ">
        <UserBar class="px-16 py-3 rounded-md capitalize" :class="[themes[store.theme].signBgColor ,themes[store.theme].textColor]"
                 :profileName="auth.user.username"
                 :posts="posts"
                 :profileInfo="{icon: auth.user.photoProfile ,posts: posts.posts.length, followers: follow.followers, following: follow.following}"/>
        <ImageGallery class="px-16 py-3 rounded-md border" :class="themes[store.theme].signBgColor" :photoProfile="auth.user.photoProfile"  :profileName="route.params.name.toString()" :posts="posts.posts"/>
      </Flex>

      <Flex v-else-if="auth.externalUser" :column="true"
            class="gap-y-5   max-sm:w-[90%] sm:w-[80%] lg:w-[80%] xl:w-[80%] 2xl:w-[70%] ">
        <UserBar class="px-16 py-3 rounded-md capitalize" :class="[themes[store.theme].signBgColor ,themes[store.theme].textColor]"
                 :profileName="auth.externalUser.username"
                 :profileInfo="{icon: auth.externalUser.photoProfile ,posts: posts.posts.length, followers: follow.followers, following: follow.following}"/>
        <ImageGallery v-if="posts.posts.length > 0" class="px-16 py-3 rounded-md border" :class="[themes[store.theme].signBgColor ,themes[store.theme].textColor]" :profileName="route.params.name.toString()" :photoProfile="auth.externalUser.photoProfile"  :posts="posts.posts"/>


        <Flex :column="true" justify="center" items="center" v-else class="text-center text-lg font-semibold py-6 rounded-md" :class="[themes[store.theme].signBgColor,themes[store.theme].textColor]">
          <Icon icon="material-symbols:no-photography" class=" size-16"/>
          <p class="capitalize">This user doesn't have any posts</p>
        </Flex>
      </Flex>


      <Flex v-else :column="true" justify="center" items="center" gap-y="5" :class="[themes[store.theme].textColor, (!auth.err.length) ? `invisible` : `visible`]">
        <Icon icon="material-symbols:account-circle-off" class=" size-28"/>
        <p class="text-2xl font-bold">Sorry But This User Does Not Exists!</p>
        <RouterLink :to="`/`" class="px-3 py-0.5  bg-blue-500 text-white rounded-lg text-xl font-semibold hover:bg-blue-600 duration-300"
                    :class="transition"
                    type="button">Back to Home</RouterLink>
      </Flex>
    </Transition>
  </Flex>
</template>

<style scoped>

</style>