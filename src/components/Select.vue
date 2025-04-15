<script lang='ts' setup>
  import { useCurrencies } from '../composables/useCurrencies'
  const { data: currencies } = useCurrencies()
</script>

<template>
  <select class='select'>
    <option v-for='currency in currencies' :value='currency'
      class='select-option'>
      {{ `${currency.code} - ${currency.name}` }}
    </option>
  </select>
</template>


<style scoped>

.select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;

  &,
  &::picker(select) {
    appearance: base-select;
    padding: 0.5rem;
  }

}
</style>
