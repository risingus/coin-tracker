export function useDebounce() {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (callback: () => void, delay = 300) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(callback, delay)
  }
}