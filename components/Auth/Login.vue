<script setup lang="ts">
  const { login } = useAuth()
  const credentials = ref({
    email: '',
    password: '',
  })

  const isError = ref(false)
  const isLoading = ref(false)
  const handleLogin = async () => {
    isLoading.value = true
    isError.value = false
    try {
      await login(credentials.value.email, credentials.value.password)
      nextTick(() => {
        navigateTo({
          name: PAGE_NAME.HOME,
        })
      })
      // Redirect or show success message
    } catch (error) {
      isError.value = true
      // Handle login error
      console.error('Login failed:', error)
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <div class="flex flex-col items-center gap-4 w-full max-w-[300px]">
    <h1 class="font-bold text-2xl">{{ $t('app.title') }}</h1>
    <UForm
      :state="credentials"
      class="flex flex-col flex-grow gap-4 m-4 w-full"
      @submit="handleLogin()"
    >
      <UFormGroup :label="$t('auth.email')" name="email">
        <UInput v-model="credentials.email" />
      </UFormGroup>

      <UFormGroup :label="$t('auth.password')" name="password">
        <UInput v-model="credentials.password" type="password" />
      </UFormGroup>

      <UAlert
        v-if="isError"
        :description="$t('auth.on.error')"
        color="red"
        variant="subtle"
      />

      <div class="flex justify-start">
        <UButton type="submit" :loading="isLoading">
          {{ $t('auth.login') }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<style scoped>
  /* Component styles go here */
</style>
