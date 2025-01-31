import tailwindConfig from '../tailwind.config'

export const useDisplay = () => {
  const screens = tailwindConfig.theme?.screens as {
    sm: string
    md: string
    lg: string
    xl: string
  }

  const smAndUp = ref<boolean>(false)
  const mdAndUp = ref<boolean>(false)
  const lgAndUp = ref<boolean>(false)
  const xlAndUp = ref<boolean>(false)

  const updateValues = () => {
    if (screens === undefined) return
    smAndUp.value = window.innerWidth >= parseInt(screens.sm)
    mdAndUp.value = window.innerWidth >= parseInt(screens.md)
    lgAndUp.value = window.innerWidth >= parseInt(screens.lg)
    xlAndUp.value = window.innerWidth >= parseInt(screens.xl)
  }

  onMounted(() => {
    updateValues()
    window.addEventListener('resize', () => updateValues())
  })

  onUnmounted(() => {
    window.removeEventListener('resize', () => updateValues())
  })

  return {
    smAndUp,
    mdAndUp,
    lgAndUp,
    xlAndUp,
    isMobile: computed(() => !smAndUp.value),
  }
}
