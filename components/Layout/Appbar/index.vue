<script setup lang="ts">
  import LayoutSidebar from '~/components/Layout/Sidebar/index.vue'

  const { open: openSidebar, close: closeSidebar } = useSlideover()
  const { isMobile } = useDisplay()

  const handleToggleSidebar = () => {
    openSidebar(LayoutSidebar, {
      onClose: closeSidebar,
    })
  }
</script>

<template>
  <header class="border-gray-200 dark:border-gray-800 border-b">
    <div class="flex items-center px-4 h-16">
      <UButton
        v-if="isMobile"
        color="gray"
        variant="ghost"
        icon="i-heroicons-bars-3"
        class="mr-4"
        @click="handleToggleSidebar"
      />
    </div>
  </header>
</template>
