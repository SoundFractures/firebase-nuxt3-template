<script setup lang="ts">
  const props = defineProps<{
    variant?: 'default' | 'login'
  }>()

  const isLoginVariant = computed(() => props.variant === 'login')
</script>

<template>
  <template v-if="isLoginVariant">
    <main class="bg-gray-50 dark:bg-gray-900 h-screen min-h-screen">
      <slot />
    </main>
  </template>
  <template v-else>
    <div class="flex w-screen min-h-screen">
      <LayoutSidebar class="top-0 sticky" />

      <div class="flex flex-col flex-grow h-screen overflow-y-auto">
        <LayoutAppbar />
        <main class="flex-grow p-0">
          <slot />
        </main>
      </div>
      <slot name="other" />
    </div>
  </template>
</template>
