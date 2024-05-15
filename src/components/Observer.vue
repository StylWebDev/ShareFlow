<script setup lang="ts">

import {onMounted, ref} from "vue";
import {Icon} from "@iconify/vue";

const observer = ref<any>(null)
const target = ref<any>(null)
const emit = defineEmits(["intersect"])

onMounted(() => {
  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      emit("intersect", 2)
    }

  })

  observer.value.observe(target.value);
})
</script>

<template>
  <div class="h-[30px] w-full text-center" ref="target">
    <Icon icon="svg-spinners:90-ring-with-bg" class="inline size-12"/>
  </div>
</template>

<style scoped>

</style>