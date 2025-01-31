<script setup lang="ts">
  const { user, changePassword, logout } = useAuth()

  // Change password functionality
  const passwords = ref({
    newPassword: '',
    confirmPassword: '',
  })

  const isError = ref(false)
  const isLoading = ref(false)

  const handlePasswordChange = async () => {
    isLoading.value = true
    isError.value = false
    try {
      // Implement password change logic here

      await changePassword(passwords.value.newPassword)
      nextTick(() => {
        logout()
        navigateTo({
          name: PAGE_NAME.AUTH_LOGIN,
        })
      })
    } catch (error) {
      isError.value = true
      // Handle error
      console.error('Password change failed:', error)
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <div class="flex flex-col gap-4 mx-auto">
    <UCard class="my-4">
      <template #header>
        <h3 class="font-semibold text-lg">{{ $t('user.profile') }}</h3>
      </template>
      <ul v-if="user" class="space-y-2">
        <li class="flex items-center">
          <span class="mr-2 font-medium">{{ $t('user.email') }}:</span>
          <span>{{ user.email }}</span>
        </li>
        <li class="flex items-center">
          <span class="mr-2 font-medium">{{ $t('user.displayName') }}:</span>
          <span>{{ user.displayName || 'Not set' }}</span>
        </li>
        <li class="flex items-center">
          <span class="mr-2 font-medium">{{ $t('user.uid') }}:</span>
          <span>{{ user.uid }}</span>
        </li>
        <li class="flex items-center">
          <span class="mr-2 font-medium">{{ $t('user.emailVerified') }}:</span>
          <span>{{ user.emailVerified ? 'Yes' : 'No' }}</span>
        </li>
      </ul>
    </UCard>
    <UCard class="my-4">
      <template #header>
        <h3 class="font-semibold text-lg">{{ $t('settings.authMethod') }}</h3>
      </template>
      <div v-if="user">
        <p>
          <span class="font-medium">{{ $t('settings.provider') }}:</span>
          {{ user.providerData[0]?.providerId || 'Not available' }}
        </p>
      </div>
    </UCard>
    <UCard
      v-if="user && user.providerData[0]?.providerId === 'password'"
      class="my-4"
    >
      <template #header>
        <h3 class="font-semibold text-lg">
          {{ $t('settings.changePassword') }}
        </h3>
      </template>
      <UForm
        :state="passwords"
        class="space-y-4"
        @submit="handlePasswordChange"
      >
        <UFormGroup :label="$t('settings.newPassword')" name="newPassword">
          <UInput v-model="passwords.newPassword" type="password" />
        </UFormGroup>
        <UFormGroup
          :label="$t('settings.confirmPassword')"
          name="confirmPassword"
        >
          <UInput v-model="passwords.confirmPassword" type="password" />
        </UFormGroup>
        <UButton color="primary" :loading="isLoading" type="submit">
          {{ $t('settings.changePassword') }}
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>
