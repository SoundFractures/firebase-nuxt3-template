<script setup lang="ts">
  import type { VerticalNavigationLink } from '#ui/types'

  const { user, logout } = useAuth()

  const items: VerticalNavigationLink[] = [
    {
      label: 'Settings',
      icon: 'i-heroicons-cog-6-tooth',
      to: PAGE_URL.USER_SETTINGS,
    },
  ]

  const colorMode = useColorMode()
  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    },
  })

  const handleLogout = async () => {
    await logout()
    navigateTo({
      name: PAGE_NAME.AUTH_LOGIN,
    })
  }
</script>

<template>
  <UPopover
    mode="click"
    :popper="{
      offsetDistance: 15,
      placement: 'top',
    }"
  >
    <div class="flex flex-row items-center gap-x-1.5 px-4 py-2 w-full">
      <UAvatar
        :text="returnInitials(user?.email || '')"
        color="gray"
        :display-text="false"
      />
      <span
        class="font-normal text-gray-500 text-sm dark:text-gray-300 truncate"
      >
        {{ user?.email }}
      </span>

      <UIcon name="i-heroicons-ellipsis-vertical" class="ml-auto" />
    </div>

    <template #panel>
      <div class="justify-center min-w-[200px]">
        <div class="flex flex-col px-4 py-2">
          <span class="mb-1 font-normal text-gray-400 text-sm">
            {{ $t('auth.loggedInAs') }}
          </span>
          <span class="font-medium text-gray-500 text-sm">
            {{ user?.email }}
          </span>
        </div>
        <UDivider />

        <div id="user-menu-items" class="px-3 py-1">
          <UVerticalNavigation :links="items" />
        </div>
        <UDivider />
        <div class="flex flex-col px-3 py-1">
          <ClientOnly>
            <UButton
              :icon="
                isDark
                  ? 'i-heroicons-moon-20-solid'
                  : 'i-heroicons-sun-20-solid'
              "
              color="gray"
              variant="ghost"
              aria-label="Theme"
              @click="isDark = !isDark"
            >
              {{ isDark ? $t('app.darkMode') : $t('app.lightMode') }}
            </UButton>
            <template #fallback>
              <div class="w-8 h-8" />
            </template>
          </ClientOnly>
        </div>
        <UDivider />
        <div class="flex flex-col px-3 py-1">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-arrow-left-start-on-rectangle"
            class="hover:text-red-500 dark:hover:text-red-400"
            @click="handleLogout()"
          >
            {{ $t('auth.logout') }}
          </UButton>
        </div>
      </div>
    </template>
  </UPopover>
</template>
