<script setup lang="ts">
import Flex from "./Flex.vue";
import {Icon} from "@iconify/vue";
import {onMounted, onUnmounted, ref} from "vue";
import useConfigureStore from "../pinia/configure.ts";
import {usePostsStore} from "../pinia/posts.ts";
import supabase from "../supabase.ts";
import {useAuthenticationStore} from "../pinia/authentication.ts";
import emailjs from '@emailjs/browser';

const auth = useAuthenticationStore()
const {transition,themes} = useConfigureStore()
const liked = ref<boolean>(false);
const wasLiked = ref<boolean>(false);

const store = useConfigureStore();
const post =usePostsStore()
const url = ref(import.meta.env.VITE_POST_URL)
const likes = ref<any>()

const props = defineProps<{
  photoProfile: string;
  profileName: string,
  description: string,
  userid: number,
  imageSrc: string,
}>()

onMounted(async ()=> {
  const {count: totalLikes} = await supabase
      .from("likes")
      .select(`liked, *`, {count: `exact`})
      .eq("liked", props.imageSrc)
  likes.value = totalLikes
  const {data: userLiked} = await supabase
      .from("likes")
      .select()
      .eq("userid", props.userid)
      .eq("liked", props.imageSrc)
      .single();
  if (userLiked) {
    liked.value = true;
    wasLiked.value = true;
  }else wasLiked.value = false;

})

const goToProfile = () => {
  location.assign(`/profile/${props.profileName}`);
}

const copyOnClipboard = () => {
  navigator.clipboard.writeText( location.hostname.toString() + `/post/${props.imageSrc}`);
  alert("Copied to clipboard");
}

const reportContent = (imgReported) => {
  alert("Thank You For Reporting, We Will Take A Look At This Post!");
}

onUnmounted( () => {
  if (liked.value && !wasLiked.value) post.likePost(props.userid,props.imageSrc);
  else if (!liked.value && wasLiked.value) post.removeLike(props.userid,props.imageSrc);
})

window.addEventListener('beforeunload', () => {
  if (liked.value && !wasLiked.value) post.likePost(props.userid,props.imageSrc);
  else if (!liked.value && wasLiked.value) post.removeLike(props.userid,props.imageSrc);
})


</script>

<template>
<Flex :column="true" justify="center" items="center"
      class="max-[250px]:w-[200px] max-[300px]:w-[250px] max-sm:w-[300px] sm:w-[350px] md:w-[450px] rounded-md"
      :class="themes[store.theme].contentBgColor">

  <div :class="themes[store.theme].profileBgColor" class=" w-full py-2 px-3 rounded-t-md ">
    <button type="button" @click="goToProfile()" class="font-semibold text-lg capitalize outline-0">
      <img :src="(photoProfile!==``) ? photoProfile : `https://api.iconify.design/ic:baseline-account-circle.svg?color=%${(store.theme===0) ? `23FFFFFF` : `23000000`}`" alt="pfp" class="inline size-10 rounded-full" />
      {{ profileName }}
    </button>
  </div>
  <div class="text-center relative w-[100%] rounded-md">
    <img @dblclick="[(!liked && auth.isAuthenticated)  ? liked=true : liked=false, (liked && auth.isAuthenticated) ? likes++ : likes--]" :src="url + imageSrc" alt="img" class="inline cursor-pointer">
  </div>

  <div :class="themes[store.theme].descriptionBgColor" class=" py-2 px-3 w-full rounded-b-md">
    <div class=" rounded-t-md">
      <p class="font-semibold text-lg">
        <img :src="(photoProfile!==``) ? photoProfile : `https://api.iconify.design/ic:baseline-account-circle.svg?color=%${(store.theme===0) ? `23FFFFFF` : `23000000`}`" alt="pfp" class="inline size-6 rounded-full" />
         {{likes}} Likes
      </p>
    </div>
    <Flex :row="true" gap-x="2" class="pt-1.5">
      <Icon class="size-8 " :class="[(liked && auth.isAuthenticated) ? `text-red-500 scale-125 duration-300` : `duration-300 hover:scale-110 scale-100`, transition]" icon="material-symbols-light:favorite-rounded" @click="[(!liked && auth.isAuthenticated)  ? liked=true : liked=false, (liked && auth.isAuthenticated) ? likes++ : likes--]"/>
      <button type="button" @click="copyOnClipboard" title="Share">
        <Icon class="size-8 hover:scale-110 duration-500" :class="transition" icon="carbon:send-alt-filled"/>
      </button>
      <button type="button" @click="reportContent(imageSrc)" title="Report">
        <Icon class="size-8 hover:scale-110 hover:text-red-300 duration-500" :class="transition" icon="material-symbols:report"/>
      </button>
    </Flex>
     <h1 class="text-base font-semibold text-yellow-400">{{ profileName }} </h1>
     <p class="break-all text-sm font-normal"> {{description}}</p>
  </div>
</Flex>
</template>

<style scoped>

</style>