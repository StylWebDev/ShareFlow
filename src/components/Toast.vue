<script setup lang="ts">

import useConfigureStore from "../pinia/configure.ts";
import {storeToRefs} from "pinia";
import {ref, watch} from "vue";
import {Icon} from "@iconify/vue";

const {transition} = useConfigureStore();
const {showToast, toastMsg} = storeToRefs( useConfigureStore())
let i = ref(0)
const showToastTime = ref(
      setInterval(() => {
        i.value++
      }, 100)
  )

watch(i, (newVal) => {
  if (newVal === 50) {
    clearInterval(showToastTime.value)
    showToast.value = false;
  }
})



</script>

<template>
  <Flex :column="true" class="sticky rounded-lg ">
    <div :class="[transition , (!toastMsg.includes(`error`)) ? `bg-emerald-500` : `bg-red-600`]"
         class="h-1 rounded-t-lg rounded-r-lg duration-500"
         :style="{width: `${i*2.8}%`}"/>
    <div id="toast-simple"
         class="text-center flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse divide-x rtl:divide-x-reverse divide-gray-200 shadow" role="alert"
    >
      <Icon class="size-4" :icon="(toastMsg.includes(`error`)) ? `bi:send-check-fill` : `bi:send-x-fill`" :class="(!toastMsg.includes(`error`)) ? `text-emerald-500` : `text-red-600`"/>
      <div class="ps-4 text-sm font-normal">{{toastMsg}}</div>
    </div>
  </Flex>
</template>

<style scoped>

</style>