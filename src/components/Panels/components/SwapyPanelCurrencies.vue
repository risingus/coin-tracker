<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { createSwapy, type Swapy, utils, type SlotItemMapArray } from 'swapy'
import { computed, onMounted, onUnmounted, ref, watch, toRaw } from 'vue'
import { useCurrenciesStore } from '../../../stores/use-currencies-store'
import { toSafeString } from '@/util/to-safe-string'
import RatesCard from '@/components/RatesCard.vue'
import AddCurrencyModal from '@/components/AddCurrencyModal.vue'

const store = useCurrenciesStore()
const { currencies } = storeToRefs(store)

const swapy = ref<Swapy | null>(null)
const container = ref<HTMLElement | null>()

const slotItemMap = ref<SlotItemMapArray>([
	...utils.initSlotItemMap(currencies.value, 'code'),
])
const slottedItems = computed(() =>
	utils.toSlottedItems(currencies.value, 'code', slotItemMap.value)
)

watch(currencies, () => {
	return (
		utils.dynamicSwapy(
			swapy.value,
			currencies.value,
			'code',
			slotItemMap.value,
			(value: SlotItemMapArray) => (slotItemMap.value = value)
		),
		{ deep: true }
	)
})

onMounted(() => {
	if (container?.value) {
		swapy.value = createSwapy(container.value, {
			manualSwap: true,
		})
		swapy.value.onSwap((event) => {
			const newOrder = event.newSlotItemMap.asArray
			requestAnimationFrame(() => {
				slotItemMap.value = newOrder
			})

			const mappedOrder = newOrder
				.map((item) => {
					const currency = currencies.value.find((c) => c.code === item.item)
					if (!currency) return
					return toRaw(currency)
				})
				.filter((item) => toSafeString(item?.code)) as Currency[]

			store.updateCurrencyOrder(mappedOrder)
		})
	}
})

onUnmounted(() => {
	swapy.value?.destroy()
})
</script>

<template>
	<div ref="container" class="w-full flex flex-col gap-2">
		<div class='flex flex-row items-center justify-between'>
				<a-badge
					:count="currencies.length"
					:number-style="{
						backgroundColor: 'var(--primary)',
						color: 'var(--text-secondary)',
						boxShadow: '0 0 0 1px var(--text-primary) inset',
					}">
					  <a-tag color="black" style="padding: 5px"><strong class="">Coins</strong></a-tag>
				</a-badge>
				<AddCurrencyModal />
		</div>
		<div
			v-for="{ slotId, itemId, item: currency } in slottedItems"
			:key="slotId"
			:data-swapy-slot="slotId">
			<div v-if="currency" :key="itemId" :data-swapy-item="itemId">
				<RatesCard :currency="currency" />
			</div>
		</div>
	</div>
</template>
