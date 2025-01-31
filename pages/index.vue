<script setup lang="ts">
  definePageMeta({
    name: PAGE_NAME.HOME,
  })
</script>

<template>
  <div class="mx-auto mt-8 max-w-md">
    <h1 class="mb-4 font-bold text-2xl">Index</h1>
    <NuxtLink
      :to="{
        name: PAGE_NAME.AUTH_LOGIN,
      }"
      class="text-blue-500 hover:underline"
    >
      Go to Login
    </NuxtLink>
  </div>
</template>

<style scoped>
  /* Add any additional styles if needed */
</style>
