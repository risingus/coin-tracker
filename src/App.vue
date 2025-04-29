<script setup lang="ts">
import { storeToRefs } from 'pinia';
import AddCurrencyModal from './components/AddCurrencyModal.vue'
import { useCurrenciesStore } from './stores/use-currencies-store';
import RatesCard from './components/RatesCard.vue';

const store = useCurrenciesStore()
const { currencies } = storeToRefs(store)

</script>

<template>
  <AddCurrencyModal />
  <div v-for='currency in currencies' :key='currency.code'>
    <RatesCard :currency='currency' />
  </div>

</template>

<style scoped>

</style>
