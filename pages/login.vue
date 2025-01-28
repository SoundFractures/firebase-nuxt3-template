<script setup lang="ts">
  const { login, user, logout } = useAuth()
  const state = ref({
    email: '',
    password: '',
  })

  const handleLogin = async () => {
    try {
      await login(state.value.email, state.value.password)
      // Redirect or show success message
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      // Redirect or show success message
    } catch (error) {
      // Handle logout error
      console.error('Logout failed:', error)
    }
  }
</script>

<template>
  <div class="mx-auto mt-8 max-w-md">
    <div v-if="!user">
      <h1 class="mb-4 font-bold text-2xl">Login</h1>
      <UForm :state="state" @submit="handleLogin">
        <UFormGroup label="Email" name="email">
          <UInput
            v-model="state.email"
            type="email"
            autocomplete="email"
            required
          />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput
            v-model="state.password"
            type="password"
            autocomplete="current-password"
            required
          />
        </UFormGroup>
        <UButton v-if="!user" type="submit" color="primary" class="mt-4 w-full">
          Login
        </UButton>
      </UForm>
    </div>

    <UCard class="mt-4" v-if="user">
      <h1 class="mb-4 font-bold text-2xl">Logged in as</h1>
      {{ user.email }}
    </UCard>
    <UButton v-if="user" color="red" class="mt-4 w-full" @click="handleLogout">
      Logout
    </UButton>
  </div>
</template>

<style scoped>
  /* Add any additional styles if needed */
</style>
