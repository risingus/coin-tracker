import { ref } from 'vue'

export function useDebounce() {
  const timeout = ref<ReturnType<typeof setTimeout> | null>(null)
  return (callback: () => void, delay = 300) => {
    if (timeout.value) {
      clearTimeout(timeout.value)
    }
    timeout.value = setTimeout(() => {
      callback()
      timeout.value = null
    }, delay)
  }
}