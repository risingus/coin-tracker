<script lang="ts" setup>
import { ref, nextTick, watch } from 'vue'
import SearchModalVue from '../components/SearchModal.vue'
import { useLocales } from '../composables/useLocales'
import { useLocalesStore } from '../stores/use-locales-store'
import gsapAnimateResultItem from '../util/gsap-animate-result-item'
import { getValidStringFromAny } from '../util/get-valid-string-from-any'

const query = ref('')
const { addLocales } = useLocalesStore()
const { data: results, isFetching } = useLocales(query)

async function search(q: string) {
		query.value = q
}

function close() {
	query.value = ''
}

async function getTimezone({lat, lon}:{lat: number | null, lon: number | null}): Promise<string> {
	try {
		if (lat === null || lon === null) return ''
		const params = new URLSearchParams();
		params.append('lat', String(lat));
		params.append('lng', String(lon));
		params.append('username', 'risingus');
		const response = await fetch('http://api.geonames.org/timezoneJSON' + '?' + params, {
			method: 'get',
		})
		if (!response.ok) return ''
		const data = await response.json()
		
		if (!getValidStringFromAny(data?.timezoneId)) return ''
		return data.timezoneId;
	} catch {
		return ''
	}
}

async function confirm(locale: Locale) {
	const timezoneId = await getTimezone({lat: locale.lat, lon: locale.lon})
	addLocales({...locale, timezoneId})
}

watch(results, async () => {
	await nextTick()
	gsapAnimateResultItem()
})
</script>

<template>
	<SearchModalVue
		button-text="Adicionar local"
		:is-fetching="isFetching"
		:results="results"
		@on-confirm="confirm"
		@on-close="close"
		@on-search="search">
		<template #result-item="{ item }">
			<div class="result-item items-center justify-start grid grid-cols-[2.5rem_1fr_6rem]">
				<i class="pi pi-map-marker"></i>
				<div class='grid grid-cols-1 items-center justify-items-start overflow-hidden'>
					{{ (item as Locale).name }}
				</div>
				<div class='grid grid-cols-1 items-center justify-items-start overflow-hidden'>
					{{ (item as Locale).countryCode }} / {{ (item as Locale).type }}
				</div>
			</div>
		</template>
	</SearchModalVue>
</template>


