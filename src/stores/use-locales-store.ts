import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLocalesStore = defineStore('localesStore', () => {
  const locales = ref([] as Locale[])
  
  function addLocales(locale: Locale) {
    const inList = locales.value.some((cur) => cur.name === locale.name)
    if (inList) return;
    const newLocales =  [...locales.value, locale]
    locales.value = newLocales
  }

  function removeLocales(locale: Locale) {
    const newLocales = locales.value.filter((cur) => cur.name !== locale.name)
    locales.value = newLocales
  }

  return { locales, addLocales, removeLocales }
})