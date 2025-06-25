<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { gsap } from 'gsap'
import SearchModalVue from '../components/SearchModal.vue'
import { useCurrencies } from '../composables/useCurrencies'
import { useCurrenciesStore } from '../stores/use-currencies-store'

const { addCurrency } = useCurrenciesStore()
const { data: currencies } = useCurrencies()
const query = ref('')
const results = ref<Currency[]>([])

function confirm(props: unknown) {
  console.log(props, 'onConfirm')
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
	const timeline = gsap.timeline()
	gsap.utils.toArray<Element>('.result-item').forEach((item, index) => {
		if (index === 0) {
			item.setAttribute('data-selected', 'true')
		}
		timeline.fromTo(
			item,
			{
				translateY: '100%',
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 0.6,
				translateY: '0%',
				ease: 'power4.out',
			},
			index * 0.08
		)
	})
}

</script>

<template>
  <SearchModalVue :results="results" @on-confirm="confirm" @on-close="close" @on-search="search" >
    <template #result-item='{item, index}'>
      <div  class='result-item'>
        {{ index }}
        {{ item.code }}
        {{ item.name }}
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

				&:hover {
					background-color: blue;
				}

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
