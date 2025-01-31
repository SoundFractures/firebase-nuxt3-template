export default defineNuxtRouteMiddleware(async (to) => {
  const { isSignedIn, checkAuthState } = useAuth()

  await checkAuthState()

  if (!isSignedIn.value && to.name !== PAGE_NAME.AUTH_LOGIN) {
    return navigateTo({
      name: PAGE_NAME.AUTH_LOGIN,
    })
  }

  if (isSignedIn.value && to.name === PAGE_NAME.AUTH_LOGIN) {
    return navigateTo({
      name: PAGE_NAME.HOME,
    })
  }
})
