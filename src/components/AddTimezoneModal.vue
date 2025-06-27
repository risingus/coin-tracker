<script lang="ts" setup>
import { ref, nextTick, watch } from 'vue'
import SearchModalVue from '../components/SearchModal.vue'
import { useLocales } from '../composables/useLocales'
import { useLocalesStore } from '../stores/use-locales-store'
import gsapAnimateResultItem from '../util/gsap-animate-result-item'

const query = ref('')
const { addLocales } = useLocalesStore()
const { data: results } = useLocales(query)

async function search(q: string) {
	query.value = q
}

function close() {
	query.value = ''
}

function confirm(locale: Locale) {
	addLocales(locale)
}

watch(results, async () => {
	await nextTick()
	gsapAnimateResultItem()
})
</script>

<template>
	<SearchModalVue
		button-text="Adicionar local"
		:results="results"
		@on-confirm="confirm"
		@on-close="close"
		@on-search="search">
		<template #result-item="{ item }">
			<div class="result-item">
				<i class="pi pi-map-marker"></i>
				<div>
					{{ (item as Locale).name }}
				</div>
				<div>
					{{ (item as Locale).countryCode }}
				</div>
				<div>
					{{ (item as Locale).type }}
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
	grid-template-columns: repeat(2, 1fr);
	align-items: center;
	justify-content: start;

	& > div {
		display: grid;
		grid-template-columns: 1fr;
		align-items: center;
		justify-items: start;
		overflow: hidden;
	}
}

.result-item[data-selected='true'] {
	background-color: red;
}
</style>
