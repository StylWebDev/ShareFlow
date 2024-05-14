<script setup lang="ts">

import Flex from "../Flex.vue";
import useConfigureStore from "../../pinia/configure.ts";
import {useAuthenticationStore} from "../../pinia/authentication.ts";

const {transition} = useConfigureStore();
const auth = useAuthenticationStore();

const goToProfile = () => {
  location.assign(`/profile/${auth.user.username}`)
}
</script>

<template>
  <Flex :row="true" justify="center" gap-x="2">
    <button @click="goToProfile()" class="px-3 py-0.5  bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 duration-300"
            :class="transition"
            type="button">Profile</button>
    <button class="px-2 font-semibold rounded-lg text-red-500 border-2 border-red-500 hover:text-white hover:border-red-500 hover:bg-red-500 duration-500"
            :class="transition"
            @click="auth.handleLogout()"
            type="button">Sign Out</button>
  </Flex>
</template>
