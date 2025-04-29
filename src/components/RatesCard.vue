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
        {{ rate?.currencyValue }}
      </div>

      <div class='rates-card-from'>
        USD
      </div>

      <div class='rates-card-to'>
        {{ currency.code }}
      </div>

      <Button round @click='handleShowChart'>
        O
      </Button>
    </div>

    <div class='rates-card-graph-container' v-if='chartShow'>
      <RateHistoryChart from='USD' :to='currency.code' />
    </div>

  </div>
</template>


<style scoped>
.rates-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .rates-card-header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    gap: 2rem;
    justify-items: start;
  }

  .rates-card-graph-container {

  }
}
</style>