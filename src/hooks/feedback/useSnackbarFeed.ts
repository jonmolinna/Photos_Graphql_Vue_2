import { onUnmounted, ref, type Ref } from 'vue'

export const useSnackbarFeed = () => {
  const show: Ref<boolean> = ref(false)
  const message: Ref<string> = ref('')
  const color: Ref<string> = ref('')

  const showSnackbar = (msg: string, color1: string, show1: boolean) => {
    message.value = msg
    color.value = color1
    show.value = show1
  }

  onUnmounted(() => {
    message.value = ''
    color.value = ''
    show.value = false
  })

  return {
    show,
    message,
    color,
    showSnackbar,
  }
}
