import { toSafeString } from '@/util/to-safe-string'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const currencyStorageKey = 'currency-list'

function getStoredCurrencies() {
  const ls = localStorage.getItem(currencyStorageKey)
  try {
    if (!ls) return []
    const storedList = JSON.parse(ls)
    if (!Array.isArray(storedList)) return [];
    return storedList.filter((item) => toSafeString(item?.code))
  } catch (err) {
    console.warn(err)
    return []
  }
}

export const useCurrenciesStore = defineStore('currenciesStore', () => {
  const currencies = ref([] as Currency[])

  const storedCurrencies = getStoredCurrencies() as Currency[]
  currencies.value = storedCurrencies

  function addCurrency(currency: Currency) {
    const inList = currencies.value.some((cur) => cur.code === currency.code)
    if (inList) return;
    const updatedList = [...currencies.value, currency]
    currencies.value = updatedList
    localStorage.setItem(currencyStorageKey, JSON.stringify(updatedList))
  }

  function removeCurrency(currency: Currency) {
    const filtered = currencies.value.filter((cur) => cur.code !== currency.code)
    currencies.value = filtered
    localStorage.setItem(currencyStorageKey, JSON.stringify(filtered))
  }

  function updateCurrencyOrder(currencyList: Currency[]) {
    if (!Array.isArray(currencyList)) return
    localStorage.setItem(currencyStorageKey, JSON.stringify(currencyList))
  }

  return { currencies, addCurrency, removeCurrency, updateCurrencyOrder }
})