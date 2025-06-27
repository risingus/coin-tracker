<script setup lang="ts">
import { nextTick, ref } from 'vue'
import SearchModalVue from '../components/SearchModal.vue'
import { useCurrencies } from '../composables/useCurrencies'
import { useCurrenciesStore } from '../stores/use-currencies-store'
import gsapAnimateResultItem from '../util/gsap-animate-result-item'

const { addCurrency } = useCurrenciesStore()
const { data: currencies } = useCurrencies()
const query = ref('')
const results = ref<Currency[]>([])

function confirm(currency: Currency) {
	addCurrency(currency)
}

function close() {
	query.value = ''
	results.value = []
}

async function search(q: string) {
	results.value =
		Array.isArray(currencies.value) && q
			? currencies.value.filter((currency: Currency) => {
					return (
						currency.code.toUpperCase().startsWith(q.toUpperCase()) ||
						currency.name.toUpperCase().includes(q.toUpperCase())
					)
			  })
			: []

	await nextTick()
	gsapAnimateResultItem()
}
</script>

<template>
	<SearchModalVue
		button-text="Adicionar moeda"
		:results="results"
		@on-confirm="confirm"
		@on-close="close"
		@on-search="search">
		<template #result-item="{ item }">
			<div class="result-item">
				<i class="pi pi-dollar"></i>
				<div>
					{{ (item as Currency).code }}
				</div>
				<div>
					{{ (item as Currency).name }}
				</div>
			</div>
		</template>
	</SearchModalVue>
</template>

<style scoped>
.result-item {
	position: relative;
	will-change: transform, opacity;
	gap: 1rem;
	border-radius: 6px;
	max-height: 2.5rem;
	cursor: pointer;
	gap: 1rem;
	width: 100%;

	display: grid;
	grid-template-columns: 1rem 5rem 1fr;
	align-items: center;
	justify-content: start;

	& > div {
		display: grid;
		grid-template-columns: 1fr;
		align-items: center;
		justify-items: start;
	}
}

.result-item[data-selected='true'] {
	background-color: red;
}
</style>
