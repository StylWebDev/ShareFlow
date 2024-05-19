<script setup lang="ts">
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from "@headlessui/vue";
import {useAuthenticationStore} from "../../pinia/authentication.ts";
import {storeToRefs} from "pinia";
import useConfigureStore from "../../pinia/configure.ts";

const {deleteUser} = useAuthenticationStore()
const {deleteModal} = storeToRefs(useAuthenticationStore())
const {themes,transition} = useConfigureStore()
const store = useConfigureStore()

const closeModal = () => {
  deleteModal.value = false
}
</script>

<template>
  <TransitionRoot appear :show="deleteModal" as="template">
    <Dialog as="div" @close="closeModal()" class="relative z-10">
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
                :class="themes[store.theme].contentBgColor, themes[store.theme].textColor"
                class="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                  as="h3"
                  class="text-center text-xl font-semibold text-red-600 leading-6 border-b border-white/30 "
              >
                Delete Account
              </DialogTitle>
              <div class="flex flex-col mt-3 justify-between gap-y-2 text-center">
               <h2>Are Your Sure, you wanna delete your account?</h2>
                <p class="text-sm opacity-70">This action will be permanent</p>
              </div>

              <div class="mt-5">
                <div class="flex gap-x-3 justify-evenly">
                  <button
                      type="button"
                      :class="transition"
                      class="inline-flex justify-center rounded-md border bg-red-300/30 border-transparent border-red-600 text-red-600 px-4 py-2 text-sm font-medium  hover:bg-red-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 duration-500"
                      @click="deleteUser()"
                  >Delete Account</button>
                  <button
                      type="button"
                      :class="transition"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 duration-500"
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