<script setup lang="ts">
import useConfigureStore from "../../pinia/configure.ts";
import {Icon} from "@iconify/vue";
import supabase from "../../supabase.ts";
import {Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild} from "@headlessui/vue";
import {ref} from "vue";
import {useAuthenticationStore} from "../../pinia/authentication.ts";
import {useRouter} from "vue-router";
import {usePostsStore} from "../../pinia/posts.ts";

const {themes,transition} = useConfigureStore();
const posts = usePostsStore()
const router = useRouter()
const store = useConfigureStore();
const auth = useAuthenticationStore();
const isOpen = ref(false);
const caption = ref<string>("");
const file = ref<any>(null);
const loading = ref(false);

const closeModal = () => {
  isOpen.value = false
}
const openModal = () => {
  isOpen.value = true
};

const tryImg = ref();

const handleUpload = async () => {
    loading.value = true;
    if (file.value) {
      const {data} = await supabase.storage.from('images').upload(`public/` + (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(),file.value);
      if (data) {
          await supabase.from('posts').insert({url: data.path, caption: caption.value ,userid: auth.user.id});
          await posts.loadPosts(auth.user.id);
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

</script>

<template>
  <button class=" hover:text-emerald-500 text-blue-500 duration-300 align-middle text-center  max-xl:hidden"
          :class="transition"
          @click="openModal"
          title="Add Post"
          type="button"><Icon class="inline size-8" icon="material-symbols:add-circle"/>
  <span class="block">Add Post</span>
  </button>

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
                Add a post
              </DialogTitle>
              <div class="flex flex-col mt-3 items-center justify-between gap-y-2">
                <input type="file" accept=".png,.jpeg,.jpg" class="block rounded self-start" @change="handleEvent" />
                <img v-if="tryImg" :src="tryImg" alt="idk"  class="rounded-lg w-full"/>
                <input v-model.trim="caption"
                       :class="transition"
                       class="pl-3 block w-full mt-3 bg-neutral-200 text-black text-sm border rounded border-neutral-800/50 h-9  outline-0 duration-300"
                       placeholder="Caption" type="text" maxlength="50"/>
              </div>

              <div class="mt-5">

                <p v-if="loading" class="align-middle text-start text-sm pb-2">
                  <Icon class="inline size-3.5" icon="svg-spinners:90-ring-with-bg"/> Uploading<Icon class="inline size-4 pt-2 pr-2" icon="svg-spinners:3-dots-scale"/>
                </p>

                <div class="flex gap-x-3">
                  <button
                      type="button"
                      :class="transition"
                      class="inline-flex justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-emerald-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 duration-500"
                      @click="handleUpload"
                  >Upload</button>
                  <button
                      type="button"
                      :class="transition"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 duration-500"
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