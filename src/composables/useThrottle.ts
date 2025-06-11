import { ref } from 'vue'

export function useThrottle() {
  const busy = ref(false)

  return (callback: () => void, delay = 300) => {
    if (busy.value) return
    busy.value = true
    callback()
    setTimeout(() => {
      busy.value = false
    }, delay)
  }
}