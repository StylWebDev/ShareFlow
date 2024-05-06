<script setup lang="ts">

import Flex from "../Flex.vue";

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
    <Flex :row="true" gap-x="5">
      <div><img :src="profileInfo.icon" alt="pfp" class="size-24 rounded-full"></div>
      <Flex :column="true" gap-y="2" class="pt-3">
        <h1 class="text-2xl font-extrabold">{{profileName}}</h1>
        <Flex :row="true" gap-x="5" class="font-semibold">
          <p>{{profileInfo.posts}} posts</p>
          <p>{{profileInfo.followers}} followers</p>
          <p>{{profileInfo.following}} following</p>
        </Flex>
      </Flex>
    </Flex>
</template>

<style scoped>

</style>