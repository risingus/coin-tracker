<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useExchangeRates } from '../../composables/useExchangeRates'
import { useCurrenciesStore } from '@/stores/use-currencies-store'
import BaseCard from '../BaseCard.vue'
import RateHistoryChart from '../RateHistoryChart.vue'
import ModalEditCurrency from './ModalEditCurrency.vue'

const { removeCurrency} = useCurrenciesStore()
const { currency, index } = defineProps<{
	currency: Currency
	index: number
}>()
const from = computed(() => {
  return currency?.from?.code || 'USD'
})


const { data: rate } = useExchangeRates({ from: from.value, to: currency.code })
const chartShow = ref(false)
const deleteShow = ref(false)
const editShow = ref(false)

function handleShowChart() {
	chartShow.value = !chartShow.value
}

function handleDeleteShow() {
	deleteShow.value = !deleteShow.value
}

function handleEditShow() {
	editShow.value = !editShow.value
}
</script>

<template>
	<div
		:data-swapy-no-drag="chartShow || deleteShow || editShow ? 'true' : null">
		<BaseCard class="card">
			<div class="grid grid-cols-[1fr_3rem_3rem_2.5rem] items-center gap-x-4">
				<a-statistic title="Valor" :value="rate?.currencyValue || 'N/A'" />
				<a-statistic title="De" :value="from" />
				<a-statistic title="Para" :value="currency.code" />

				<div class="flex flex-col items-center gap-1">
					<a-dropdown :arrow="{ pointAtCenter: true }" :trigger="['click']">
						<a-button shape="circle" data-swapy-no-drag size="small">
							<i class="pi pi-ellipsis-v" style="font-size: 0.75rem"></i>
						</a-button>
						<template #overlay>
							<a-menu style="width: 5rem">
								<a-menu-item @click="handleEditShow">
									<div class="flex items-center justify-center">
										<i class="pi pi-pencil"></i>
									</div>
								</a-menu-item>
								<a-menu-divider />
								<a-menu-item @click="handleDeleteShow">
									<div class="flex items-center justify-center text-red-400">
										<i class="pi pi-trash"></i>
									</div>
								</a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>

					<a-button
						shape="circle"
						data-swapy-no-drag
						size="small"
						@click="handleShowChart">
						<i
							v-if="!chartShow"
							class="pi pi-chevron-down"
							style="font-size: 0.75rem"></i>
						<i
							v-if="chartShow"
							class="pi pi-chevron-up"
							style="font-size: 0.75rem"></i>
					</a-button>
				</div>
			</div>

			<div
				:class="[
					'transition-[height] duration-500 ease-in-out overflow-hidden',
					chartShow ? 'h-100 mt-4' : 'h-0 leading-0 m-0 p-0 overflow-hidden ',
				]">
				<RateHistoryChart v-if="chartShow" :from="from" :to="currency.code" />
			</div>
		</BaseCard>
	</div>
	<a-modal
		:open="deleteShow"
		centered
		wrap-class-name="modal"
		ok-text="Remover"
		cancel-text="Cancelar"
		@cancel="handleDeleteShow"
		@ok="() => removeCurrency(index)">
		<strong class="text-base">Remover conversão?</strong>
	</a-modal>

	<div data-swapy-no-drag>
		<ModalEditCurrency
			:index="index"
			:open="editShow"
			:currency="currency"
			:on-close="handleEditShow" 
			@cancel="handleEditShow"
			/>
	</div>
</template>
