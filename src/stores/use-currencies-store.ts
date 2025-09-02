import { toSafeString } from '@/util/to-safe-string'
import { defineStore } from 'pinia'
import { ref } from 'vue'
interface CurrencyWithId extends Currency {
  id: string
}

const currencyStorageKey = 'currency-list'

function getStoredCurrencies() {
  const ls = localStorage.getItem(currencyStorageKey)
  try {
    if (!ls) return []
    const storedList = JSON.parse(ls)
    if (!Array.isArray(storedList)) return [];
    return storedList.filter((item) => toSafeString(item?.code)).map((item) => {
      return { ...item, id: Math.random().toString() }
    })
  } catch (err) {
    console.warn(err)
    return []
  }
}

export const useCurrenciesStore = defineStore('currenciesStore', () => {
  const currencies = ref([] as CurrencyWithId[])

  const storedCurrencies = getStoredCurrencies() as CurrencyWithId[]
  currencies.value = storedCurrencies

  function addCurrency(currency: Currency) {
    const updatedList = [...currencies.value, { ...currency, id: Math.random().toString() }]
    currencies.value = updatedList
    localStorage.setItem(currencyStorageKey, JSON.stringify(updatedList))
  }

  function removeCurrency(index: number) {
    const filtered = currencies.value.filter((_, i) => i !== index)
    currencies.value = filtered
    localStorage.setItem(currencyStorageKey, JSON.stringify(filtered))
  }

  function updateCurrencyOrder(currencyList: Currency[]) {
    if (!Array.isArray(currencyList)) return
    localStorage.setItem(currencyStorageKey, JSON.stringify(currencyList))
  }

  function editCurrency({ index, from, to }: { index: number, from: Currency, to: Currency }) {
    const newList = currencies.value.map((item, i) => {
      if (i !== index) return { ...item }
      return {
        ...item,
        code: to.code,
        name: to.name,
        from: from,
      }
    })
    currencies.value = newList
    localStorage.setItem(currencyStorageKey, JSON.stringify(newList))
  }

  return { currencies, addCurrency, removeCurrency, updateCurrencyOrder, editCurrency }
})