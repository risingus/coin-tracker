import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCurrenciesStore = defineStore('currenciesStore', () => {
  const currencies = ref([] as Currency[])
  
  function addCurrency(currency: Currency) {
    const inList = currencies.value.some((cur) => cur.code === currency.code)
    if (inList) return;
    currencies.value = [...currencies.value, currency]
  }

  function removeCurrency(currency: Currency) {
    currencies.value = currencies.value.filter((cur) => cur.code !== currency.code)
  }

  return { currencies, addCurrency, removeCurrency }
})