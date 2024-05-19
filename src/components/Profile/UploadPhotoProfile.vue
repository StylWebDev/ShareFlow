<script setup lang="ts">
import useConfigureStore from "../../pinia/configure.ts";
import {Icon} from "@iconify/vue";
import supabase from "../../supabase.ts";
import {Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild} from "@headlessui/vue";
import {computed, ref} from "vue";
import {useAuthenticationStore} from "../../pinia/authentication.ts";
import {useRoute, useRouter} from "vue-router";

defineProps<{
  photoProfile: string
}>()

const {themes,transition} = useConfigureStore();
const route = useRoute()
const router = useRouter()
const store = useConfigureStore();
const auth = useAuthenticationStore();
const isOpen = ref(false);
const file = ref<any>(null);
const loading = ref(false);

const closeModal = () => {
  isOpen.value = false
}
const openModal = () => {
  isOpen.value = true
};

const tryImg = ref();
const url = ref(import.meta.env.VITE_POST_URL)

const handleUpload = async () => {
    loading.value = true;
    if (file.value) {
      await supabase.storage.from('images').remove([`userphoto/` + auth.user.id.toString()])
      const {data} = await supabase.storage.from('images').upload(`userphoto/` + auth.user.id.toString(), file.value);
      if (data) {
          await supabase.from('users').update({photoProfile: url.value + `userphoto/${auth.user.id.toString()}`}).eq("id", auth.user.id);
          location.reload();
      }else{
        router.push(`/404`)
      }

      isOpen.value = false
      loading.value = false;
    }else loading.value = false;
}

const handleEvent = (e:any):void => {
  if (e.target.files[0]) {
    file.value = e.target.files[0];
    tryImg.value = URL.createObjectURL(e.target.files[0]);
  }
}

const isUserProfile = computed(() => {
  return auth.isAuthenticated && auth.user.username===route.params.name.toString()
})

const isNotUserProfile = computed(() => {
  return auth.isAuthenticated && auth.user.username!==route.params.name.toString()
})

</script>

<template>
  <button @click="openModal"
          :disabled="isNotUserProfile || !auth.isAuthenticated"
          type="button"> <img :src="(photoProfile.length) ? photoProfile : `https://api.iconify.design/ic:baseline-account-circle.svg?color=%${(store.theme===0) ? `23FFFFFF` : `23000000`}`"
                              alt="Photo Profile"
                              :class="[transition, (isUserProfile) ? `hover:shadow-full hover:brightness-150` : null]" class="max-sm:size-24 size-28 rounded-full duration-1000"></button>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="[closeModal(), tryImg=null]" class="relative z-10">
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel
                :class="[themes[store.theme].contentBgColor, themes[store.theme].textColor]"
                class="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                  as="h3"
                  class="text-center text-lg font-medium leading-6 border-b border-white/30 "
              >
                Upload Photo
              </DialogTitle>
              <div class="flex flex-col mt-3 items-center justify-between gap-y-2">
                <input type="file" accept=".png,.jpeg,.jpg" class="block rounded self-start" @change="handleEvent" />
                <img v-if="tryImg" :src="tryImg" alt="idk"  class="rounded-lg w-full"/>
              </div>

              <div class="mt-5">

                <p v-if="loading" class="align-middle text-start text-sm pb-2">
                  <Icon class="inline size-3.5" icon="svg-spinners:90-ring-with-bg"/> Uploading<Icon class="inline size-4 pt-2 pr-2" icon="svg-spinners:3-dots-scale"/>
                </p>

                <div class="flex gap-x-3">
                  <button
                      type="button"
                      :class="transition"
                      class="inline-flex justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-emerald-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="handleUpload"
                  >Upload</button>
                  <button
                      type="button"
                      :class="transition"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="closeModal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>

</style>