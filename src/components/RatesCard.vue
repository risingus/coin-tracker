<script lang="ts" setup>
import { ref } from 'vue'
import { useExchangeRates } from '../composables/useExchangeRates'
import Button from './Button.vue'
import RateHistoryChart from './RateHistoryChart.vue'
import LiquidGlassContainer from './LiquidGlassContainer.vue'

const { currency } = defineProps<{
	currency: Currency
}>()
const { data: rate } = useExchangeRates({ from: 'USD', to: currency.code })
const chartShow = ref(false)

function handleShowChart() {
	chartShow.value = !chartShow.value
}
</script>

<template>
	<LiquidGlassContainer>
		<template #children>
			<div :data-swapy-no-drag="chartShow ? 'true' : null" class="flex flex-col w-full p-4">
				<div class="grid grid-cols-[repeat(3,1fr)_2.5rem] items-center gap-8 justify-items-start">
					<div class="rates-card-rate">
						{{ rate?.currencyValue || 'N/A' }}
					</div>

					<div class="rates-card-from">USD</div>

					<div class="rates-card-to">
						{{ currency.code }}
					</div>

					<Button round data-swapy-no-drag @click="handleShowChart">
						<i v-if="!chartShow" class="pi pi-chevron-down"></i>
						<i v-if="chartShow" class="pi pi-chevron-up"></i>
					</Button>
				</div>

				<div :class="['transition-[height] duration-500 ease-in-out overflow-hidden', chartShow ? 'h-100 mt-4' : 'h-0 leading-0 m-0 p-0 overflow-hidden ']">
					<RateHistoryChart v-if="chartShow" from="USD" :to="currency.code" />
				</div>

			</div>
		</template>
	</LiquidGlassContainer>
</template>
