import { defineStore } from 'pinia'
import { ref } from 'vue'

const localesStorageKey = 'locales-list'

function getStoredLocales() {
  const ls = localStorage.getItem(localesStorageKey)
  try {
    if (!ls) return []
    const storedList = JSON.parse(ls)
    if (!Array.isArray(storedList)) return [];
    return storedList
  } catch (err) {
    console.warn(err)
    return []
  }
}

export const useLocalesStore = defineStore('localesStore', () => {
  const locales = ref([] as Locale[])

  const storedLocales = getStoredLocales()
  locales.value = storedLocales
  
  function addLocales(locale: Locale) {
    const inList = locales.value.some((cur) => cur.name === locale.name)
    if (inList) return;
    const newLocales =  [...locales.value, locale]
    locales.value = newLocales
    localStorage.setItem(localesStorageKey, JSON.stringify(newLocales))
  }

  function removeLocales(locale: Locale) {
    const newLocales = locales.value.filter((cur) => cur.name !== locale.name)
    locales.value = newLocales
    localStorage.setItem(localesStorageKey, JSON.stringify(newLocales))
  }

  function updateLocalesOrder(locale: Locale[]) {
    if (!Array.isArray(locale)) return
    localStorage.setItem(localesStorageKey, JSON.stringify(locale))
  }


  return { locales, addLocales, removeLocales, updateLocalesOrder }
})