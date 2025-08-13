<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { createSwapy, type Swapy, utils, type SlotItemMapArray } from 'swapy'
import { computed, onMounted, onUnmounted, ref, toRaw, watch } from 'vue'
import { useLocalesStore } from '../../../stores/use-locales-store'
import { toSafeString } from '@/util/to-safe-string'
import AddTimezoneModal from '@/components/AddTimezoneModal.vue'
import LocalesCard from '@/components/LocalesCard.vue'

const store = useLocalesStore()
const { locales } = storeToRefs(store)

const swapy = ref<Swapy | null>(null)
const container = ref<HTMLElement | null>()

const slotItemMap = ref<SlotItemMapArray>([
	...utils.initSlotItemMap(locales.value, 'name'),
])
const slottedItems = computed(() =>
	utils.toSlottedItems(locales.value, 'name', slotItemMap.value)
)

watch(locales, () => {
	return (
		utils.dynamicSwapy(
			swapy.value,
			locales.value,
			'name',
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
					const locale = locales.value.find((c) => c.name === item.item)
					if (!locale) return
					return toRaw(locale)
				})
				.filter((item) => toSafeString(item?.name)) as Locale[]
			store.updateLocalesOrder(mappedOrder)
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
					:count="locales.length"
					:number-style="{
						backgroundColor: 'var(--primary)',
						color: 'var(--text-secondary)',
						boxShadow: '0 0 0 1px var(--text-primary) inset',
					}">
					  <a-tag color="black" style="padding: 5px"><strong>Clocks</strong></a-tag>
				</a-badge>
				<AddTimezoneModal />
		</div>
		<div
			v-for="{ slotId, itemId, item: locale } in slottedItems"
			:key="slotId"
			:data-swapy-slot="slotId"
			class="item">
			<div v-if="locale" :key="itemId" :data-swapy-item="itemId">
				<LocalesCard :locale="locale" />
			</div>
		</div>
	</div>
</template>
