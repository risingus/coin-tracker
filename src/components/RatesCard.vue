<script lang='ts' setup>
import { ref } from 'vue';
import { useExchangeRates } from '../composables/useExchangeRates';
import Button from './Button.vue';
import RateHistoryChart from './RateHistoryChart.vue';

const { currency } = defineProps<{
  currency: Currency
}>()
const { data: rate } = useExchangeRates({ from: 'USD', to: currency.code })
const chartShow = ref(false);


function handleShowChart() {
  chartShow.value = !chartShow.value
}

</script>

<template>
  <div class='rates-card'>
    <div class='rates-card-header'>
      <div class='rates-card-rate'>
        {{ rate?.currencyValue || 'N/A' }}
      </div>

      <div class='rates-card-from'>
        USD
      </div>

      <div class='rates-card-to'>
        {{ currency.code }}
      </div>

      <Button round @click='handleShowChart' data-swapy-no-drag>
        <i class="pi pi-chevron-down" v-if='!chartShow'></i>
        <i class="pi pi-chevron-up" v-if='chartShow'></i>
      </Button>
    </div>

    <RateHistoryChart from='USD' :to='currency.code' v-if='chartShow' />

  </div>
</template>


<style scoped>
.rates-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  .rates-card-header {
    display: grid;
    grid-template-columns: repeat(3, 1fr) 2.5rem;
    align-items: center;
    gap: 2rem;
    justify-items: start;
  }
}
</style>