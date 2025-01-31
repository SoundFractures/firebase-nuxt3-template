<script setup lang="ts">
  const props = defineProps<{
    onClose?: () => void
  }>()

  const { isMobile } = useDisplay()

  // Common styles for both mobile and desktop
  const sidebarStyles = {
    width: 'w-64 min-w-64 max-w-64',
    background: 'bg-white dark:bg-gray-900',
    border: 'border-r border-gray-200 dark:border-gray-800',
  }
</script>

<template>
  <!-- Mobile Slideover -->
  <USlideover
    v-if="isMobile"
    ref="slideoverRef"
    side="left"
    :overlay="true"
    :backdrop="false"
    :ui="{
      width: sidebarStyles.width,
      background: sidebarStyles.background,
      overlay: { background: 'bg-gray-900/50' },
      base: sidebarStyles.border,
      inner: 'flex flex-col h-screen',
      padding: 'p-0',
    }"
  >
    <LayoutSidebarContent :on-close="props.onClose" />
  </USlideover>

  <!-- Desktop Fixed Sidebar -->
  <aside
    v-else
    :class="[
      sidebarStyles.width,
      sidebarStyles.background,
      sidebarStyles.border,
      'fixed left-0 top-0 h-screen flex flex-col',
    ]"
  >
    <LayoutSidebarContent />
  </aside>
</template>
