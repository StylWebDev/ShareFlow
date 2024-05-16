<script setup lang="ts">
import {useRoute} from "vue-router";
import Card from "../components/Card.vue";
import {onMounted, ref} from "vue";
import supabase from "../supabase.ts";
const route = useRoute();
const postInfo = ref<any>();
const profileName = ref<any>();
const error = ref<string>();

onMounted(async () => {
  const {data} = await supabase
      .from("posts")
      .select()
      .eq("url", route.params.id.toString)
      .single()
  postInfo.value = data

  if (data) {
    const {data: userName} = await supabase
        .from("users")
        .select(`id, username`)
        .in("id", postInfo.value.id);
    if (userName) profileName.value = userName?.username;
    else error.value = `Post not found.`;
  }else {
    error.value = `Post not found.`;
  }


})

</script>

<template>
<Card profile-icon="https://cdn.hero.page/pfp/03dffda4-6d0d-4f4a-93c7-16e87406605f-shadowy-anime-character-unique-black-pfp-anime-1.png"
      :profile-name="profileName"
      :description="postInfo.caption"
      :image-src="route.params.id.toString"
      :userid="postInfo.userid"
/>
</template>

<style scoped>

</style>