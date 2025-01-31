<script setup lang="ts">
  import { getNavigationItems } from '~/lib/layout/navigation'

  const props = defineProps<{
    onClose?: () => void
  }>()

  const { t } = useI18n()
  const { isMobile } = useDisplay()

  const handleClose = () => {
    if (props.onClose && isMobile) {
      props.onClose()
    }
  }

  const { isSignedIn } = useAuth()
</script>

<template>
  <!-- Logo Section -->
  <div class="flex justify-end items-center p-4 h-16">
    <h1 class="flex-1 font-semibold text-gray-900 text-xl dark:text-white">
      Title
    </h1>
    <UButton
      v-if="isMobile && onClose"
      color="gray"
      variant="ghost"
      @click="handleClose"
    />
  </div>

  <!-- Navigation Section -->
  <nav class="flex-1 space-y-3 p-4">
    <UVerticalNavigation :links="getNavigationItems(t)" />
  </nav>

  <!-- Bottom Section -->
  <UDivider />
  <div v-if="isSignedIn">
    <LayoutSidebarUserMenu />
  </div>
</template>
