<script setup lang="ts">
import Grid from "../Grid.vue";
import Flex from "../Flex.vue";
import Links from "./Links.vue";

</script>

<template>
<div>
  <Grid columns="2" class="w-[100%] py-2">
    <Flex :row="true" items="center" justify="center" class="text-lg max-sm:text-sm" >
      <img src="../../assets/mainLogo.svg" alt="Logo" width="50" class="inline brightness-150">
      <Flex :column="true" justify="center"  class="align-middle text-sm text-center brightness-150"><div>© 2024</div><div>All Rights Reserved</div></Flex>
    </Flex>
    <Flex  class=" max-sm:text-sm  rainbow" :column="true" justify="center" items="center">
      <p class=" inline align-center font-bold ">Find Me on</p>
      <Links />
    </Flex>
  </Grid>
</div>
</template>
