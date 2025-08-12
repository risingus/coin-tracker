<script lang="ts" setup>
import { ref } from 'vue'
import { useExchangeRates } from '../composables/useExchangeRates'
import RateHistoryChart from './RateHistoryChart.vue'
import { useCurrenciesStore } from '@/stores/use-currencies-store'
import BaseCard from './BaseCard.vue'

const { removeCurrency } = useCurrenciesStore()
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
	<div :data-swapy-no-drag="chartShow ? 'true' : null">
		<BaseCard class='card'>
			<div class="grid grid-cols-[repeat(3,1fr)_2.5rem] items-center gap-4">
				<a-statistic title="Valor" :value="rate?.currencyValue || 'N/A'" />
				<a-statistic title="De" value="USD" />
				<a-statistic title="Para" :value="currency.code" />

				<div class="flex flex-col items-center gap-2">
					<a-popconfirm title="Deletar conversão?" ok-text="Sim"
						cancel-text="Não" @confirm="() => removeCurrency(currency)">
						<a-button shape="circle" data-swapy-no-drag>
							<i class="pi pi-trash"></i>
						</a-button>
					</a-popconfirm>

					<a-button shape="circle" data-swapy-no-drag @click="handleShowChart">
						<i v-if="!chartShow" class="pi pi-chevron-down"></i>
						<i v-if="chartShow" class="pi pi-chevron-up"></i>
					</a-button>
				</div>
			</div>

			<div :class="[
				'transition-[height] duration-500 ease-in-out overflow-hidden',
				chartShow ? 'h-100 mt-4' : 'h-0 leading-0 m-0 p-0 overflow-hidden ',
			]">
				<RateHistoryChart v-if="chartShow" from="USD" :to="currency.code" />
			</div>
		</BaseCard>
	</div>
</template>

