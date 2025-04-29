<script lang='ts' setup>
import { useAttrs } from 'vue';
import { useCurrencies } from '../composables/useCurrencies'

  const { data: currencies } = useCurrencies()
  const attrs = useAttrs()
  const emit = defineEmits(['change'])

  function handleChange(event: Event ) {
    const selected = event.target as HTMLSelectElement
    if (!selected) return
    const parsedSelected = JSON.parse(selected.value)
    emit('change', parsedSelected)
  }

</script>

<template>
  <select class='select' v-bind='attrs' @change='handleChange'>
    <option v-for='currency in currencies' :value='JSON.stringify(currency)'
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
