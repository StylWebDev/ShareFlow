<script setup lang="ts">

    import Flex from "../components/Flex.vue";
    import Title from "../components/Header/Title.vue";
    import {onMounted, reactive, ref} from "vue";
    import useConfigureStore from "../pinia/configure.ts";
    import {Icon} from "@iconify/vue";
    import {useAuthenticationStore} from "../pinia/authentication.ts";

    const {transition,themes} = useConfigureStore()
    const store = useConfigureStore()
    const auth = useAuthenticationStore()

    const credentials = reactive({
      fullName: "",
      email: "",
      username: "",
      password: ""
    })
    const show = ref<boolean>(false);

    const handleOk = () => {
      auth.handleSignUp(credentials);
    }

    onMounted(() => {
      auth.err = "";
    })
</script>

<template>
  <Transition enter-from-class="scale-0 opacity-0 " enter-active-class="transition-all duration-500 ease-in"
              leave-to-class="scale-0 opacity-0 absolute w-full" leave-active-class="transition-all duration-500 ease-in "
              appear appear-active-class="transition-all opacity-0 duration-500 ease-in">
    <Flex v-if="!auth.confirmEmail" :column="true" items="center" class="mt-6 sm:gap-y-6">

      <Flex :column="true" justify="center" items="center" gap-y="5"
            :class="themes[store.theme].signBgColor"
            class="py-8  max-sm:w-[90%] sm:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] min-[2800px]:w-[20%] max-sm:rounded-t-md sm:rounded-md">
        <h1 class="align-middle text-2xl"><Title class="cursor-default pointer-events-none"/></h1>
        <p :class="themes[store.theme].textShadow" class="font-semibold text-center px-6">Sign up to see photos and videos from your friends.</p>

        <input v-model.trim="credentials.fullName"
               :class="transition"
               class="pl-3 max-[340px]:w-52 bg-neutral-200 text-black text-sm border rounded-md border-neutral-800/50 h-9 w-72 outline-0 hover:scale-105 duration-300"
               placeholder="Full Name" type="text"/>

        <input v-model.trim="credentials.email"
               :class="transition"
               class="pl-3 max-[340px]:w-52 bg-neutral-200 text-black text-sm border rounded-md border-neutral-800/50 h-9 w-72 outline-0 hover:scale-105 duration-300"
               placeholder="Email" type="email"/>

        <input v-model.trim="credentials.username"
               :class="transition"
               class="pl-3  max-[340px]:w-52 bg-neutral-200 text-black text-sm border rounded-md border-neutral-800/50 h-9 w-72 outline-0 hover:scale-105 duration-300"
               placeholder="Username" type="text"/>

        <div
            :class="transition"
            class="bg-neutral-200 border border-neutral-800/50 rounded-md  max-[300px]:col-span-1 text-black hover:scale-105 duration-300">
          <input
              v-model="credentials.password"
              :class="(credentials.password === ``) ? `w-72` : `w-60`"
              class="pl-3 text-sm max-[340px]:w-52 bg-neutral-200 h-9 outline-0 rounded-md"
              placeholder="Password" :type="(show) ?  `text` : `password`"/>

          <button class="px-3 " type="submit" @click="show = !show" :class="(credentials.password === ``) ? `hidden` : `inline`" >
            <Icon :icon="(show) ? `mdi:eye-off` : `mdi:eye`" class="size-6  inline"/>
          </button>
        </div>


        <p v-if="auth.loading" class="align-middle text-center px-3">
          <Icon class="inline size-7" icon="svg-spinners:90-ring-with-bg"/> Loading...
        </p>
        <p v-else class="text-sm text-red-600 text-center px-3" v-if="auth.err">{{auth.err}}</p>

        <button type="button" :class="transition"
                :disabled="auth.loading"
                @click="handleOk()"
                class="px-3 py-0.5 block  bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 hover:scale-105 duration-300 disabled:bg-neutral-600"
        >
          Sign Up
        </button>


        <p class="text-sm text-center px-3">You can also report content you believe is unlawful in your country without logging in.</p>
      </Flex>

      <Flex :column="true" justify="center" items="center" gap-y="5"
            :class="themes[store.theme].signBgColor"
            class="py-8  max-sm:w-[90%] sm:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] min-[2800px]:w-[20%] bg-neutral-900/30 max-sm:rounded-b-md sm:rounded-md" >

        <h2 class="text-center"><u>Have an acount?</u>
          <RouterLink to="/login" class="max-sm:block px-2 font-semibold text-blue-500 hover:text-black duration-500"
                      :class="transition">Sign in</RouterLink>
        </h2>
      </Flex>
    </Flex>

    <Flex v-else :column="true" items="center" class="mt-6 sm:gap-y-6">
      <Flex :column="true" justify="center" items="center" gap-y="2"
            :class="themes[store.theme].signBgColor"
            class="py-8  max-sm:w-[90%] sm:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] min-[2800px]:w-[20%] max-sm:rounded-t-md sm:rounded-md">
        <div class="border-2 border-blue-500 rounded-full text-blue-500 ">
          <Icon icon="ic:round-mark-email-unread" class="size-12 m-2"/>
        </div>
        <p :class="themes[store.theme].textShadow" class="font-semibold text-xl text-center px-6 capitalize">Verify your email address</p>
        <hr width="70%">
        <p class="text-center px-5 lg:px-14">Check Your e-mails in order to verify your account, then
          <RouterLink to="/login" class="font-semibold text-blue-500 hover:brightness-200 duration-500" :class="transition">Sign in</RouterLink>
          to your account</p>
        <hr width="20%" class="mt-10">
        <p class="italic text-xs text-center px-6 opacity-60">If you did not sign up for this account, you can ignore this email and the account will be deleted</p>
      </Flex>

    </Flex>
  </Transition>

</template>


<style scoped>

</style>