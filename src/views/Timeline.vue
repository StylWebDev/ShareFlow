<script setup lang="ts">
import Flex from "../components/Flex.vue";
import Card from "../components/Card.vue";
import supabase from "../supabase.ts";
import {useAuthenticationStore} from "../pinia/authentication.ts";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import useConfigureStore from "../pinia/configure.ts";
import Observer from "../components/Observer.vue";
import {Icon} from "@iconify/vue";
import {useRouter} from "vue-router";

const router = useRouter();
const auth = storeToRefs(useAuthenticationStore());
const posts = ref<any>([])
const followers = ref();
const store = useConfigureStore();
const count = ref(2)
const followingId = ref<any>(null)
const continueFetching = ref(true)

const getFollowers = async ():Promise<void> => {
  if (auth.isAuthenticated) {
    const {data: followingArray, error} = await supabase
        .from("followTable")
        .select("followingId")
        .eq(`followerId`, auth.user.value.id);

    if (!error) {
      followingId.value = followingArray?.map(following => following.followingId);

      const {data} = await supabase
          .from("posts")
          .select()
          .in("userid", followingId.value)
          .order('created_at', {ascending: false})
          .limit(count.value);

      const {data: userNames} = await supabase
          .from("users")
          .select(`id, username, photoProfile`)
          .in("id", followingId.value);

      posts.value = data;
      followers.value = userNames;
    }
  }
}

const getNextPosts = async (nextPostsNumber:number):Promise<void> => {
  if (continueFetching) {
    count.value += nextPostsNumber;
    const {data} = await supabase
        .from("posts")
        .select()
        .in("userid", followingId.value)
        .range(posts.value.length, posts.value.length + count.value)
        .order('created_at', {ascending: false});
    if (data.length > 0) {
      posts.value = [...posts.value, ...data];
    }else {
      continueFetching.value = false
    }
  }
}

onMounted(() => {
  getFollowers();
})
</script>

<template>
      <Flex :column="true" items="center" class="mt-6 gap-y-6"  :class="store.themes[store.theme].textColor">
          <Card
              v-for="(post,index) in posts" :key="index+1"
            class="capitalize"
            :profileName="followers.find(follower => follower.id === post.userid).username"
            :profileIcon="followers.find(follower => follower.id === post.userid).photoProfile"
            :userid="auth.user.value.id"
            :description="post.caption"
            :imageSrc="post.url"   />
        <Transition
            enter-from-class="scale-0"
            enter-active-class="transition-all duration-500 ease-in"
            leave-leave-class="scale-0"
            leave-active-class="transition-all duration-500 ease-out"
        >
          <Observer v-if="posts.length && continueFetching" @intersect="getNextPosts"/>
          <div v-else class="font-semibold">
            <Icon icon="mdi:calendar-check" class="inline size-10"/> You Have Reached The End!
          </div>
        </Transition>
      </Flex>

</template>

<style scoped>

</style>