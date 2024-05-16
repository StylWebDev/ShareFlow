<script setup lang="ts">
import Grid from "../Grid.vue";
import {Posts} from "../../types.ts";
import {useAuthenticationStore} from "../../pinia/authentication.ts";
import Flex from "../Flex.vue";
import {Dialog, DialogPanel, TransitionChild, TransitionRoot} from "@headlessui/vue";
import useConfigureStore from "../../pinia/configure.ts";
import {ref} from "vue";
import Card from "../Card.vue";

const {themes} = useConfigureStore();
const store = useConfigureStore();
const isOpen = ref(false);
const image = ref<string>("");
const caption = ref<string>("")
const url = ref(import.meta.env.VITE_POST_URL)

defineProps<{
  profileName: string
  posts: Posts[];
}>()

const auth = useAuthenticationStore()

const closeModal = () => {
  isOpen.value = false
}

</script>

<template>
  <div>
    <h2 class="text-center max-sm:text-lg text-sm max-sm:hidden font-semibold text-yellow-500 capitalize" v-if="!auth.isAuthenticated">
      Log in to view {{profileName}}'s posts
    </h2>
    <Flex :column="true" justify="center" items="center" gap-y="3" class="py-3">
      <Grid columns="1" md-columns="2" sm-columns="2" lg-columns="3" txl-columns="5" class="grid-flow-row gap-y-4 gap-x-16 justify-items-center" :class="(!auth.isAuthenticated) ? `blur pointer-events-none`: null">
        <div v-for="(post,index) in posts" :key="index+1" class="max-[400px]:w-[200px] max-[640px]:w-[320px] w-[200px] xl:w-[180px] min-[2000px]:w-[240px] min-[2200px]:w-[260px] min-[2600px]:w-[320px] min-[3000px]:w-[370px] min-[3500px]:w-[415px] min-[4000px]:w-[450px]">
          <img @click="[isOpen=true,caption=post.caption,image=post.url]" class="rounded-md cursor-pointer" :src="url + post.url" :alt="`img_${index+1}_of_${profileName}`">
        </div>
      </Grid>
    </Flex>

    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
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
                  class="w-full max-w-md transform overflow-hidden rounded-2xl  text-left align-middle shadow-xl transition-all"
              >
                <Card
                    class="capitalize"
                    :profileName="profileName"
                    :userid="auth.user.id"
                    profileIcon="https://cdn.hero.page/pfp/03dffda4-6d0d-4f4a-93c7-16e87406605f-shadowy-anime-character-unique-black-pfp-anime-1.png"
                    :description="caption"
                    :imageSrc="image"   />

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<style scoped>

</style>