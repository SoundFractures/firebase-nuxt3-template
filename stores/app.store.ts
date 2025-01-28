export const useAppStore = defineStore('app', () => {
  const app = reactive({
    text: '',
  })

  const setText = (newText: string) => {
    app.text = newText
  }

  return {
    text: computed(() => app.text),
    setText,
  }
})
