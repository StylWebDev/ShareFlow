<script setup lang="ts">
import {useRoute} from "vue-router";
import Card from "../components/Card.vue";
import {onBeforeMount, ref} from "vue";
import supabase from "../supabase.ts";
import Flex from "../components/Flex.vue";
import {Icon} from "@iconify/vue";
import useConfigureStore from "../pinia/configure.ts";
const route = useRoute();
const postInfo = ref<any>();
const profileName = ref<any>();
const profileIcon = ref<any>();
const error = ref<string>("");
const store = useConfigureStore()

onBeforeMount(async () => {
  const {data} = await supabase
      .from("posts")
      .select()
      .eq("url", `public/`+route.params.id.toString())
      .single()
  postInfo.value = data;

  if (data) {
    const {data: userName} = await supabase
        .from("users")
        .select(`id, username, photoProfile`)
        .eq("id", postInfo.value.userid)
        .single();
    if (userName) {
      profileName.value = userName?.username;
      profileIcon.value = userName?.photoProfile;
    }
    else error.value = `Post not found.`;
  }else {
    error.value = `Post not found.`;
  }
})
</script>

<template>
    <Flex :row="true" justify="center" items="center">
      <Card  v-if="postInfo!=null && !error.length" profile-icon="https://cdn.hero.page/pfp/03dffda4-6d0d-4f4a-93c7-16e87406605f-shadowy-anime-character-unique-black-pfp-anime-1.png"
            :profile-name="profileName"
             :photo-profile="profileIcon"
            :description="postInfo.caption"
            :image-src="postInfo.url"
            :userid="postInfo.userid"
      />
      <div v-else class="px-5">
        <h2 class="text-center">
          <Icon icon="material-symbols-light:image-not-supported" class="inline size-16"/>
        </h2>
        <p class="capitalize text-center font-semibold">Sorry But We couldn't Find The Post You Were Looking For!</p>
      </div>
    </Flex>

</template>

<style scoped>

</style>